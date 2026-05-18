import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { createClient, getBusiness } from "../../../lib/supabase-server";

export const runtime = "nodejs";

const DAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const template = (url.searchParams.get("template") ?? "editorial") as
    | "editorial"
    | "dark"
    | "cards";
  const download = url.searchParams.get("download") === "1";

  const supabase = await createClient();
  const business = await getBusiness();
  if (!business) {
    return new Response("No business", { status: 401 });
  }

  const today = new Date();
  const dates: { date: string; dow: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    dates.push({ date: iso, dow: d.getDay() });
  }
  const fromDate = dates[0].date;
  const toDate = dates[dates.length - 1].date;

  const [{ data: workingDaysData }, { data: timeSlotsData }, { data: appointments }, { data: biz }] =
    await Promise.all([
      supabase.from("working_days").select("day").eq("business_id", business.id),
      supabase.from("time_slots").select("id, time, day").eq("business_id", business.id),
      supabase
        .from("appointments")
        .select("date, time")
        .eq("business_id", business.id)
        .gte("date", fromDate)
        .lte("date", toDate),
      supabase.from("businesses").select("schedule_mode, owner_name, slug").eq("id", business.id).single(),
    ]);

  const workingDays = (workingDaysData ?? []).map((d) => d.day);
  const allSlots = timeSlotsData ?? [];
  const scheduleMode = biz?.schedule_mode === "per-day" ? "per-day" : "unified";
  const slug = biz?.slug ?? "";
  const ownerName = biz?.owner_name ?? "";

  type DayEntry = { date: string; dow: number; label: string; times: { time: string; booked: boolean }[] };
  const week: DayEntry[] = dates
    .filter((d) => workingDays.length === 0 || workingDays.includes(d.dow))
    .slice(0, 5)
    .map(({ date, dow }) => {
      const slotsForDow =
        scheduleMode === "per-day"
          ? allSlots.filter((s) => s.day === dow)
          : allSlots.filter((s) => s.day === null);
      const bookedTimes = new Set(
        (appointments ?? []).filter((a) => a.date === date).map((a) => a.time),
      );
      const dayLabel = `${DAY_LABELS[dow]} ${new Date(date + "T12:00:00").getDate()}`;
      return {
        date,
        dow,
        label: dayLabel,
        times: slotsForDow.map((s) => ({ time: s.time, booked: bookedTimes.has(s.time) })),
      };
    });

  const freeTotal = week.reduce((sum, d) => sum + d.times.filter((t) => !t.booked).length, 0);

  const node = renderTemplate(template, { week, freeTotal, slug, ownerName });

  const response = new ImageResponse(node, {
    width: 1080,
    height: 1920,
  });

  if (download) {
    return new Response(await response.arrayBuffer(), {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="nailflow-disponibilidad-${template}.png"`,
        "Cache-Control": "no-store",
      },
    });
  }

  return response;
}

// ─────────────────────────────────────────────────────────────────────────
// Templates — solo inline styles, sin className, sin gap
// ─────────────────────────────────────────────────────────────────────────

function renderTemplate(
  template: "editorial" | "dark" | "cards",
  data: {
    week: { label: string; times: { time: string; booked: boolean }[] }[];
    freeTotal: number;
    slug: string;
    ownerName: string;
  },
) {
  switch (template) {
    case "dark":
      return <StoryDark {...data} />;
    case "cards":
      return <StoryCards {...data} />;
    case "editorial":
    default:
      return <StoryEditorial {...data} />;
  }
}

function StoryEditorial({ week, slug }: any) {
  return (
    <div style={{
      width: 1080, height: 1920, background: "#fbf9f9", color: "#2d2424",
      fontFamily: "sans-serif", display: "flex", flexDirection: "column",
      padding: "110px 90px", position: "relative",
    }}>
      <div style={{
        position: "absolute", right: -120, top: -180,
        fontSize: 900, color: "#e9cece", opacity: 0.35, lineHeight: 1,
      }}>✦</div>
      <div style={{
        fontSize: 28, letterSpacing: "0.25em", textTransform: "uppercase",
        color: "#846262", display: "flex",
      }}>
        Esta semana
      </div>
      <div style={{
        fontSize: 130, lineHeight: 1.02, marginTop: 90, display: "flex",
      }}>
        Citas disponibles.
      </div>
      <div style={{ marginTop: 80, display: "flex", flexDirection: "column" }}>
        {week.map((d: any, i: number) => (
          <div key={i} style={{
            display: "flex", alignItems: "baseline", marginBottom: 36,
            paddingBottom: 28, borderBottom: "1px solid rgba(45,36,36,0.08)",
          }}>
            <div style={{ fontSize: 48, width: 280, display: "flex" }}>{d.label}</div>
            <div style={{ display: "flex", flexWrap: "wrap", flex: 1 }}>
              {d.times.length === 0 ? (
                <span style={{ color: "#b89090", fontSize: 36, display: "flex" }}>cerrado</span>
              ) : d.times.map((t: any, j: number) => (
                <span key={j} style={{
                  marginRight: 16, fontSize: 36,
                  color: t.booked ? "#b89090" : "#2d2424",
                  textDecoration: t.booked ? "line-through" : "none",
                  textDecorationColor: "#b86060", display: "flex",
                }}>{t.time}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "auto", display: "flex", alignItems: "flex-end" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{
            fontSize: 26, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#b89090", marginBottom: 10, display: "flex",
          }}>Reservá en</div>
          <div style={{ fontSize: 48, display: "flex" }}>nailflow.app/{slug}</div>
        </div>
      </div>
    </div>
  );
}

function StoryDark({ week, freeTotal, slug }: any) {
  return (
    <div style={{
      width: 1080, height: 1920, background: "#2d2424", color: "#fbf9f9",
      fontFamily: "sans-serif", display: "flex", flexDirection: "column",
      padding: "130px 120px", position: "relative",
    }}>
      <div style={{ textAlign: "center", fontSize: 90, color: "#e9cece", display: "flex", justifyContent: "center" }}>✦</div>
      <div style={{
        marginTop: 30, fontSize: 26, letterSpacing: "0.3em",
        textTransform: "uppercase", color: "#b89090", textAlign: "center",
        display: "flex", justifyContent: "center",
      }}>
        {freeTotal} cupos libres
      </div>
      <div style={{
        marginTop: 30, fontSize: 140, lineHeight: 1,
        textAlign: "center", display: "flex", justifyContent: "center",
      }}>
        Esta semana.
      </div>
      <div style={{ marginTop: 100, display: "flex", flexDirection: "column" }}>
        {week.map((d: any, i: number) => {
          const free = d.times.filter((t: any) => !t.booked);
          return (
            <div key={i} style={{
              display: "flex", alignItems: "baseline", paddingTop: 28,
              paddingBottom: 28, borderBottom: "1px solid rgba(251,249,249,0.1)",
            }}>
              <div style={{ fontSize: 42, width: 260, display: "flex" }}>{d.label}</div>
              <div style={{
                fontSize: 32, display: "flex",
                color: free.length ? "#fbf9f9" : "#846262",
              }}>
                {free.length === 0 ? "completo" : free.map((f: any) => f.time).join(" · ")}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{
        marginTop: "auto", display: "flex", flexDirection: "column",
        alignItems: "center",
      }}>
        <div style={{
          padding: "20px 44px", borderRadius: 999,
          background: "#e9cece", color: "#2d2424", fontSize: 38, display: "flex",
        }}>
          nailflow.app/{slug}
        </div>
      </div>
    </div>
  );
}

function StoryCards({ week, slug }: any) {
  return (
    <div style={{
      width: 1080, height: 1920, background: "#f4ecec", color: "#2d2424",
      fontFamily: "sans-serif", display: "flex", flexDirection: "column",
      position: "relative",
    }}>
      <div style={{
        background: "#2d2424", color: "#fbf9f9", padding: "100px 90px 70px",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{
          fontSize: 26, letterSpacing: "0.3em", textTransform: "uppercase",
          color: "#e9cece", marginBottom: 20, display: "flex",
        }}>
          Esta semana
        </div>
        <div style={{ fontSize: 110, lineHeight: 1, display: "flex" }}>Mi agenda.</div>
      </div>
      <div style={{
        padding: "40px 60px", display: "flex", flexDirection: "column", flex: 1,
      }}>
        {week.map((d: any, i: number) => {
          const free = d.times.filter((t: any) => !t.booked);
          const completo = free.length === 0;
          return (
            <div key={i} style={{
              background: completo ? "rgba(45,36,36,0.04)" : "#ffffff",
              borderRadius: 24, padding: "30px 36px", marginBottom: 20,
              opacity: completo ? 0.55 : 1, display: "flex", flexDirection: "column",
            }}>
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: completo ? 0 : 14,
              }}>
                <div style={{ fontSize: 48, display: "flex" }}>{d.label}</div>
                <div style={{
                  fontSize: 22, letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "#846262", display: "flex",
                }}>
                  {completo ? "Completo" : `${free.length} libres`}
                </div>
              </div>
              {!completo && (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {free.map((f: any, j: number) => (
                    <span key={j} style={{
                      marginRight: 12, marginTop: 4, padding: "10px 22px",
                      borderRadius: 999, background: "#f4ecec", fontSize: 28, display: "flex",
                    }}>{f.time}</span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{
        padding: "30px 90px 90px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{
            fontSize: 22, letterSpacing: "0.25em",
            textTransform: "uppercase", color: "#846262",
            marginBottom: 10, display: "flex",
          }}>
            Reservá
          </div>
          <div style={{ fontSize: 44, display: "flex" }}>nailflow.app/{slug}</div>
        </div>
        <div style={{ fontSize: 60, color: "#b89090", display: "flex" }}>✦</div>
      </div>
    </div>
  );
}

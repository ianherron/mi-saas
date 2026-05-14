// Shared email template for NailFlow transactional emails.
// All emails use this single function so visual changes happen in one place.
// Returns ready-to-send HTML string for Resend (and an inline-styled version
// you can paste into Supabase Auth → Email Templates).

export type EmailRow = { label: string; value: string; total?: boolean };

export interface RenderEmailOptions {
  /** Hidden preview text shown by inbox clients (Gmail etc.) */
  preheader?: string;
  /** Small uppercase label above the heading (e.g. "Cita confirmada"). */
  eyebrow?: string;
  /** Headline. Supports <em>italic</em> tags for the brand emphasis style. */
  heading: string;
  /** Paragraph below the heading. */
  intro?: string;
  /** Data rows shown as a hairline-bordered table. */
  rows?: EmailRow[];
  /** Optional primary CTA — a dark button. */
  cta?: { label: string; href: string };
  /** Optional "link pill" shown above CTA (e.g. the booking URL). */
  linkPill?: { label?: string; value: string };
  /** Optional image (e.g. payment proof, reference image) embedded inline. */
  image?: { url: string; alt?: string; label?: string };
  /** Tiny footer line (centered, muted, uppercase). */
  footer?: string;
}

// NailFlow brand tokens (inline-friendly hexes — no CSS variables in email).
const C = {
  ink: "#2d2424",
  muted: "#846262",
  midRose: "#b89090",
  rose: "#e9cece",
  roseSoft: "#f4ecec",
  cream: "#fbf9f9",
  white: "#ffffff",
  border: "rgba(45,36,36,0.08)",
};

const SERIF =
  "'Playfair Display', Georgia, 'Times New Roman', serif";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Escape but preserve our supported tag: <em>...</em> */
function escapeKeepEm(s: string): string {
  return escape(s).replace(/&lt;em&gt;(.*?)&lt;\/em&gt;/g, "<em>$1</em>");
}

export function renderEmail(opts: RenderEmailOptions): string {
  const {
    preheader,
    eyebrow,
    heading,
    intro,
    rows,
    cta,
    linkPill,
    image,
    footer,
  } = opts;

  const rowsHtml = rows?.length
    ? `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin:0 0 28px;">
      ${rows
        .map((r, i) => {
          const isLast = i === rows.length - 1;
          const isTotal = r.total === true;
          const labelStyle = `padding:12px 0;font-size:13px;font-family:${SANS};color:${
            isTotal ? C.ink : C.muted
          };${isTotal ? "font-weight:600;" : ""}${
            !isLast ? `border-bottom:0.5px solid ${C.border};` : ""
          }`;
          const valueStyle = `padding:12px 0;font-size:${
            isTotal ? "18px" : "13px"
          };font-family:${
            isTotal ? SERIF : SANS
          };color:${C.ink};font-weight:${isTotal ? 500 : 500};text-align:right;${
            isTotal ? "letter-spacing:-0.02em;" : ""
          }${!isLast ? `border-bottom:0.5px solid ${C.border};` : ""}`;
          return `<tr>
            <td style="${labelStyle}">${escape(r.label)}</td>
            <td style="${valueStyle}">${escape(r.value)}</td>
          </tr>`;
        })
        .join("")}
    </table>`
    : "";

  const ctaHtml = cta
    ? `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 8px;">
      <tr><td>
        <a href="${escape(cta.href)}"
           style="display:block;background:${C.ink};color:${C.cream};
                  padding:14px 24px;border-radius:12px;font-family:${SANS};
                  font-size:14px;font-weight:500;text-align:center;
                  text-decoration:none;">
          ${escape(cta.label)}
        </a>
      </td></tr>
    </table>`
    : "";

  const linkPillHtml = linkPill
    ? `
    ${
      linkPill.label
        ? `<p style="margin:0 0 6px;font-size:11px;font-weight:500;color:${C.muted};text-transform:uppercase;letter-spacing:0.15em;font-family:${SANS};">${escape(
            linkPill.label,
          )}</p>`
        : ""
    }
    <div style="margin:0 0 24px;padding:10px 14px;background:${C.roseSoft};border-radius:10px;font-family:'JetBrains Mono','SF Mono',Consolas,monospace;font-size:12px;color:${C.ink};word-break:break-all;">
      ${escape(linkPill.value)}
    </div>`
    : "";

  const imageHtml = image
    ? `
    ${
      image.label
        ? `<p style="margin:0 0 8px;font-size:11px;font-weight:500;color:${C.muted};text-transform:uppercase;letter-spacing:0.15em;font-family:${SANS};">${escape(image.label)}</p>`
        : ""
    }
    <img src="${escape(image.url)}" alt="${escape(image.alt ?? "")}"
         style="display:block;width:100%;max-width:100%;border-radius:12px;margin:0 0 24px;" />`
    : "";

  const preheaderHtml = preheader
    ? `<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;">${escape(preheader)}</div>`
    : "";

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:${C.cream};font-family:${SANS};color:${C.ink};">
${preheaderHtml}
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${C.cream};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:520px;">
      <tr><td style="background:${C.white};border:0.5px solid ${C.border};border-radius:20px;padding:36px 32px;">

        <!-- Brand row -->
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
          <tr>
            <td style="vertical-align:middle;">
              <div style="display:inline-block;width:36px;height:36px;border-radius:10px;background:${C.ink};color:${C.rose};text-align:center;line-height:36px;font-family:${SERIF};font-size:18px;">✦</div>
            </td>
            <td style="vertical-align:middle;padding-left:10px;">
              <span style="font-family:${SERIF};font-size:18px;font-weight:500;letter-spacing:-0.02em;color:${C.ink};">NailFlow</span>
            </td>
          </tr>
        </table>

        ${
          eyebrow
            ? `<p style="margin:0 0 12px;font-size:11px;font-weight:500;color:${C.muted};text-transform:uppercase;letter-spacing:0.15em;font-family:${SANS};">${escape(eyebrow)}</p>`
            : ""
        }

        <h1 style="margin:0 0 12px;font-family:${SERIF};font-size:28px;font-weight:500;color:${C.ink};letter-spacing:-0.02em;line-height:1.1;">
          ${escapeKeepEm(heading).replace(
            /<em>(.*?)<\/em>/g,
            `<em style="font-style:italic;font-weight:400;color:${C.muted};">$1</em>`,
          )}
        </h1>

        ${
          intro
            ? `<p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:${C.muted};font-family:${SANS};">${escapeKeepEm(intro).replace(/<em>(.*?)<\/em>/g, `<em style="font-style:italic;color:${C.ink};">$1</em>`)}</p>`
            : ""
        }

        ${rowsHtml}
        ${linkPillHtml}
        ${imageHtml}
        ${ctaHtml}

        ${
          footer
            ? `<p style="margin:28px 0 0;padding-top:20px;border-top:0.5px solid ${C.border};font-size:11px;color:${C.midRose};text-align:center;text-transform:uppercase;letter-spacing:0.15em;font-weight:500;font-family:${SANS};">${escape(footer)}</p>`
            : ""
        }

      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

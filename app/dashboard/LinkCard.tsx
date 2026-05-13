import WhatsAppShareButton, { DarkCopyButton } from "./WhatsAppShareButton";
import { ExternalLink } from "lucide-react";

interface Props {
  bookingUrl: string;
  firstName?: string;
}

export default function LinkCard({ bookingUrl, firstName }: Props) {
  const fullUrl = `https://${bookingUrl}`;
  const shareText = firstName
    ? `Reservá conmigo (${firstName}): ${fullUrl}`
    : `Reservá conmigo: ${fullUrl}`;

  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#2d2424] p-5 text-[#fbf9f9] sm:rounded-3xl sm:p-6">
      {/* Decorative ✦ */}
      <span
        aria-hidden
        className="serif-heading pointer-events-none absolute -right-4 -top-6 text-[120px] leading-none text-[#e9cece]/10 sm:-right-5 sm:-top-8 sm:text-[160px]"
      >
        ✦
      </span>

      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#e9cece]">
        Tu enlace de reservas
      </p>
      <h3 className="serif-heading mt-2 text-xl font-medium leading-tight tracking-tight text-[#fbf9f9] sm:text-2xl">
        Compartilo con tus{" "}
        <em className="font-normal italic text-[#e9cece]">clientas</em>.
      </h3>
      <p className="mt-1.5 max-w-xs text-[13px] leading-relaxed text-[#fbf9f9]/70">
        Reservan solas — mientras dormís, mientras trabajás.
      </p>

      {/* URL pill */}
      <div className="mt-4 flex items-center overflow-hidden rounded-lg bg-white/10 px-3 py-2 font-mono text-[11px] text-[#fbf9f9] sm:text-[12px]">
        <span className="truncate">{bookingUrl}</span>
      </div>

      {/* Actions */}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <WhatsAppShareButton text={shareText} />
        <div className="flex gap-2">
          <DarkCopyButton url={fullUrl} />
          <a
            href={fullUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 px-3 py-2.5 text-sm font-medium text-[#fbf9f9] transition-colors hover:bg-white/10"
            aria-label="Abrir enlace"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="sm:hidden">Ver</span>
          </a>
        </div>
      </div>
    </section>
  );
}

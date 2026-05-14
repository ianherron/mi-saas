"use client";
import { toast } from "sonner";

export default function DeleteButton({
  action,
  label = "Eliminar",
  compact = false,
}: {
  action: () => Promise<void>;
  label?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <form action={async () => { await action(); toast.success("Eliminado correctamente"); }}>
        <button
          type="submit"
          aria-label="Eliminar"
          className="flex h-4 w-4 items-center justify-center rounded-full text-[#b89090] transition-colors hover:bg-[#2d2424]/10 hover:text-[#b86060]"
        >
          ×
        </button>
      </form>
    );
  }

  return (
    <form action={async () => {
      await action();
      toast.success("Eliminado correctamente");
    }}>
      <button type="submit"
        className="rounded-md px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-50 hover:text-red-600">
        {label}
      </button>
    </form>
  );
}

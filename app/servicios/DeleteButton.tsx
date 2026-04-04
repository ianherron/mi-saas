"use client";
import { toast } from "sonner";

export default function DeleteButton({ action, label = "Eliminar" }: {
  action: () => Promise<void>;
  label?: string;
}) {
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
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

type RoleOptionCardProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  icon: ReactNode;
};

export default function RoleOptionCard({
  label,
  selected,
  onSelect,
  icon,
}: RoleOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative flex h-36 w-full flex-col items-center justify-center gap-3 rounded-2xl border bg-card p-4 transition-colors",
        "hover:bg-accent/50",
        selected
          ? "border-primary ring-2 ring-primary/30 bg-primary/5"
          : "border-muted"
      )}
      aria-pressed={selected}
    >
      {selected && (
        <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-primary" />
      )}
      <span
        className={cn(
          "grid h-16 w-16 place-items-center rounded-full",
          selected ? "bg-primary/10 text-primary" : "bg-muted text-foreground"
        )}
      >
        {icon}
      </span>
      <span className="text-base font-medium">{label}</span>
    </button>
  );
}

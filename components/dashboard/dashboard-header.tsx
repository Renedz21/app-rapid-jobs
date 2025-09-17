import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type DashboardHeaderProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  Icon: LucideIcon;
};

export default function DashboardHeader({
  title,
  description,
  buttonText,
  buttonLink,
  Icon,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
      <Link href={buttonLink}>
        <Button className="gap-2">
          <Icon className="w-4 h-4" />
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}

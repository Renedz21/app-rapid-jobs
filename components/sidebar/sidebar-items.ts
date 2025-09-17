import { Briefcase, Home, type LucideIcon } from "lucide-react";

export type UserRole = "worker" | "employer";

export type SidebarItem = {
  title: string;
  href: string;
  icon?: LucideIcon;
};

export const workerItems: SidebarItem[] = [
  { title: "Home", href: "/dashboard/worker", icon: Home },
  { title: "My Jobs", href: "/dashboard/worker/jobs", icon: Briefcase },
  {
    title: "Applications",
    href: "/dashboard/worker/applications",
    icon: Briefcase,
  },
];

export const employerItems: SidebarItem[] = [
  { title: "Home", href: "/dashboard/employer", icon: Home },
  {
    title: "My Postings",
    href: "/dashboard/employer/postings",
    icon: Briefcase,
  },
  {
    title: "Candidates",
    href: "/dashboard/employer/postings/candidates",
    icon: Briefcase,
  },
];

export function getSidebarItemsForRole(role: UserRole | undefined) {
  if (role === "employer") {
    return employerItems;
  }

  // default to worker
  return workerItems;
}

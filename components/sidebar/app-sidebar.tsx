"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getSidebarItemsForRole, type UserRole } from "./sidebar-items";
import SidebarNav from "./sidebar-nav";
import { SidebarUser } from "./sidebar-user";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  role: UserRole;
};

export function AppSidebar({ role, ...props }: AppSidebarProps) {
  const items = getSidebarItemsForRole(role);
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://github.com/shadcn.png",
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav items={items} />
        {/*<NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />*/}
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={user || {}} />
      </SidebarFooter>
    </Sidebar>
  );
}

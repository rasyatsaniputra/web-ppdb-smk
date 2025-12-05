import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>{children}</main>;
    </SidebarProvider>
  );
}

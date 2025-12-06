import AppSidebar from "@/components/ui/app-sidebar";
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
      <main className="w-full p-8 bg-gray-200">{children}</main>
    </SidebarProvider>
  );
}

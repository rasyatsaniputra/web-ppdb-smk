import React from "react";
import AuthProvider from "@/components/auth-provider";
import AppSidebar from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <AuthProvider>
        <main className="flex-1 p-8 bg-gray-200">{children}</main>
      </AuthProvider>
      <Toaster />
    </SidebarProvider>
  );
}

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Form, Home } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function AppSidebar() {
  const session = await getServerSession(authOptions);

  const role = session?.user.role;

  const studentMenu = [
    {
      title: "Beranda",
      url: "/dashboard/student",
      icon: Home,
    },
    {
      title: "Formulir",
      url: "/dashboard/student/application",
      icon: Form,
    },
  ];

  const adminMenu = [
    {
      title: "Beranda",
      url: "/dashboard/admin",
      icon: Home,
    },
    {
      title: "Data Pendaftar",
      url: "/dashboard/admin/applications",
      icon: Form,
    },
  ];

  const menus = {
    student: studentMenu,
    admin: adminMenu,
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h1 className="font-bold">PPDB SMK Taruna Bhakti</h1>
        <p className="text-sm">
          {role === "student"
            ? "Dashboard Calon Siswa"
            : role === "admin" && "Dashboard Admin"}
        </p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menus[role as "student" | "admin"].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

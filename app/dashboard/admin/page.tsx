import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  CheckCircle,
  Hourglass,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { getAllApplicationsWithRelations } from "../application-actions";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StatCard from "../components/stat-card";

export default async function AdminDashboardPage() {
  const { applications } = await getAllApplicationsWithRelations();

  const totalApplications = applications?.length ?? 0;
  const passedCount =
    applications?.filter((app) => app.status === "Lulus").length ?? 0;
  const pendingCount =
    applications?.filter((app) => app.status === "Pending").length ?? 0;
  const rejectedCount =
    applications?.filter((app) => app.status === "Ditolak").length ?? 0;

  const recentApplications = applications?.slice(0, 5) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Dasbor Admin</h1>
        <p className="text-muted-foreground">
          Ringkasan pendaftaran siswa baru.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Pendaftar"
          value={totalApplications}
          className="bg-blue-500 text-white"
          description="Jumlah total siswa yang mendaftar."
          icon={<Users className="h-4 w-4 text-white" />}
        />
        <StatCard
          title="Lulus"
          value={passedCount}
          className="bg-green-500 text-white"
          description="Jumlah pendaftar yang lulus seleksi."
          icon={<CheckCircle className="h-4 w-4 text-white" />}
        />
        <StatCard
          title="Pending"
          value={pendingCount}
          className="bg-yellow-500 text-white"
          description="Jumlah pendaftar menunggu verifikasi."
          icon={<Hourglass className="h-4 w-4 text-white" />}
        />
        <StatCard
          title="Ditolak"
          value={rejectedCount}
          className="bg-red-500 text-white"
          description="Jumlah pendaftar yang ditolak."
          icon={<XCircle className="h-4 w-4 text-white" />}
        />
      </div>
    </div>
  );
}

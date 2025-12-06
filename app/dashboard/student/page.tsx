import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getApplicationByUserId } from "../application-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle2, XCircle, Hourglass } from "lucide-react";

const getStatusProps = (
  status: string
): {
  variant: "default" | "secondary" | "destructive";
  icon: React.ReactNode;
  text: string;
} => {
  switch (status) {
    case "Lulus":
      return { variant: "default", icon: <CheckCircle2 />, text: "Lulus" };
    case "Ditolak":
      return { variant: "destructive", icon: <XCircle />, text: "Ditolak" };
    default:
      return { variant: "secondary", icon: <Hourglass />, text: "Pending" };
  }
};

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  const { application } = await getApplicationByUserId(userId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">
          Selamat Datang, {session?.user.username ?? "Siswa"}!
        </h1>
        <p className="text-muted-foreground">
          Kelola dan pantau status pendaftaran Anda di sini.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Status Pendaftaran Anda
          </CardTitle>
          <CardDescription>
            Berikut adalah ringkasan dari status pendaftaran Anda saat ini.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {application ? (
            (() => {
              const statusProps = getStatusProps(application.status);
              return (
                <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    {statusProps.icon}
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge
                        variant={statusProps.variant}
                        className="text-base"
                      >
                        {statusProps.text}
                      </Badge>
                    </div>
                  </div>
                  <Button asChild className="mt-4 sm:mt-0">
                    <Link href="/dashboard/student/application">
                      Lihat Detail Pendaftaran
                    </Link>
                  </Button>
                </div>
              );
            })()
          ) : (
            <div className="flex flex-col items-center justify-center p-10 text-center border-2 border-dashed rounded-lg bg-muted/20">
              <Hourglass className="w-12 h-12 mb-4 text-muted-foreground" />
              <p className="mb-4 text-muted-foreground">
                Anda belum mengirimkan formulir pendaftaran.
              </p>
              <Button asChild>
                <Link href="/dashboard/student/application">
                  Isi Formulir Sekarang
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

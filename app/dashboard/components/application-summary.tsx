"use client";

import { deleteApplication } from "../application-actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PencilLine } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import ApplicationDeleteButton from "./application-delete-button";

interface ApplicationSummaryProps {
  data: {
    applicationId: number;
    fullName: string;
    nisn: string;
    address: string;
    phone: string;
    placeOfBirth: string;
    dateOfBirth: string | Date;
    gender: "M" | "F";
    previousSchoolName: string;
    religion: string;
    major: string;
    track: string;
  };
}

export default function ApplicationSummary({ data }: ApplicationSummaryProps) {
  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const summaryItems = [
    { label: "Nama Lengkap", value: data.fullName },
    { label: "NISN", value: data.nisn },
    { label: "Alamat", value: data.address },
    { label: "No HP", value: data.phone },
    {
      label: "Tempat / Tanggal Lahir",
      value: `${data.placeOfBirth}, ${formatDate(data.dateOfBirth)}`,
    },
    {
      label: "Jenis Kelamin",
      value: data.gender === "M" ? "Laki-Laki" : "Perempuan",
    },
    { label: "Sekolah Asal", value: data.previousSchoolName },
    { label: "Agama", value: data.religion },
    { label: "Jurusan", value: data.major },
    { label: "Jalur Pendaftaran", value: data.track },
  ];

  async function onDelete(userId: number) {
    const res = await deleteApplication(userId);

    if (res.success) {
      toast.success("Berhasil menghapus data formulir.", {
        position: "top-right",
        style: { backgroundColor: "green", color: "white" },
      });
    } else {
      toast.error(res.error, {
        position: "top-right",
        style: { backgroundColor: "red", color: "white" },
      });
    }
  }

  return (
    <div className="p-8 bg-white rounded-md shadow space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Ringkasan Pendaftaran</h1>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/dashboard/student/application/edit">
              <PencilLine /> Edit Data
            </Link>
          </Button>
          <ApplicationDeleteButton
            onDelete={() => onDelete(data.applicationId)}
          />
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        {summaryItems.map((item) => (
          <div key={item.label} className="flex">
            <div className="w-[200px] text-left">{item.label}</div>
            <div className="mx-1">:</div>
            <div className="flex-1">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

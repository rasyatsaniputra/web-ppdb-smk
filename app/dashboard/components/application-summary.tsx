"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PencilLine } from "lucide-react";
import Link from "next/link";
import ApplicationDeleteButton from "./application-delete-button";
import { toast } from "sonner";
import { deleteApplication } from "../application-actions";

interface ApplicationSummaryProps {
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
}

export default function ApplicationSummary(props: ApplicationSummaryProps) {
  const {
    applicationId,
    fullName,
    nisn,
    address,
    phone,
    placeOfBirth,
    dateOfBirth,
    gender,
    previousSchoolName,
    religion,
    major,
    track,
  } = props;

  const formatDate = (date: string | Date) =>
    date instanceof Date ? date.toLocaleDateString() : date;

  const summaryItems = [
    { label: "Nama Lengkap", value: fullName },
    { label: "NISN", value: nisn },
    { label: "Alamat", value: address },
    { label: "No HP", value: phone },
    {
      label: "Tempat / Tanggal Lahir",
      value: `${placeOfBirth}, ${formatDate(dateOfBirth)}`,
    },
    {
      label: "Jenis Kelamin",
      value: gender === "M" ? "Laki-Laki" : "Perempuan",
    },
    { label: "Sekolah Asal", value: previousSchoolName },
    { label: "Agama", value: religion },
    { label: "Jurusan", value: major },
    { label: "Jalur Pendaftaran", value: track },
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
            <Link href="/dashboard">
              <PencilLine /> Edit Data
            </Link>
          </Button>
          <ApplicationDeleteButton onDelete={() => onDelete(applicationId)} />
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

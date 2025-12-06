import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PencilLine } from "lucide-react";
import Link from "next/link";

interface ApplicationSummaryProps {
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

  return (
    <div className="p-8 bg-white rounded-md shadow space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Ringkasan Pendaftaran</h1>
        <Button asChild>
          <Link href="/dashboard">
            <PencilLine /> Edit Data
          </Link>
        </Button>
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

"use client";

import { FormEvent, useRef } from "react";
import { Application } from "@/app/lib/models/application-model";
import { Major } from "@/app/lib/models/major-model";
import { Religion } from "@/app/lib/models/religion-model";
import { Track } from "@/app/lib/models/track-model";
import { UploadDropzone } from "@/app/utils/uploadthing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { updateApplication } from "@/app/dashboard/application-actions";
import Link from "next/link";

interface EditProps {
  religionData: Religion[];
  majorData: Major[];
  trackData: Track[];
  applicationData?: Application;
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  width?: string;
  defaultValue?: any;
}

function TextInputField({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        defaultValue={defaultValue}
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options = [],
  width = "w-full",
  defaultValue,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select name={name} defaultValue={defaultValue}>
        <SelectTrigger className={width}>
          <SelectValue placeholder={`Pilih ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default function ApplicationEditForm({
  religionData,
  majorData,
  trackData,
  applicationData,
}: EditProps) {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);
  const { data: session } = useSession();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userId = session?.user.id;

    if (!userId) {
      toast.error("Sesi pengguna tidak ditemukan. Silakan login kembali.", {
        position: "top-right",
        style: { backgroundColor: "red", color: "white" },
      });
      return;
    }

    const values = {
      full_name: formData.get("full_name") as string,
      nisn: formData.get("nisn") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      place_of_birth: formData.get("place_of_birth") as string,
      date_of_birth: formData.get("date_of_birth") as string,
      gender: formData.get("gender") as "M" | "F",
      previous_school_name: formData.get("previous_school_name") as string,
      religion_id: Number(formData.get("religion")),
      major_id: Number(formData.get("major")),
      track_id: Number(formData.get("track")),
    };

    const result = await updateApplication(Number(userId), values);

    if (result.success) {
      toast.success("Berhasil memperbarui formulir.", {
        position: "top-right",
        style: { backgroundColor: "green", color: "white" },
      });
      router.push("/dashboard/student/application");
    } else {
      toast.error(result?.error, {
        position: "top-right",
        style: { backgroundColor: "red", color: "white" },
      });
    }
  }

  return (
    <div className="p-8 space-y-4 bg-white rounded-md shadow">
      <h1 className="text-xl font-bold">Edit Pendaftaran</h1>
      <Separator />
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {!applicationData && (
            <p className="col-span-2 text-center text-red-500">
              Gagal memuat data pendaftaran.
            </p>
          )}
          <TextInputField
            label="Nama Lengkap"
            name="full_name"
            defaultValue={applicationData?.full_name}
            placeholder="Masukkan Nama Lengkap"
          />
          <TextInputField
            label="NISN"
            name="nisn"
            type="number"
            defaultValue={applicationData?.nisn}
            placeholder="Masukkan NISN"
          />
          <TextInputField
            label="Alamat"
            name="address"
            defaultValue={applicationData?.address}
            placeholder="Masukkan Alamat"
          />
          <TextInputField
            label="No HP"
            name="phone"
            type="tel"
            defaultValue={applicationData?.phone}
            placeholder="Masukkan No HP"
          />
          <TextInputField
            label="Tempat Lahir"
            name="place_of_birth"
            defaultValue={applicationData?.place_of_birth}
            placeholder="Masukkan Tempat Lahir"
          />
          <TextInputField
            label="Sekolah Asal"
            name="previous_school_name"
            defaultValue={applicationData?.previous_school_name}
            placeholder="Masukkan Sekolah Asal"
          />
          <TextInputField
            label="Tanggal Lahir"
            name="date_of_birth"
            defaultValue={applicationData?.date_of_birth}
            type="date"
          />
          <SelectField
            label="Jenis Kelamin"
            name="gender"
            defaultValue={applicationData?.gender}
            options={[
              { value: "M", label: "Laki-Laki" },
              { value: "F", label: "Perempuan" },
            ]}
          />
          <SelectField
            label="Agama"
            name="religion"
            defaultValue={String(applicationData?.religion_id)}
            options={religionData.map((r) => ({
              value: String(r.id),
              label: r.name,
            }))}
          />
          <SelectField
            label="Jurusan"
            name="major"
            defaultValue={String(applicationData?.major_id)}
            options={majorData.map((m) => ({
              value: String(m.id),
              label: m.name,
            }))}
          />
          <SelectField
            label="Jalur Pendaftaran"
            name="track"
            defaultValue={String(applicationData?.track_id)}
            options={trackData.map((t) => ({
              value: String(t.id),
              label: t.name,
            }))}
          />
        </div>
        <div>
          <Label>Akta Kelahiran</Label>
          <UploadDropzone endpoint="birthCertificateUploader" />
        </div>
        <div>
          <Label>Kartu Keluarga</Label>
          <UploadDropzone endpoint="familyCardUploader" />
        </div>
        <div className="space-x-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard/student/application">Batal</Link>
          </Button>
          <Button type="submit">Kirim Pendaftaran</Button>
        </div>
      </form>
    </div>
  );
}

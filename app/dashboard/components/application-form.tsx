"use client";

import { useRef } from "react";
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
import { createApplication } from "../application-actions";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface SelectProps {
  religionData: Religion[];
  majorData: Major[];
  trackData: Track[];
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  width?: string;
}

function TextInputField({
  label,
  name,
  type = "text",
  placeholder,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type={type} name={name} placeholder={placeholder} />
    </div>
  );
}

function SelectField({
  label,
  name,
  options = [],
  width = "w-full",
}: FieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select name={name}>
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

export default function ApplicationForm({
  religionData,
  majorData,
  trackData,
}: SelectProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: session } = useSession();

  async function onSubmit(formData: FormData) {
    const userId = session?.user.id;

    const values = {
      user_id: Number(userId),
      full_name: String(formData.get("full_name")),
      nisn: String(formData.get("nisn")),
      address: String(formData.get("address")),
      phone: String(formData.get("phone")),
      place_of_birth: String(formData.get("place_of_birth")),
      date_of_birth: String(formData.get("date_of_birth")),
      gender: formData.get("gender") as "M" | "F",
      previous_school_name: String(formData.get("previous_school_name")),
      religion_id: Number(formData.get("religion")),
      major_id: Number(formData.get("major")),
      track_id: Number(formData.get("track")),
    };

    const res = await createApplication(values);

    if (res.success) {
      toast.success("Berhasil membuat pendaftaran.", {
        position: "top-right",
        style: { backgroundColor: "green", color: "white" },
      });
    } else {
      toast.error(res?.error, {
        position: "top-right",
        style: { backgroundColor: "red", color: "white" },
      });
    }
  }

  return (
    <div className="bg-white rounded-md shadow">
      <h1 className="px-8 py-6 text-xl font-bold">Formulir Pendaftaran</h1>
      <Separator />
      <form ref={formRef} action={onSubmit} className="p-8 space-y-4">
        <div className="grid grid-cols-2 gap-4 space-y-4">
          <TextInputField
            label="Nama Lengkap"
            name="full_name"
            placeholder="Masukkan Nama Lengkap"
          />
          <TextInputField
            label="NISN"
            name="nisn"
            type="number"
            placeholder="Masukkan NISN"
          />
          <TextInputField
            label="Alamat"
            name="address"
            placeholder="Masukkan Alamat"
          />
          <TextInputField
            label="No HP"
            name="phone"
            type="tel"
            placeholder="Masukkan No HP"
          />
          <TextInputField
            label="Tempat Lahir"
            name="place_of_birth"
            placeholder="Masukkan Tempat Lahir"
          />
          <TextInputField
            label="Sekolah Asal"
            name="previous_school_name"
            placeholder="Masukkan Sekolah Asal"
          />
          <TextInputField
            label="Tanggal Lahir"
            name="date_of_birth"
            type="date"
          />
          <SelectField
            label="Jenis Kelamin"
            name="gender"
            options={[
              { value: "M", label: "Laki-Laki" },
              { value: "F", label: "Perempuan" },
            ]}
          />
          <SelectField
            label="Agama"
            name="religion"
            options={religionData.map((r) => ({
              value: String(r.id),
              label: r.name,
            }))}
          />
          <SelectField
            label="Jurusan"
            name="major"
            options={majorData.map((m) => ({
              value: String(m.id),
              label: m.name,
            }))}
          />
          <SelectField
            label="Jalur Pendaftaran"
            name="track"
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
        <Button type="submit">Kirim Pendaftaran</Button>
      </form>
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ApplicationForm() {
  return (
    <form>
      <div>
        <Label>Nama Lengkap</Label>
        <Input type="text" name="full_name" />
      </div>
      <div>
        <Label>NISN</Label>
        <Input type="number" name="nisn" />
      </div>
      <div>
        <Label>Alamat</Label>
        <Input type="text" name="address" />
      </div>
      <div>
        <Label>No HP</Label>
        <Input type="tel" name="phone" />
      </div>
      <div>
        <Label>Tempat Lahir</Label>
        <Input type="text" name="place_of_birth" />
      </div>
      <div>
        <Label>Tanggal Lahir</Label>
        <Input type="date" name="date_of_birth" />
      </div>
      <div>
        <Label>Jenis Kelamin</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Jenis Kelamin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="M">Laki-Laki</SelectItem>
            <SelectItem value="F">Perempuan</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Sekolah Asal</Label>
        <Input type="text" name="previous_school_name" />
      </div>
    </form>
  );
}

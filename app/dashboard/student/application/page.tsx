import { Separator } from "@/components/ui/separator";
import ApplicationForm from "../../components/application-form";
import { getAllMajors } from "../../major-actions";
import { getAllReligions } from "../../religion-actions";
import { getAllTracks } from "../../track-actions";

export default async function StudentApplicationPage() {
  const resReligions = await getAllReligions();
  const religions = resReligions.religions ?? [];

  const resMajors = await getAllMajors();
  const majors = resMajors.majors ?? [];

  const resTracks = await getAllTracks();
  const tracks = resTracks.tracks ?? [];

  return (
    <div className="bg-white">
      <h1 className="p-8 text-2xl font-bold">Formulir Pendaftaran</h1>
      <Separator />
      <ApplicationForm
        religionData={religions}
        majorData={majors}
        trackData={tracks}
      />
    </div>
  );
}

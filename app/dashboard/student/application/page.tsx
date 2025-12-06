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
    <ApplicationForm
      religionData={religions}
      majorData={majors}
      trackData={tracks}
    />
  );
}

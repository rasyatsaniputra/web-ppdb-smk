import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getApplicationByUserId } from "@/app/dashboard/application-actions";
import ApplicationEditForm from "@/app/dashboard/components/application-edit-form";
import { getAllMajors } from "@/app/dashboard/major-actions";
import { getAllReligions } from "@/app/dashboard/religion-actions";
import { getAllTracks } from "@/app/dashboard/track-actions";
import { getServerSession } from "next-auth";

export default async function ApplicationEditPage() {
  const session = await getServerSession(authOptions);

  const userId = Number(session?.user.id);

  const resReligions = await getAllReligions();
  const religions = resReligions.religions ?? [];

  const resMajors = await getAllMajors();
  const majors = resMajors.majors ?? [];

  const resTracks = await getAllTracks();
  const tracks = resTracks.tracks ?? [];

  const resApplication = await getApplicationByUserId(userId);
  const application = resApplication.application ?? null;

  return (
    <ApplicationEditForm
      religionData={religions}
      majorData={majors}
      trackData={tracks}
      applicationData={application}
    />
  );
}

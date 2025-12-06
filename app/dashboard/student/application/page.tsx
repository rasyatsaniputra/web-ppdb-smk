import { getSession } from "next-auth/react";
import { getApplicationByUserId } from "../../application-actions";
import ApplicationForm from "../../components/application-form";
import { getAllMajors } from "../../major-actions";
import { getAllReligions } from "../../religion-actions";
import { getAllTracks } from "../../track-actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ApplicationSummary from "../../components/application-summary";

export default async function StudentApplicationPage() {
  const session = await getServerSession(authOptions);

  const userId = Number(session?.user.id);

  const resReligions = await getAllReligions();
  const religions = resReligions.religions ?? [];

  const resMajors = await getAllMajors();
  const majors = resMajors.majors ?? [];

  const resTracks = await getAllTracks();
  const tracks = resTracks.tracks ?? [];

  const application = await getApplicationByUserId(userId);
  const applicationData = application.application;

  console.log(applicationData);

  // if (applicationData) {
  //   return (
  //     <div>
  //       <ApplicationSummary
  //         fullName={applicationData.full_name}
  //         nisn={applicationData.nisn}
  //         address={applicationData.address}
  //         phone={applicationData.phone}
  //         placeOfBirth={applicationData.place_of_birth}
  //         dateOfBirth={applicationData.date_of_birth}
  //         gender={applicationData.gender}
  //         previousSchoolName={applicationData.previous_school_name}
  //         religion={applicationData.religion_name}
  //         major={applicationData.major_name}
  //         track={applicationData.track_name}
  //       />
  //     </div>
  //   );
  // }

  return (
    <ApplicationForm
      religionData={religions}
      majorData={majors}
      trackData={tracks}
    />
  );
}

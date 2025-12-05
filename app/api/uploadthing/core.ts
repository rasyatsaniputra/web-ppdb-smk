import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { createDocument } from "@/app/dashboard/document-actions";

const f = createUploadthing();

const auth = async (req: Request) => {
  const session = await getServerSession(authOptions);

  return session?.user;
};

export const ourFileRouter = {
  birthCertificateUploader: f({
    pdf: {
      maxFileSize: "64MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const values = {
        user_id: Number(metadata.userId),
        document_type: "akta_kelahiran",
        path: file.ufsUrl,
      };

      await createDocument(values);

      return { uploadedBy: metadata.userId };
    }),
  familyCardUploader: f({
    pdf: {
      maxFileSize: "64MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const values = {
        user_id: Number(metadata.userId),
        document_type: "kartu_keluarga",
        path: file.ufsUrl,
      };

      await createDocument(values);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

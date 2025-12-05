import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <main className="flex justify-center items-center min-h-screen p-4 bg-gray-200">
      {children}
      <Toaster />
    </main>
  );
}

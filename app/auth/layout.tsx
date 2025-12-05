export default function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <main>{children}</main>;
}

import Navbar from "./navbar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full h-full space-y-4 flex flex-col p-4">
      <Navbar />
      <div className="rounded-2xl flex-1">{children}</div>
    </div>
  );
}

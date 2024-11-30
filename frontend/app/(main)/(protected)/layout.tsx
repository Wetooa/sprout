import Navbar from "./navbar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full h-full">
      <Navbar />
      {children}
    </div>
  );
}

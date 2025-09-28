import Navbar from "../components/layout/navbar.component";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-24"> {/* Ajusta el valor según la altura real de tu navbar */}
          {children}
        </main>
      </body>
    </html>
  );
}
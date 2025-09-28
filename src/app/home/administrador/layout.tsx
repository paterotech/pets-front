
export default function Adminsitrador({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        <main className="pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
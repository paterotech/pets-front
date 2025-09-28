
export default function Adminsitrador({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}
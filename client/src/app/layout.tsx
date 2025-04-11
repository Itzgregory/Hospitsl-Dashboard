import {Providers} from "../redux/providers/providers";
import "./globals.css";

export const metadata = {
  title: "Patient Table",
  description: "A simple patient records table",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
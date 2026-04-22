import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JSS Advocacia",
  description: "JSS Advocacia",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "JSS Advocacia",
    description: "JSS Advocacia",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSS Advocacia",
    description: "JSS Advocacia",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

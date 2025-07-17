import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "../lib/registry";
import FontPreload from "../lib/components/FontPreload";
import { CVProvider } from "../lib/contexts/CVContext";

export const metadata: Metadata = {
  title: "Win95 Portfolio",
  description: "A Windows 95 style portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="https://unpkg.com/@react95/icons/dist/react95-icons.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <FontPreload />
          <CVProvider>
            {children}
          </CVProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

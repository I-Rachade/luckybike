import type { Metadata } from "next";
import {
  Atkinson_Hyperlegible_Next,
  Big_Shoulders,
  Big_Shoulders_Stencil,
} from "next/font/google";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
});

const stencil = Big_Shoulders_Stencil({
  variable: "--font-stencil",
  subsets: ["latin"],
  weight: "800",
});

const body = Atkinson_Hyperlegible_Next({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucky Bike – Werkstatt für E-Motorräder und E-Bikes",
  description:
    "Reparatur und Service für E-Motorräder, E-Bikes und E-Roller: Akku, Motor, Elektronik, Bremsen. Termin online buchen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${display.variable} ${stencil.variable} ${body.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}

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
  title: "Lucky Bike – Atelier de réparation motos et vélos électriques",
  description:
    "Réparation et entretien de motos, vélos et scooters électriques : batterie, moteur, électronique, freins. Prenez rendez-vous en ligne.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${stencil.variable} ${body.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}

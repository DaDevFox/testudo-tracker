import { Inter, Roboto, Roboto_Mono } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const roboto_mono = Roboto_Mono({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

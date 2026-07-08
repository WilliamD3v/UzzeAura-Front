import { Playfair_Display, Montserrat } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
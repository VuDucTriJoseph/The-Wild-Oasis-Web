import Header from "./_components/Header";

import { Josefin_Sans } from "next/font/google";
import "@/app/_style/globals.css";
import { ReservationProvider } from "./_components/ReservationContext";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
// console.log(josefin);

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located i the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 text-gray-50 antialiased min-h-screen ${josefin.className} flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

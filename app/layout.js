import Logo from "./Component/Logo";
import Navigation from "./Component/Navigation";

export const metadata = {
  title: "The Wild Oasis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by Joseph Vu</footer>
      </body>
    </html>
  );
}

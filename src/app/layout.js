import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navi.jsx";
import Home from "./components/Home.jsx";
import Use from "./components/Use.jsx";
import Footer from "./components/Footer.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Home />
        <Use/>
        <Footer/>
      </body>
    </html>
  );
}
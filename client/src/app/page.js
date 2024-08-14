import Image from "next/image";
import Navbar from "./components/landingPage/navbar";
import MainBody from "./components/landingPage/MainBody";
import Footer from "./components/landingPage/footer";




export default function Home() {
  return (
    <>
    <main> 
      <Navbar />
      <MainBody />
      <Footer />
    </main>
    </>
  );
}

import Image from "next/image";
import Navbar from "./components/landingPage/navbar";
import MainBody from "./components/landingPage/MainBody";



export default function Home() {
  return (
    <>
    <main> 
      <Navbar />
      <MainBody />
    </main>
    </>
  );
}

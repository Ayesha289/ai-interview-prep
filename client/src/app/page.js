import Navbar from "./components/landingPage/navbar";
import MainBody from "./components/landingPage/MainBody";
import Footer from "./components/landingPage/footer";
import FeaturesSection from "./components/landingPage/features";
import CoFounders from "./components/landingPage/cofounders";




export default function Home() {
  return (
    <>
    <main> 
      <Navbar />
      <MainBody />
      <FeaturesSection />
      <CoFounders />
      <Footer />
    </main>
    </>
  );
}

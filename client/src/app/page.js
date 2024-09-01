import Navbar from "./components/landingPage/navbar";
import MainBody from "./components/landingPage/MainBody";
import Footer from "./components/landingPage/footer";
import FeaturesSection from "./components/landingPage/features";
import CoFounders from "./components/landingPage/cofounders";




export default function Home() {
  return (
    <>
    <main className="flex flex-col min-h-screen bg-black text-white">
  <Navbar />
  <div className="flex-1">
    <MainBody />
    <FeaturesSection />
    <CoFounders />
  </div>
  <Footer />
</main>

    </>
  );
}

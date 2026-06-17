import Navbar from "./components/layouts/navbar/page";
import BannerWrapper from "./components/subpages/BannerWrapper";
import NewsLetter from "./components/subpages/NewsLetter";
import Section from "./components/subpages/Section";


export default function Home() {
  return (
    <>
      <div>
           <Navbar />
           <BannerWrapper />
           <Section />
           <NewsLetter />
      </div>
    </>
  );
}

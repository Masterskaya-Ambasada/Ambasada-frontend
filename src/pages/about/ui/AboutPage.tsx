import React from "react";
import { AboutUs } from "./about-us-section/AboutUs";
import type { AboutData } from "./about-us-section/type";

const AboutPage = () => {
  const [aboutData, setAboutData] = React.useState<AboutData | null>(null);

  React.useEffect(() => {
    async function getAbout() {
      try {
        const res = await fetch("/api/v1/about");

        if (!res.ok) {
          throw new Error(`error status: ${res.status}`);
        }

        const data = await res.json();
        setAboutData(data.about_section);
      } catch (err) {
        console.log(err);
      }
    }
    getAbout();
  }, []);

  if (!aboutData) {
    return null;
  }

  return <AboutUs data={aboutData} />;
};

export default AboutPage;

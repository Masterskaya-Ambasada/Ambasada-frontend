import React from "react";
import { AboutUs } from "./ui/about-us-section/AboutUs";
import type { AboutData, AboutResponse } from "./ui/about-us-section/type";
import { apiClient } from "../../shared/api/client";

export const About = () => {
  const [aboutData, setAboutData] = React.useState<AboutData | null>(null);

  React.useEffect(() => {
    async function getAbout() {
      try {
        const res = await apiClient.get<AboutResponse>("/api/v1/about");

        setAboutData(res.about_section);
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

export default About;

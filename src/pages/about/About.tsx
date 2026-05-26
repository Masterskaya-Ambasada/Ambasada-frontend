import React from "react";
import { AboutUs, type AboutData } from "./ui/about-us-section";
import { OurValues, type ValuesData } from "./ui/our-values";
import { OurTeam, type TeamData } from "./ui/our-team";
import { apiClient } from "../../shared/api/client";

type PageResponse = {
  about_section: AboutData;
  values: ValuesData;
  team: TeamData;
};

export const About = () => {
  const [pageData, setPageData] = React.useState<PageResponse | null>(null);

  React.useEffect(() => {
    async function getAbout() {
      try {
        const res = await apiClient.get<PageResponse>("/about");

        setPageData(res);
      } catch (err) {
        console.log(err);
      }
    }
    getAbout();
  }, []);

  if (!pageData) {
    return null;
  }

  return (
    <>
      <AboutUs data={pageData.about_section} />
      <OurValues data={pageData.values} />
      <OurTeam data={pageData.team} />
    </>
  );
};

export default About;

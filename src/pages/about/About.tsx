import React from "react";
import { AboutUs } from "./ui/about-us-section/AboutUs";
import { OurValues } from "./ui/our-values/OurValues";
import type { AboutData } from "./ui/about-us-section/type";
import type { ValuesData } from "./ui/our-values/type";
import { apiClient } from "../../shared/api/client";

type PageResponse = {
  about_section: AboutData;
  values: ValuesData;
};

export const About = () => {
  const [pageData, setPageData] = React.useState<PageResponse | null>(null);

  React.useEffect(() => {
    async function getAbout() {
      try {
        const res = await apiClient.get<PageResponse>("/api/v1/about");

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
    </>
  );
};

export default About;

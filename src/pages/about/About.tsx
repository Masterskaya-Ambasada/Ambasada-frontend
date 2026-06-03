import { useAboutQuery } from "@/entities/about/model/useAboutQuery";
import { QueryStateFallback } from "@/shared/ui/QueryStateFallback";
import { AboutUs } from "./ui/about-us-section";
import { OurValues } from "./ui/our-values";
import { OurTeam } from "./ui/our-team";
import { Gallery } from "./ui/our-gallery";

import styles from "./About.module.css";

export const About = () => {
  const { data, isLoading, isError, error } = useAboutQuery();

  if (isLoading || isError) {
    return (
      <QueryStateFallback
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    );
  }

  if (!data) return null;

  return (
    <section className={styles.container}>
      <AboutUs data={data.about_section} />
      <OurValues data={data.values} />
      <OurTeam data={data.team} />
      <Gallery data={data.gallery_carousel} />
    </section>
  );
};

export default About;

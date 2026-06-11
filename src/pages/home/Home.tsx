import React from "react";
import styles from "./Home.module.css";
import { useHomeQuery } from "@/entities/home/model/useHomeQuery";
import { Link } from "react-router-dom";
import { routesPaths } from "@shared/config/routesPaths";
import { SectionHero } from "./ui/section-hero/index";
import { SectionProjects } from "./ui/section-projects";
import { SectionTeam } from "./ui/section-team";
import ContactSection from "@/widgets/contact-section/ContactSection";
import { AboutCommunity } from "./ui/AboutCommunity/AboutCommunity.tsx";

export const Home: React.FC = () => {
  const { data, isLoading, isError, error } = useHomeQuery();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return (
      <div>{error instanceof Error ? error.message : "Ошибка загрузки"}</div>
    );
  }

  if (!data) return null;

  return (
    <>
      <div className={styles.mainContainer}>
        <h1>Главная страница</h1>
        <Link to={routesPaths.projects}>Проекты</Link>
        <SectionHero hero={data.hero} />
        <AboutCommunity aboutPreview={data.about_preview} />
        <SectionTeam teamPreview={data.team_preview} />
        <SectionProjects projects_preview={data.projects_preview} />
      </div>
      <ContactSection />
    </>
  );
};

export default Home;

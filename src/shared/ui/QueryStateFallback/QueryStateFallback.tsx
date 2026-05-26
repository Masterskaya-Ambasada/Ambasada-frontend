import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RoutePath } from "@shared/config/routesPaths";
import styles from "./QueryStateFallback.module.css";

interface QueryStateFallbackProps {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  pathNavigate?: RoutePath;
}

const QueryStateFallback = (props: QueryStateFallbackProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.isError) {
      console.error("ProjectDetails Error:", props.error);
      if (props.pathNavigate) {
        navigate(props.pathNavigate);
      }
    }
  }, [props.isError, props.error, navigate]);

  if (props.isLoading) {
    return (
      <div className={styles.container}>
        <p className={styles.text}>Загрузка</p>
        <div className={styles.loader}></div>
      </div>
    );
  }
};

export default QueryStateFallback;

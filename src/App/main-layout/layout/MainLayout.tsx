import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';

// компонент будет оборачивать все маршруты в роутере
const MainLayout = () => {
  return (
    <div className={styles.layout}>
        {/* <Header /> */}
      <main className={styles.main}>
        <div className={styles.mainInner}>
          <Outlet /> {/* Здесь подставляется содержимое страниц */}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
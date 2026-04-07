import React, { Suspense } from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  useParams } from 'react-router-dom';
import "./App.css";

// LAZY-ИМПОРТЫ страниц (code splitting по роутам)
// const Home = lazy(() => import('./pages/Home/Home'));
// const About = lazy(() => import('./pages/About/About'));
// const Contacts = lazy(() => import('./pages/Contacts/Contacts'));
// const Policy = lazy(() => import('./pages/Policy/Policy'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="loading">Загрузка приложения...</div>}>
       <Routes>
         <Route path="/" element={<div>Главная страница</div>} />
         <Route path="projects" element={<div>Список проектов</div>} />
         <Route path="projects/:slug" element={<ProjectDetails />} />
         <Route path="about" element={<div>О нас</div>} />
         <Route path="contacts" element={<div>Контакты</div>} />
         <Route path="policy" element={<div>Политика конфиденциальности</div>} />
         <Route path="*" element={<NotFound />} />
       </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

// Компонент 404
const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <a href="/" className="home-link">Вернуться на главную</a>
    </div>
  );
};

// Компонент для отображения деталей проекта
const ProjectDetails = () => {
  const { slug } = useParams();
  return (
    <div>
      <h1>Детали проекта {slug}</h1>
    </div>
  );
};

export default App;
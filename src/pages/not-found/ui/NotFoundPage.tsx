import { Link } from "react-router-dom";
import styles from './NotFoundPage.module.css'

const NotFoundPage = () => {
    return (
        <main className={styles.page}>
            <div className={styles.content}>
                <h1 className={styles.code}>404</h1>
                <p className={styles.text}>Кажется, вы свернули не туда</p>

                <Link to='/' className={styles.button}>
                Вернуться на Главную
                </Link>
            </div>
        </main>
    )
}
export default NotFoundPage;
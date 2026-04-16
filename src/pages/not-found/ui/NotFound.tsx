import { Link } from "react-router-dom";
import styles from './NotFound.module.css'

const NotFound = () => {
    return (
        <main className={styles.page}>
            <div className={styles.content}>
                <div className={styles.code}>
                    <span>4</span>
                    <span className={styles.circle} aria-hidden='true' />
                    <span>4</span>
                </div>
                <div className={styles.wrapper}>
                <p className={styles.text}>Кажется, вы свернули не туда</p>

                <Link to='/' className={`btn btn--primary ${styles.button}`}>
                <span className={styles.buttonTextDesktop}>Вернуться на Главную</span>
                <span className={styles.buttonTextMobile}>Перейти на Главную</span>
                </Link>
                </div>
            </div>
        </main>
    )
}
export default NotFound;
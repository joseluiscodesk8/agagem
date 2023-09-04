import Link from "next/link"
import styles from '../../styles/index.module.scss'


const Navbar = () => {
    return (
        <>
            <nav className={styles.nav_agagem}>
                <ul>
                    <li><Link href="/Bisuteria">Bisuteria</Link></li>
                    <li><Link href="/Accesorios">Accesorios</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
import CartWidget from '../CartWidget/CartWidget'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'



const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <Link className={styles.logo} to='/'>JBL LOVERS</Link>
            <section className={styles.sect}>
                <Link className={styles.button} to='/category/auricular'>Auriculares</Link>
                <Link className={styles.button} to='/category/parlante'>Parlantes</Link>
                <Link className={styles.button} to='/category/partybox'>PartyBox</Link>
            </section>
            <CartWidget />
        </nav>
    )
}

export default NavBar
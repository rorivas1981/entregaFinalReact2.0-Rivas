import CartWidget from '../CartWidget/CartWidget'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'



const NavBar = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const categoriesCollection = query(collection(db, 'categories'), orderBy('name', 'asc'))

        getDocs(categoriesCollection)
            .then(querySnapshot => {
                const categoriesAdapted = querySnapshot.docs.map(doc => {
                    const fields = doc.data()
                    return { id: doc.id, ...fields }
                })
                setCategories(categoriesAdapted)
            })
    }, [])


    return (
        <nav className={styles.nav}>
            <Link className={styles.logo} to='/'>JBL LOVERS</Link>
            <section className={styles.sect}>
                {
                    categories.map(cat => (
                        <Link className={styles.button} key={cat.id} to={`/category/${cat.slug}`}>{cat.name}</Link>
                    ))
                }
            </section>
            <CartWidget />
        </nav>
    )
}

export default NavBar
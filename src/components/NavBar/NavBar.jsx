import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';
import './NavBar.module.css';

const NavBar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const categoriesCollection = query(collection(db, 'categories'), orderBy('name', 'asc'));

        getDocs(categoriesCollection)
            .then(querySnapshot => {
                const categoriesAdapted = querySnapshot.docs.map(doc => {
                    const fields = doc.data();
                    return { id: doc.id, ...fields };
                });
                setCategories(categoriesAdapted);
            });
    }, []);

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to='/' style={{ color: 'orangered', fontSize: '30px' }}>JBL LOVERS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <div className="mx-auto"> {}
                    <Nav className="mr-auto">
                        {categories.map((cat, index) => (
                            <Nav.Link
                                key={cat.id}
                                as={Link}
                                to={`/category/${cat.slug}`}
                                className="text-white"
                                style={{ backgroundColor: 'orangered', marginRight: '10px', borderRadius: '8px' }}
                            >
                                {cat.name}
                            </Nav.Link>
                        ))}
                    </Nav>
                </div>
            </Navbar.Collapse>
            <CartWidget />
        </Navbar>
    );
};

export default NavBar;

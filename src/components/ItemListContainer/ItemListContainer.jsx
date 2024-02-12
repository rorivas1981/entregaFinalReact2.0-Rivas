import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { useNotification } from "../../notification/NotificationService";
import { db } from "../../services/firebase/firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import "./ItemListContainer.css"; // Importa los estilos CSS

const ItemListContainer = ({ greeting }) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const { categoryId } = useParams();
    const { showNotification } = useNotification();

    useEffect(() => {
        if (categoryId) document.title = 'JBL LOVERS: ' + categoryId;

        return () => {
            document.title = 'JBL LOVERS';
        };
    });

    useEffect(() => {
        setLoading(true);

        const producsCollection = categoryId
            ? query(collection(db, 'products'), where('category', '==', categoryId))
            : collection(db, 'products');

        getDocs(producsCollection)
            .then(querySnapshot => {
                const productsAdapted = querySnapshot.docs.map(doc => {
                    const fields = doc.data();
                    return { id: doc.id, ...fields };
                });
                setProducts(productsAdapted);
            })
            .catch(error => {
                showNotification('error', 'Existe un error');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryId]);

    if (loading) {
        return <h1>Cargando los productos...</h1>;
    }

    return (
        <div className="item-list-container"> {/* Aplica la clase CSS aquí */}
            <h1>{greeting + (categoryId ?? '')}</h1>
            <ItemList products={products} />
        </div>
    );
};

export default ItemListContainer;

import { useState } from "react";
import OrderForm from '../OrderForm/OrderForm';
import { Button } from 'react-bootstrap';
import { collection, addDoc, writeBatch, query, where, getDocs, documentId } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import { useNotification } from "../../notification/NotificationService";
import { useCart } from "../../context/CartContext"; // Importar useCart para acceder al carrito

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const { cart, total, clearCart } = useCart(); // Obtener la función clearCart del contexto del carrito
    const { showNotification } = useNotification();
    const [orderData, setOrderData] = useState(null);
    const [dataValidated, setDataValidated] = useState(false);

    const createOrder = async (userData) => {
        setLoading(true);
        const order = {
            buyer: userData,
            items: cart,
            total: total
        };

        const batch = writeBatch(db);
        const outOfStock = [];

        try {
            const ids = cart.map(prod => prod.id);
            const productsCollection = query(collection(db, 'products'), where(documentId(), 'in', ids));
            const querySnapshot = await getDocs(productsCollection);
            const { docs } = querySnapshot;

            docs.forEach(doc => {
                const fields = doc.data();
                const stockDb = fields.stock;

                const productInCart = cart.find(prod => prod.id === doc.id);
                const prodQuantity = productInCart.quantity;

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...fields });
                }
            });

            if (outOfStock.length === 0) {
                await batch.commit();
                const orderCollection = collection(db, 'orders');
                const { id } = await addDoc(orderCollection, order);
                setOrderId(id);
                setOrderData(order);
                clearCart(); // Limpiar el carrito después de generar la orden con éxito
            } else {
                showNotification('error', 'Producto seleccionado sin stock');
            }
        } catch (error) {
            console.error('Error al crear la orden:', error);
            showNotification('error', 'Ocurrió un error al procesar la orden');
        } finally {
            setLoading(false);
        }
    };

    if (orderId) {
        return <h1>El ID de su compra es: {orderId}</h1>;
    }

    const handleCreateOrder = () => {
        createOrder({});
    };

    return (
        <div className="container">
            <h1>PAGAR</h1>
            <OrderForm onCreate={() => setDataValidated(true)} />
            {dataValidated && (
                <Button onClick={handleCreateOrder} variant="primary" disabled={loading}>
                    {loading ? 'Procesando...' : 'Generar orden'}
                </Button>
            )}
            {orderData && (
                <div>
                    <h2>Orden generada:</h2>
                    <p>Comprador: {orderData.buyer.name}</p>
                    <p>Total: {orderData.total}</p>
                    {/* Aquí puedes mostrar más detalles de la orden si lo deseas */}
                </div>
            )}
        </div>
    );
};

export default Checkout;

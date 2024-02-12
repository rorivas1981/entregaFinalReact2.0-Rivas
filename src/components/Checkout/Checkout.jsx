import { useState } from "react";
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2'; 
import { collection, addDoc, writeBatch, query, where, getDocs, documentId } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import { useNotification } from "../../notification/NotificationService";
import { useCart } from "../../context/CartContext";
import OrderForm from '../OrderForm/OrderForm';

const Checkout = () => {
    const [processing, setProcessing] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [buyerData, setBuyerData] = useState(null);
    const { cart, total, clearCart } = useCart();
    const { showNotification } = useNotification();
    const [orderData, setOrderData] = useState(null);
    const [orderGenerated, setOrderGenerated] = useState(false);

    const createOrder = async (userData) => {
        const order = {
            buyer: userData,
            items: cart,
            total: total
        };

        const batch = writeBatch(db);
        const outOfStock = [];

        try {
            setProcessing(true);

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
                clearCart();
                setOrderGenerated(true);
            } else {
                showNotification('error', 'Producto seleccionado sin stock');
            }
        } catch (error) {
            console.error('Error al crear la orden:', error);
            showNotification('error', 'Ocurrió un error al procesar la orden');
        } finally {
            setProcessing(false);
        }
    };

    const handleValidationSuccess = () => {
        Swal.fire({
            icon: 'success',
            title: 'Datos validados correctamente',
            text: 'Proceda a generar orden',
        });
    };

    return (
        <div>
            {}
            <nav>
                {}
            </nav>
            {orderGenerated ? (
                <div className="container">
                    <h1>Orden generada:</h1>
                    <p>Comprador: {buyerData.name}</p>
                    <p>Total: USD {orderData.total}</p>
                    <p>Número de orden: {orderId}</p>
                </div>
            ) : ( 
                <div className="container">
                    <h1>PAGAR</h1>
                    <OrderForm onCreate={(userData) => { setBuyerData(userData); handleValidationSuccess(); }} />
                    <Button onClick={() => createOrder(buyerData)} variant="primary" style={{ backgroundColor: 'orangered', borderColor: 'orangered', color: 'white' }} disabled={processing}>
                        {processing ? 'Procesando...' : 'Generar orden'}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Checkout;

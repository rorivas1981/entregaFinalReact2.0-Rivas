// CartList.jsx
import React from "react";
import { useCart } from "../../context/CartContext";
import Table from 'react-bootstrap/Table';
import CartItem from "../CartItem/CartItem";

const CartList = () => {
    const { cart } = useCart();

    return (
        <>
            <h1>Carro de compra</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio unitario</th>
                        <th>Subtotal</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(product => (
                        <CartItem key={product.id} product={product} />
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default CartList;

import React from "react";
import { useCart } from "../../context/CartContext";

const CartItem = ({ product }) => {
    const { removeItem } = useCart();

    const handleRemoveItem = () => {
        removeItem(product.id);
    };

    return (
        <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
            <td>{product.quantity * product.price}</td>
            <td>
                <button onClick={handleRemoveItem}>Eliminar</button>
            </td>
        </tr>
    );
};

export default CartItem;

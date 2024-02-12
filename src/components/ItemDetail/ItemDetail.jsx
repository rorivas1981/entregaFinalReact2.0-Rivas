// ItemDetail.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../notification/NotificationService';

const ItemDetail = ({ id, name, category, img, price, stock, description }) => {
    const { addItem, getProductQuantity } = useCart();
    const { showNotification } = useNotification();

    const handleOnAdd = (quantity) => {
        if (quantity <= stock) {
            const objProductToAdd = {
                id, name, price, quantity
            };
            addItem(objProductToAdd);
            showNotification('success', `Agregado correctamente ${quantity} ${name}`);
        } else {
            showNotification('error', `No hay suficiente stock disponible para ${name}`);
        }
    };

const prodQuantity = getProductQuantity(id)

    return (
        <article>
            <header>
                <h2>{name}</h2>
            </header>
            <picture>
                <img src={img} alt={name} style={{ width: 100 }} />
            </picture>
            <section>
                <p>Categoría: {category}</p>
                <p>Descripción: {description}</p>
                <p>Precio: {price}</p>
            </section>
            <footer>
                <ItemCount onAdd={handleOnAdd} stock={stock} initial={prodQuantity} />
                <Link to='/cart'>Finalizar compra</Link>
            </footer>
        </article>
    );
};

export default ItemDetail;




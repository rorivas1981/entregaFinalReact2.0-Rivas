import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Col } from 'react-bootstrap';
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

    const prodQuantity = getProductQuantity(id);

    return (
        <Col sm={6} md={4} lg={3} className="d-flex justify-content-center mb-4">
            <Card style={{ width: '25rem', height: '38rem', overflow: 'hidden' }} className="text-center">
                <Card.Img variant="top" src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        Categoría: {category}
                        <br />
                        Descripción: {description}
                        <br />
                        Precio: USD {price}
                    </Card.Text>
                    <ItemCount onAdd={handleOnAdd} stock={stock} initial={prodQuantity} />
                    <Button as={Link} to='/cart' className="mt-3" style={{ backgroundColor: 'orangered', borderColor: 'orangered', color: 'white' }}>Finalizar compra</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ItemDetail;

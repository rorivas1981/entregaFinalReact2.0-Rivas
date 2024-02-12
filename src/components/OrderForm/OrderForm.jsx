import { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';

const OrderForm = ({ onCreate }) => {
    const [userData, setUserData] = useState({ name: "", email: "", address: "" });
    const [emailError, setEmailError] = useState("");
    const [formError, setFormError] = useState("");
    const [dataValidated, setDataValidated] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userData.name || !userData.email || !userData.address) {
            setFormError("Por favor complete todos los campos");
            return;
        }

        if (!validateEmail(userData.email)) {
            setEmailError("Ingrese un correo electrónico válido");
            return;
        }

        setDataValidated(true);
        onCreate(userData);
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su nombre" name="name" value={userData.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="Ingrese su correo electrónico" name="email" value={userData.email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formAddress">
                <Form.Label>Dirección</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su dirección" name="address" value={userData.address} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Validar Datos
            </Button>
            {formError && !dataValidated && <Alert variant="danger">{formError}</Alert>}
            {emailError && !dataValidated && <Alert variant="danger">{emailError}</Alert>}
            {!dataValidated && !formError && !emailError && <Alert variant="warning">Antes de comprar ingrese sus datos</Alert>}
        </Form>
    );
};

export default OrderForm;

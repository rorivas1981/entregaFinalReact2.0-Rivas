import React from "react";
import { Link } from "react-router-dom";
import CartList from "../CartList/CartList";

const CartView = () => {
    return (
        <>
            <CartList />
            <section>
                <Link to='/checkout' className="btn btn-danger text-white" style={{ backgroundColor: 'orangered', borderColor: 'red' }}>Checkout</Link>
            </section>
        </>
    );
}

export default CartView;


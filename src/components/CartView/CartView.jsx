import React from "react";
import { Link } from "react-router-dom";
import CartList from "../CartList/CartList";

const CartView = () => {
    return (
        <>
            <CartList />
            <section>
                <Link to='/checkout'>Checkout</Link>
            </section>
        </>
    );
}

export default CartView;

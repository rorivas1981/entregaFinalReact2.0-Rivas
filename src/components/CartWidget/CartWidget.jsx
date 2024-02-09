import imgCart from './assets/imgCart.png'
import './CartWidget.css'
import { useCart } from '../../context/CartContext'


const CartWidget = () => {
    const { totalQuantity } = useCart()

    return (
        <div>
            <img src={imgCart} alt="cart widget" className="cart-widget-image" />
            {totalQuantity}
        </div>
    )
}

export default CartWidget

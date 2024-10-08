import './cart-dropdown.styles.scss';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const handleGoToCheckout = () => {
        navigate('/checkout');
    }

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {
                    cartItems.length ? (
                        cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} />)
                    ) : (
                        <span className="empty-message">Your cart is empty</span>
                    )
                }
            </div>
            <Button onClick={handleGoToCheckout}>GO TO CHECKOUT</Button>
        </div>
    )
};

export default CartDropdown;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/cart/get-items');
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/api/cart/remove-items/${productId}`);
            fetchCartItems();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <div>
            <h2>Shopping Bag</h2>
            {cartItems.map((item) => (
                <CartItem
                    key={item.productId}
                    item={item}
                    onRemove={handleRemoveFromCart}
                />
            ))}
            <div>
                <p>Subtotal</p>
                <p>
                    IDR{' '}
                    {cartItems.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                    ).toLocaleString()}
                </p>
                <button>Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
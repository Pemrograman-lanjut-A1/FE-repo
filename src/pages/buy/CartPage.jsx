import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartList = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = '';
                const response = await axios.get('/cart/get-items', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <div>
            <h2>Cart Items</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.productId}>
                        {item.productName} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CartList;
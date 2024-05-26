import React from 'react';

const CartItem = ({ item, onRemove }) => {
    return (
        <div>
            <img src={item.imageUrl} alt={item.name} />
            <div>
                <h3>{item.name}</h3>
                <p>IDR {item.price.toLocaleString()}</p>
                <p>Size: {item.size}</p>
                <p>Color: {item.color}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => onRemove(item.id)}>Remove</button>
            </div>
        </div>
    );
};

export default CartItem;
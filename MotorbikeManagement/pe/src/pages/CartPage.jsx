import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";

const CartPage = () => {
  const { state, removeFromCart, updateQuantity } = useCart();
  const items = state.items;

  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <Form.Control
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={e => updateQuantity(item, parseInt(e.target.value))}
                  />
                </td>
                <td>${item.price * item.quantity}</td>
                <td>
                  <Button variant="danger" onClick={() => removeFromCart(item)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <h4>Total: ${total}</h4>
    </div>
  );
};

export default CartPage;

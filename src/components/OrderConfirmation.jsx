import React from "react";
import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation({ order }) {
  const { name, address, items, id } = order;

  return (
    <div className={styles["order-confirmation"]}>
      <h2>Thank you for your order, {name}</h2>
      <div className={styles["consumer-details"]}>
        <span>
          <strong>Name:</strong> {name}
        </span>
        <span>
          <strong>Address:</strong> {address}
        </span>
      </div>
      <div>
        <strong>Items Ordered:</strong>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>Name:</strong> {item.item.name}
              <br />
              <strong>Quantity:</strong> {item.quantity}
              <br />
              <strong>Price:</strong> ${item.item.price}
              <br />
              <hr />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles["order-id-container"]}>
        <strong>Order ID:</strong> {id}
      </div>
    </div>
  );
}

export default OrderConfirmation;

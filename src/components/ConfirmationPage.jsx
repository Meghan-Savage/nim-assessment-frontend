import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/ConfirmationPage.module.css";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const fetchOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/orders/${orderId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  return (
    <div className={styles["confirmation-page"]}>
      {order ? <OrderConfirmation order={order} /> : <p>Loading...</p>}
    </div>
  );
}

export default ConfirmationPage;

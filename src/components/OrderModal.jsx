import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");

  const isValidPhoneNumber = (number) => {
    const phoneRegex = /^[\d-()]+$/;
    return phoneRegex.test(number);
  };

  const formatPhoneNumber = (number) => {
    const digitsOnly = number.replace(/\D/g, "");
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(
      3,
      6
    )}-${digitsOnly.slice(6, 10)}`;
  };

  const isFormValid = () => {
    let valid = true;

    if (name.trim() === "") {
      setNameError("Please enter your name.");
      valid = false;
    } else {
      setNameError("");
    }

    if (phone.trim() === "") {
      setPhoneError("Please enter your phone number.");
      valid = false;
    } else if (!isValidPhoneNumber(phone)) {
      setPhoneError("Please enter a valid phone number.");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (address.trim() === "") {
      setAddressError("Please enter your address.");
      valid = false;
    } else {
      setAddressError("");
    }

    return valid;
  };

  const placeOrder = async () => {
    if (!isFormValid()) {
      return;
    }

    const formattedPhone = formatPhoneNumber(phone);

    const response = await fetch("http://localhost:3001/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone: formattedPhone,
        address,
        items: order
      })
    });

    if (response.ok) {
      const data = await response.json();
      navigate(`/order-confirmation/${data.id}`);
    } else {
      throw new Error("500 - Internal Server Error");
    }
  };

  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
              />
              <span className={styles.error}>{nameError}</span>
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                id="phone"
              />
              <span className={styles.error}>{phoneError}</span>
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                id="address"
              />
              <span className={styles.error}>{addressError}</span>
            </label>
          </div>
        </form>

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => placeOrder()}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;

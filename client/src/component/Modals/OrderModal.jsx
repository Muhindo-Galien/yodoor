import React from "react";
import { Modal } from "antd";

const OrderModal = ({ session, orderedBy, showModal, setShowModal }) => {
  return (
    <Modal
      visible={showModal}
      title="Order Payment Info"
      onCancel={() => setShowModal(!showModal)}
    >
      <p>
        Payment Intent: <span>{session.payment_intent}</span>
      </p>
      <p>
        Payment Status: <span>{session.payment_status} </span>
      </p>
      <p>
        amount total:{" "}
        <span>
          {session.currency.toUpperCase()} {session.amount_total / 100}
        </span>
      </p>
      <p>
        Payment Intent: <span>{session.payment_intent}</span>
      </p>
      <p>
        Stripe customer Id: <span>{session.customer}</span>
      </p>
      <p>
        customer Name: <span>{orderedBy.name}</span>
      </p>
    </Modal>
  );
};

export default OrderModal;

/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import style from "./CheckoutPopup.module.css";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import { useSelector } from "react-redux";

export default function SimpleDialog(props) {
  const { onClose, totalPrice, selectedValue, open } = props;
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [total, setTotal] = useState(0);
  const { update } = useUpdateDoc("users", currentUser?._id || "dummm");

  const orderItems = currentUser?.cart?.map((product) => {
    return (
      <tr key={product.id}>
        <td>{product.title?.slice(0, 20)} </td>
        <td>${product.price?.toFixed(2)}</td>
      </tr>
    );
  });

  const handleClose = () => {
    onClose(selectedValue);
  };

  const initialOptions = {
    clientId:
      "AVimr_VGtegk0WuXLEYBYtHQkgd9SIq8r_06zhTPfo-kXmRe1W9FATTUyj8VWsl9qL-r_k3AU7ePRjtD",
    currency: "USD",
    intent: "capture",
  };
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total,
          },
        },
      ],
    });
  };
  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    update({ cart: [] });
    console.log(order);
  };

  const onError = (err) => {
    console.log(err);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <div className={`${style.list_container} container`}>
        <div className={`col-span-12 md:col-span-6 ${style.our_order}`}>
          <h4>OUR ORDER</h4>
          <table className="flex flex-col">
            <thead>
              <tr className="text-left w-full">
                <th className="w-full">PRODUCT</th>
                <th className="w-full">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {orderItems}
              <tr>
                <td>Cart Subtotal</td>
                <td>${totalPrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Shipping and Handing </td>
                <td>$15.00</td>
              </tr>
              <tr>
                <td>Vat</td>
                <td>$00.00</td>
              </tr>
              <tr className={style.total}>
                <td>Order Total</td>
                <td>
                  ${totalPrice > 0 ? (totalPrice + 15).toFixed(2) : totalPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`col-span-12 md:col-span-6 ${style.billing_method}`}>
          <h4>BILLING METHOD</h4>
          <div className="form flex flex-col gap-5">
            <input type="text" id="text" placeholder="Your Name here..." />
            <input
              type="email"
              id="email"
              placeholder="Email address here..."
            />
            <input
              type="number"
              id="phone"
              placeholder="Phone number here..."
            />
            <textarea
              id="address"
              placeholder="Your address here..."
            ></textarea>
          </div>
          <h4>PAYMENT METHOD</h4>
          <button className="btn">
            {/* <div id="paypal-button-container"></div> */}
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              />
            </PayPalScriptProvider>
          </button>
        </div>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

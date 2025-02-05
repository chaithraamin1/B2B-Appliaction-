import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    product_list,
    removeFromCart,
    getTotalCartAmount,
    cartdata,
    cartItemTotalAmount,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const cartList = cartdata;
  var totalAmount = 0;
  if (cartList) {
    for (var i = 0; i < cartList.length; i++) {
      totalAmount += cartList[i].total_price * cartList[i].quantity ;
    }
  }
  console.log("totalAmount", totalAmount);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p>{" "}
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cartList?.map((item, index) => {
          // const quantityInCart = cartItems[item.productID];
          const quantityInCart = 1;
          if (quantityInCart > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img
                    src={item.product_image}
                    alt={item.product_description}
                  />
                  <p>{item.product_description}</p>
                  <p>{item.price}</p>
                  <div>{quantityInCart}</div>
                  <p>{(item.price * quantityInCart).toFixed(2)}</p>
                  <p
                    className="cart-items-remove-icon"
                    onClick={() => removeFromCart(item.productID)}
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null; // Return null if the item should not be rendered
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{totalAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{totalAmount === 0 ? 0 : totalAmount}</b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

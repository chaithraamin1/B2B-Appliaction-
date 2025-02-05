import React, { useContext, useState } from "react";
import "./ProductItem.css";
import { assets,url,currency } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const ProductItem = ({ image, name, price, desc, id }) => {
  const [itemCount, setItemCount] = useState(0);
  const { cartItems, addToCart, removeFromCart,storeIds } = useContext(StoreContext);

  return (
    <div className="product-item">
      <div className="product-item-img-container">
        <img className="product-item-image" src={`${url}/images/`+image} alt="" />
       
        
      </div>
      <div className="product-item-info">
        <div className="product-item-name-rating">
          <p>{name}</p> <img src={assets.rating_starts} alt="" />
        </div>
        <p className="product-item-desc">{desc}</p>
        <div className="product-item-price-cart">
          <p className="product-item-price">{currency}{price}</p>
      

          {!cartItems[id] ? (
              <button type="button" className="btn btn-add-to-cart" onClick={()=>storeIds(id)}>
              Add to cart
            </button>
        ) : (
          <div className="product-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={() => removeFromCart(id)}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              onClick={() => storeIds(id)}
              alt=""
            />
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = (e) => {
    // Don't open details if clicking on cart buttons
    if (e.target.closest('.food-item-counter') || e.target.closest('.add')) {
      return;
    }
    setShowDetails(true);
  };

  return (
    <>
      <div className="food-item" onClick={handleCardClick}>
        <div className="food-item-img-container">
          <img className="food-item-image" src={url+'/image/'+image} alt="" />
          {!cartItems[id] ? (
            <img
              className="add"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(id);
              }}
              src={assets.add_icon_white}
              alt=""
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(id);
                }}
                src={assets.remove_icon_red}
                alt=""
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(id);
                }}
                src={assets.add_icon_green}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">₹ {price}</p>
        </div>
      </div>

      {showDetails && (
        <div className="food-details-modal" onClick={() => setShowDetails(false)}>
          <div className="food-details-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowDetails(false)}>×</button>
            <div className="food-details-image">
              <img src={url+'/image/'+image} alt={name} />
            </div>
            <div className="food-details-info">
              <h2>{name}</h2>
              <div className="food-details-rating">
                <img src={assets.rating_starts} alt="" />
                <span>4.5</span>
              </div>
              <p className="food-details-description">{description}</p>
              <div className="food-details-price">
                <span className="price">₹ {price}</span>
              </div>
              <div className="food-details-actions">
                {!cartItems[id] ? (
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(id)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => removeFromCart(id)}
                    >
                      -
                    </button>
                    <span className="quantity">{cartItems[id]}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => addToCart(id)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodItem;

import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
const FoodDisplay = ({ category, searchQuery, limit }) => {
  const { food_list } = useContext(StoreContext);

  // Filter foods based on category and search
  const filteredFoods = food_list.filter((item) => {
    const matchesCategory = category === 'All' || category === item.category;
    const matchesSearch = !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Apply limit if specified
  const displayFoods = limit ? filteredFoods.slice(0, limit) : filteredFoods;

  return (
    <div className="food-display" id="food-display">
      <h2>{limit ? 'Top dishes near you' : 'Top dishes near you'}</h2>
      <div className="food-display-list">
        {displayFoods.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
      {limit && filteredFoods.length > limit && (
        <div className="view-more">
          <a href="/dishes" className="view-more-btn">View All Dishes</a>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;

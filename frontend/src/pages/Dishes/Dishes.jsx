import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Dishes.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../Component/FoodItem/FoodItem';

const Dishes = () => {
  const { food_list } = useContext(StoreContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredFoods, setFilteredFoods] = useState([]);

  // Get unique categories
  const categories = ['All', ...new Set(food_list.map(item => item.category))];

  useEffect(() => {
    let filtered = food_list;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredFoods(filtered);
  }, [food_list, selectedCategory, searchQuery]);

  return (
    <div className='dishes'>
      <div className="dishes-header">
        <h1>Our Menu</h1>
        <p>Discover delicious dishes from our collection</p>
      </div>

      <div className="dishes-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for dishes, ingredients, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>

        <div className="category-filter">
          <label>Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="dishes-results">
        <div className="results-header">
          <h2>
            {selectedCategory === 'All' ? 'All Dishes' : `${selectedCategory} Dishes`}
            {searchQuery && ` - "${searchQuery}"`}
          </h2>
          <p>{filteredFoods.length} dish{filteredFoods.length !== 1 ? 'es' : ''} found</p>
        </div>

        {filteredFoods.length > 0 ? (
          <div className="dishes-grid">
            {filteredFoods.map((item, index) => (
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
        ) : (
          <div className="no-results">
            <h3>No dishes found</h3>
            <p>Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dishes;
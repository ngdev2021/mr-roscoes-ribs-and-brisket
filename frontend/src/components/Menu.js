import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';

const Menu = ({ cart, setCart, addToCart }) => {
    const [menuItems, setMenuItems] = useState({ Meats: [], Sides: [], Desserts: [], Beverages: [] });
    const [quantities, setQuantities] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [collapsed, setCollapsed] = useState({});
    const [sortOption, setSortOption] = useState('name');
    const [categoryFilter, setCategoryFilter] = useState('All');

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('/api/menu');
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const handleQuantityChange = (id, amount) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: (prevQuantities[id] || 0) + amount >= 0 ? (prevQuantities[id] || 0) + amount : 0
        }));
    };

    const toggleCollapse = (category) => {
        setCollapsed(prevCollapsed => ({
            ...prevCollapsed,
            [category]: !prevCollapsed[category]
        }));
    };

    const filteredItems = (category) => {
        return menuItems[category]
            .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                if (sortOption === 'name') return a.name.localeCompare(b.name);
                if (sortOption === 'price') return a.price - b.price;
                return 0;
            });
    };

    const handleCategoryFilterChange = (e) => {
        setCategoryFilter(e.target.value);
    };

    const categories = Object.keys(menuItems);

    return (
        <div className="menu-container">
            <h1>Menu</h1>
            <div className="menu-controls">
                <input
                    type="text"
                    placeholder="Search for an item..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                <label className="sort-label">
                    Sort by:
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="sort-dropdown">
                        <option value="name">Alphabetical</option>
                        <option value="price">Price</option>
                    </select>
                </label>
                <label className="filter-label">
                    Filter by category:
                    <select value={categoryFilter} onChange={handleCategoryFilterChange} className="filter-dropdown">
                        <option value="All">All</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </label>
            </div>
            {categories.map(category => (
                (categoryFilter === 'All' || categoryFilter === category) && (
                    <div key={category}>
                        <h2 onClick={() => toggleCollapse(category)} className="category-header">
                            {category}
                        </h2>
                        {!collapsed[category] && (
                            <ul className="menu-items">
                                {filteredItems(category).map(item => (
                                    <li key={item._id} className="menu-item">
                                        <img src={item.image} alt={item.name} className="menu-item-image" />
                                        <div className="menu-item-content">
                                            <h3>{item.name}</h3>
                                            <p>{item.description}</p>
                                            <p>${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="menu-item-controls">
                                            <div className="quantity-controls">
                                                <button onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                                                <span>{quantities[item._id] || 1}</span>
                                                <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                                            </div>
                                            <button onClick={() => addToCart(item, quantities[item._id] || 1)} className="add-to-cart-btn">Add to Cart</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )
            ))}
        </div>
    );
};

export default Menu;

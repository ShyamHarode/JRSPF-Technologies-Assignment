import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const getProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    setProducts(data.products);
  };
  const handleSearch = async (value) => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${value}`
    );
    const data = await response.json();
    setProducts(data.products);
  };
  const handleCart = (item) => {
    let itemList = [...cart];
    if (itemList.some((product) => product.id === item.id)) {
      itemList = cart.filter((i) => i.id !== item.id);
      setCart(itemList);
    } else {
      itemList.push(item);
      setCart(itemList);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <div className="navbar">
        <h2>Shopping App</h2>
        <div className="SearchBar">
          <input
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="cart">
            Cart <strong>{cart.length}</strong>
          </div>
        </div>
      </div>
      <div className="productContainer">
        {products.map((product, idx) => {
          return (
            <div className="card" key={product.id}>
              <img className="img" src={product.images[0]} alt="img" />
              <h3>{product.title}</h3>
              <h5>Rs. {product.price}</h5>
              <div className="button">
                <button className="btn" onClick={() => handleCart(product)}>
                  Add
                </button>
                <button className="btn" onClick={() => handleCart(product)}>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

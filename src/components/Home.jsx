// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Handle logout logic
//     navigate("/signup"); // Navigate to /signup after logout
//   };

//   return (
//     <>
//       <h1>Welcome to the Home Page</h1>
//       <button onClick={handleLogout}>Logout</button>
//     </>
//   );
// }

// export default Home;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ShoppingPage.css';

function ShoppingPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  const handleLogout = () => {
    // Handle logout logic
    navigate("/signup"); // Navigate to /signup after logout
  };

  const products = [
    {
      id: 1,
      name: "Bluetooth Earphones",
      price: 9.99,
      image: "https://i.imgur.com/EX1gv9g.jpeg/400",
    },
    {
      id: 2,
      name: "iphone",
      price: 19.99,
      image: "https://i.imgur.com/Tzr2xoFb.jpg",
    },
    {
      id: 3,
      name: "Macbook🍎",
      price: 29.99,
      image: "https://i.imgur.com/mkVRn3Db.jpg",
    },
  ];
  

  

  return (
    <>
      <h1>Welcome to the Shopping Page</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Products:</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} />
            <p>{product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <h2>Cart:</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} />
                <p>{product.price}</p>
                <button onClick={() => handleRemoveFromCart(product)}>Remove from Cart</button>
              </li>
            ))}
          </ul>
          <p>Total: {cart.reduce((total, item) => total + item.price, 0)}</p>
        </>
      )}
    </>
  );
}

export default ShoppingPage;

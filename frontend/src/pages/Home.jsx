import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // useEffect(() => {
  //   console.log("Mounted");

  //   return () => {
  //     console.log("Component Unmounted");
  //   };
  // }, []);

  return (
    <div className="home-container">
      <div className="hero-banner">
        <h1>Welcome to Shop NEst</h1>
        <p>Shop NEst is an Ecommerce website</p>
      </div>
      {/* <Link to={"/shop"}>Start Shopping</Link> */}
      <h1>Feauterd PRodcurs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

import React from "react";
import Hero from "../components/Layout/Hero";
import ProductCollectionSection from "../components/Products/ProductCollectionSection";
import FeaturedProducts from "../components/Products/FeaturedProducts";
import ProductDetails from "../components/Products/ProductDetails";

const Home = () => {
  return (
    <div>
      <Hero />
      <ProductCollectionSection />
      <FeaturedProducts />
      {/* Best Sellers */}
      <ProductDetails />
    </div>
  );
};

export default Home;

import React from "react";
import Hero from "../components/Layout/Hero";
import ProductCollectionSection from "../components/Products/ProductCollectionSection";
import FeaturedProducts from "../components/Products/FeaturedProducts";

const Home = () => {
  return (
    <div>
      <Hero />
      <ProductCollectionSection />
      <FeaturedProducts />
    </div>
  );
};

export default Home;

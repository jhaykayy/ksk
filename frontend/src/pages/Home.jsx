import React from "react";
import Hero from "../components/Layout/Hero";
import ProductCollectionSection from "../components/Products/ProductCollectionSection";
import FeaturedProducts from "../components/Products/FeaturedProducts";
import ProductDetails from "../components/Products/ProductDetails";
import FeaturesSection from "../components/Products/FeaturesSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <ProductCollectionSection />
      <FeaturedProducts />
      {/* Best Sellers */}
      <ProductDetails />
      <FeaturesSection />
    </div>
  );
};

export default Home;

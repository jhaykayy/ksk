import React from "react";
import beef from "../../assets/beef.jpeg";
import chicken from "../../assets/chicken.jpeg";
import { Link } from "react-router-dom";

const ProductCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Chicken Collection */}
        <div className="relative flex-1">
          <img
            src={beef}
            alt="beef image"
            className="w-full h-105 object-cover"
          ></img>
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Beef Category
            </h2>
            <Link
              to="/collections/all?category=Beef"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Chicken Collection */}

        <div className="relative flex-1">
          <img
            src={chicken}
            alt="beef image"
            className="w-full h-105 object-cover"
          ></img>
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Chicken Category
            </h2>
            <Link
              to="/collections/all?category=Chicken"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCollectionSection;

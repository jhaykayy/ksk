import React, { useState } from "react";
import { Link } from "react-router-dom";
import beef from "../../assets/beef.jpeg";
import chicken from "../../assets/chicken.jpeg";

const ProductDetails = () => {
  const [cartMessage, setCartMessage] = useState("");

  const bestSellingProducts = [
    {
      _id: "1",
      name: "Premium Beef Chuck",
      price: 1200,
      images: [
        {
          url: beef,
          altText: "Premium Beef Chuck",
        },
      ],
      badge: "Best Seller",
    },
  ];

  const handleAddToCart = (productName) => {
    setCartMessage(`${productName} added to cart!`);
    setTimeout(() => setCartMessage(""), 3000);
  };

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Best Selling Products</h2>
          <p className="text-lg text-gray-600">
            Our most popular and highly-rated products loved by customers
          </p>
        </div>

        {/* Notification */}
        {cartMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            {cartMessage}
          </div>
        )}

        {/* Best Selling Product Card - Centered */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            {bestSellingProducts.map((product) => (
              <div
                key={product._id}
                className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image Container with Badge */}
                <div className="relative">
                  <img
                    src={product.images[0]?.url}
                    alt={product.images[0]?.altText || product.name}
                    className="w-full h-80 object-cover"
                    draggable="false"
                  />
                  {/* Best Seller Badge */}
                  <div className="absolute top-4 right-4 bg-orange-700 text-white px-4 py-2 rounded-full font-semibold text-sm">
                    {product.badge}
                  </div>
                </div>

                {/* Info Container */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="text-xl font-bold mb-2 hover:text-orange-700 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-2xl font-bold text-gray-800">
                      ₦{product.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product.name)}
                      className="bg-orange-700 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition-colors duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

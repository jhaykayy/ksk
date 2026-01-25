import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import fullCow from "../../assets/full-cow.jpg";
import ProductsGrid from "./ProductGrid";
import ProductGrid from "./ProductGrid";

const similarProducts = [
  {
    _id: 1,
    name: "abodi",
    price: 100,
    images: [{ url: "https://dummyimage.com/600x400/000/fff" }],
  },
  {
    _id: 2,
    name: "Product 2",
    price: 100,
    images: [{ url: "https://dummyimage.com/600x400/000/fff" }],
  },
  {
    _id: 3,
    name: "Product 3",
    price: 100,
    images: [{ url: "https://dummyimage.com/600x400/000/fff" }],
  },
];

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(0);

  const bestSellingProducts = [
    {
      _id: "1",
      name: "Full Cow",
      price: 1200000,
      images: [
        {
          url: fullCow,
          altText: "Full Cow",
        },
      ],
      badge: "Best Seller",
    },
  ];

  const handleAddToCart = (productName) => {
    if (quantity > 0) {
      toast.success(`${quantity} x ${productName} added to cart!`);
      setQuantity(0);
    } else {
      toast.error("Please add a quantity");
    }
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 0) setQuantity(quantity - 1);
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

        {/* Best Selling Product Card - Centered */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            {bestSellingProducts.map((product) => (
              <div
                key={product._id}
                className="flex flex-col rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <Link to={`/product/${product._id}`} className="flex-1">
                      <h3 className="text-xl font-bold hover:text-orange-700 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Quantity Selector - Responsive */}
                    <div className="flex items-center border border-orange-700 rounded-lg overflow-hidden shrink-0">
                      <button
                        onClick={decreaseQuantity}
                        className="bg-gray-100 hover:bg-gray-200 text-orange-700 font-bold px-2 py-1 transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 font-semibold text-gray-800 min-w-10 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={increaseQuantity}
                        className="bg-gray-100 hover:bg-gray-200 text-orange-700 font-bold px-2 py-1 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <p className="text-2xl font-bold text-gray-800 mt-3">
                    ₦{product.price.toLocaleString()}
                  </p>

                  {/* Add to Cart Button - Full Width */}
                  <button
                    onClick={() => handleAddToCart(product.name)}
                    className="mt-4 w-full bg-orange-700 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You may also like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

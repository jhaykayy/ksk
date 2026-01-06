import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import beef from "../../assets/beef.jpeg";
import chicken from "../../assets/chicken.jpeg";

const FeaturedProducts = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const featuredProducts = [
    {
      _id: "1",
      name: "Chuck (shoulder)",
      price: 120009000,
      images: [
        {
          url: beef,
          altText: "Chuck",
        },
      ],
    },
    {
      _id: "2",
      name: "Rib",
      price: 1200,
      images: [
        {
          url: chicken,
          altText: "Rib",
        },
      ],
    },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = (e) => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
  };

  //update scroll buttons
  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollLeft + container.clientWidth < container.scrollWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, []);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-16 sm:mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore Featured Products</h2>
        <p className="text-lg text-gray-600 mb-8">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          nobis id pariatur, animi consectetur assumenda!
        </p>

        {/* Scroll Buttons*/}
        <div className="absolute right-0 -bottom-12 sm:-bottom-7.5 flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}

      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {featuredProducts.map((product) => (
          <div
            key={product._id}
            className="min-w-full sm:min-w-[50%] lg:min-w-[30%] flex flex-col bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Image Container */}
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.allText || product.name}
              className="w-full h-75 object-cover"
              draggable="false"
            />

            {/* Info Container */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <Link to={`/product/${product._id}`}>
                <h4 className="font-medium text-sm sm:text-base hover:text-orange-700 transition-colors">
                  {product.name}
                </h4>
                <p className="mt-2 text-sm sm:text-base font-semibold text-gray-700">
                  ₦{product.price.toLocaleString()}
                </p>
              </Link>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  // Add to cart logic here
                  console.log(`Added ${product.name} to cart`);
                }}
                className="mt-4 w-full bg-orange-700 hover:bg-orange-600 text-white font-semibold py-2 px-3 rounded transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;

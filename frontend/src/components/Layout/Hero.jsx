import { useEffect, useState } from "react";
import slide1 from "../../assets/logo.png";

const slides = [
  {
    id: 1,
    image: slide1,
    title: "Welcome to KSK Foods",
    description: "Discover amazing products and great deals",
    bgColor: "bg-blue-600",
  },
  {
    id: 2,
    image: slide1,
    title: "Quality Products",
    description: "Premium selection for your lifestyle",
    bgColor: "bg-purple-600",
  },
  {
    id: 3,
    image: slide1,
    title: "Best Prices",
    description: "Unbeatable deals on all items",
    bgColor: "bg-pink-600",
  },
];

export default function Carousel({ autoPlay = true, interval = 5000 }) {
  const [current, setCurrent] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval]);

  const goToSlide = (index) => setCurrent(index);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full overflow-hidden bg-gray-900">
      {/* Carousel Container */}
      <div className="relative h-96 md:h-125 w-full">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background */}
            <div className={`absolute inset-0 ${slide.bgColor}`} />

            {/* Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="max-w-2xl px-4 sm:px-6">
                <h2 className="mb-3 text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl text-gray-100 drop-shadow-md">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-3 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-3 transition-all duration-300"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 py-6 bg-gray-900">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-white w-8"
                : "bg-gray-500 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

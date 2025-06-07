import { useEffect, useState } from "react";

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [autoplay, slides.length]);

  return (
    <div
      className="relative w-full max-w-4xl mt-24 mx-auto overflow-hidden rounded-lg shadow-lg"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
           className="min-w-full flex-shrink-0 flex flex-col items-center bg-white h-[400px]"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-contain"
            />
            <p className="caption mt-3 text-sm text-gray-600 text-center px-2">
              {slide.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
        }
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white text-black px-2 py-1 rounded-full shadow-md"
      >
        &lt;
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white text-black px-2 py-1 rounded-full shadow-md"
      >
        &gt;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

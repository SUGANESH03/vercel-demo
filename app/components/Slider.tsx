"use client";

import { useEffect, useState } from "react";
import './main.css';

const slides = [
  { id: 1, image: "/Slider/s1.jpg", para: "Discover the perfect blend of style and comfort.", title: "Welcome To My Store" },
  { id: 2, image: "/Slider/s2.jpg", para: "Experience the pinnacle of luxury and design.", title: "Feel The Luxury" },
  { id: 3, image: "/Slider/s3.jpg", para: "Explore our curated collection of premium pieces.", title: "Discover Our Collection" },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <img
        src={slides[current].image}
        alt={slides[current].title}
        className="slide-image"
      />

      <h2 className="slide-title">
        {slides[current].title}
      </h2>
      <p className="slide-paragraph">
        {slides[current].para}
      </p>
      <button className="shop-now">
        Shop Now
      </button>
    </div>
  );
}
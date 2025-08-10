//for banner
import React, { useState, useEffect } from "react";
import Banner1 from "../assets/Images/Banner1.webp";
import Banner2 from "../assets/Images/Banner3.jpg";
import Banner3 from "../assets/Images/Banner4.png";

function BannerProduct() {
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(1);
  const images = [Banner1, Banner2, Banner3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        const newIndex = (prev + 1) % images.length;
        setNextImage((newIndex + 1) % images.length);
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="container mx-auto mt-6 px-6 rounded overflow-hidden">
      <div className="relative h-52 md:h-64 w-full bg-slate-100 overflow-hidden rounded-lg">
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: 1 }}
        >
          <img
            src={images[currentImage]}
            alt={`Banner ${currentImage + 1}`}
            className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          />
        </div>
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: 0 }}
        >
          <img
            src={images[nextImage]}
            alt={`Banner ${nextImage + 1}`}
            className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
}

export default BannerProduct;

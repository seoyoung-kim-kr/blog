"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3000, min: 1600 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1600, min: 1200 },
    items: 3,
  },
  smallDesktop: {
    breakpoint: { max: 1200, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

type Props = {
  children: React.ReactNode;
  className: string;
};

export default function MultiCarousel({ children, className }: Props) {
  return (
    <Carousel
      responsive={responsive}
      infinite
      arrows
      showDots
      containerClass="w-full pb-2"
      itemClass="h-full flex justify-center !w-auto"
      autoPlay
      autoPlaySpeed={3000}
      className={className}
      sliderClass="gap-x-4"
    >
      {children}
    </Carousel>
  );
}

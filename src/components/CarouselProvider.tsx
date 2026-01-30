"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

type Props = {
  children: React.ReactNode;
  className: string;
};

export default function CarouselProvider({ children, className }: Props) {
  return (
    <Carousel
      responsive={responsive}
      infinite
      arrows
      showDots
      containerClass="w-full pb-2"
      itemClass="h-full flex justify-center px-2"
      sliderClass="flex gap-4"
      className={className}
    >
      {children}
    </Carousel>
  );
}

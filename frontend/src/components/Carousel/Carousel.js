import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardContent, Typography } from '@mui/material';

const Carousel = ({ cards }) => {
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    variableWidth: true
    };
  

  return (
    <Slider {...settings}>
      {cards.map((card, index) => (
        <div key={index}>
          {card}
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;

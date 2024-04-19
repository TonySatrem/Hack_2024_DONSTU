import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardContent, Typography } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';    
import Button from '@mui/material/Button';

const Carousel = ({ cards }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      };
    
      const sliderRef = React.useRef();
    
      const goToPrev = () => {
        sliderRef.current.slickPrev();
      };
    
      const goToNext = () => {
        sliderRef.current.slickNext();
      };
    
      return (
        <div>
          <Slider ref={sliderRef} {...settings}>
            {cards.map((card, index) => (
              <div key={index}>
              {card}
              </div>
            ))}
          </Slider>
          <Button onClick={goToPrev}><NavigateBeforeIcon /></Button>
          <Button onClick={goToNext}><NavigateNextIcon /></Button>
        </div>
  );
};

export default Carousel;

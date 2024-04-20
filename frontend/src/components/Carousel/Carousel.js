import React from "react";
import Slider from "react-slick";
import styles from "./Carousel.module.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import "./Carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ cards }) => {
  const settings = {
    lazyLoad: true,
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    centerPadding: "0",
    draggable: false,
  };

  const sliderRef = React.useRef();

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
      }}
    >
      <Button onClick={goToPrev}>
        <NavigateBeforeIcon />
      </Button>
      <Slider ref={sliderRef} {...settings} style={{ overflow: 'hidden' }}>
        {cards.map((card, index) => (
          <div key={index} className="slide">
            {card}
          </div>
        ))}
      </Slider>
      <Button onClick={goToNext}>
        <NavigateNextIcon />
      </Button>
    </Box>
  );
};

export default Carousel;

import React, { useState } from "react";
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
  const [lastClickTime, setLastClickTime] = useState(0);
  const [lastAnimationSpeed, setLastAnimationSpeed] = useState(400); // Начальная скорость анимации

    const settings = {
        lazyLoad: true,
        className: "center",
        centerMode: true, 
        infinite: true,
        slidesToShow: 3,
        waitForAnimation: false,
        speed: lastAnimationSpeed,

        autoplay: false, //
        autoplaySpeed: 3000,
        pauseOnHover: true,
        centerPadding: "0",
        draggable: false,
        responsive: [
          // Меняем количество слайдов при различных ширинах экрана
          {
            breakpoint: 600, // при ширине экрана менее 600px
            settings: {
              slidesToShow: 1, // показываем только один слайд
              centerPadding: "5vw", // отступ от краев
              draggable: false,

            },
          },
        ],
      };

  const sliderRef = React.useRef();

  const goToPrev = () => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;
    const newSpeed = timeDiff < 500 ? Math.max(100, lastAnimationSpeed / 2) : 800;
    console.log(timeDiff, lastAnimationSpeed, newSpeed);
    if ((timeDiff < 350) && (lastAnimationSpeed > 400) || newSpeed < 100) {
      return; // Игнорируем этот клик
    }
    setLastClickTime(currentTime);
    setLastAnimationSpeed(newSpeed);
  
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;
    const newSpeed = timeDiff < 500 ? Math.max(100, lastAnimationSpeed / 2) : 800;
    console.log(timeDiff, lastAnimationSpeed, newSpeed);
    if ((timeDiff < 350) && (lastAnimationSpeed > 400) || newSpeed < 100) {
      return; // Игнорируем этот клик
    }
    setLastClickTime(currentTime);
    setLastAnimationSpeed(newSpeed);
  
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
      <Button className={styles.btn} onClick={goToPrev} sx={{p:0, ml:0}} >
        <NavigateBeforeIcon />
      </Button>
      <Slider ref={sliderRef} {...settings} style={{ overflow: 'hidden' }}>
        {cards.map((card, index) => (
          <div key={index} className="slide">
            {card}
          </div>
        ))}
      </Slider>
      <Button  className={styles.btn} onClick={goToNext} sx={{p:0, mr:0}} >
        <NavigateNextIcon />
      </Button>
    </Box>
  );
};

export default Carousel;

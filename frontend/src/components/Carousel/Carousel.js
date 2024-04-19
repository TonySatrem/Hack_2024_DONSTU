import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent, Typography, Container } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from "@mui/material/Button";
import "./Carousel.module.css";

const Carousel = ({ cards }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
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
        <Container maxWidth="md" sx={{ mx: "auto", width: "80%" }}>
            <Slider ref={sliderRef} {...settings}>
                {cards.map((card, index) => (
                    <div  key={index}>{card}</div>
                ))}
            </Slider>
            <Button onClick={goToPrev}>
                <NavigateBeforeIcon />
            </Button>
            <Button onClick={goToNext}>
                <NavigateNextIcon />
            </Button>
        </Container>
    );
};

export default Carousel;
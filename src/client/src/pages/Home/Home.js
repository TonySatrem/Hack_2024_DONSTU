import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "../../components/Carousel/Carousel";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import {Container, Rating} from "@mui/material";
import { Popup } from "../../components/Popup/Popup";
import RatingPopup from "../../components/RatingPopup/RatingPopup";
import CssBaseline from "@mui/material/CssBaseline";



const Home = () => {
    const [isOpen, setIsOpen] = useState(false); // Состояние для открытия и закрытия попапа

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const cards = Array.from({ length: 5 }, (_, index) => (
        <Card key={index} togglePopup={togglePopup} />
    ));

    return (
            <Container maxWidth="xl"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minHeight: "90vh",
                    p:0,
                }}
                       component="main"
            >
                <CssBaseline />
                <Carousel cards={cards} />

            {/* Передаем состояние и функцию для изменения состояния в компонент Card */}
            {isOpen && <RatingPopup onClose={togglePopup} />}
            </Container>

    );
};

export default Home;

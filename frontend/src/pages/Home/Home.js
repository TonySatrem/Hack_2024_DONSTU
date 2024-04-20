import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "../../components/Carousel/Carousel";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import {Container, Rating} from "@mui/material";
import { Popup } from "../../components/Popup/Popup";
import RatingPopup from "../../components/RatingPopup/RatingPopup";
import styles from "./Home.module.css";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false); // Состояние для открытия и закрытия попапа

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const cards = Array.from({ length: 5 }, (_, index) => (
        <Card key={index} togglePopup={togglePopup} />
    ));

    return (
        <div className={styles.home}>
            <Container
                maxWidth="xl"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minHeight: "90vh",
                }}
            >
                <Carousel cards={cards} />
            </Container>
            {/* Передаем состояние и функцию для изменения состояния в компонент Card */}
            {isOpen && <RatingPopup onClose={togglePopup} />}
        </div>
    );
};

export default Home;

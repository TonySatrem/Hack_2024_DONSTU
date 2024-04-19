import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "../../components/Carousel/Carousel";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import { Container } from "@mui/material";

const Home = () => {
  const cards = [<Card />, <Card />, <Card />, <Card />, <Card />];

  return (
    <div className="home">
      <Header />
      <Container maxWidth="l">
        <Carousel cards={cards} />

      </Container>
    </div>
  );
};

export default Home;

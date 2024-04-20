import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Button from "@mui/material/Button";
import { Popup } from "../Popup/Popup";

export default function RecipeReviewCard({ isOpen, togglePopup }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5">Team Name</Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    height="194"
                    image="https://i.pravatar.cc/300?img=1"
                    alt="Paella dish"
                    style={{ minWidth: 0 }}
                />

                <CardActions disableSpacing>
                    {/* Используем функцию togglePopup, чтобы открыть или закрыть попап */}
                    <Button
                        onClick={() => {
                            togglePopup();
                            handleExpandClick(); // Можете убрать эту строку, если не нужно автоматическое открытие попапа
                        }}
                        style={{ backgroundColor: "#9747FF" }}
                        variant="contained"
                    >
                        Оценить команду
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}

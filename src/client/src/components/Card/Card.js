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
import {Modal, Rating, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {useState} from "react";
const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:200,
    bgcolor: 'background.paper',
    border: '1px solid white',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};


export default function RecipeReviewCard({ isOpen, togglePopup }) {
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [values, setValues] = useState([0, 0, 0, 0]);

    const handleRatingChange = (index, newValue) => {
        if (newValue !== null) {
            const newValues = [...values];
            newValues[index] = newValue;
            setValues(newValues);
        }
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Typography sx={{ textAlign: 'center' }} variant="h5">Team Name</Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    height="194"
                    image="https://preview.redd.it/5gqcxtsn1mi11.jpg?width=640&crop=smart&auto=webp&s=b776bc0031874f6643d20f9f1965865b95adb174"
                    alt="Paella dish"
                    style={{ minWidth: 0 }}
                />

                <CardActions disableSpacing>
                    {/* Используем функцию togglePopup, чтобы открыть или закрыть попап */}
                    <Button  style={{backgroundColor:"#9747FF",width: '100%',color:"white"}} onClick={handleOpen}>Оценить команду</Button>

                    {/*<Button*/}
                    {/*    onClick={() => {*/}
                    {/*        togglePopup();*/}
                    {/*        handleExpandClick(); // Можете убрать эту строку, если не нужно автоматическое открытие попапа*/}
                    {/*    }}*/}
                    {/*    style={{ backgroundColor: "#9747FF" }}*/}
                    {/*    variant="contained"*/}
                    {/*>*/}
                    {/*    Оценить команду*/}
                    {/*</Button>*/}
                </CardActions>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <Typography component="legend">Дизайн</Typography>
                    <Rating
                        name="design-rating"
                        value={values[0]}
                        onChange={(event, newValue) => handleRatingChange(0, newValue)}
                    />
                    <Typography component="legend">Юзабилити</Typography>
                    <Rating
                        name="usability-rating"
                        value={values[1]}
                        onChange={(event, newValue) => handleRatingChange(1, newValue)}
                    />
                    <Typography component="legend">Верстка</Typography>
                    <Rating
                        name="layout-rating"
                        value={values[2]}
                        onChange={(event, newValue) => handleRatingChange(2, newValue)}
                    />
                    <Typography component="legend">Реализация</Typography>
                    <Rating
                        name="implementation-rating"
                        value={values[3]}
                        onChange={(event, newValue) => handleRatingChange(3, newValue)}
                    />
                    <Button
                        style={{ backgroundColor: "#9747FF" }}

                        variant="contained"
                    >
                        Отправить
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

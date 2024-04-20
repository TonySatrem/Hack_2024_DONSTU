import { Rating, Typography } from "@mui/material";
import React, { useState } from "react";
import classes from "../Popup/Popup.module.css";
import Button from "@mui/material/Button";

export default function RatingPopup({ onClose }: { onClose: () => void }) {
    const [values, setValues] = useState<number[]>([0, 0, 0, 0]);

    const handleRatingChange = (index: number, newValue: number | null) => {
        if (newValue !== null) {
            const newValues = [...values];
            newValues[index] = newValue;
            setValues(newValues);
        }
    };

    const handleSubmit = () => {
        // Дополнительная логика для отправки данных, если нужно
        // После отправки закрыть попап
        onClose();
    };

    return (
        <>
            <div className={classes.overlay}></div>
            <div className={classes["popup-container"]}>
                <div className={classes.marketplaces}>
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
                        onClick={handleSubmit} // Вызываем функцию handleSubmit при клике на кнопку
                        variant="contained"
                    >
                        Отправить
                    </Button>
                </div>
            </div>
        </>
    );
}

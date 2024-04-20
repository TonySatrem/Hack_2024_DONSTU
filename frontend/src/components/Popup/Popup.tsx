import React, { useState, useEffect } from 'react';
import classes from "./Popup.module.css";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
export default function Popup ({ onClose }: { onClose: () => void }){

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

                    <TextField id="filled-basic" label="Ваше ФИО" variant="filled" margin="normal" />
                    <TextField id="filled-basic" label="Email" variant="filled" margin="normal" />
                    <TextField
                        placeholder="Ваш вопрос"
                        multiline
                        rows={2}
                        margin='normal'
                    />
                    <Button style={{ backgroundColor: "#9747FF" }} onClick={(handleSubmit)} variant="contained">Отправить</Button>
                </div>
            </div>
        </>
    );
};
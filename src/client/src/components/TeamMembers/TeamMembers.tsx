import * as React from 'react';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Popup from "../Popup/Popup";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Modal, TextField} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid white',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};


export default function TeamMembers() {
    const [value, setValue] = React.useState('one');
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = useState([
        {
            id: 1,
            fullName: 'Дарья',
            info: '1c специалист',
            email: 'qPp2A@example.com',
            teamId: 1,
            photo: 'https://sun9-79.userapi.com/impg/zSczkVtGYoJFLJgRJ6YUYkRDWGDeuU5B_xrAPQ/F4j9Bhy0_xg.jpg?size=640x640&quality=96&sign=69ed89f22492facac0347824f89b48b8&type=album',
            isEditing: false,
        },
        {
            id: 2,
            fullName: 'Дарья',
            info: '1c специалист',
            email: 'qPp2A@example.com',
            teamId: 1,
            photo: 'https://sun9-79.userapi.com/impg/zSczkVtGYoJFLJgRJ6YUYkRDWGDeuU5B_xrAPQ/F4j9Bhy0_xg.jpg?size=640x640&quality=96&sign=69ed89f22492facac0347824f89b48b8&type=album',
            isEditing: false,
        },
        {
            id: 3,
            fullName: 'Дарья',
            info: '1c специалист',
            email: 'qPp2A@example.com',
            teamId: 1,
            photo: 'https://sun9-79.userapi.com/impg/zSczkVtGYoJFLJgRJ6YUYkRDWGDeuU5B_xrAPQ/F4j9Bhy0_xg.jpg?size=640x640&quality=96&sign=69ed89f22492facac0347824f89b48b8&type=album',
            isEditing: false,
        },
    ]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const selectedUser = users.find((user) => user.id === Number(value));

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addUser = () => {
        if (users.length < 6) { // Проверяем, что количество пользователей меньше 6
            // Добавляем нового пользователя в массив пользователей
            const newUser = {
                id: users.length + 1, // Генерируем id для нового пользователя
                fullName: 'Новый пользователь',
                info: '',
                email: '',
                teamId: 1,
                photo: 'https://www.example.com/default-photo.jpg', // Можно установить фото по умолчанию
                isEditing: false,
            };
            setUsers([...users, newUser]);
            setValue(String(newUser.id)); // Переключаемся на только что добавленного пользователя
        }
    };

    const editUser = () => {
        // Toggle edit mode for the selected user
        setUsers(users.map(user => {
            if (user.id === Number(value)) {
                return {
                    ...user,
                    isEditing: true // Set isEditing flag to true for the selected user
                };
            }
            return user;
        }));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        const newValue = event.target.value;
        setUsers(users.map(user => {
            if (user.id === Number(value)) {
                return {
                    ...user,
                    [field]: newValue // Update the field value for the selected user
                };
            }
            return user;
        }));
    };

    return (
        <Container maxWidth="lg" sx={{
            bgcolor: 'background.paper',
            boxShadow: 10,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
            '@media (max-width:600px)': {
                // Adjust styles for screens smaller than 600px
                minWidth: '100%',
                p: 1,
            },
            '@media (min-width:601px) and (max-width:960px)': {
                // Adjust styles for screens between 601px and 960px
                minWidth: 500,
                p: 2,
            },
        }}>

        <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    {users.map((user) => (
                        <Tab key={user.id} value={String(user.id)} label={'Участник №' + user.id} />
                    ))}
                </Tabs>
            </Box>
            {selectedUser && (
                <Box sx={{ p: 2 }}>
                    {selectedUser.isEditing ? (
                        <>
                            <TextField
                                label="Имя"
                                value={selectedUser.fullName}
                                onChange={(e) => handleInputChange(e, 'fullName')}
                                margin="normal"
                            />
                            <TextField
                                label="Информация"
                                value={selectedUser.info}
                                onChange={(e) => handleInputChange(e, 'info')}
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                value={selectedUser.email}
                                onChange={(e) => handleInputChange(e, 'email')}
                                margin="normal"
                            />
                            <TextField
                                label="Фото URL"
                                value={selectedUser.photo}
                                onChange={(e) => handleInputChange(e, 'photo')}
                                margin="normal"
                            />
                        </>
                    ) : (
                        <Card style={{ maxWidth: 500, margin: 'auto', marginTop: 16 }}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt={selectedUser.fullName}
                                        src={selectedUser.photo}
                                        style={{ width: 70, height: 70 }}
                                    />
                                }
                                title={<Typography variant="h5">{selectedUser.fullName}</Typography>}
                                subheader={<Typography variant="subtitle1">{selectedUser.info}</Typography>}
                            />
                            <CardContent>
                                <Typography variant="body1">{selectedUser.email}</Typography>
                            </CardContent>
                        </Card>
                    )}
                    <br/>
                    {selectedUser.isEditing ? (
                        <Button variant="contained" color="primary" onClick={() => setUsers(users.map(user => {
                            if (user.id === Number(value)) {
                                return {
                                    ...user,
                                    isEditing: false // Toggle edit mode off
                                };
                            }
                            return user;
                        }))}>
                            Сохранить изменения
                        </Button>
                    ) : (
                        <Button variant="contained" color="secondary" onClick={editUser}>
                            Редактировать пользователя
                        </Button>
                    )}
                    <Button variant="contained" style={{ backgroundColor: "#9747FF", marginLeft: '10px' }} onClick={handleOpen}>Задать вопрос</Button>
                    <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} onClick={addUser}>Добавить пользователя</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <TextField style={{ width: '100%' }} id="filled-basic" label="Ваше ФИО" variant="filled" margin="normal" />
                            <TextField style={{ width: '100%' }} id="filled-basic" label="Email" variant="filled" margin="normal" />
                            <TextField
                                placeholder="Ваш вопрос"
                                multiline
                                rows={2}
                                margin='normal'
                                style={{ width: '100%' }}
                            />
                            <Button  style={{ backgroundColor: "#9747FF",width: '100%' }} variant="contained">Отправить</Button>
                        </Box>
                    </Modal>
                </Box>
            )}
            {isOpen && <Popup onClose={togglePopup} />}
        </Container>
    );
}

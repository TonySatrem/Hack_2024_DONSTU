import * as React from 'react';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Popup from "../Popup/Popup";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Modal, TextField } from "@mui/material";

import { API_URL } from '../../api/apiConfig';
import axios from 'axios';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";

const PART_ADD = '/participants/add';
const PART = '/participants/;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
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
            info: '1с разработчик',
            email: 'qPp2A@example.com',
            teamId: 1,
            photo: 'https://sun9-79.userapi.com/impg/zSczkVtGYoJFLJgRJ6YUYkRDWGDeuU5B_xrAPQ/F4j9Bhy0_xg.jpg?size=640x640&quality=96&sign=69ed89f22492facac0347824f89b48b8&type=album',
            isEditing: false,
        },
        {
            id: 2,
            fullName: 'Дарья',
            info: '1с разработчик',
            email: 'qPp2A@example.com',
            teamId: 1,
            photo: 'https://sun9-79.userapi.com/impg/zSczkVtGYoJFLJgRJ6YUYkRDWGDeuU5B_xrAPQ/F4j9Bhy0_xg.jpg?size=640x640&quality=96&sign=69ed89f22492facac0347824f89b48b8&type=album',
            isEditing: false,
        },
        {
            id: 3,
            fullName: 'Дарья',
            info: '1с разработчик',
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

        // Add a new user to the users array
        const newUser = {
            id: users.length + 1, // Generate id for new user
            fullName: 'Новый пользователь',
            info: '',
            email: '',
            teamId: 1,
            photo: 'https://www.example.com/default-photo.jpg', // You can set a default photo
            isEditing: false,
        };
        setUsers([...users, newUser]);
        setValue(String(newUser.id)); // Switch to the newly added user

        const response = axios.post(API_URL + PART_ADD, {
            fullName: newUser.fullName,
            email: newUser.email,
            teamId: 1, // TODO: Получить из localStorage после регистрации команды
            info: newUser.info,
            photo: newUser.photo, // TODO: Перенести в base64
        });
        console.log('Ответ от сервера:', response);
        // Здесь можно добавить в локалсторидж айди команды
    };
    const editUser = () => {
        // Find the user to edit and set isEditing flag to true
        setUsers(users.map(user => {
            if (user.id === Number(value)) {
                return {
                    ...user,
                    isEditing: true // Set isEditing flag to true for the selected user
                };
            }
            return user;
        }));
    
        // Find the edited user
        const editedUser = users.find(user => user.id === Number(value));
    
        // // Send PUT request to update user data
        // const response = axios.put(API_URL + PART_EDIT, {
        //     id: editedUser.id,
        //     photo: editedUser.photo, // Assuming photo is already in base64 format
        //     info: editedUser.info,
        // });
        // console.log('Ответ от сервера:', response);
    };
    

    const deleteUser = () => {
        const response = axios.delete(API_URL + PART_DELETE, {
            data: {
                id: Number(value)
            }
        });
        console.log('Ответ от сервера:', response);
        setUsers(users.filter(user => user.id !== Number(value)));
};

    const saveUser = () => {
        // Find the user to edit and set isEditing flag to false
        setUsers(users.map(user => {
            if (user.id === Number(value)) {
                return {
                    ...user,
                    isEditing: false // Set isEditing flag to false for the selected user
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
                    <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} onClick={addUser}>Добавить пользователя</Button>

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
                                label="Информация"
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
                            <Button variant="contained" color="primary" onClick={saveUser}>
                                Сохранить изменения
                            </Button>
                        </>
                    ) : (
                        <Card style={{ width: "100%", margin: 'auto', marginTop: 16 }}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt={selectedUser.fullName}
                                        src={selectedUser.photo}
                                        style={{ width: 70, height: 70 }}
                                    />
                                }
                                title={<Typography variant="h5">{selectedUser.fullName}</Typography>}
                                subheader={<Typography variant="subtitle1">{selectedUser.email}</Typography>}
                            />
                            <CardContent>
                                <Typography variant="body1">{selectedUser.info}</Typography>
                            </CardContent>
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
                                    <EditIcon sx={{ cursor: 'pointer' }} />
                                </Button>
                            )}
                        </Card>
                    )}
                    <br/>

                    <Button variant="contained" style={{ backgroundColor: "#9747FF", marginLeft: '10px' ,width: '100%' }} onClick={handleOpen}>Задать вопрос</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <TextField style={{width: '100%'}} id="filled-basic" label="Ваше ФИО" variant="filled" margin="normal" />
                            <TextField style={{width: '100%'}} id="filled-basic" label="Email" variant="filled" margin="normal" />
                            <TextField
                                style={{width: '100%'}}
                                placeholder="Ваш вопрос"
                                multiline
                                rows={2}
                                margin='normal'
                            />
                            <Button style={{ backgroundColor: "#9747FF",width: '100%' }} variant="contained">Отправить</Button>
                        </Box>
                    </Modal>
                </Box>
            )}
            {isOpen && <Popup onClose={togglePopup} />}
        </Container>
    );
}

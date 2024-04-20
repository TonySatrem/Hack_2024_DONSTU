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

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
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
            name: 'Дарья',
            photo: 'https://sun9-79.userapi.com/impg/zSczkVtGYoJFLJgRJ6YUYkRDWGDeuU5B_xrAPQ/F4j9Bhy0_xg.jpg?size=640x640&quality=96&sign=69ed89f22492facac0347824f89b48b8&type=album',
            isEditing: false,
        },
        {
            id: 2,
            name: "Полина",
            photo: 'https://i.pravatar.cc/300?img=1',
            isEditing: false,
        },
        {
            id: 3,
            name: 'Владлена',
            photo: 'https://sun9-14.userapi.com/impg/PjvxhrE-VivbuRJqCJUxe2z8pvTg2009JwngxA/qyKabFkU6TE.jpg?size=1620x2160&quality=95&sign=bd6c5239cd8df7d87121a7535fe6a284&type=album',
            isEditing: false,
        }
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
            name: 'Новый пользователь',
            photo: 'https://www.example.com/default-photo.jpg', // You can set a default photo
            isEditing: false,
        };
        setUsers([...users, newUser]);
        setValue(String(newUser.id)); // Switch to the newly added user
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
                                value={selectedUser.name}
                                onChange={(e) => handleInputChange(e, 'name')}
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
                        <>
                            <h3>{selectedUser.name}</h3>
                            <img style={{ maxWidth: '500px', maxHeight: '500px' }} src={selectedUser.photo} alt={selectedUser.name} />
                        </>
                    )}
                    <br />
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
                            <TextField id="filled-basic" label="Ваше ФИО" variant="filled" margin="normal" />
                            <TextField id="filled-basic" label="Email" variant="filled" margin="normal" />
                            <TextField
                                placeholder="Ваш вопрос"
                                multiline
                                rows={2}
                                margin='normal'
                            />
                            <Button style={{ backgroundColor: "#9747FF" }} variant="contained">Отправить</Button>
                        </Box>
                    </Modal>
                </Box>
            )}
            {isOpen && <Popup onClose={togglePopup} />}
        </Container>
    );
}

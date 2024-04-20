import * as React from 'react';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {Popup} from "../Popup/Popup";
import {useState} from "react";

export default function TeamMembers() {
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const users = [
        {
            id: 1,
            name: 'Александр',
            photo: 'https://i.pravatar.cc/300?img=1',
        },
        {
            id: 2,
            name: "Полина",
            photo: 'https://i.pravatar.cc/300?img=1',
        },
        {
            id: 3,
            name: 'Владлена',
            photo: 'https://sun9-14.userapi.com/impg/PjvxhrE-VivbuRJqCJUxe2z8pvTg2009JwngxA/qyKabFkU6TE.jpg?size=1620x2160&quality=95&sign=bd6c5239cd8df7d87121a7535fe6a284&type=album',
        }
    ]
    const [isOpen, setIsOpen] = useState(false)
  const selectedUser = users.find((user) => user.id === Number(value));

    return (
        <Container maxWidth="lg"    sx={{
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
                        <Tab key={user.id} value={user.id} label={'Участник №'+user.id} />
                    ))}

                </Tabs>
            </Box>
            {selectedUser && (
                <Box sx={{ p: 2 }}>
                    <h3>{selectedUser.name}</h3>
                    <img style={{maxWidth: ':500px',maxHeight: '500px'}} src={selectedUser.photo} alt={selectedUser.name} />
                    <br/>
                    <Button onClick={() => setIsOpen(true)} style={{ backgroundColor: "#9747FF" }} variant="contained">Задать вопрос</Button>
                </Box>
            )}
            {isOpen && <Popup />}

        </Container>
    );
}
import * as React from 'react';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
            name: 'Александр',
            photo: 'https://i.pravatar.cc/300?img=1',
        },
        {
            id: 3,
            name: 'Александр',
            photo: 'https://i.pravatar.cc/300?img=1',
        }
    ]

  const selectedUser = users.find((user) => user.id === Number(value));

    return (
        <Container maxWidth="lg"    sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
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
                    <img src={selectedUser.photo} alt={selectedUser.name} />
                </Box>
            )}
        </Container>
    );
}
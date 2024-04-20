import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    overflowY: 'auto', // добавленный стиль для скролла
};

interface Member {
    fio: string;
    email: string;
    info: string;
    avatar: string;
    [key: string]: any;
}

const MiniMemberCard = ({ member }: { member: Member }) => (
    <div style={{ marginBottom: '20px' }}>
        <Typography variant="body1" gutterBottom>
            ФИО: {member.fio}
        </Typography>
        <Typography variant="body1" gutterBottom>
            Email: {member.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
            Информация: {member.info}
        </Typography>
    </div>
);

export default function AddMembers() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [members, setMembers] = React.useState<Member[]>([]);
    const [formSubmitted, setFormSubmitted] = React.useState(false);

    const addMember = () => {
        const newMember: Member = {
            fio: '',
            email: '',
            info: '',
            avatar: '',
        };
        setMembers([...members, newMember]);
    };

    const handleChange = (index: number, field: string, value: string) => {
        const newMembers = [...members];
        newMembers[index][field] = value;
        setMembers(newMembers);
    };

    const handleAvatarChange = (index: number, file: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const newMembers = [...members];
            newMembers[index].avatar = reader.result as string;
            setMembers(newMembers);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = () => {
        setFormSubmitted(true);
    };

    return (
        <div>
            <Button variant="contained" style={{ backgroundColor: '#9747FF', color: 'white', marginBottom: '20px' }} onClick={handleOpen}>
                Добавить участников
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, maxHeight: '80vh' }}> {/* добавляем стиль overflow и максимальную высоту */}
                    <DialogContent dividers>
                        <Typography id="modal-modal-title" variant="h5" component="h2" align="center" gutterBottom>
                            Добавить участников
                        </Typography>
                        {formSubmitted && members.map((member, index) => (
                            <MiniMemberCard key={index} member={member} />
                        ))}
                        {!formSubmitted && members.map((member, index) => (
                            <div key={index} style={{ marginBottom: '20px' }}>
                                <TextField
                                    id={`outlined-basic-${index}`}
                                    label="ФИО"
                                    variant="outlined"
                                    value={member.fio}
                                    onChange={(e) => handleChange(index, 'fio', e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    id={`outlined-basic-${index}`}
                                    label="Email"
                                    variant="outlined"
                                    value={member.email}
                                    onChange={(e) => handleChange(index, 'email', e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    id={`outlined-basic-${index}`}
                                    label="Информация"
                                    variant="outlined"
                                    value={member.info}
                                    onChange={(e) => handleChange(index, 'info', e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button
                                    variant="contained"
                                    component="label"
                                    style={{ backgroundColor: "#9747FF", color: "white", marginTop: '10px' }}
                                >
                                    Загрузить аватар
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => e.target.files && handleAvatarChange(index, e.target.files[0])}
                                    />
                                </Button>
                            </div>
                        ))}
                        {!formSubmitted && (
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "#9747FF", color: "white", marginTop: '20px' }}
                                onClick={addMember}
                                fullWidth
                            >
                                Добавить
                            </Button>
                        )}
                        {!formSubmitted && (
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "#9747FF", color: "white", marginTop: '10px' }}
                                onClick={handleSubmit}
                                fullWidth
                            >
                                Отправить
                            </Button>
                        )}
                    </DialogContent>
                </Box>
            </Modal>
        </div>
    );
}

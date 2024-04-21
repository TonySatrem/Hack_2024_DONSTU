import * as React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import { API_URL } from '../../api/apiConfig';
import axios from 'axios';

const PART_ADD = '/partisians/add';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    overflowY: 'auto', // добавленный стиль для скролла
};

interface Member {
    fullName: string;
    email: string;
    info: string;
    teamId: number;
    photo: string;
    [key: string]: any;
}

const MiniMemberCard = ({ member }: { member: Member }) => (
    <div style={{ marginBottom: '20px' }}>
        <Typography variant="body1" gutterBottom>
            ФИО: {member.fullName}
        </Typography>
        <Typography variant="body1" gutterBottom>
            Email: {member.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
            Информация: {member.info}
        </Typography>
    </div>
);

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Неправильный формат email')
        .required('Email обязателен для заполнения'),
});

export default function AddMembers() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [members, setMembers] = React.useState<Member[]>([]);
    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const [avatar, setAvatar] = React.useState<File | null>(null); // Состояние для хранения выбранного аватара

    const handleSubmit = async (values: Member) => {
        const id = localStorage.getItem('teamId');
        // let base64String = '';
        // if (avatar) {
        //     base64String = await getBase64(avatar);
        // }
        // Получаем текущий список участников из localStorage
        // localStorage.setItem('members', JSON.stringify([...members, values]));
        const storedMembersString = localStorage.getItem('members');
        const currentMembers: Member[] = storedMembersString ? JSON.parse(storedMembersString) : [];
        
        // Добавляем новых участников к текущему списку
        const updatedMembers = [...currentMembers, values];

        // Сохраняем обновленный список участников в localStorage
        localStorage.setItem('members', JSON.stringify(updatedMembers));

        console.log(updatedMembers);
        // const response = await axios.post(API_URL + PART_ADD, {
        //     fullName: values.fullName,
        //     email: values.email,
        //     teamId: id,
        //     info: values.info,
        //     photo: avatar.name,
        // });
        // setMembers([...members, response.data]); // Добавляем нового участника к списку после успешной отправки на сервер
        // setFormSubmitted(true);
        setOpen(false);
    };

    const getBase64 = (file: File): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    // Функция для обработки изменений в выборе файла аватара
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setAvatar(file);
        }
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
                <Box sx={{ ...style, maxHeight: '80vh' }}>
                    <DialogContent dividers>
                        <Typography id="modal-modal-title" variant="h5" component="h2" align="center" gutterBottom>
                            Добавить участников
                        </Typography>
                        {formSubmitted && members.map((member, index) => (
                            <MiniMemberCard key={index} member={member} />
                        ))}
                        {!formSubmitted && (
                            <Formik
                                initialValues={{ fullName: '', email: '', info: '', teamId: 0, photo: '' }}
                                onSubmit={handleSubmit}
                                validationSchema={validationSchema}
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        <Field
                                            name="fullName"
                                            type="text"
                                            label="ФИО"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            as={TextField}
                                        />
                                        <ErrorMessage name="fullName" component="div" />

                                        <Field
                                            name="email"
                                            type="email"
                                            label="Email"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            as={TextField}
                                        />
                                        <ErrorMessage name="email" component="div" />

                                        <Field
                                            name="info"
                                            type="text"
                                            label="Информация"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            as={TextField}
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
                                                onChange={handleAvatarChange} // Привязываем функцию к событию onChange
                                            />
                                        </Button>

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            style={{ backgroundColor: "#9747FF", color: "white", marginTop: '20px' }}
                                            fullWidth
                                        >
                                            Добавить
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </DialogContent>
                </Box>
            </Modal>
        </div>
    );
}

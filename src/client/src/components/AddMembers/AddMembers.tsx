import * as React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Неправильный формат email')
        .required('Пожалуйста, введите адрес электронной почты'),
});

export default function AddMembers() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [members, setMembers] = React.useState<Member[]>([]);
    const [formSubmitted, setFormSubmitted] = React.useState(false);

    const addMember = () => {
        const newMember: Member = {
            fullName: '',
            email: '',
            info: '',
            teamId:0,
            photo: '',
        };
        setMembers([...members, newMember]);
    };

    const handleSubmit = (values: Member) => {
        // Выполняем любую логику перед отправкой формы, если необходимо
        setMembers([...members, values]);
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
                        {!formSubmitted && (
                            <Formik
                                initialValues={{ fullName: '', email: '', info: '', photo: '',teamId:0 }}
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
                                        <ErrorMessage name="fio" component="div" />

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
                                                onChange={(e) => {
                                                    const file = e.target.files && e.target.files[0];
                                                    // Обработка загрузки аватара
                                                }}
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

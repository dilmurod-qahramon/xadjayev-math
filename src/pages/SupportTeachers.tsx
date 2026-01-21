import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Avatar,
    Button,
    IconButton,
    Grid,
} from '@mui/material';
import { ArrowBack, School } from '@mui/icons-material';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import muiTheme from '@/theme/muiTheme';

interface Teacher {
    id: string;
    name: string;
    subject: string;
    avatar: string;
}

const teachers: Teacher[] = [
    {
        id: '1',
        name: 'Abdullayev Sardor',
        subject: 'Algebra va Geometriya',
        avatar: 'AS',
    },
    {
        id: '2',
        name: 'Karimova Nilufar',
        subject: "Matematika (Boshlang'ich)",
        avatar: 'KN',
    },
    {
        id: '3',
        name: 'Toshmatov Bekzod',
        subject: 'Olimpiada Matematikasi',
        avatar: 'TB',
    },
    {
        id: '4',
        name: 'Rahimova Madina',
        subject: 'DTM Tayyorgarlik',
        avatar: 'RM',
    },
];

const SupportTeachers = () => {
    const navigate = useNavigate();

    const handleSelectTeacher = (teacherId: string) => {
        navigate(`/support-teachers/${teacherId}`);
    };

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    background:
                        'linear-gradient(180deg, #f8f9fc 0%, #ffffff 100%)',
                    py: 4,
                }}
            >
                <Container maxWidth='lg'>
                    {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <IconButton
                            onClick={() => navigate('/')}
                            sx={{ mr: 2 }}
                        >
                            <ArrowBack />
                        </IconButton>
                        <Box>
                            <Typography
                                variant='h4'
                                fontWeight={700}
                                color='primary.main'
                            >
                                Yordamchi O'qituvchilar
                            </Typography>
                            <Typography variant='body1' color='text.secondary'>
                                O'qituvchini tanlang va uchrashuv belgilang
                            </Typography>
                        </Box>
                    </Box>

                    {/* Teachers List */}
                    <Typography
                        variant='h6'
                        fontWeight={600}
                        sx={{ mb: 3 }}
                    >
                        O'qituvchini tanlang
                    </Typography>
                    <Grid container spacing={3}>
                        {teachers.map((teacher) => (
                            <Grid
                                size={{ xs: 12, sm: 6, md: 3 }}
                                key={teacher.id}
                            >
                                <Card
                                    elevation={0}
                                    onClick={() => handleSelectTeacher(teacher.id)}
                                    sx={{
                                        borderRadius: 3,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                        },
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            p: 3,
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                bgcolor: 'primary.main',
                                                fontSize: '1.75rem',
                                                fontWeight: 600,
                                                mx: 'auto',
                                                mb: 2,
                                            }}
                                        >
                                            {teacher.avatar}
                                        </Avatar>
                                        <Typography
                                            variant='h6'
                                            fontWeight={600}
                                            sx={{ mb: 0.5 }}
                                        >
                                            {teacher.name}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 0.5,
                                            }}
                                        >
                                            <School fontSize='small' color='action' />
                                            <Typography
                                                variant='body2'
                                                color='text.secondary'
                                            >
                                                {teacher.subject}
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant='outlined'
                                            size='small'
                                            sx={{ mt: 2 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectTeacher(teacher.id);
                                            }}
                                        >
                                            Vaqtlarni ko'rish
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default SupportTeachers;

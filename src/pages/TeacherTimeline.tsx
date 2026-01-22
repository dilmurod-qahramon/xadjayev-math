import { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Avatar,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Chip,
    IconButton,
    Paper,
    Alert,
    Snackbar,
    CircularProgress,
    Tooltip,
} from '@mui/material';
import { ArrowBack, School, AccessTime, Warning, CheckCircle, EventBusy, EventAvailable, Person, Groups } from '@mui/icons-material';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import muiTheme from '@/theme/muiTheme';

interface TimeSlot {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
    studentName?: string;
    studentGroup?: string;
    studentPhone?: string;
}

interface Teacher {
    id: string;
    name: string;
    subject: string;
    avatar: string;
    availability: TimeSlot[];
}

// Generate dates for next 2 weeks
const generateDates = () => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
};

// Generate time slots for a teacher
const generateTimeSlots = (teacherId: string): TimeSlot[] => {
    const dates = generateDates();
    const slots: TimeSlot[] = [];
    const timeRanges = [
        { start: '11:00', end: '11:30' },
        { start: '11:30', end: '12:00' },
        { start: '12:00', end: '12:30' },
        { start: '13:00', end: '13:30' },
        { start: '13:30', end: '14:00' },
        { start: '14:00', end: '14:30' },
        { start: '14:30', end: '15:00' },
        { start: '15:00', end: '15:30' },
        { start: '15:30', end: '16:00' },
        { start: '16:00', end: '16:30' },
        { start: '16:30', end: '17:00' },
        { start: '17:00', end: '17:30' },
        { start: '17:30', end: '18:00' },
        { start: '18:00', end: '18:30' },
        { start: '18:30', end: '19:00' },
    ];

    dates.forEach((date, dateIndex) => {
        timeRanges.forEach((time, slotIndex) => {
            slots.push({
                id: `${teacherId}-${date}-${slotIndex}`,
                date,
                startTime: time.start,
                endTime: time.end,
                isBooked: false,
            });
        });
    });

    return slots;
};


// Teachers data
const teachersData: Teacher[] = [
    {
        id: '1',
        name: 'Muzaffar',
        subject: 'Advanced',
        avatar: 'AS',
        availability: generateTimeSlots('1'),
    },
    {
        id: '2',
        name: 'Sarvinoz',
        subject: "Advanced",
        avatar: 'KN',
        availability: generateTimeSlots('2'),
    },
    {
        id: '3',
        name: 'Saidjon',
        subject: 'Advanced',
        avatar: 'TB',
        availability: generateTimeSlots('3'),
    },
    {
        id: '4',
        name: 'Akbar',
        subject: 'Fundamental',
        avatar: 'RM',
        availability: generateTimeSlots('4'),
    },
    {
        id: '5',
        name: 'Xayriddin',
        subject: 'Fundamental',
        avatar: 'XA',
        availability: generateTimeSlots('5'),
    },
];

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
    };
    return date.toLocaleDateString('uz-UZ', options);
};

const API_URL =
    'https://script.google.com/macros/s/AKfycbxU-flBYdJtcrmDqtCFZYx2I_p2le351vSqrdwAdOa_XenZ_Mrp4dvG5HK4NL2yS6w1nQ/exec';

async function fetchBookings(teacherName: string) {
    try {
        const url = `${API_URL}?teacherName=${encodeURIComponent(teacherName)}`;
        const res = await fetch(url, {
            method: 'GET',
            redirect: 'follow',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch bookings');
        }

        const text = await res.text();

        try {
            return JSON.parse(text);
        } catch {
            return [];
        }
    } catch {
        return [];
    }
}

const TeacherTimeline = () => {
    const navigate = useNavigate();
    const { teacherId } = useParams<{ teacherId: string }>();
    
    const initialTeacher = teachersData.find(t => t.id === teacherId);
    
    const [teacher, setTeacher] = useState<Teacher | null>(initialTeacher || null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [bookingDialog, setBookingDialog] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [studentGroup, setStudentGroup] = useState('');
    const [studentPhone, setStudentPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error' | 'warning';
    }>({ open: false, message: '', severity: 'success' });
    const [errorDialog, setErrorDialog] = useState<{
        open: boolean;
        title: string;
        message: string;
    }>({ open: false, title: '', message: '' });

    const handleBookSlot = (slot: TimeSlot) => {
        setSelectedSlot(slot);
        setBookingDialog(true);
    };

    const confirmBooking = async () => {
        if (!selectedSlot || !teacher || !studentName.trim() || !studentGroup.trim())
            return;

        setIsSubmitting(true);

        const bookingData = {
            fullName: studentName.trim(),
            phone: studentPhone.trim() || '',
            groupId: studentGroup.trim(),
            teacherName: teacher.name,
            date: selectedSlot.date,
            startTime: selectedSlot.startTime,
            endTime: selectedSlot.endTime,
            slotId: selectedSlot.id,
        };

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(bookingData),
                redirect: 'follow',
            });

            const text = await res.text();

            let result;
            try {
                result = JSON.parse(text);
            } catch {
                result = {};
            }

            if (result.error) {
                setIsSubmitting(false);
                if (result.error.includes('already') || result.error.includes('booked')) {
                    setErrorDialog({
                        open: true,
                        title: 'Vaqt band!',
                        message: 'Bu vaqt allaqachon boshqa o\'quvchi tomonidan band qilingan. Iltimos, boshqa vaqtni tanlang.',
                    });
                } else if (result.error.includes('getDataRange')) {
                    setErrorDialog({
                        open: true,
                        title: 'Server xatosi',
                        message: 'Serverda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.',
                    });
                } else {
                    setErrorDialog({
                        open: true,
                        title: 'Xatolik',
                        message: result.error,
                    });
                }
                return;
            }

            if (result.status === 'error') {
                setIsSubmitting(false);
                setErrorDialog({
                    open: true,
                    title: 'Vaqt band!',
                    message: 'Bu vaqt allaqachon boshqa o\'quvchi tomonidan band qilingan. Iltimos, boshqa vaqtni tanlang.',
                });
                return;
            }
        } catch {
            setIsSubmitting(false);
            setErrorDialog({
                open: true,
                title: 'Ulanish xatosi',
                message: 'Serverga ulanishda xatolik yuz berdi. Iltimos, internet aloqangizni tekshiring va qayta urinib ko\'ring.',
            });
            return;
        }

        setTeacher(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                availability: prev.availability.map((slot) => {
                    if (slot.id !== selectedSlot.id) return slot;
                    return {
                        ...slot,
                        isBooked: true,
                        studentName: studentName.trim(),
                        studentGroup: studentGroup.trim(),
                        studentPhone: studentPhone.trim() || undefined,
                    };
                }),
            };
        });

        setIsSubmitting(false);
        setBookingDialog(false);
        setSelectedSlot(null);
        setStudentName('');
        setStudentGroup('');
        setStudentPhone('');
        setSnackbar({
            open: true,
            message: 'Uchrashuv muvaffaqiyatli belgilandi!',
            severity: 'success',
        });
    };

    const groupSlotsByDate = (slots: TimeSlot[]) => {
        const grouped: Record<string, TimeSlot[]> = {};
        slots.forEach((slot) => {
            if (!grouped[slot.date]) {
                grouped[slot.date] = [];
            }
            grouped[slot.date].push(slot);
        });
        Object.keys(grouped).forEach((date) => {
            grouped[date].sort((a, b) =>
                a.startTime.localeCompare(b.startTime),
            );
        });
        return grouped;
    };

    useEffect(() => {
        if (!teacher) return;
        
        setIsLoading(true);
        fetchBookings(teacher.name).then((bookings) => {
            const bookingsArray = Array.isArray(bookings) ? bookings : [];

            setTeacher((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    availability: prev.availability.map((slot) => {
                        const booked = bookingsArray.find((b: any) => {
                            if (b.slotId && b.slotId === slot.id) {
                                return true;
                            }

                            let bookingDate = '';
                            if (b.date) {
                                if (typeof b.date === 'string' && b.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
                                    bookingDate = b.date;
                                } else {
                                    const d = new Date(b.date);
                                    if (!isNaN(d.getTime())) {
                                        bookingDate = d.toISOString().split('T')[0];
                                    }
                                }
                            }
                            const matchesDate = bookingDate === slot.date;

                            const matchesTime =
                                String(b.startTime).trim() === slot.startTime &&
                                String(b.endTime).trim() === slot.endTime;

                            return matchesDate && matchesTime;
                        });

                        return booked
                            ? {
                                  ...slot,
                                  isBooked: true,
                                  studentName: booked.fullName,
                                  studentGroup: booked.groupId,
                                  studentPhone: booked.phone || undefined,
                              }
                            : slot;
                    }),
                };
            });
            setIsLoading(false);
        });
    }, [teacher?.id]);

    if (!teacher) {
        return (
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            O'qituvchi topilmadi
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/support-teachers')}
                        >
                            Orqaga qaytish
                        </Button>
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }

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
                            onClick={() => navigate('/support-teachers')}
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
                                Vaqtlarni Tanlang
                            </Typography>
                            <Typography variant='body1' color='text.secondary'>
                                Keyingi 2 hafta uchun bo'sh vaqtlarni ko'ring va
                                uchrashuv belgilang
                            </Typography>
                        </Box>
                    </Box>

                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                            overflow: 'hidden',
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            {/* Teacher Info */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 3,
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        bgcolor: 'primary.main',
                                        fontSize: '1.5rem',
                                        fontWeight: 600,
                                        mr: 2,
                                    }}
                                >
                                    {teacher.avatar}
                                </Avatar>
                                <Box>
                                    <Typography
                                        variant='h6'
                                        fontWeight={600}
                                    >
                                        {teacher.name}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <School
                                            fontSize='small'
                                            color='action'
                                        />
                                        <Typography
                                            variant='body2'
                                            color='text.secondary'
                                        >
                                            {teacher.subject}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Legend */}
                            <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ 
                                        width: 12, 
                                        height: 12, 
                                        borderRadius: '50%', 
                                        bgcolor: '#10b981',
                                    }} />
                                    <Typography variant='caption' color='text.secondary'>
                                        Bo'sh
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ 
                                        width: 12, 
                                        height: 12, 
                                        borderRadius: '50%', 
                                        bgcolor: '#ef4444',
                                    }} />
                                    <Typography variant='caption' color='text.secondary'>
                                        Band
                                    </Typography>
                                </Box>
                            </Box>
                            
                            {isLoading ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        py: 8,
                                        gap: 2,
                                    }}
                                >
                                    <CircularProgress size={40} />
                                    <Typography variant='body2' color='text.secondary'>
                                        Vaqtlar yuklanmoqda...
                                    </Typography>
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 1.5,
                                        overflowX: 'auto',
                                        pb: 2,
                                        '&::-webkit-scrollbar': {
                                            height: 8,
                                        },
                                        '&::-webkit-scrollbar-track': {
                                            bgcolor: 'grey.100',
                                            borderRadius: 4,
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            bgcolor: 'grey.300',
                                            borderRadius: 4,
                                            '&:hover': {
                                                bgcolor: 'grey.400',
                                            },
                                        },
                                    }}
                                >
                                    {(() => {
                                        const groupedSlots = groupSlotsByDate(teacher.availability);
                                        const dates = Object.keys(groupedSlots).sort();
                                        return dates.map((date) => {
                                            const dateObj = new Date(date);
                                            const isToday = new Date().toISOString().split('T')[0] === date;
                                            const dayName = dateObj.toLocaleDateString('uz-UZ', { weekday: 'short' });
                                            const dayNum = dateObj.getDate();
                                            const monthName = dateObj.toLocaleDateString('uz-UZ', { month: 'short' });
                                            
                                            return (
                                                <Box
                                                    key={date}
                                                    sx={{
                                                        minWidth: 140,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    {/* Date Header */}
                                                    <Box
                                                        sx={{
                                                            textAlign: 'center',
                                                            mb: 1.5,
                                                            pb: 1.5,
                                                            borderBottom: '2px solid',
                                                            borderColor: isToday ? 'primary.main' : 'grey.200',
                                                        }}
                                                    >
                                                        <Typography
                                                            variant='caption'
                                                            sx={{
                                                                textTransform: 'uppercase',
                                                                letterSpacing: 1,
                                                                color: isToday ? 'primary.main' : 'text.secondary',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {dayName}
                                                        </Typography>
                                                        <Typography
                                                            variant='h5'
                                                            sx={{
                                                                fontWeight: 700,
                                                                color: isToday ? 'primary.main' : 'text.primary',
                                                                lineHeight: 1.2,
                                                            }}
                                                        >
                                                            {dayNum}
                                                        </Typography>
                                                        <Typography
                                                            variant='caption'
                                                            color={isToday ? 'primary.main' : 'text.secondary'}
                                                        >
                                                            {monthName}
                                                        </Typography>
                                                        {isToday && (
                                                            <Chip 
                                                                label="Bugun" 
                                                                size="small" 
                                                                color="primary"
                                                                sx={{ 
                                                                    mt: 0.5, 
                                                                    height: 20, 
                                                                    fontSize: '0.65rem',
                                                                    fontWeight: 600,
                                                                }}
                                                            />
                                                        )}
                                                    </Box>

                                                    {/* Time Slots */}
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                                                        {groupedSlots[date].map((slot) => (
                                                            <Box key={slot.id}>
                                                                {slot.isBooked ? (
                                                                    <Tooltip
                                                                        title={
                                                                            <Box sx={{ p: 0.5 }}>
                                                                                <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                                                                                    <Person sx={{ fontSize: 14 }} />
                                                                                    {slot.studentName}
                                                                                </Typography>
                                                                                <Typography variant='caption' sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                                    <Groups sx={{ fontSize: 14 }} />
                                                                                    {slot.studentGroup}
                                                                                </Typography>
                                                                            </Box>
                                                                        }
                                                                        arrow
                                                                        placement="right"
                                                                    >
                                                                        <Box
                                                                            sx={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                gap: 0.75,
                                                                                px: 1.5,
                                                                                py: 1,
                                                                                borderRadius: 2,
                                                                                bgcolor: '#fef2f2',
                                                                                border: '1px solid #fecaca',
                                                                                cursor: 'not-allowed',
                                                                                opacity: 0.85,
                                                                            }}
                                                                        >
                                                                            <EventBusy sx={{ fontSize: 16, color: '#ef4444' }} />
                                                                            <Typography
                                                                                variant='caption'
                                                                                sx={{
                                                                                    fontWeight: 500,
                                                                                    color: '#dc2626',
                                                                                    textDecoration: 'line-through',
                                                                                    fontSize: '0.75rem',
                                                                                }}
                                                                            >
                                                                                {slot.startTime}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Tooltip>
                                                                ) : (
                                                                    <Box
                                                                        onClick={() => handleBookSlot(slot)}
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: 0.75,
                                                                            px: 1.5,
                                                                            py: 1,
                                                                            borderRadius: 2,
                                                                            bgcolor: '#f0fdf4',
                                                                            border: '1px solid #bbf7d0',
                                                                            cursor: 'pointer',
                                                                            transition: 'all 0.2s ease',
                                                                            '&:hover': {
                                                                                bgcolor: '#dcfce7',
                                                                                borderColor: '#86efac',
                                                                                transform: 'translateY(-1px)',
                                                                                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.15)',
                                                                            },
                                                                            '&:active': {
                                                                                transform: 'translateY(0)',
                                                                            },
                                                                        }}
                                                                    >
                                                                        <EventAvailable sx={{ fontSize: 16, color: '#10b981' }} />
                                                                        <Typography
                                                                            variant='caption'
                                                                            sx={{
                                                                                fontWeight: 600,
                                                                                color: '#059669',
                                                                                fontSize: '0.75rem',
                                                                            }}
                                                                        >
                                                                            {slot.startTime}
                                                                        </Typography>
                                                                    </Box>
                                                                )}
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                </Box>
                                            );
                                        });
                                    })()}
                                </Box>
                            )}
                        </CardContent>
                    </Card>

                    {/* Booking Dialog */}
                    <Dialog
                        open={bookingDialog}
                        onClose={() => setBookingDialog(false)}
                        maxWidth='xs'
                        fullWidth
                    >
                        <DialogTitle>Uchrashuv Belgilash</DialogTitle>
                        <DialogContent>
                            {selectedSlot && (
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant='body2' color='text.secondary'>
                                        O'qituvchi: <strong>{teacher.name}</strong>
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary'>
                                        Sana: <strong>{formatDate(selectedSlot.date)}</strong>
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary'>
                                        Vaqt: <strong>{selectedSlot.startTime} - {selectedSlot.endTime}</strong>
                                    </Typography>
                                </Box>
                            )}
                            <TextField
                                autoFocus
                                margin='dense'
                                label="To'liq ismingiz"
                                fullWidth
                                variant='outlined'
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                margin='dense'
                                label='Guruhingiz'
                                fullWidth
                                variant='outlined'
                                placeholder='Masalan: 10-A, Olimpiada-1'
                                value={studentGroup}
                                onChange={(e) => setStudentGroup(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                margin='dense'
                                label='Telefon raqam (ixtiyoriy)'
                                fullWidth
                                variant='outlined'
                                placeholder='+998 90 123 45 67'
                                value={studentPhone}
                                onChange={(e) => setStudentPhone(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setBookingDialog(false)} disabled={isSubmitting}>
                                Bekor qilish
                            </Button>
                            <Button
                                onClick={confirmBooking}
                                variant='contained'
                                disabled={!studentName.trim() || !studentGroup.trim() || isSubmitting}
                                startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
                            >
                                {isSubmitting ? 'Yuklanmoqda...' : 'Tasdiqlash'}
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* Error Dialog */}
                    <Dialog
                        open={errorDialog.open}
                        onClose={() => setErrorDialog({ ...errorDialog, open: false })}
                        maxWidth='xs'
                        fullWidth
                    >
                        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Warning color='warning' />
                            {errorDialog.title}
                        </DialogTitle>
                        <DialogContent>
                            <Typography>{errorDialog.message}</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => setErrorDialog({ ...errorDialog, open: false })}
                                variant='contained'
                            >
                                Tushundim
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* Success Snackbar */}
                    <Snackbar
                        open={snackbar.open}
                        autoHideDuration={4000}
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert
                            onClose={() => setSnackbar({ ...snackbar, open: false })}
                            severity={snackbar.severity}
                            variant='filled'
                            icon={snackbar.severity === 'success' ? <CheckCircle /> : undefined}
                        >
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default TeacherTimeline;

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
    Grid,
    Paper,
} from '@mui/material';
import { ArrowBack, School, AccessTime } from '@mui/icons-material';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

// Initial teachers data
const initialTeachers: Teacher[] = [
    {
        id: '1',
        name: 'Abdullayev Sardor',
        subject: 'Algebra va Geometriya',
        avatar: 'AS',
        availability: generateTimeSlots('1'),
    },
    {
        id: '2',
        name: 'Karimova Nilufar',
        subject: "Matematika (Boshlang'ich)",
        avatar: 'KN',
        availability: generateTimeSlots('2'),
    },
    {
        id: '3',
        name: 'Toshmatov Bekzod',
        subject: 'Olimpiada Matematikasi',
        avatar: 'TB',
        availability: generateTimeSlots('3'),
    },
    {
        id: '4',
        name: 'Rahimova Madina',
        subject: 'DTM Tayyorgarlik',
        avatar: 'RM',
        availability: generateTimeSlots('4'),
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
    'https://script.google.com/macros/s/AKfycby8oSbjG6C8mKEQNqpUCkVTR0aMkkR_3gx9fok6MBgXxqfrX71CAFcDDKgcqCs74fUgvw/exec';

async function fetchBookings() {
    try {
        const res = await fetch(API_URL, {
            method: 'GET',
            redirect: 'follow',
        });
        console.log('Fetch Bookings Response Status:', res.status);
        
        if (!res.ok) {
            throw new Error('Failed to fetch bookings');
        }
        
        const text = await res.text();
        console.log('Fetch Bookings Raw Response:', text);
        
        try {
            return JSON.parse(text);
        } catch (e) {
            console.error('Failed to parse bookings JSON:', e);
            return [];
        }
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return [];
    }
}

const SupportTeachers = () => {
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(
        null,
    );
    const [selectedSlot, setSelectedSlot] = useState<{
        teacher: Teacher;
        slot: TimeSlot;
    } | null>(null);
    const [bookingDialog, setBookingDialog] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [studentGroup, setStudentGroup] = useState('');
    const [studentPhone, setStudentPhone] = useState('');

    const handleBookSlot = (teacher: Teacher, slot: TimeSlot) => {
        setSelectedSlot({ teacher, slot });
        setBookingDialog(true);
    };

    const confirmBooking = async () => {
        if (!selectedSlot || !studentName.trim() || !studentGroup.trim())
            return;

        const bookingData = {
            fullName: studentName.trim(),
            phone: studentPhone.trim() || '',
            groupId: studentGroup.trim(),
            teacherName: selectedSlot.teacher.name,
            date: selectedSlot.slot.date,
            startTime: selectedSlot.slot.startTime,
            endTime: selectedSlot.slot.endTime,
            slotId: selectedSlot.slot.id,
        };

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(bookingData),
                redirect: 'follow',
            });

            console.log('Response Status:', res.status);
            console.log('Response Headers:', res.headers);
            
            const text = await res.text();
            console.log('Raw Response:', text);
            
            let result;
            try {
                result = JSON.parse(text);
            } catch (e) {
                console.error('Failed to parse JSON:', e);
                // If response is empty or not JSON, treat as success
                result = {};
            }

            console.log('Parsed Result:', result);

            if (result.error) {
                console.error('Booking error:', result.error);
                if (result.error.includes('getDataRange')) {
                    alert('Server xatosi: Google Sheet konfiguratsiyasini tekshiring');
                } else if (result.error.includes('already')) {
                    alert('Bu vaqt allaqachon band!');
                } else {
                    alert('Xatolik: ' + result.error);
                }
                return;
            }

            if (result.status === 'error') {
                alert('Bu vaqt allaqachon band!');
                console.error('Booking error:', result.message);
                return;
            }
        } catch (error) {
            console.error('Failed to save booking:', error);
            alert('Xatolik yuz berdi. Qayta urinib ko\'ring.');
            return;
        }

        const updatedTeachers = teachers.map((teacher) => {
            if (teacher.id !== selectedSlot.teacher.id) return teacher;
            return {
                ...teacher,
                availability: teacher.availability.map((slot) => {
                    if (slot.id !== selectedSlot.slot.id) return slot;
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

        setTeachers(updatedTeachers);

        // Update selected teacher with new data
        const updatedSelectedTeacher = updatedTeachers.find(
            (t) => t.id === selectedTeacher?.id,
        );
        if (updatedSelectedTeacher) {
            setSelectedTeacher(updatedSelectedTeacher);
        }

        setBookingDialog(false);
        setSelectedSlot(null);
        setStudentName('');
        setStudentGroup('');
        setStudentPhone('');
    };

    const groupSlotsByDate = (slots: TimeSlot[]) => {
        const grouped: Record<string, TimeSlot[]> = {};
        slots.forEach((slot) => {
            if (!grouped[slot.date]) {
                grouped[slot.date] = [];
            }
            grouped[slot.date].push(slot);
        });
        // Sort slots by time within each date
        Object.keys(grouped).forEach((date) => {
            grouped[date].sort((a, b) =>
                a.startTime.localeCompare(b.startTime),
            );
        });
        return grouped;
    };

    useEffect(() => {
        fetchBookings().then((bookings) => {
            const bookingsArray = Array.isArray(bookings) ? bookings : [];
            console.log('Processing bookings:', bookingsArray);
            
            setTeachers((prevTeachers) =>
                prevTeachers.map((teacher) => ({
                    ...teacher,
                    availability: teacher.availability.map((slot) => {
                        const booked = bookingsArray.find((b: any) => {
                            // If slotId is available, use it for exact matching
                            if (b.slotId && b.slotId === slot.id) {
                                return true;
                            }

                            // Fallback: Match by teacher, date, and time strings
                            const matchesTeacher = String(b.teacherName).trim() === String(teacher.name).trim();
                            
                            // Match date - handle both ISO string and plain date
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

                            // Match time as plain strings (HH:MM format)
                            const matchesTime = 
                                String(b.startTime).trim() === slot.startTime && 
                                String(b.endTime).trim() === slot.endTime;

                            console.log('Matching:', { 
                                slotId: slot.id, 
                                teacher: teacher.name, 
                                slotDate: slot.date, 
                                bookingDate,
                                slotStart: slot.startTime,
                                bookingStart: b.startTime,
                                matchesTeacher, 
                                matchesDate, 
                                matchesTime 
                            });

                            return matchesTeacher && matchesDate && matchesTime;
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
                })),
            );
        });
    }, []);

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
                                Keyingi 2 hafta uchun bo'sh vaqtlarni ko'ring va
                                uchrashuv belgilang
                            </Typography>
                        </Box>
                    </Box>

                    {/* Teachers List - Show when no teacher selected */}
                    {!selectedTeacher && (
                        <>
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
                                            onClick={() =>
                                                setSelectedTeacher(teacher)
                                            }
                                            sx={{
                                                borderRadius: 3,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                    transform:
                                                        'translateY(-4px)',
                                                    boxShadow:
                                                        '0 8px 24px rgba(0,0,0,0.1)',
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
                                                        justifyContent:
                                                            'center',
                                                        gap: 0.5,
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
                                                <Button
                                                    variant='outlined'
                                                    size='small'
                                                    sx={{ mt: 2 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedTeacher(
                                                            teacher,
                                                        );
                                                    }}
                                                >
                                                    Vaqtlarni ko'rish
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}

                    {/* Selected Teacher Timeline */}
                    {selectedTeacher && (
                        <>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 3,
                                }}
                            >
                                <Button
                                    startIcon={<ArrowBack />}
                                    onClick={() => setSelectedTeacher(null)}
                                    sx={{ mr: 2 }}
                                >
                                    Orqaga
                                </Button>
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
                                            {selectedTeacher.avatar}
                                        </Avatar>
                                        <Box>
                                            <Typography
                                                variant='h6'
                                                fontWeight={600}
                                            >
                                                {selectedTeacher.name}
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
                                                    {selectedTeacher.subject}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    {/* Availability Schedule */}
                                    <Typography
                                        variant='subtitle2'
                                        color='text.secondary'
                                        sx={{ mb: 2 }}
                                    >
                                        Bo'sh vaqtlar:
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 2,
                                            overflowX: 'auto',
                                            pb: 2,
                                        }}
                                    >
                                        {(() => {
                                            const groupedSlots =
                                                groupSlotsByDate(
                                                    selectedTeacher.availability,
                                                );
                                            const dates =
                                                Object.keys(
                                                    groupedSlots,
                                                ).sort();
                                            return dates.map((date) => (
                                                <Paper
                                                    key={date}
                                                    elevation={0}
                                                    sx={{
                                                        minWidth: 160,
                                                        p: 2,
                                                        borderRadius: 2,
                                                        bgcolor: 'grey.50',
                                                        border: '1px solid',
                                                        borderColor: 'grey.200',
                                                    }}
                                                >
                                                    <Typography
                                                        variant='subtitle2'
                                                        fontWeight={600}
                                                        color='primary.main'
                                                        sx={{
                                                            mb: 1.5,
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        {formatDate(date)}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'column',
                                                            gap: 1,
                                                        }}
                                                    >
                                                        {groupedSlots[date].map(
                                                            (slot) => (
                                                                <Box
                                                                    key={
                                                                        slot.id
                                                                    }
                                                                >
                                                                    {(
                                                                        slot.isBooked
                                                                    ) ?
                                                                        <Paper
                                                                            elevation={
                                                                                0
                                                                            }
                                                                            sx={{
                                                                                p: 1,
                                                                                bgcolor:
                                                                                    'error.light',
                                                                                borderRadius: 1,
                                                                                color: 'error.contrastText',
                                                                            }}
                                                                        >
                                                                            <Typography
                                                                                variant='caption'
                                                                                sx={{
                                                                                    display:
                                                                                        'block',
                                                                                    fontWeight: 600,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    slot.startTime
                                                                                }{' '}
                                                                                -{' '}
                                                                                {
                                                                                    slot.endTime
                                                                                }
                                                                            </Typography>
                                                                            <Typography
                                                                                variant='caption'
                                                                                sx={{
                                                                                    display:
                                                                                        'block',
                                                                                }}
                                                                            >
                                                                                {
                                                                                    slot.studentName
                                                                                }
                                                                            </Typography>
                                                                            <Typography
                                                                                variant='caption'
                                                                                sx={{
                                                                                    display:
                                                                                        'block',
                                                                                    opacity: 0.9,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    slot.studentGroup
                                                                                }
                                                                            </Typography>
                                                                            {slot.studentPhone && (
                                                                                <Typography
                                                                                    variant='caption'
                                                                                    sx={{
                                                                                        display:
                                                                                            'block',
                                                                                        opacity: 0.9,
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        slot.studentPhone
                                                                                    }
                                                                                </Typography>
                                                                            )}
                                                                        </Paper>
                                                                    :   <Chip
                                                                            size='small'
                                                                            icon={
                                                                                <AccessTime
                                                                                    sx={{
                                                                                        fontSize: 14,
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={`${slot.startTime} - ${slot.endTime}`}
                                                                            onClick={() =>
                                                                                handleBookSlot(
                                                                                    selectedTeacher,
                                                                                    slot,
                                                                                )
                                                                            }
                                                                            sx={{
                                                                                width: '100%',
                                                                                cursor: 'pointer',
                                                                                bgcolor:
                                                                                    'success.light',
                                                                                color: 'success.contrastText',
                                                                                '&:hover':
                                                                                    {
                                                                                        bgcolor:
                                                                                            'success.main',
                                                                                    },
                                                                            }}
                                                                        />
                                                                    }
                                                                </Box>
                                                            ),
                                                        )}
                                                    </Box>
                                                </Paper>
                                            ));
                                        })()}
                                    </Box>
                                </CardContent>
                            </Card>
                        </>
                    )}

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
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        O'qituvchi:{' '}
                                        <strong>
                                            {selectedSlot.teacher.name}
                                        </strong>
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        Sana:{' '}
                                        <strong>
                                            {formatDate(selectedSlot.slot.date)}
                                        </strong>
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        Vaqt:{' '}
                                        <strong>
                                            {selectedSlot.slot.startTime} -{' '}
                                            {selectedSlot.slot.endTime}
                                        </strong>
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
                                onChange={(e) =>
                                    setStudentGroup(e.target.value)
                                }
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                margin='dense'
                                label='Telefon raqam (ixtiyoriy)'
                                fullWidth
                                variant='outlined'
                                placeholder='+998 90 123 45 67'
                                value={studentPhone}
                                onChange={(e) =>
                                    setStudentPhone(e.target.value)
                                }
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setBookingDialog(false)}>
                                Bekor qilish
                            </Button>
                            <Button
                                onClick={confirmBooking}
                                variant='contained'
                                disabled={
                                    !studentName.trim() || !studentGroup.trim()
                                }
                            >
                                Tasdiqlash
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default SupportTeachers;

import { useState, useMemo } from 'react';
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
import { ArrowBack, School, AccessTime, Person } from '@mui/icons-material';
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
    { start: '09:00', end: '10:00' },
    { start: '10:00', end: '11:00' },
    { start: '11:00', end: '12:00' },
    { start: '14:00', end: '15:00' },
    { start: '15:00', end: '16:00' },
    { start: '16:00', end: '17:00' },
  ];

  dates.forEach((date, dateIndex) => {
    // Skip weekends (Saturday = 6, Sunday = 0)
    const dayOfWeek = new Date(date).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return;

    // Randomly assign 2-4 time slots per day
    const numSlots = Math.floor(Math.random() * 3) + 2;
    const shuffled = [...timeRanges].sort(() => Math.random() - 0.5);
    const selectedSlots = shuffled.slice(0, numSlots);

    selectedSlots.forEach((time, slotIndex) => {
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
    subject: 'Matematika (Boshlang\'ich)',
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
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
  return date.toLocaleDateString('uz-UZ', options);
};

const SupportTeachers = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [selectedSlot, setSelectedSlot] = useState<{ teacher: Teacher; slot: TimeSlot } | null>(null);
  const [bookingDialog, setBookingDialog] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');

  const handleBookSlot = (teacher: Teacher, slot: TimeSlot) => {
    setSelectedSlot({ teacher, slot });
    setBookingDialog(true);
  };

  const confirmBooking = () => {
    if (!selectedSlot || !studentName.trim()) return;

    setTeachers((prev) =>
      prev.map((teacher) => {
        if (teacher.id !== selectedSlot.teacher.id) return teacher;
        return {
          ...teacher,
          availability: teacher.availability.map((slot) => {
            if (slot.id !== selectedSlot.slot.id) return slot;
            return {
              ...slot,
              isBooked: true,
              studentName: studentName.trim(),
              studentPhone: studentPhone.trim(),
            };
          }),
        };
      })
    );

    setBookingDialog(false);
    setSelectedSlot(null);
    setStudentName('');
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
      grouped[date].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });
    return grouped;
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8f9fc 0%, #ffffff 100%)', py: 4 }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h4" fontWeight={700} color="primary.main">
                Yordamchi O'qituvchilar
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Keyingi 2 hafta uchun bo'sh vaqtlarni ko'ring va uchrashuv belgilang
              </Typography>
            </Box>
          </Box>

          {/* Teachers List */}
          <Grid container spacing={4}>
            {teachers.map((teacher) => {
              const groupedSlots = groupSlotsByDate(teacher.availability);
              const dates = Object.keys(groupedSlots).sort();

              return (
                <Grid size={12} key={teacher.id}>
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
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
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
                          <Typography variant="h6" fontWeight={600}>
                            {teacher.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <School fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {teacher.subject}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Availability Schedule */}
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                        Bo'sh vaqtlar:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
                        {dates.map((date) => (
                          <Paper
                            key={date}
                            elevation={0}
                            sx={{
                              minWidth: 140,
                              p: 2,
                              borderRadius: 2,
                              bgcolor: 'grey.50',
                              border: '1px solid',
                              borderColor: 'grey.200',
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              fontWeight={600}
                              color="primary.main"
                              sx={{ mb: 1.5, textAlign: 'center' }}
                            >
                              {formatDate(date)}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              {groupedSlots[date].map((slot) => (
                                <Box key={slot.id}>
                                  {slot.isBooked ? (
                                    <Chip
                                      size="small"
                                      icon={<Person sx={{ fontSize: 14 }} />}
                                      label={
                                        <Box sx={{ display: 'flex', flexDirection: 'column', py: 0.5 }}>
                                          <Typography variant="caption" sx={{ lineHeight: 1.2 }}>
                                            {slot.startTime} - {slot.endTime}
                                          </Typography>
                                          <Typography variant="caption" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                                            {slot.studentName}
                                          </Typography>
                                        </Box>
                                      }
                                      sx={{
                                        width: '100%',
                                        height: 'auto',
                                        bgcolor: 'error.light',
                                        color: 'error.contrastText',
                                        '& .MuiChip-label': { px: 1 },
                                      }}
                                    />
                                  ) : (
                                    <Chip
                                      size="small"
                                      icon={<AccessTime sx={{ fontSize: 14 }} />}
                                      label={`${slot.startTime} - ${slot.endTime}`}
                                      onClick={() => handleBookSlot(teacher, slot)}
                                      sx={{
                                        width: '100%',
                                        cursor: 'pointer',
                                        bgcolor: 'success.light',
                                        color: 'success.contrastText',
                                        '&:hover': {
                                          bgcolor: 'success.main',
                                        },
                                      }}
                                    />
                                  )}
                                </Box>
                              ))}
                            </Box>
                          </Paper>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Booking Dialog */}
          <Dialog open={bookingDialog} onClose={() => setBookingDialog(false)} maxWidth="xs" fullWidth>
            <DialogTitle>Uchrashuv Belgilash</DialogTitle>
            <DialogContent>
              {selectedSlot && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    O'qituvchi: <strong>{selectedSlot.teacher.name}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sana: <strong>{formatDate(selectedSlot.slot.date)}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Vaqt: <strong>{selectedSlot.slot.startTime} - {selectedSlot.slot.endTime}</strong>
                  </Typography>
                </Box>
              )}
              <TextField
                autoFocus
                margin="dense"
                label="Ismingiz"
                fullWidth
                variant="outlined"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Telefon raqam"
                fullWidth
                variant="outlined"
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setBookingDialog(false)}>Bekor qilish</Button>
              <Button onClick={confirmBooking} variant="contained" disabled={!studentName.trim()}>
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

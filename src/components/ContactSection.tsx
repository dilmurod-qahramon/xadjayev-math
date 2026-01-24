import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Phone, Send, LocationOn, AccessTime } from '@mui/icons-material';
import { submitLead } from '@/services/leadService';

const ContactSection = () => {
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; severity: 'success' | 'error'; message: string }>({
    open: false,
    severity: 'success',
    message: '',
  });

  const validatePhone = (value: string) => {
    const phoneRegex = /^\+?[0-9]{9,15}$/;
    if (!value.trim()) {
      return "Telefon raqami kiritish shart";
    }
    if (!phoneRegex.test(value.replace(/[\s-]/g, ''))) {
      return "To'g'ri telefon raqami kiriting";
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validatePhone(phone);
    setPhoneError(error);
    
    if (!error) {
      setIsSubmitting(true);
      
      const result = await submitLead({
        phone: phone,
        comments: comment,
      });

      setIsSubmitting(false);

      if (result.success) {
        setSnackbar({
          open: true,
          severity: 'success',
          message: "So'rovingiz qabul qilindi! Tez orada bog'lanamiz.",
        });
        setPhone('');
        setComment('');
      } else {
        setSnackbar({
          open: true,
          severity: 'error',
          message: "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
        });
      }
    }
  };

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        background: '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                letterSpacing: 2,
                mb: 1,
                display: 'block',
              }}
            >
              BOG'LANISH
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                color: 'text.primary',
                mb: 2,
              }}
            >
              Biz bilan bog'laning
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 5,
                maxWidth: 450,
              }}
            >
              Savollaringiz bormi? Telefon raqamingizni qoldiring, biz siz bilan tez orada bog'lanamiz.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    bgcolor: 'secondary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Phone sx={{ color: 'primary.main' }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Telefon
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    +998 90 123 45 67
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    bgcolor: 'secondary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <LocationOn sx={{ color: 'primary.main' }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Manzil
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Toshkent viloyati, Nurafshon shahar
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    bgcolor: 'secondary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <AccessTime sx={{ color: 'primary.main' }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Ish vaqti
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Dushanba - Shanba: 09:00 - 20:00
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                p: { xs: 2, md: 3 },
                border: '1px solid',
                borderColor: 'divider',
                background: '#f8f9fc',
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    mb: 3,
                  }}
                >
                  So'rov qoldiring
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Telefon raqamingiz *"
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneError) setPhoneError('');
                    }}
                    error={!!phoneError}
                    helperText={phoneError}
                    sx={{ mb: 3 }}
                    inputProps={{ maxLength: 20 }}
                  />
                  <TextField
                    fullWidth
                    label="Izoh (ixtiyoriy)"
                    placeholder="Savolingiz yoki izohingiz..."
                    multiline
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{ mb: 3 }}
                    inputProps={{ maxLength: 500 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                    endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
                    sx={{
                      py: 1.5,
                    }}
                  >
                    {isSubmitting ? 'Yuborilmoqda...' : "Jo'natish"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactSection;

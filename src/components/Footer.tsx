import { Box, Container, Typography, IconButton } from '@mui/material';
import { Telegram, Instagram, Facebook } from '@mui/icons-material';
import logo from '@/assets/logo.svg';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                height: 50,
                filter: 'brightness(0) invert(1)',
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Matematika O'quv Markazi
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              sx={{
                color: 'primary.contrastText',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
              aria-label="Telegram"
            >
              <Telegram />
            </IconButton>
            <IconButton
              sx={{
                color: 'primary.contrastText',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
              aria-label="Instagram"
            >
              <Instagram />
            </IconButton>
            <IconButton
              sx={{
                color: 'primary.contrastText',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
              aria-label="Facebook"
            >
              <Facebook />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            mt: 4,
            pt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Matematika O'quv Markazi. Barcha huquqlar himoyalangan.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

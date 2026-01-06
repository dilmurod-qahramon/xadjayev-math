import { Box, Container, Typography } from '@mui/material';
import logo from '@/assets/logo.svg';

const LogosSection = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        background: 'linear-gradient(180deg, #f8f9fc 0%, #eef1f8 100%)',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              letterSpacing: 1,
            }}
          >
            BIZNING BREND
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 6,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Matematika O'quv Markazi"
            sx={{
              height: { xs: 80, md: 120 },
              width: 'auto',
              filter: 'drop-shadow(0 2px 8px rgba(59, 88, 168, 0.1))',
              transition: 'all 0.3s ease',
              '&:hover': {
                filter: 'drop-shadow(0 4px 16px rgba(59, 88, 168, 0.2))',
                transform: 'scale(1.02)',
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default LogosSection;

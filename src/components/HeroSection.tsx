import { Box, Container, Typography, Button } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import logo from '@/assets/logo.svg';

const HeroSection = () => {
  const scrollToResults = () => {
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(180deg, #f8f9fc 0%, #ffffff 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `radial-gradient(circle at 1px 1px, #3b58a8 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Box
          className="animate-fade-in"
          sx={{
            mb: 5,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Matematika O'quv Markazi"
            sx={{
              height: { xs: 160, md: 220 },
              width: 'auto',
              filter: 'drop-shadow(0 0 30px rgba(59, 88, 168, 0.4)) drop-shadow(0 0 60px rgba(59, 88, 168, 0.2))',
              animation: 'glow 3s ease-in-out infinite alternate',
              '@keyframes glow': {
                '0%': {
                  filter: 'drop-shadow(0 0 20px rgba(59, 88, 168, 0.3)) drop-shadow(0 0 40px rgba(59, 88, 168, 0.15))',
                },
                '100%': {
                  filter: 'drop-shadow(0 0 40px rgba(59, 88, 168, 0.5)) drop-shadow(0 0 80px rgba(59, 88, 168, 0.25))',
                },
              },
            }}
          />
        </Box>

        <Typography
          variant="h1"
          className="animate-fade-in-up"
          sx={{
            fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
            color: 'text.primary',
            mb: 2,
            opacity: 0,
            animationDelay: '0.1s',
            animationFillMode: 'forwards',
          }}
        >
          Matematika O'quv Markazi
        </Typography>

        <Typography
          variant="h5"
          className="animate-fade-in-up"
          sx={{
            color: 'text.secondary',
            fontWeight: 400,
            maxWidth: 600,
            mx: 'auto',
            mb: 5,
            lineHeight: 1.6,
            opacity: 0,
            animationDelay: '0.2s',
            animationFillMode: 'forwards',
          }}
        >
          Kelajakni quramiz – bilim bilan. Matematikani sevib o'rganish va yuqori natijalarga erishish uchun siz to'g'ri joydasiz.
        </Typography>

        <Box
          className="animate-fade-in-up"
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap',
            opacity: 0,
            animationDelay: '0.3s',
            animationFillMode: 'forwards',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Bog'lanish
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={scrollToResults}
          >
            Natijalarimiz
          </Button>
        </Box>

        <Box
          className="animate-fade-in"
          onClick={scrollToResults}
          sx={{
            position: 'absolute',
            bottom: { xs: -60, md: -80 },
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
            opacity: 0,
            animationDelay: '0.5s',
            animationFillMode: 'forwards',
            '&:hover': {
              transform: 'translateX(-50%) translateY(4px)',
            },
            transition: 'transform 0.3s ease',
          }}
        >
          <KeyboardArrowDown
            sx={{
              fontSize: 40,
              color: 'primary.main',
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                '40%': { transform: 'translateY(-10px)' },
                '60%': { transform: 'translateY(-5px)' },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;

import { Box, Container, Typography } from '@mui/material';
import { School, EmojiEvents, Groups, TrendingUp, MenuBook, Psychology } from '@mui/icons-material';
import logo from '@/assets/logo.svg';

const strengths = [
  { icon: School, label: "Tajribali o'qituvchilar", angle: 0 },
  { icon: EmojiEvents, label: "Yuqori natijalar", angle: 60 },
  { icon: Groups, label: "Kichik guruhlar", angle: 120 },
  { icon: TrendingUp, label: "Individual yondashuv", angle: 180 },
  { icon: MenuBook, label: "Zamonaviy metodika", angle: 240 },
  { icon: Psychology, label: "Mantiqiy fikrlash", angle: 300 },
];

const StrengthsSection = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #0a1929 0%, #132f4c 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.1) 0%, transparent 70%)',
        }}
      />

      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            color: '#fff',
            mb: { xs: 6, md: 8 },
            fontSize: { xs: '1.75rem', md: '2.5rem' },
          }}
        >
          Bizning kuchli tomonlarimiz
        </Typography>

        <Box
          sx={{
            position: 'relative',
            height: { xs: 450, md: 550 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Connection lines */}
          {strengths.map((strength, index) => {
            const angleRad = (strength.angle * Math.PI) / 180;
            const lineLength = { xs: 120, md: 180 };
            return (
              <Box
                key={`line-${index}`}
                sx={{
                  position: 'absolute',
                  width: { xs: `${lineLength.xs}px`, md: `${lineLength.md}px` },
                  height: '2px',
                  background: 'linear-gradient(90deg, rgba(77, 171, 245, 0.8), rgba(77, 171, 245, 0.1))',
                  transformOrigin: 'left center',
                  transform: `rotate(${strength.angle}deg)`,
                  left: '50%',
                  top: '50%',
                  animation: `pulse-line 2s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`,
                  '@keyframes pulse-line': {
                    '0%, 100%': { opacity: 0.5 },
                    '50%': { opacity: 1 },
                  },
                }}
              />
            );
          })}

          {/* Center logo - BIGGER and SHINIER */}
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 200, md: 260 },
              height: { xs: 200, md: 260 },
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #0d2847, #1a3a5c)',
              boxShadow: `
                0 0 80px rgba(25, 118, 210, 0.7),
                0 0 150px rgba(77, 171, 245, 0.5),
                0 0 200px rgba(25, 118, 210, 0.3),
                inset 0 0 40px rgba(77, 171, 245, 0.3)
              `,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              border: '4px solid rgba(77, 171, 245, 0.6)',
              animation: 'pulse-glow 2.5s ease-in-out infinite',
              '@keyframes pulse-glow': {
                '0%, 100%': {
                  boxShadow: `
                    0 0 80px rgba(25, 118, 210, 0.7),
                    0 0 150px rgba(77, 171, 245, 0.5),
                    0 0 200px rgba(25, 118, 210, 0.3),
                    inset 0 0 40px rgba(77, 171, 245, 0.3)
                  `,
                  transform: 'scale(1)',
                },
                '50%': {
                  boxShadow: `
                    0 0 120px rgba(25, 118, 210, 0.9),
                    0 0 200px rgba(77, 171, 245, 0.7),
                    0 0 280px rgba(25, 118, 210, 0.5),
                    inset 0 0 60px rgba(77, 171, 245, 0.5)
                  `,
                  transform: 'scale(1.02)',
                },
              },
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Math Center Logo"
              sx={{
                width: { xs: 140, md: 180 },
                height: { xs: 140, md: 180 },
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 20px rgba(77, 171, 245, 0.6)) drop-shadow(0 0 40px rgba(25, 118, 210, 0.4))',
              }}
            />
          </Box>

          {/* Strength nodes */}
          {strengths.map((strength, index) => {
            const angleRad = (strength.angle * Math.PI) / 180;
            const radius = { xs: 160, md: 220 };
            const Icon = strength.icon;

            return (
              <Box
                key={index}
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: {
                    xs: `translate(-50%, -50%) translate(${Math.cos(angleRad) * radius.xs}px, ${Math.sin(angleRad) * radius.xs}px)`,
                    md: `translate(-50%, -50%) translate(${Math.cos(angleRad) * radius.md}px, ${Math.sin(angleRad) * radius.md}px)`,
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  animation: 'fade-in 0.5s ease-out forwards',
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                  '@keyframes fade-in': {
                    to: { opacity: 1 },
                  },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 50, md: 65 },
                    height: { xs: 50, md: 65 },
                    borderRadius: '50%',
                    background: 'linear-gradient(145deg, #1976d2, #42a5f5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(25, 118, 210, 0.4)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: '0 6px 30px rgba(25, 118, 210, 0.6)',
                    },
                  }}
                >
                  <Icon sx={{ color: '#fff', fontSize: { xs: 24, md: 32 } }} />
                </Box>
                <Typography
                  sx={{
                    color: '#fff',
                    fontSize: { xs: '0.7rem', md: '0.85rem' },
                    fontWeight: 500,
                    textAlign: 'center',
                    maxWidth: { xs: 80, md: 100 },
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  }}
                >
                  {strength.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default StrengthsSection;

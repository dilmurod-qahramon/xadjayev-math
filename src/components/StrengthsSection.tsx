import { Box, Container, Typography } from '@mui/material';
import logo from '@/assets/logo.svg';
import { School, EmojiEvents, Groups, TrendingUp, AccessTime, Psychology } from '@mui/icons-material';

const strengths = [
  { icon: School, label: "Tajribali o'qituvchilar", position: { top: '10%', left: '15%' } },
  { icon: EmojiEvents, label: "Yuqori natijalar", position: { top: '10%', right: '15%' } },
  { icon: Groups, label: "Individual yondashuv", position: { top: '45%', left: '5%' } },
  { icon: TrendingUp, label: "Kafolatlangan o'sish", position: { top: '45%', right: '5%' } },
  { icon: AccessTime, label: "Qulay jadval", position: { bottom: '10%', left: '15%' } },
  { icon: Psychology, label: "Zamonaviy metodlar", position: { bottom: '10%', right: '15%' } },
];

const StrengthsSection = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #0a1628 0%, #0d2847 50%, #0a1628 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            mb: 8,
            color: 'white',
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          Bizning <span style={{ color: '#4dabf5' }}>kuchli tomonlarimiz</span>
        </Typography>

        {/* Hub and Spokes Design */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: '500px', md: '450px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Connection Lines - SVG */}
          <Box
            component="svg"
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              zIndex: 1,
              display: { xs: 'none', md: 'block' },
            }}
          >
            {/* Lines from center to each strength */}
            <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#1976d2" strokeWidth="2" opacity="0.5" />
            <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#1976d2" strokeWidth="2" opacity="0.5" />
            <line x1="50%" y1="50%" x2="10%" y2="50%" stroke="#1976d2" strokeWidth="2" opacity="0.5" />
            <line x1="50%" y1="50%" x2="90%" y2="50%" stroke="#1976d2" strokeWidth="2" opacity="0.5" />
            <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#1976d2" strokeWidth="2" opacity="0.5" />
            <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#1976d2" strokeWidth="2" opacity="0.5" />
            
            {/* Animated dots on lines */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <circle key={i} r="4" fill="#4dabf5">
                <animateMotion
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path={`M${50},${50} L${[20, 80, 10, 90, 20, 80][i]},${[20, 20, 50, 50, 80, 80][i]}`}
                />
              </circle>
            ))}
          </Box>

          {/* Center Logo */}
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 140, md: 180 },
              height: { xs: 140, md: 180 },
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #0d2847, #1a3a5c)',
              boxShadow: '0 0 60px rgba(25, 118, 210, 0.5), 0 0 100px rgba(77, 171, 245, 0.3), inset 0 0 30px rgba(25, 118, 210, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              border: '3px solid rgba(77, 171, 245, 0.4)',
              animation: 'pulse-glow 3s ease-in-out infinite',
              '@keyframes pulse-glow': {
                '0%, 100%': {
                  boxShadow: '0 0 60px rgba(25, 118, 210, 0.5), 0 0 100px rgba(77, 171, 245, 0.3)',
                },
                '50%': {
                  boxShadow: '0 0 80px rgba(25, 118, 210, 0.7), 0 0 120px rgba(77, 171, 245, 0.5)',
                },
              },
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Math Center Logo"
              sx={{
                width: { xs: 90, md: 120 },
                height: { xs: 90, md: 120 },
                objectFit: 'contain',
              }}
            />
          </Box>

          {/* Strength Nodes */}
          {strengths.map((strength, index) => {
            const Icon = strength.icon;
            const angles = [
              { x: -35, y: -35 },  // top-left
              { x: 35, y: -35 },   // top-right
              { x: -42, y: 0 },    // left
              { x: 42, y: 0 },     // right
              { x: -35, y: 35 },   // bottom-left
              { x: 35, y: 35 },    // bottom-right
            ];
            
            return (
              <Box
                key={index}
                sx={{
                  position: 'absolute',
                  left: `calc(50% + ${angles[index].x}%)`,
                  top: `calc(50% + ${angles[index].y}%)`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  zIndex: 5,
                  animation: `fade-in 0.5s ease-out ${index * 0.1}s both`,
                  '@keyframes fade-in': {
                    from: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' },
                    to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
                  },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 60, md: 75 },
                    height: { xs: 60, md: 75 },
                    borderRadius: '50%',
                    background: 'linear-gradient(145deg, #1a3a5c, #0d2847)',
                    border: '2px solid rgba(77, 171, 245, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(25, 118, 210, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: '0 0 30px rgba(77, 171, 245, 0.5)',
                      border: '2px solid rgba(77, 171, 245, 0.6)',
                    },
                  }}
                >
                  <Icon sx={{ fontSize: { xs: 28, md: 35 }, color: '#4dabf5' }} />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                    textAlign: 'center',
                    fontSize: { xs: '0.7rem', md: '0.85rem' },
                    maxWidth: { xs: 80, md: 100 },
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
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

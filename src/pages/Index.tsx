import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import muiTheme from '@/theme/muiTheme';
import HeroSection from '@/components/HeroSection';
import ResultsSection from '@/components/ResultsSection';
import InstructorsSection from '@/components/InstructorsSection';
import ContactSection from '@/components/ContactSection';
import LogosSection from '@/components/LogosSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ overflow: 'hidden' }}>
        <HeroSection />
        <ResultsSection />
        <InstructorsSection />
        <ContactSection />
        <LogosSection />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Index;

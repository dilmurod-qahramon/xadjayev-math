import { Box, Container, Typography, Card, CardContent, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import { EmojiEvents, School, TrendingUp, Star } from '@mui/icons-material';

const results = [
  {
    icon: <EmojiEvents sx={{ fontSize: 32 }} />,
    stat: '150+',
    title: "Oliy o'quv yurtlariga kirganlar",
    description: "O'quvchilarimiz mamlakatning eng nufuzli universitetlariga muvaffaqiyatli kirishdi.",
  },
  {
    icon: <School sx={{ fontSize: 32 }} />,
    stat: '98%',
    title: "DTM natijasi 80+ ball",
    description: "Bizning o'quvchilarning aksariyati davlat test markazi imtihonlaridan yuqori ball olishadi.",
  },
  {
    icon: <TrendingUp sx={{ fontSize: 32 }} />,
    stat: '500+',
    title: "Bitiruvchilar soni",
    description: "Yillar davomida yuzlab o'quvchilarga matematikani puxta o'rgatdik.",
  },
  {
    icon: <Star sx={{ fontSize: 32 }} />,
    stat: '12',
    title: "Olimpiada g'oliblari",
    description: "O'quvchilarimiz respublika va xalqaro olimpiadalarda g'olib bo'lishgan.",
  },
];

const testimonials = [
  {
    name: 'Aziza Karimova',
    result: "DTM: 189 ball",
    quote: "Markazda o'qib, matematikadan qo'rqishni to'xtatdim. Hozir texnik universitetda talabaman.",
    avatar: 'A',
  },
  {
    name: 'Jasur Rahimov',
    result: "Respublika olimpiadasi 2-o'rin",
    quote: "Ustozlarimiz sabr-toqat bilan o'rgatishdi. Olimpiadada g'olib bo'lganimda juda xursand bo'ldim.",
    avatar: 'J',
  },
  {
    name: 'Nodira Tosheva',
    result: 'DTM: 195 ball',
    quote: "Bu markaz mening hayotimni o'zgartirdi. Matematikani endi chin dildan sevaman.",
    avatar: 'N',
  },
];

const ResultsSection = () => {
  return (
    <Box
      id="results"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        background: '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            NATIJALARIMIZ
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              color: 'text.primary',
              mb: 2,
            }}
          >
            O'quvchilarimiz yutuqlari
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Sifatli ta'lim va individual yondashuv orqali o'quvchilarimiz ajoyib natijalarga erishmoqda.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 10 }}>
          {results.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: '#f8f9fc',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 30px -8px rgba(59, 88, 168, 0.2)',
                    borderColor: 'primary.light',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #3b58a8 0%, #6078b9 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      color: '#fff',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '2.25rem',
                      color: 'primary.main',
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    {item.stat}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'text.primary',
                      fontSize: '1rem',
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Testimonials */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              color: 'text.primary',
            }}
          >
            O'quvchilarimiz fikrlari
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {testimonials.map((item, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  p: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: '#fff',
                }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      fontStyle: 'italic',
                      mb: 3,
                      lineHeight: 1.8,
                    }}
                  >
                    "{item.quote}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 48,
                        height: 48,
                      }}
                    >
                      {item.avatar}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: 'text.primary' }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'primary.main', fontWeight: 500 }}
                      >
                        {item.result}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ResultsSection;

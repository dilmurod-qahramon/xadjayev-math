import { Box, Container, Typography, Card, CardContent, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import { WorkspacePremium } from '@mui/icons-material';

const instructors = [
  {
    name: 'Abdullayev Farhod',
    role: "Katta o'qituvchi",
    experience: "15+ yillik tajriba",
    bio: "Toshkent Davlat Universitetini tamomlagan, matematika fanlari nomzodi. 200 dan ortiq o'quvchini oliy o'quv yurtlariga tayyorlagan.",
    avatar: 'AF',
  },
  {
    name: 'Rahimova Dilnoza',
    role: "Matematika o'qituvchisi",
    experience: "10+ yillik tajriba",
    bio: "Pedagogika universiteti bitiruvchisi. Olimpiada tayyorgarligi bo'yicha mutaxassis. Ko'plab respublika g'oliblarini tayyorlagan.",
    avatar: 'RD',
  },
  {
    name: 'Karimov Sherzod',
    role: "DTM tayyorlov mutaxassisi",
    experience: "8+ yillik tajriba",
    bio: "DTM imtihonlariga tayyorlash bo'yicha maxsus metodikalar muallifi. O'quvchilarning o'rtacha bali 180+.",
    avatar: 'KS',
  },
];

const InstructorsSection = () => {
  return (
    <Box
      id="instructors"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #f8f9fc 0%, #ffffff 100%)',
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
            USTOZLARIMIZ
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              color: 'text.primary',
              mb: 2,
            }}
          >
            Tajribali va mehribon ustozlar
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Bizning jamoamiz – bu o'z ishini sevadigan, har bir o'quvchiga individual yondashuvni ta'minlaydigan professional pedagoglar.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {instructors.map((instructor, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: '#fff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px -12px rgba(59, 88, 168, 0.2)',
                  },
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      mx: 'auto',
                      mb: 3,
                      bgcolor: 'primary.main',
                      fontSize: '1.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {instructor.avatar}
                  </Avatar>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    {instructor.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 500,
                      mb: 1,
                    }}
                  >
                    {instructor.role}
                  </Typography>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      bgcolor: 'secondary.main',
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <WorkspacePremium sx={{ fontSize: 16, color: 'primary.main' }} />
                    <Typography
                      variant="caption"
                      sx={{ color: 'primary.main', fontWeight: 500 }}
                    >
                      {instructor.experience}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.7,
                    }}
                  >
                    {instructor.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default InstructorsSection;

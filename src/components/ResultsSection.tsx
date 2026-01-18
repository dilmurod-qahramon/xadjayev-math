import { Box, Container, Typography, Avatar } from '@mui/material';
import { Card, CardContent } from './ui/card';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from './ui/carousel';
import { EmojiEvents, School, TrendingUp, Star } from '@mui/icons-material';

const results = [
    {
        icon: <EmojiEvents sx={{ fontSize: 32 }} />,
        stat: '150+',
        title: "Oliy o'quv yurtlariga kirganlar",
        description:
            "O'quvchilarimiz mamlakatning eng nufuzli universitetlariga muvaffaqiyatli kirishdi.",
    },
    {
        icon: <School sx={{ fontSize: 32 }} />,
        stat: '98%',
        title: 'DTM natijasi 80+ ball',
        description:
            "Bizning o'quvchilarning aksariyati davlat test markazi imtihonlaridan yuqori ball olishadi.",
    },
    {
        icon: <TrendingUp sx={{ fontSize: 32 }} />,
        stat: '500+',
        title: 'Bitiruvchilar soni',
        description:
            "Yillar davomida yuzlab o'quvchilarga matematikani puxta o'rgatdik.",
    },
    {
        icon: <Star sx={{ fontSize: 32 }} />,
        stat: '12',
        title: "Olimpiada g'oliblari",
        description:
            "O'quvchilarimiz respublika va xalqaro olimpiadalarda g'olib bo'lishgan.",
    },
];

const testimonials = [
    {
        name: 'Aziza Karimova',
        result: 'DTM: 189 ball',
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

// Helper arrays for images (outside component)
const dtmImages = [
    '1.png',
    '10.png',
    '12 (1).png',
    '13.png',
    '16 (1).png',
    '17.png',
    '6.png',
    '9 (1).png',
    '9.png',
];
const milliyImages = [
    '8.png',
    '12.png',
    '14.png',
    '15.png',
    '16.png',
    '18.png',
    '22.png',
    '23.png',
    '25.png',
    '26.png',
    '27.png',
    '3.png',
    '4.png',
];

// Helper to get image URL for Vite
const getImageUrl = (folder: 'dtm' | 'milliy', img: string) => {
    try {
        return new URL(`../assets/${folder}/${img}`, import.meta.url).href;
    } catch {
        return '';
    }
};

const ResultsSection = () => {
    return (
        <Box
            id='results'
            component='section'
            sx={{
                py: { xs: 10, md: 14 },
                background: '#ffffff',
            }}
        >
            <Container maxWidth='lg'>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography
                        variant='overline'
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
                        variant='h2'
                        sx={{
                            fontSize: { xs: '1.75rem', md: '2.5rem' },
                            color: 'text.primary',
                            mb: 2,
                        }}
                    >
                        O'quvchilarimiz yutuqlari
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            color: 'text.secondary',
                            maxWidth: 600,
                            mx: 'auto',
                        }}
                    >
                        Sifatli ta'lim va individual yondashuv orqali
                        o'quvchilarimiz ajoyib natijalarga erishmoqda.
                    </Typography>
                </Box>

                {/* Certificates Carousels in One Row */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 20,
                        mb: 10,
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                >
                    <Box sx={{ flex: 1, minWidth: 280, maxWidth: 500 }}>
                        <Typography
                            variant='h5'
                            sx={{
                                color: 'primary.main',
                                mb: 5,
                                fontWeight: 700,
                                textAlign: 'center',
                            }}
                        >
                            DTM Natijalari
                        </Typography>
                        <Box sx={{ position: 'relative' }}>
                            <Carousel>
                                <CarouselContent>
                                    {dtmImages.map((img, idx) => (
                                        <CarouselItem key={img}>
                                            <Box
                                                component='img'
                                                src={getImageUrl('dtm', img)}
                                                alt={`DTM natija ${idx + 1}`}
                                                sx={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    borderRadius: 3,
                                                    boxShadow: 3,
                                                }}
                                                onError={(e: any) => {
                                                    e.target.style.display =
                                                        'none';
                                                }}
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 280, maxWidth: 500 }}>
                        <Typography
                            variant='h5'
                            sx={{
                                color: 'primary.main',
                                mb: 5,
                                fontWeight: 700,
                                textAlign: 'center',
                            }}
                        >
                            Milliy Sertifikat Natijalari
                        </Typography>
                        <Box sx={{ position: 'relative' }}>
                            <Carousel>
                                <CarouselContent>
                                    {milliyImages.map((img, idx) => (
                                        <CarouselItem key={img}>
                                            <Box
                                                component='img'
                                                src={getImageUrl('milliy', img)}
                                                alt={`Milliy natija ${idx + 1}`}
                                                sx={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    borderRadius: 3,
                                                    boxShadow: 3,
                                                }}
                                                onError={(e: any) => {
                                                    e.target.style.display =
                                                        'none';
                                                }}
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 3,
                        mb: 10,
                        justifyContent: 'center',
                    }}
                >
                    {results.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: { xs: '100%', sm: '45%', md: '22%' },
                                minWidth: 220,
                                maxWidth: 300,
                                flex: '1 1 220px',
                                height: '100%',
                                textAlign: 'center',
                                p: 1,
                                border: '1px solid',
                                borderColor: 'divider',
                                background: '#f8f9fc',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow:
                                        '0 8px 30px -8px rgba(59, 88, 168, 0.2)',
                                    borderColor: 'primary.light',
                                },
                            }}
                        >
                            <Card>
                                <CardContent>
                                    <Box
                                        sx={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: '16px',
                                            background:
                                                'linear-gradient(135deg, #3b58a8 0%, #6078b9 100%)',
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
                                        variant='h3'
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
                                        variant='h6'
                                        sx={{
                                            color: 'text.primary',
                                            fontSize: '1rem',
                                            mb: 1,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        sx={{ color: 'text.secondary' }}
                                    >
                                        {item.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>

                {/* Testimonials */}
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <Typography
                        variant='h4'
                        sx={{
                            fontSize: { xs: '1.5rem', md: '1.75rem' },
                            color: 'text.primary',
                        }}
                    >
                        O'quvchilarimiz fikrlari
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 3,
                        justifyContent: 'center',
                    }}
                >
                    {testimonials.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: { xs: '100%', md: '30%' },
                                minWidth: 260,
                                maxWidth: 400,
                                flex: '1 1 260px',
                                height: '100%',
                                p: 1,
                                border: '1px solid',
                                borderColor: 'divider',
                                background: '#fff',
                                borderRadius: 2,
                                boxShadow: 1,
                            }}
                        >
                            <Card>
                                <CardContent>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            color: 'text.secondary',
                                            fontStyle: 'italic',
                                            mb: 3,
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        "{item.quote}"
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                    >
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
                                                variant='subtitle1'
                                                sx={{
                                                    fontWeight: 600,
                                                    color: 'text.primary',
                                                }}
                                            >
                                                {item.name}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                sx={{
                                                    color: 'primary.main',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {item.result}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default ResultsSection;

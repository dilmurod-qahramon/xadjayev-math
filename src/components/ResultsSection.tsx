import { useState, useEffect } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { EmojiEvents, School, TrendingUp, Star, ChevronLeft, ChevronRight } from '@mui/icons-material';

const results = [
    {
        icon: <EmojiEvents sx={{ fontSize: 28 }} />,
        stat: '150+',
        title: "Oliy o'quv yurtlariga kirganlar",
        description:
            "O'quvchilarimiz mamlakatning eng nufuzli universitetlariga muvaffaqiyatli kirishdi.",
    },
    {
        icon: <School sx={{ fontSize: 28 }} />,
        stat: '98%',
        title: 'DTM natijasi 80+ ball',
        description:
            "Bizning o'quvchilarning aksariyati davlat test markazi imtihonlaridan yuqori ball olishadi.",
    },
    {
        icon: <TrendingUp sx={{ fontSize: 28 }} />,
        stat: '500+',
        title: 'Bitiruvchilar soni',
        description:
            "Yillar davomida yuzlab o'quvchilarga matematikani puxta o'rgatdik.",
    },
    {
        icon: <Star sx={{ fontSize: 28 }} />,
        stat: '12',
        title: "Olimpiada g'oliblari",
        description:
            "O'quvchilarimiz respublika va xalqaro olimpiadalarda g'olib bo'lishgan.",
    },
];

const dtmImages = [
    '1.png', '10.png', '12 (1).png', '13.png', '16 (1).png', '17.png', '6.png', '9 (1).png', '9.png',
];
const milliyImages = [
    '8.png', '12.png', '14.png', '15.png', '16.png', '18.png', '22.png', '23.png', '25.png', '26.png', '27.png', '3.png', '4.png',
];

const getImageUrl = (folder: 'dtm' | 'milliy', img: string) => {
    try {
        return new URL(`../assets/${folder}/${img}`, import.meta.url).href;
    } catch {
        return '';
    }
};

interface ImageCarouselProps {
    images: string[];
    folder: 'dtm' | 'milliy';
    title: string;
}

const ImageCarousel = ({ images, folder, title }: ImageCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, images.length]);

    const goToPrev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToSlide = (index: number) => {
        setIsAutoPlaying(false);
        setCurrentIndex(index);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto' }}>
            <Typography
                variant='h6'
                sx={{
                    color: 'text.primary',
                    mb: 3,
                    fontWeight: 600,
                    textAlign: 'center',
                    fontSize: { xs: '1rem', md: '1.125rem' },
                }}
            >
                {title}
            </Typography>
            
            <Box
                sx={{
                    position: 'relative',
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: '#f8fafc',
                    boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)',
                }}
            >
                {/* Main Image */}
                <Box
                    sx={{
                        position: 'relative',
                        aspectRatio: '4/5',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        component='img'
                        src={getImageUrl(folder, images[currentIndex])}
                        alt={`${title} ${currentIndex + 1}`}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'opacity 0.3s ease',
                        }}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    
                    {/* Navigation Arrows */}
                    <IconButton
                        onClick={goToPrev}
                        sx={{
                            position: 'absolute',
                            left: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(255,255,255,0.9)',
                            backdropFilter: 'blur(4px)',
                            width: 36,
                            height: 36,
                            '&:hover': {
                                bgcolor: 'white',
                            },
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        }}
                    >
                        <ChevronLeft sx={{ fontSize: 20, color: 'text.primary' }} />
                    </IconButton>
                    
                    <IconButton
                        onClick={goToNext}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'rgba(255,255,255,0.9)',
                            backdropFilter: 'blur(4px)',
                            width: 36,
                            height: 36,
                            '&:hover': {
                                bgcolor: 'white',
                            },
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        }}
                    >
                        <ChevronRight sx={{ fontSize: 20, color: 'text.primary' }} />
                    </IconButton>

                    {/* Counter Badge */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 12,
                            right: 12,
                            bgcolor: 'rgba(0,0,0,0.6)',
                            color: 'white',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: '0.75rem',
                            fontWeight: 500,
                        }}
                    >
                        {currentIndex + 1} / {images.length}
                    </Box>
                </Box>

                {/* Dot Indicators */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 0.75,
                        py: 2,
                        bgcolor: 'white',
                    }}
                >
                    {images.slice(0, 7).map((_, idx) => (
                        <Box
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            sx={{
                                width: currentIndex === idx ? 20 : 8,
                                height: 8,
                                borderRadius: 4,
                                bgcolor: currentIndex === idx ? 'primary.main' : '#e2e8f0',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    bgcolor: currentIndex === idx ? 'primary.main' : '#cbd5e1',
                                },
                            }}
                        />
                    ))}
                    {images.length > 7 && (
                        <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', ml: 0.5 }}>
                            +{images.length - 7}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

const ResultsSection = () => {
    return (
        <Box
            id='results'
            component='section'
            sx={{
                py: { xs: 8, md: 12 },
                background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
            }}
        >
            <Container maxWidth='lg'>
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
                    <Typography
                        variant='overline'
                        sx={{
                            color: 'primary.main',
                            fontWeight: 600,
                            letterSpacing: 2,
                            mb: 1,
                            display: 'block',
                            fontSize: '0.75rem',
                        }}
                    >
                        NATIJALARIMIZ
                    </Typography>
                    <Typography
                        variant='h2'
                        sx={{
                            fontSize: { xs: '1.75rem', md: '2.25rem' },
                            color: 'text.primary',
                            fontWeight: 700,
                            mb: 2,
                        }}
                    >
                        O'quvchilarimiz yutuqlari
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            color: 'text.secondary',
                            maxWidth: 520,
                            mx: 'auto',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            lineHeight: 1.7,
                        }}
                    >
                        Sifatli ta'lim va individual yondashuv orqali
                        o'quvchilarimiz ajoyib natijalarga erishmoqda.
                    </Typography>
                </Box>

                {/* Stats Cards */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)',
                        },
                        gap: { xs: 2, md: 3 },
                        mb: { xs: 8, md: 10 },
                    }}
                >
                    {results.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: 'relative',
                                p: { xs: 2.5, md: 3 },
                                borderRadius: 3,
                                bgcolor: 'white',
                                border: '1px solid',
                                borderColor: '#e2e8f0',
                                textAlign: 'center',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                overflow: 'hidden',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 24px -8px rgba(59, 88, 168, 0.15)',
                                    borderColor: 'primary.light',
                                    '& .stat-icon': {
                                        transform: 'scale(1.1)',
                                    },
                                },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: 3,
                                    background: 'linear-gradient(90deg, #3b58a8 0%, #6078b9 100%)',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease',
                                },
                                '&:hover::before': {
                                    opacity: 1,
                                },
                            }}
                        >
                            <Box
                                className="stat-icon"
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #3b58a8 0%, #6078b9 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 2,
                                    color: '#fff',
                                    transition: 'transform 0.3s ease',
                                    boxShadow: '0 4px 12px -2px rgba(59, 88, 168, 0.3)',
                                }}
                            >
                                {item.icon}
                            </Box>
                            <Typography
                                variant='h3'
                                sx={{
                                    fontSize: { xs: '1.75rem', md: '2rem' },
                                    color: 'primary.main',
                                    fontWeight: 700,
                                    mb: 0.5,
                                    lineHeight: 1,
                                }}
                            >
                                {item.stat}
                            </Typography>
                            <Typography
                                variant='subtitle2'
                                sx={{
                                    color: 'text.primary',
                                    fontSize: { xs: '0.8rem', md: '0.875rem' },
                                    fontWeight: 600,
                                    mb: 1,
                                    lineHeight: 1.3,
                                }}
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: { xs: '0.7rem', md: '0.75rem' },
                                    lineHeight: 1.5,
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                {item.description}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* Certificates Carousels */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography
                        variant='h4'
                        sx={{
                            fontSize: { xs: '1.25rem', md: '1.5rem' },
                            color: 'text.primary',
                            fontWeight: 600,
                        }}
                    >
                        Sertifikatlar va natijalar
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: { xs: 4, md: 6 },
                        maxWidth: 900,
                        mx: 'auto',
                    }}
                >
                    <ImageCarousel
                        images={dtmImages}
                        folder="dtm"
                        title="DTM Natijalari"
                    />
                    <ImageCarousel
                        images={milliyImages}
                        folder="milliy"
                        title="Milliy Sertifikat Natijalari"
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default ResultsSection;

import React from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    AppBar,
    Toolbar,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HubIcon from '@mui/icons-material/Hub';
import SecurityIcon from '@mui/icons-material/Security';
import StarIcon from '@mui/icons-material/Star';
import WorkIcon from '@mui/icons-material/Work';

import Footer from './Footer';
import './HomePage.css';

import BannerVideo from '../assets/images/Archive.mp4';
import ArchiveLogo from '../assets/images/Archive.png';
import BannerImage from '../assets/images/Banner.png';

import Img1 from '../assets/images/1.png';
import Img2 from '../assets/images/2.png';
import Img3 from '../assets/images/3.png';
import Img4 from '../assets/images/4.png';
import Img5 from '../assets/images/5.png';

const HomePage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleStartClick = () => {
        navigate('/login');
    };

    const iconStyle = (color) => ({
        fontSize: 60,
        color,
        mb: 2
    });

    return (
        <Box className="home-page-container">
            <AppBar
                position="sticky"
                elevation={4}
                sx={{ background: theme.palette.background.paper, color: theme.palette.text.primary }}
            >
                <Toolbar>
                    <Box
                        component="img"
                        src={ArchiveLogo}
                        alt="Isekai Archive Logo"
                        sx={{
                            height: 40,
                            mr: 2,
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/')}
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, fontWeight: 'bold' }}
                    >
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button color="inherit" onClick={() => navigate('/')}>홈</Button>
                        <Button color="inherit" onClick={() => navigate('/pricing')}>가격</Button>
                        <Button color="inherit" onClick={() => navigate('/contact')}>문의</Button>
                        <Button variant="contained" onClick={handleStartClick} sx={{ ml: 2 }}>
                            로그인
                        </Button>
                    </Box>
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <Button color="inherit" onClick={handleStartClick}>로그인</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ pt: 4 }}>
                <Box className="hero-section" sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
                    <Box
                        component="video"
                        src={BannerVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            zIndex: 0,
                        }}
                    />
                    <Box sx={{ position: 'relative', zIndex: 1, p: 4, color: '#fff', textAlign: 'center' }}>
                        <Typography
                            variant={isMobile ? "h4" : "h2"}
                            component="h1"
                            gutterBottom
                            sx={{ fontWeight: 'bold' }}
                        >
                            현실과는 다른 차원의 업무 공간
                        </Typography>
                        <Typography
                            variant={isMobile ? "h6" : "h5"}
                            component="h2"
                            paragraph
                            sx={{ mb: 4 }}
                        >
                            <strong>Isekai Archive</strong>는 현실의 제약을 벗어난 새로운 차원의 협업 환경을 제공합니다.
                            <br />
                            당신의 모든 아이디어와 지식을 하나의 기록 보관소에 모으고 공유하세요.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForwardIcon />}
                            onClick={handleStartClick}
                            className="cta-button"
                        >
                            모험 시작하기
                        </Button>
                    </Box>
                </Box>

                <Box className="section-spacing">
                    <Typography
                        variant="h4"
                        textAlign="center"
                        gutterBottom
                        sx={{ mb: 6, fontWeight: 'bold' }}
                    >
                        이세계 아카이브가 드리는 특별한 경험
                    </Typography>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Box className="feature-card">
                                <AutoStoriesIcon sx={iconStyle(theme.palette.secondary.main)} />
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    무한한 지식의 기록
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    업무 문서, 프로젝트 노트, 회의록 등 모든 정보를 체계적으로 기록하고 보관하세요. 어떤 정보도 잃어버리지 않습니다.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box className="feature-card">
                                <HubIcon sx={iconStyle(theme.palette.primary.main)} />
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    유기적인 협업의 연결
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    팀원들과 실시간으로 지식과 아이디어를 공유하며, 서로의 기록을 바탕으로 더 큰 시너지를 만들어냅니다.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box className="section-spacing" sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                        당신의 모험을 돕는 강력한 도구 🛠️
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 700, mx: 'auto', mb: 6 }}
                    >
                        Isekai Archive는 기록과 협업을 넘어, 업무의 모든 순간을 지원하는 혁신적인 기능을 제공합니다.
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Card className="solution-card">
                                <CardContent>
                                    <AutoStoriesIcon sx={iconStyle(theme.palette.info.main)} />
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        지식 아카이빙
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        문서, 파일, 링크 등을 손쉽게 분류하고 검색할 수 있는 강력한 기록 시스템.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card className="solution-card">
                                <CardContent>
                                    <WorkIcon sx={iconStyle(theme.palette.success.main)} />
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        이세계 업무 관리
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        전자결재, 프로젝트, 일정 등 현실의 복잡한 업무를 가볍고 빠르게 처리하세요.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card className="solution-card">
                                <CardContent>
                                    <SecurityIcon sx={iconStyle(theme.palette.warning.main)} />
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        안전한 보관소
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        당신의 소중한 기록은 최고 수준의 보안으로 안전하게 보호됩니다.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                <Box className="section-spacing">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                                왜 이세계 아카이브인가요?
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                기존의 딱딱하고 복잡한 그룹웨어는 잊으세요.
                                <strong>Isekai Archive</strong>는 사용자가 마치 새로운 세계에 들어온 것처럼 직관적이고 즐거운 경험을 제공합니다.
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                모든 기능이 유기적으로 연결되어, 정보의 흐름이 끊기지 않는 새로운 차원의 업무 방식을 경험할 수 있습니다.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                className="placeholder-image"
                                role="img"
                                aria-label="마법진처럼 빛나는 대시보드 UI"
                                sx={{ height: '100%' }}
                            >
                                <Box
                                    component="img"
                                    src={BannerImage}
                                    alt="Isekai Archive Dashboard"
                                    sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box className="cta-section">
                    <StarIcon sx={iconStyle(theme.palette.primary.main)} />
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                        새로운 세계를 탐험하세요.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                        지금 무료 체험을 시작하고, <strong>Isekai Archive</strong>와 함께 당신의 업무를 혁신하세요.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        onClick={handleStartClick}
                        className="cta-button"
                    >
                        무료 체험 신청하기
                    </Button>
                </Box>
            </Container>

            <Footer />
        </Box>
    );
};

export default HomePage;

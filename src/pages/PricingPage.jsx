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
    useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Footer from './Footer';
import ArchiveLogo from '../assets/images/Archive.png';

const PricingPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
            {/* Header */}
            <AppBar position="sticky" elevation={4} sx={{ background: theme.palette.background.paper, color: theme.palette.text.primary }}>
                <Toolbar>
                    <Box
                        component="img"
                        src={ArchiveLogo}
                        alt="Isekai Archive Logo"
                        sx={{ height: 40, mr: 2, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}></Typography>
                    <Button color="inherit" onClick={() => navigate('/')}>홈</Button>
                    <Button color="inherit" onClick={() => navigate('/contact')}>문의</Button>
                    <Button variant="contained" onClick={() => navigate('/login')} sx={{ ml: 2 }}>로그인</Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    이세계 아카이브 가격 정책
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 6 }}>
                    모두에게 열린 새로운 차원의 기록 공간.
                </Typography>

                <Card sx={{ p: 4, borderRadius: 3, boxShadow: 6, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                            <TravelExploreIcon sx={{ fontSize: 80, color: theme.palette.primary.main }} />
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 1 }}>
                            무료 플랜
                        </Typography>
                        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                            0원
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Isekai Archive는 상용화되지 않은 풀스택 프로젝트입니다.
                            <br />
                            따라서 모든 기능은 개발 목적으로 무료로 제공되며, 자유롭게 사용하고 탐험할 수 있습니다.
                        </Typography>
                        <Grid container spacing={2} sx={{ mb: 4 }}>
                            <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    <CheckCircleIcon color="success" fontSize="small" />
                                    모든 핵심 기능 무제한 이용
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    <CheckCircleIcon color="success" fontSize="small" />
                                    무제한 사용자, 무제한 저장 공간
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    <CheckCircleIcon color="success" fontSize="small" />
                                    상시 기술 지원 및 업데이트
                                </Typography>
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForwardIcon />}
                            onClick={() => navigate('/login')}
                            sx={{ mt: 2 }}
                        >
                            무료로 시작하기
                        </Button>
                    </CardContent>
                </Card>
            </Container>
            <Footer />
        </Box>
    );
};

export default PricingPage;
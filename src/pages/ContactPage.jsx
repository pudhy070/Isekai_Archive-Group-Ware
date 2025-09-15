import React from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    AppBar,
    Toolbar,
    useTheme,
    Link,
    IconButton,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

import Footer from './Footer';
import ArchiveLogo from '../assets/images/Archive.png';

const ContactPage = () => {
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
                    <Button color="inherit" onClick={() => navigate('/pricing')}>가격</Button>
                    <Button variant="contained" onClick={() => navigate('/login')} sx={{ ml: 2 }}>로그인</Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    문의하기
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 6 }}>
                    Isekai Archive는 개인 포트폴리오 프로젝트입니다.
                </Typography>

                <Box sx={{ p: 4, borderRadius: 3, backgroundColor: theme.palette.background.paper, boxShadow: 3 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
                        개발자 소개
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        안녕하세요, 이 프로젝트를 개발한 Sia 입니다.
                        <br />
                        Isekai Archive에 관심을 가져주셔서 감사합니다.
                        Isekai Archive는 업무와 협업의 세계를 새로운 모험처럼 즐기며 기록할 수 있는 공간입니다.
                        팀의 모든 지식과 아이디어를 한곳에 모아 쉽게 찾아보고 공유할 수 있습니다.
                        당신의 업무 여정을 더욱 흥미롭고 효율적으로 만들어 줍니다.
                    </Typography>

                    <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                        <Grid item>
                            <Link href="https://github.com/" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ textDecoration: 'none' }}>
                                <IconButton color="primary" sx={{ border: '1px solid', borderColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.light } }}>
                                    <GitHubIcon />
                                </IconButton>
                                <Typography variant="caption" display="block">GitHub</Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="@example.com" color="inherit" sx={{ textDecoration: 'none' }}>
                                <IconButton color="primary" sx={{ border: '1px solid', borderColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.light } }}>
                                    <EmailIcon />
                                </IconButton>
                                <Typography variant="caption" display="block">Email</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" color="text.secondary">
                        기술 스택: React, Vite, MUI, Spring Boot, Docker, AWS, Arch Linux
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        현재 FE쪽만 되어있습니다. BE 개발 다 되는 즉시 배포가 됩니다.
                    </Typography>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default ContactPage;
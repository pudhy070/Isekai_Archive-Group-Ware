import React, { useState, useEffect } from "react";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Link,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Alert,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    Divider
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import WorkIcon from "@mui/icons-material/Work";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const icons = [
    <ArchiveIcon fontSize="inherit" />,
    <MailIcon fontSize="inherit" />,
    <PersonIcon fontSize="inherit" />,
    <DescriptionIcon fontSize="inherit" />,
    <VolumeUpIcon fontSize="inherit" />,
    <WorkIcon fontSize="inherit" />,
];

const LoginPage = ({ setIsAuthenticated, setUser }) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [gridIcons, setGridIcons] = useState([]);
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [openTestAccountsDialog, setOpenTestAccountsDialog] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [loginMessage, setLoginMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const calculateIconCount = () => {
            const cellSize = 80;
            const cols = Math.ceil(window.innerWidth / cellSize);
            const rows = Math.ceil(window.innerHeight / cellSize);
            const totalIcons = cols * rows + 20;

            const iconArray = Array.from({ length: totalIcons }, (_, i) => ({
                id: i,
                icon: icons[Math.floor(Math.random() * icons.length)],
                delay: Math.random() * 8,
            }));

            setGridIcons(iconArray);
        };

        calculateIconCount();
        window.addEventListener('resize', calculateIconCount);

        return () => window.removeEventListener('resize', calculateIconCount);
    }, []);

    useEffect(() => {
        const savedUsers = localStorage.getItem('loginUsers');
        if (savedUsers) {
            setRegisteredUsers(JSON.parse(savedUsers));
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoginMessage(null);
        setIsLoading(true);

        setTimeout(() => {

            if (id === 'archive' && password === 'test1234') {
                const adminUser = {
                    name: '관리자',
                    email: 'archive@Isekai-archive.com',
                    department: '경영지원본부',
                    role: '관리자'
                };

                setUser(adminUser);
                setIsAuthenticated(true);

                sessionStorage.setItem('user', JSON.stringify(adminUser));

                navigate("/main");
                return;
            }

            const userEmail = id.includes('@') ? id : `${id}@Isekai-archive.com`;
            const foundUser = registeredUsers.find(user =>
                user.email === userEmail && user.password === password
            );

            if (foundUser) {
                const userInfo = {
                    name: foundUser.name,
                    email: foundUser.email,
                    department: foundUser.department,
                    role: foundUser.role
                };

                setUser(userInfo);
                setIsAuthenticated(true);

                sessionStorage.setItem('user', JSON.stringify(userInfo));

                navigate("/main");
            } else {
                setLoginMessage({
                    severity: "error",
                    message: "아이디 또는 비밀번호가 올바르지 않습니다."
                });
            }
            setIsLoading(false);
        }, 500);
    };

    const handlePasswordReset = () => {
        if (resetEmail.trim()) {
            console.log("비밀번호 재설정 요청:", resetEmail);
            setLoginMessage({
                severity: "success",
                message: "비밀번호 재설정 링크가 이메일로 전송되었습니다."
            });
            setOpenPasswordDialog(false);
            setResetEmail("");
        }
    };

    const handleTestLogin = (user) => {
        setId(user.email.split('@')[0]);
        setPassword(user.password);
        setOpenTestAccountsDialog(false);
    };

    return (
        <div className="login-background">
            <div className="grid">
                {gridIcons.map((item) => (
                    <div
                        key={item.id}
                        className="grid-cell"
                        style={{ '--random-delay': `${item.delay}s` }}
                    >
                        {item.icon}
                    </div>
                ))}
            </div>

            <Container
                component="main"
                maxWidth="xs"
                sx={{ zIndex: 100, position: 'relative' }}
            >
                <Box className="login-container">
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                    <Typography className="login-subtitle">
                        Isekai Archive에 오신 것을 환영합니다.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} className="login-form">
                        {loginMessage && (
                            <Alert severity={loginMessage.severity} sx={{ mt: 2, mb: 1 }}>
                                {loginMessage.message}
                            </Alert>
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="id"
                            label="아이디 입력"
                            name="id"
                            autoComplete="username"
                            autoFocus
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            variant="outlined"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">@Isekai-archive.com</InputAdornment>
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호 입력"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className="login-button"
                            disabled={isLoading}
                        >
                            {isLoading ? '로그인 중...' : '로그인'}
                        </Button>
                        <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                            <Grid item>
                                <Link
                                    href="#"
                                    variant="body2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenTestAccountsDialog(true);
                                    }}
                                >
                                    테스트 계정 보기
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    href="#"
                                    variant="body2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenPasswordDialog(true);
                                    }}
                                >
                                    비밀번호 찾기
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>

            <Dialog
                open={openTestAccountsDialog}
                onClose={() => setOpenTestAccountsDialog(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
                    <InfoIcon sx={{ mr: 1 }} />
                    사용 가능한 테스트 계정
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                        아래 계정을 클릭하면 자동으로 로그인 정보가 입력됩니다.
                    </Typography>

                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>기본 관리자 계정</Typography>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        <Typography variant="body2">
                            <strong>아이디:</strong> archive<br />
                            <strong>비밀번호:</strong> test1234
                        </Typography>
                    </Alert>

                    {registeredUsers.length > 0 && (
                        <>
                            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>등록된 계정 ({registeredUsers.length}개)</Typography>
                            <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                                {registeredUsers.map((user, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem
                                            button
                                            onClick={() => handleTestLogin(user)}
                                            sx={{
                                                border: '1px solid #e0e0e0',
                                                borderRadius: 1, mb: 1,
                                                '&:hover': { backgroundColor: 'action.hover' }
                                            }}
                                        >
                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
                                                        <Typography variant="caption" sx={{ backgroundColor: 'primary.main', color: 'white', px: 1, borderRadius: 1 }}>{user.role}</Typography>
                                                    </Box>
                                                }
                                                secondary={
                                                    <Box>
                                                        <Typography variant="body2"><strong>이메일:</strong> {user.email}</Typography>
                                                        <Typography variant="body2"><strong>부서:</strong> {user.department}</Typography>
                                                        <Typography variant="body2"><strong>비밀번호:</strong> {user.password}</Typography>
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                        {index < registeredUsers.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </>
                    )}

                    {registeredUsers.length === 0 && (
                        <Alert severity="warning" sx={{ mt: 2 }}>
                            등록된 계정이 없습니다. 관리자 대시보드에서 새 계정을 생성해주세요.
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenTestAccountsDialog(false)}>닫기</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openPasswordDialog}
                onClose={() => setOpenPasswordDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>비밀번호 찾기</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        가입 시 사용한 이메일 주소를 입력해주세요.
                        비밀번호 재설정 링크를 이메일로 보내드립니다.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="이메일 주소"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="example@email.com"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPasswordDialog(false)} color="inherit">취소</Button>
                    <Button
                        onClick={handlePasswordReset}
                        variant="contained"
                        disabled={!resetEmail.trim()}
                        sx={{
                            backgroundColor: '#0091cf',
                            '&:hover': { backgroundColor: '#007bb0' }
                        }}
                    >
                        전송
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LoginPage;

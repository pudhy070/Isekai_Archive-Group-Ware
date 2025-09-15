import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    IconButton,
    Badge,
    Popover,
    List,
    ListItem,
    ListItemText,
    Divider,
    Menu,
    MenuItem,
    ListItemIcon,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Switch,
    FormControlLabel,
    TextField,
    Alert,
    CircularProgress,
    Avatar
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import logoImage from '../assets/images/Archive.png';
import axios from 'axios';

const NotificationPopover = ({ open, anchorEl, onClose }) => {
    const notifications = [
        { id: 1, message: '휴가 신청서가 승인되었습니다.', time: '1시간 전' },
        { id: 2, message: '전사 워크샵 일정이 등록되었습니다.', time: '3시간 전' },
        { id: 3, message: '새로운 공지사항이 등록되었습니다.', time: '어제' },
    ];
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ sx: { width: 360, mt: 1.5, boxShadow: 3, borderRadius: '12px' } }}
        >
            <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>알림</Typography>
            </Box>
            <List sx={{ p: 0 }}>
                {notifications.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <ListItem button sx={{ py: 1.5 }}>
                            <ListItemText primary={item.message} secondary={item.time} />
                        </ListItem>
                        {index < notifications.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
            <Box sx={{ p: 1, borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
                <Button size="small" fullWidth>모든 알림 보기</Button>
            </Box>
        </Popover>
    );
};

const ProfileMenu = ({ open, anchorEl, onClose, onProfileClick, onSettingsClick, onLogout }) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{ sx: { mt: 1.5, boxShadow: 3, borderRadius: '12px', width: 180 } }}
        >
            <MenuItem onClick={onProfileClick}>
                <ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>
                프로필
            </MenuItem>
            <MenuItem onClick={onSettingsClick}>
                <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
                설정
            </MenuItem>
            <Divider />
            <MenuItem onClick={onLogout}>
                <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                로그아웃
            </MenuItem>
        </Menu>
    );
};

const ProfileEditModal = ({ open, onClose, user, onProfileUpdate }) => {
    const [name, setName] = useState(user?.name || '');
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setAvatarUrl(user.avatarUrl);
        }
    }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        setMessage(null);
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.put('http://localhost:8080/api/users/me', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });

            onProfileUpdate(response.data);
            setMessage({ severity: 'success', text: '프로필이 성공적으로 업데이트되었습니다!' });
            onClose();
        } catch (error) {
            console.error('프로필 업데이트 실패:', error.response ? error.response.data : error.message);
            setMessage({ severity: 'error', text: `업데이트 실패: ${error.response?.data}` });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component="div" variant="h6">프로필 수정</Typography>
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {message && <Alert severity={message.severity} sx={{ mb: 2 }}>{message.text}</Alert>}
                {user ? (
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <label htmlFor="icon-button-file">
                                        <input
                                            accept="image/*"
                                            id="icon-button-file"
                                            type="file"
                                            hidden
                                            onChange={handleFileChange}
                                        />
                                        <IconButton component="span" sx={{ p: 0.5, backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'grey.200' } }}>
                                            <PhotoCameraIcon fontSize="small" />
                                        </IconButton>
                                    </label>
                                }
                            >
                                <Avatar src={avatarUrl} sx={{ width: 80, height: 80 }} />
                            </Badge>
                        </Box>
                        <TextField
                            label="이름"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mb: 2 }}
                            disabled={isLoading}
                        />
                        <TextField
                            label="이메일"
                            fullWidth
                            value={user.email}
                            disabled
                        />
                    </>
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                        <CircularProgress />
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isLoading}>취소</Button>
                <Button onClick={handleSave} variant="contained" color="primary" disabled={isLoading || !user}>
                    {isLoading ? <CircularProgress size={24} /> : '저장'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const SettingsModal = ({ open, onClose, darkMode, setDarkMode, autoLogin, setAutoLogin }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">설정</Typography>
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <FormControlLabel
                    control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />}
                    label="다크 모드"
                />
                <Divider sx={{ my: 1 }} />
                <FormControlLabel
                    control={<Switch checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)} />}
                    label="자동 로그인"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>닫기</Button>
            </DialogActions>
        </Dialog>
    );
};

const Header = ({ darkMode, setDarkMode, autoLogin, setAutoLogin, isAuthenticated, setIsAuthenticated, user, setUser }) => {
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [profileEditModalOpen, setProfileEditModalOpen] = useState(false);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleProfileUpdate = (updatedUser) => {
        setUser(updatedUser);
    };

    const handleLogout = () => {
        handleProfileMenuClose();

        setIsAuthenticated(false);
        setUser(null);

        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');

        navigate('/login', { replace: true });
    };

    const handleNotificationClick = (event) => setNotificationAnchorEl(event.currentTarget);
    const handleNotificationClose = () => setNotificationAnchorEl(null);
    const handleProfileMenuClick = (event) => setProfileAnchorEl(event.currentTarget);
    const handleProfileMenuClose = () => setProfileAnchorEl(null);
    const handleProfileEditClick = () => {
        setProfileEditModalOpen(true);
        handleProfileMenuClose();
    };
    const handleSettingsClick = () => {
        setSettingsModalOpen(true);
        handleProfileMenuClose();
    };
    const openNotification = Boolean(notificationAnchorEl);
    const openProfile = Boolean(profileAnchorEl);

    const menuItems = [
        { text: '대시보드', path: '/main' },
        { text: '공지사항', path: '/notices' },
        { text: '일정관리', path: '/schedule' },
        { text: '전자결재', path: '/approval' },
        { text: '주소록', path: '/contacts' },
    ];

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar>
                    <Box
                        component={NavLink}
                        to="/main"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={logoImage} alt="Sia Box Alpha Logo" style={{ height: '60px' }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        {menuItems.map((item) => (
                            <Button
                                key={item.text}
                                component={NavLink}
                                to={item.path}
                                sx={{
                                    my: 2,
                                    mx: 1,
                                    color: 'inherit',
                                    display: 'block',
                                    fontSize: '1.1rem',
                                    fontWeight: 500,
                                    '&.active': {
                                        fontWeight: 'bold',
                                        color: 'primary.main',
                                        borderBottom: '2px solid',
                                        borderColor: 'primary.main',
                                        borderRadius: 0,
                                    }
                                }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                    <Box>
                        <IconButton size="large" color="inherit" onClick={handleNotificationClick}>
                            <Badge badgeContent={3} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" color="inherit" onClick={handleProfileMenuClick}>
                            <Avatar src={user?.avatarUrl} sx={{ width: 32, height: 32 }} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <NotificationPopover
                open={openNotification}
                anchorEl={notificationAnchorEl}
                onClose={handleNotificationClose}
            />
            <ProfileMenu
                open={openProfile}
                anchorEl={profileAnchorEl}
                onClose={handleProfileMenuClose}
                onProfileClick={handleProfileEditClick}
                onSettingsClick={handleSettingsClick}
                onLogout={handleLogout}
            />
            {profileEditModalOpen && (
                <ProfileEditModal
                    open={profileEditModalOpen}
                    onClose={() => setProfileEditModalOpen(false)}
                    user={user}
                    onProfileUpdate={handleProfileUpdate}
                />
            )}
            <SettingsModal
                open={settingsModalOpen}
                onClose={() => setSettingsModalOpen(false)}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                autoLogin={autoLogin}
                setAutoLogin={setAutoLogin}
            />
        </>
    );
};

export default Header;
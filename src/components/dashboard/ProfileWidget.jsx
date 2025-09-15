import React, { useState, useEffect } from 'react';
import {
    Paper,
    Box,
    Avatar,
    Button,
    Badge,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

import WidgetHeader from './WidgetHeader';

const ProfileDetailModal = ({ open, onClose, user }) => {
    if (!user) return null;
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                내 정보 상세
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <List>
                    <ListItem><ListItemText primary="이름" secondary={user.name} /></ListItem>
                    <ListItem><ListItemText primary="소속" secondary={user.department} /></ListItem>
                    <ListItem><ListItemText primary="직급" secondary={user.role} /></ListItem>
                    <ListItem><ListItemText primary="이메일" secondary={user.email} /></ListItem>
                </List>
            </DialogContent>
            <DialogActions><Button onClick={onClose}>닫기</Button></DialogActions>
        </Dialog>
    );
};

const StyledBadge = styled(Badge)(({ theme, badgecolor }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: badgecolor,
        color: badgecolor,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': { transform: 'scale(.8)', opacity: 1 },
        '100%': { transform: 'scale(2.4)', opacity: 0 },
    },
}));

const ProfileWidget = ({ currentStatus, statusOptions, setCurrentStatus, user, setIsAuthenticated, setUser }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [lastActiveStatus, setLastActiveStatus] = useState('green');
    const navigate = useNavigate();

    useEffect(() => {
        if (currentStatus !== 'black') {
            setLastActiveStatus(currentStatus);
        }
    }, [currentStatus]);

    const currentStatusInfo = statusOptions.find(opt => opt.id === currentStatus);
    const statusColor = currentStatusInfo?.color || '#ccc';
    const statusTitle = currentStatusInfo?.title || '알 수 없음';

    const handleCheckIn = () => setCurrentStatus(lastActiveStatus);
    
    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);

        sessionStorage.removeItem('user');

        navigate('/login');
    };

    if (!user) {
        return (
            <Paper className="widget-card" sx={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Paper>
        );
    }

    return (
        <>
            <Paper className="widget-card">
                <WidgetHeader title="내 정보" onMoreClick={() => setModalOpen(true)} />
                <Box className="profile-info-box">
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        badgecolor={statusColor}
                    >
                        <Avatar className="profile-avatar" src={user.avatarUrl} />
                    </StyledBadge>
                    <Box className="profile-details">
                        <p className="profile-name">{user.name}</p>
                        <p className="profile-company">{user.department}</p>
                        <Typography variant="caption" sx={{ color: statusColor, fontWeight: 'bold' }}>
                            {statusTitle}
                        </Typography>
                    </Box>
                </Box>
                <Box className="profile-buttons">
                    <Button fullWidth variant="contained" size="large" onClick={handleCheckIn}>출근</Button>
                   
                    <Button fullWidth variant="outlined" size="large" onClick={handleLogout}>로그아웃</Button>
                </Box>
            </Paper>
            <ProfileDetailModal open={modalOpen} onClose={() => setModalOpen(false)} user={user} />
        </>
    );
};

export default ProfileWidget;

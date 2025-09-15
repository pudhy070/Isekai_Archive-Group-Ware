import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Alert, Collapse } from '@mui/material';
import PolicyIcon from '@mui/icons-material/Policy';
import SupportIcon from '@mui/icons-material/Support';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom';

const ITSupportModal = ({ open, onClose }) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            IT 지원 요청
            <IconButton aria-label="close" onClick={onClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                IT 지원이 필요하신가요?
            </Typography>
            <Typography variant="body1">
                전화 02-1234-5678 (내선 123) 로 경영지원실 또는 전산실에 문의해 주세요.
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>닫기</Button>
        </DialogActions>
    </Dialog>
);

const MeetingRoomModal = ({ open, onClose }) => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [status, setStatus] = useState(null);

    const meetingRooms = [
        { id: 'room-a', name: '회의실 A' },
        { id: 'room-b', name: '회의실 B' },
        { id: 'room-c', name: '회의실 C' },
        { id: 'room-d', name: '회의실 D' },
        { id: 'room-e', name: '회의실 E' },
    ];

    const handleReservation = () => {
        if (!selectedRoom || !selectedDate || !selectedTime) {
            setStatus('error');
            return;
        }
        console.log("Reservation for:", selectedRoom.name, selectedDate, selectedTime);
        setStatus('success');
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography component="div" variant="h6">회의실 예약</Typography>
                    <IconButton aria-label="close" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>회의실 선택</Typography>
                            <Grid container spacing={2}>
                                {meetingRooms.map(room => (
                                    <Grid item key={room.id}>
                                        <Button
                                            variant={selectedRoom?.id === room.id ? 'contained' : 'outlined'}
                                            onClick={() => setSelectedRoom(room)}
                                        >
                                            {room.name}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>날짜 및 시간 선택</Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <DatePicker
                                    label="날짜"
                                    value={selectedDate}
                                    onChange={(newValue) => setSelectedDate(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <TimePicker
                                    label="시간"
                                    value={selectedTime}
                                    onChange={(newValue) => setSelectedTime(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleReservation} sx={{ mt: 2 }}>
                                예약하기
                            </Button>
                            <Collapse in={!!status} sx={{ mt: 2 }}>
                                {status === 'success' && (
                                    <Alert severity="success">예약이 완료되었습니다!</Alert>
                                )}
                                {status === 'error' && (
                                    <Alert severity="error">회의실, 날짜, 시간을 모두 선택해주세요.</Alert>
                                )}
                            </Collapse>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
};

const OnefficePage = () => {
    const navigate = useNavigate();
    const [itSupportModalOpen, setItSupportModalOpen] = useState(false);
    const [meetingRoomModalOpen, setMeetingRoomModalOpen] = useState(false);

    const menuItems = [
        { icon: <ArticleIcon sx={{ fontSize: 40 }} />, title: '아카이브', description: '모든 자료를 체계적으로 관리합니다.', path: '/archive' },
        { icon: <PolicyIcon sx={{ fontSize: 40 }} />, title: '사내 규정', description: '업무 관련 규정을 확인합니다.', path: '/policy' },
        { icon: <SupportIcon sx={{ fontSize: 40 }} />, title: 'IT 지원 요청', description: 'PC 문제 등 지원을 요청합니다.', action: () => setItSupportModalOpen(true) },
        { icon: <MeetingRoomIcon sx={{ fontSize: 40 }} />, title: '회의실 예약', description: '회의실을 예약하고 현황을 봅니다.', action: () => setMeetingRoomModalOpen(true) },
    ];

    const handleMenuClick = (item) => {
        if (item.path) {
            navigate(item.path);
        } else if (item.action) {
            item.action();
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>Archive 포털</Typography>
            <Grid container spacing={3}>
                {menuItems.map(item => (
                    <Grid item xs={12} md={4} key={item.title}>
                        <Card>
                            <CardActionArea sx={{ p: 3, textAlign: 'center' }} onClick={() => handleMenuClick(item)}>
                                {item.icon}
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">{item.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <ITSupportModal
                open={itSupportModalOpen}
                onClose={() => setItSupportModalOpen(false)}
            />
            <MeetingRoomModal
                open={meetingRoomModalOpen}
                onClose={() => setMeetingRoomModalOpen(false)}
            />
        </Box>
    );
};

export default OnefficePage;

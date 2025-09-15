import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button
} from '@mui/material';
import { Circle, Close } from '@mui/icons-material';
import WidgetHeader from './WidgetHeader';


import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


const ScheduleDetailModal = ({ open, onClose }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/schedule');
        onClose();
    };

    const allEvents = [
        { title: '주간 정기회의', start: '2025-08-26T10:00:00' },
        { title: '클라이언트 미팅', start: '2025-08-26T14:00:00' },
        { title: 'A프로젝트 마감', start: '2025-08-29' },
    ];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle className="modal-header">
                일정 상세보기
                <IconButton onClick={onClose}><Close /></IconButton>
            </DialogTitle>
            <DialogContent dividers className="modal-content">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    events={allEvents}
                    locale="ko"
                    height="60vh"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>닫기</Button>
                <Button onClick={handleNavigate} variant="contained">전체 일정 페이지로 이동</Button>
            </DialogActions>
        </Dialog>
    );
};


const ScheduleWidget = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const events = [
        { time: '10:00 - 11:00', title: '주간 업무 회의', tag: '회의', color: 'primary' },
        { time: '14:00 - 15:00', title: '클라이언트 미팅', tag: '외근', color: 'success' },
    ];

    return (
        <>
            <Paper className="widget-card" sx={{ height: '100%' }}>
                <WidgetHeader title="오늘의 일정" onMoreClick={handleOpen} />
                <List sx={{ p: 0 }}>
                    {events.map((event, index) => (
                        <ListItem key={index} disablePadding sx={{ mb: 1.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <Circle sx={{ fontSize: '0.6rem', color: `${event.color}.main` }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={event.title}
                                secondary={event.time}
                                primaryTypographyProps={{ fontWeight: 500 }}
                            />
                            <Chip label={event.tag} color={event.color} size="small" variant="outlined" />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <ScheduleDetailModal open={open} onClose={handleClose} />
        </>
    );
};

export default ScheduleWidget;
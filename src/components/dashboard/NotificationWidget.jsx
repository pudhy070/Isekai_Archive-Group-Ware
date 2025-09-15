import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button,
    ListItemIcon,
    ListItemButton
} from '@mui/material';
import { Circle } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';

const NotificationSettingsModal = ({ open, onClose, currentStatus, setCurrentStatus }) => {
    const statusOptions = [
        { id: 'blue', color: '#42a5f5', title: '협업 가능 (Join Me)', description: '누구든 바로 와도 되는 상태. 적극 협업 환영.' },
        { id: 'green', color: '#66bb6a', title: '업무 중 (Online)', description: '기본 근무 상태. 대화·협업 가능.' },
        { id: 'orange', color: '#ffa726', title: '집중 업무 (Ask Me)', description: '지금은 집중 중. 요청 시 확인 후 응답.' },
        { id: 'red', color: '#ef5350', title: '응답 불가 (Do Not Disturb)', description: '회의나 통화 등으로 대화 불가.' },
        { id: 'black', color: '#212121', title: '오프라인 (Offline)', description: '업무 외 시간, 자리 비움, 퇴근 상태.' },
    ];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                알림 옵션 설정
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <List sx={{ p: 0 }}>
                    {statusOptions.map((opt) => (
                        <ListItemButton
                            key={opt.id}
                            selected={currentStatus === opt.id}
                            onClick={() => {
                                setCurrentStatus(opt.id);
                                onClose();
                            }}
                        >
                            <ListItemIcon><Circle sx={{ color: opt.color }} /></ListItemIcon>
                            <ListItemText primary={opt.title} secondary={opt.description} />
                        </ListItemButton>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};


const NotificationDetailModal = ({ open, onClose }) => {

};

const NotificationWidget = ({ currentStatus, setCurrentStatus }) => {
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);

    const notifications = [
        { type: '결재', message: '휴가 신청서가 승인되었습니다.', time: '1시간 전' },
        { type: '공지', message: '전사 워크샵 일정 안내', time: '3시간 전' },
    ];

    return (
        <>
            <Paper className="widget-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography className="widget-title">전체 알림</Typography>
                    <Button size="small" startIcon={<SettingsIcon />} onClick={() => setSettingsModalOpen(true)}>
                        설정
                    </Button>
                </Box>
                <Box sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <List sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
                        {notifications.map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem><ListItemText primary={`[${item.type}] ${item.message}`} secondary={item.time} /></ListItem>
                                {index < notifications.length - 1 && <Divider component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                    <Button variant="outlined" size="small" sx={{ mt: 'auto' }} onClick={() => setDetailModalOpen(true)}>
                        더 보기
                    </Button>
                </Box>
            </Paper>

            <NotificationDetailModal open={detailModalOpen} onClose={() => setDetailModalOpen(false)} />
            <NotificationSettingsModal
                open={settingsModalOpen}
                onClose={() => setSettingsModalOpen(false)}
                currentStatus={currentStatus}
                setCurrentStatus={setCurrentStatus}
            />
        </>
    );
};

export default NotificationWidget;
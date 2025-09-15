import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WidgetHeader from './WidgetHeader';

const MailDetailModal = ({ open, onClose }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/mail');
        onClose();
    };

    const allMails = [
        { from: '김유신 팀장', subject: '3분기 실적 보고 자료 요청', time: '오전 10:25' },
        { from: '(주)가나다라', subject: '견적서 송부의 건', time: '오전 09:10' },
        { from: '관리자', subject: '[공지] 사내 보안 강화 안내', time: '어제' },
        { from: '이순신', subject: 'A프로젝트 관련 논의 요청', time: '어제' },
        { from: '회계팀', subject: '8월 경비 정산 마감 안내', time: '2일 전' },
    ];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                받은 메일함
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <List sx={{ p: 0 }}>
                    {allMails.map((mail, index) => (
                        <React.Fragment key={index}>
                            <ListItem button>
                                <ListItemText primary={mail.subject} secondary={mail.from} />
                                <Typography variant="caption">{mail.time}</Typography>
                            </ListItem>
                            {index < allMails.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>닫기</Button>
                <Button onClick={handleNavigate} variant="contained">전체 메일함 가기</Button>
            </DialogActions>
        </Dialog>
    );
};

const MailWidget = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const mails = [
        { from: '김유신 팀장', subject: '3분기 실적 보고 자료 요청', time: '오전 10:25' },
        { from: '(주)가나다라', subject: '견적서 송부의 건', time: '오전 09:10' },
        { from: '관리자', subject: '[공지] 사내 보안 강화 안내', time: '어제' },
    ];

    return (
        <>
            <Paper className="widget-card">
                <WidgetHeader title="받은 메일함" onMoreClick={handleOpen} />
                <List sx={{ p: 0 }}>
                    {mails.map((mail, index) => (
                        <React.Fragment key={index}>
                            <ListItem alignItems="flex-start" sx={{ p: '8px 0' }}>
                                <ListItemText
                                    primary={
                                        <Typography component="span" variant="body2" sx={{ fontWeight: 600 }}>
                                            {mail.subject}
                                        </Typography>
                                    }
                                    secondary={
                                        <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            <Typography component="span" variant="body2" color="text.secondary">{mail.from}</Typography>
                                            <Typography component="span" variant="body2" color="text.secondary">{mail.time}</Typography>
                                        </Box>
                                    }
                                />
                            </ListItem>
                            {index < mails.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            <MailDetailModal open={open} onClose={handleClose} />
        </>
    );
};

export default MailWidget;

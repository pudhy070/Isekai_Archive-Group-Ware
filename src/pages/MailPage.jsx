import React, { useState } from 'react';
import {
    Paper,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    ListItemButton,
    IconButton,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Alert,
    Collapse,
    ListItemIcon
} from '@mui/material';

import InboxIcon from '@mui/icons-material/Inbox';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const ComposeMailModal = ({ open, onClose, onSendMail }) => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' or 'error'

    const handleSend = async () => {
        if (!to || !subject || !body) {
            setStatus('error');
            return;
        }

        setIsLoading(true);
        setStatus(null);

        try {

            await new Promise(resolve => setTimeout(resolve, 1500));

            const mailData = { to, subject, body };
            onSendMail(mailData);

            setStatus('success');

            setTo('');
            setSubject('');
            setBody('');

        } catch (err) {
            console.error(err);
            setStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">새 메일 작성</Typography>
                <IconButton aria-label="close" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Collapse in={!!status} sx={{mb:2}}>
                    {status === 'success' && (
                        <Alert severity="success">메일이 성공적으로 전송되었습니다!</Alert>
                    )}
                    {status === 'error' && (
                        <Alert severity="error">메일 전송에 실패했습니다. 모든 필드를 채워주세요.</Alert>
                    )}
                </Collapse>
                <TextField
                    fullWidth
                    label="받는 사람"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    fullWidth
                    label="제목"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    sx={{ mb: 2 }}
                    required
                />
                <TextField
                    fullWidth
                    label="내용"
                    multiline
                    rows={10}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isLoading}>취소</Button>
                <Button onClick={handleSend} variant="contained" color="primary" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : '보내기'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const MailPage = () => {
    const [tab, setTab] = useState('inbox');
    const [selectedMail, setSelectedMail] = useState(null);
    const [composeModalOpen, setComposeModalOpen] = useState(false);

    const [mails, setMails] = useState({
        inbox: [
            { id: 1, sender: '김유신 팀장', subject: '3분기 실적 보고 자료 요청', body: '수고 많으십니다. 3분기 실적 보고 관련 자료를 내일까지 부탁드립니다.' },
            { id: 2, sender: '(주)가나다라', subject: '견적서 송부의 건', body: '안녕하세요. 요청하신 견적서를 송부 드립니다.' },
        ],
        sent: [
            { id: 3, recipient: '홍길동', subject: '안녕하세요', body: '안녕하세요. 잘 지내시죠?' },
        ],
    });

    const handleSendMail = (mailData) => {
        const newMail = {
            id: Date.now(),
            recipient: mailData.to,
            subject: mailData.subject,
            body: mailData.body,
        };
        setMails(prev => ({
            ...prev,
            sent: [newMail, ...prev.sent],
        }));
    };

    // 현재 탭에 맞는 메일 목록을 반환
    const getMailList = () => {
        if (tab === 'inbox') {
            return mails.inbox;
        }
        return mails.sent;
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">메일</Typography>
                <Button variant="contained" onClick={() => setComposeModalOpen(true)}>새 메일 작성</Button>
            </Box>
            <Paper className="mail-layout" sx={{ display: 'flex', height: '80vh', border: '1px solid #ddd' }}>
                <Box className="mail-sidebar" sx={{ width: '200px', borderRight: '1px solid #ddd', p: 1 }}>
                    <List>
                        <ListItemButton selected={tab === 'inbox'} onClick={() => { setTab('inbox'); setSelectedMail(null); }}>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary="받은 편지함" />
                        </ListItemButton>
                        <ListItemButton selected={tab === 'sent'} onClick={() => { setTab('sent'); setSelectedMail(null); }}>
                            <ListItemIcon><SendIcon /></ListItemIcon>
                            <ListItemText primary="보낸 편지함" />
                        </ListItemButton>
                    </List>
                </Box>
                <Box className="mail-list" sx={{ width: '250px', borderRight: '1px solid #ddd', overflowY: 'auto' }}>
                    <List>
                        {getMailList().map((mail) => (
                            <React.Fragment key={mail.id}>
                                <ListItemButton selected={selectedMail?.id === mail.id} onClick={() => setSelectedMail(mail)}>
                                    <ListItemText
                                        primary={tab === 'inbox' ? mail.subject : mail.recipient}
                                        secondary={tab === 'inbox' ? mail.sender : mail.subject}
                                    />
                                </ListItemButton>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
                <Box className="mail-content" sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
                    {selectedMail ? (
                        <>
                            <Box className="mail-content-header" sx={{ mb: 2, borderBottom: '1px solid #eee', pb: 2 }}>
                                <Typography variant="h5">{selectedMail.subject}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {tab === 'inbox' ? `보낸사람: ${selectedMail.sender}` : `받는사람: ${selectedMail.recipient}`}
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{selectedMail.body}</Typography>
                        </>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'text.secondary' }}>
                            <Typography variant="body1">메일을 선택하세요</Typography>
                        </Box>
                    )}
                </Box>
            </Paper>

            <ComposeMailModal open={composeModalOpen} onClose={() => setComposeModalOpen(false)} onSendMail={handleSendMail} />
        </Box>
    );
};
export default MailPage;

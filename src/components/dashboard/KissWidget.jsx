import React, { useState, useEffect } from 'react';
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
    Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import WidgetHeader from './WidgetHeader';

const KissDetailModal = ({ open, onClose }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/approval');
        onClose();
    };

    const approvalItems = [
        { id: 1, type: '휴가 신청서', status: '완료', date: '2025-08-20', approver: '김철수 팀장' },
        { id: 2, type: '업무 보고서', status: '진행 중', date: '2025-08-25', approver: '이영희 부장' },
        { id: 3, type: '지출 결의서', status: '예정', date: '2025-08-27', approver: '박영호 이사' },
        { id: 4, type: '외근 신청서', status: '완료', date: '2025-08-18', approver: '김철수 팀장' },
        { id: 5, type: '교육 신청서', status: '진행 중', date: '2025-08-22', approver: '최미나 팀장' },
    ];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                KISS (결재 현황) 상세
                <IconButton aria-label="close" onClick={onClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="h6" gutterBottom>결재 목록</Typography>
                <List>
                    {approvalItems.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <ListItem>
                                <ListItemText
                                    primary={`${item.type}`}
                                    secondary={`(${item.date}) ${item.approver}`}
                                />
                                <Chip label={item.status} color={
                                    item.status === '완료' ? 'success' :
                                        item.status === '진행 중' ? 'warning' : 'primary'
                                } size="small" />
                            </ListItem>
                            {index < approvalItems.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>닫기</Button>
                <Button onClick={handleNavigate} variant="contained">전자결재 페이지로 이동</Button>
            </DialogActions>
        </Dialog>
    );
};

const KissWidget = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const data = [
        { name: '완료', value: 2 },
        { name: '예정', value: 2 },
        { name: '진행', value: 1 }
    ];
    const COLORS = ['#1cc88a', '#4e73df', '#f6c23e'];

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            <Paper className="widget-card">
                <WidgetHeader title="KISS" onMoreClick={handleOpen} />
                <Box sx={{ flexGrow: 1, width: '100%' }}>
                    {isClient && (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={60}
                                    paddingAngle={5}
                                    label={p => p.value}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend iconSize={10} />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </Box>
            </Paper>
            <KissDetailModal open={open} onClose={handleClose} />
        </>
    );
};

export default KissWidget;

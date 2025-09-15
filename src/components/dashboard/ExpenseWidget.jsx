import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper,
    Box,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import WidgetHeader from './WidgetHeader';

const ExpenseDetailModal = ({ open, onClose }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/expenses');
        onClose();
    };

    const columns = [
        { field: 'date', headerName: '사용일', width: 150 },
        { field: 'category', headerName: '분류', width: 130 },
        { field: 'description', headerName: '내용', flex: 1 },
        { field: 'amount', headerName: '금액', width: 150, type: 'number',
            valueFormatter: ({ value }) => `${value.toLocaleString()}원`
        },
    ];

    const rows = [
        { id: 1, date: '2021-11-15', category: '교통비', description: 'A프로젝트 고객사 미팅 택시비', amount: 15000 },
        { id: 2, date: '2021-11-12', category: '중식대', description: '개발팀 점심 식사', amount: 45000 },
        { id: 3, date: '2021-11-10', category: '주유비', description: '법인 차량 주유', amount: 50000 },
        { id: 4, date: '2021-11-08', category: '기타', description: '사무용품 구입', amount: 25000 },
    ];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle className="modal-header">
                경비사용 상세 내역
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers className="modal-content">
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>닫기</Button>
                <Button onClick={handleNavigate} variant="contained">경비 정산 페이지로 이동</Button>
            </DialogActions>
        </Dialog>
    );
};


const ExpenseWidget = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Paper className="widget-card">
                <WidgetHeader title="경비사용현황" onMoreClick={handleOpen} />
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#666', mb: 2 }}>
                    <CalendarMonthIcon sx={{ fontSize: '1rem', mr: 1 }} />
                    <Typography variant="body2">2021-10-20 ~ 2021-11-20</Typography>
                </Box>
                <FormControl component="fieldset" className="expense-form-control">
                    <RadioGroup row defaultValue="transport">
                        <FormControlLabel value="fuel" control={<Radio size="small" />} label="주유비" />
                        <FormControlLabel value="transport" control={<Radio size="small" />} label="교통비" />
                        <FormControlLabel value="meal" control={<Radio size="small" />} label="중식대" />
                        <FormControlLabel value="etc" control={<Radio size="small" />} label="기타" />
                    </RadioGroup>
                </FormControl>
                <Box className="expense-total">
                    <Typography className="expense-amount">58,000,000원</Typography>
                </Box>
            </Paper>

            <ExpenseDetailModal open={open} onClose={handleClose} />
        </>
    );
};

export default ExpenseWidget;
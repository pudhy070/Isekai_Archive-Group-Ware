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
import { DataGrid } from '@mui/x-data-grid';
import WidgetHeader from './WidgetHeader';


const RecentPostsDetailModal = ({ open, onClose }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/board');
        onClose();
    };

    const columns = [
        { field: 'category', headerName: '게시판', width: 150 },
        { field: 'title', headerName: '제목', flex: 1 },
        { field: 'author', headerName: '작성자', width: 130 },
        { field: 'date', headerName: '작성일', width: 150 },
    ];

    const rows = [
        { id: 1, category: '공지사항', title: '금주 전사 휴게 시간 안내', author: '인사팀', date: '2025-08-26' },
        { id: 2, category: '커뮤니티', title: '하반기 워크샵 장소 투표 결과', author: '홍길동', date: '2025-08-25' },
        { id: 3, category: '인사팀 소식', title: '신규 입사자 소개', author: '인사팀', date: '2025-08-25' },
        { id: 4, category: 'IT 지원', title: '네트워크 점검 안내 (08/27)', author: 'IT팀', date: '2025-08-24' },
        { id: 5, category: '공지사항', title: '건강검진 대상자 안내', author: '인사팀', date: '2025-08-23' },
    ];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle className="modal-header">
                최근 게시글 전체보기
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers className="modal-content">
                <Box sx={{ height: 500, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>닫기</Button>
                <Button onClick={handleNavigate} variant="contained">전체 게시판 가기</Button>
            </DialogActions>
        </Dialog>
    );
};


const RecentPostsWidget = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const posts = [
        { title: '금주 전사 휴게 시간 안내', category: '공지사항', date: '08-26' },
        { title: '하반기 워크샵 장소 투표 결과', category: '커뮤니티', date: '08-25' },
        { title: '신규 입사자 소개', category: '인사팀 소식', date: '08-25' },
    ];

    return (
        <>
            <Paper className="widget-card">
                <WidgetHeader title="최근 게시글" onMoreClick={handleOpen} />
                <List sx={{ p: 0 }}>
                    {posts.map((post, index) => (
                        <React.Fragment key={index}>
                            <ListItem alignItems="flex-start" sx={{ p: '8px 0' }}>
                                <ListItemText
                                    primary={
                                        <Typography component="span" variant="body2" sx={{ fontWeight: 500 }}>
                                            {post.title}
                                        </Typography>
                                    }
                                    secondary={
                                        <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 0.5 }}>
                                            <Typography component="span" variant="caption" color="text.secondary">{post.category}</Typography>
                                            <Typography component="span" variant="caption" color="text.secondary">{post.date}</Typography>
                                        </Box>
                                    }
                                />
                            </ListItem>
                            {index < posts.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            <RecentPostsDetailModal open={open} onClose={handleClose} />
        </>
    );
};

export default RecentPostsWidget;
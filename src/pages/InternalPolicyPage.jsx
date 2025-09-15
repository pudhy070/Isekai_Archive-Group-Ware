import React, { useState } from 'react';
import { Box, Typography, Paper, List, ListItemButton, ListItemText, Divider, TextField, Chip, MenuItem, IconButton, InputAdornment, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Flag from '@mui/icons-material/Flag';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';

const PolicyDetailModal = ({ open, onClose, post, onEditClick }) => {
    if (!post) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {post.title}
                <IconButton aria-label="close" onClick={onClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">작성자: {post.author}</Typography>
                    <Typography variant="body2" color="text.secondary">{post.time}</Typography>
                </Box>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{post.content}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>닫기</Button>
                <Button onClick={() => onEditClick(post)} variant="outlined">수정</Button>
            </DialogActions>
        </Dialog>
    );
};

const PolicyCreateModal = ({ open, onClose, onPostSubmit, editingPost, onPostUpdate }) => {
    const [title, setTitle] = useState(editingPost ? editingPost.title : '');
    const [content, setContent] = useState(editingPost ? editingPost.content : '');
    const [isImportant, setIsImportant] = useState(editingPost ? editingPost.isImportant : false);

    React.useEffect(() => {
        if (editingPost) {
            setTitle(editingPost.title);
            setContent(editingPost.content);
            setIsImportant(editingPost.isImportant);
        } else {
            setTitle('');
            setContent('');
            setIsImportant(false);
        }
    }, [editingPost, open]);

    const handleSubmit = () => {
        if (title && content) {
            if (editingPost) {
                onPostUpdate({ ...editingPost, title, content, isImportant });
            } else {
                onPostSubmit({ title, content, isImportant });
            }
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {editingPost ? '게시글 수정' : '새 게시글 작성'}
                <IconButton aria-label="close" onClick={onClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <TextField fullWidth label="제목" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth label="내용" multiline rows={8} value={content} onChange={(e) => setContent(e.target.value)} />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between' }}>
                <Button startIcon={<Flag />} onClick={() => setIsImportant(!isImportant)} variant={isImportant ? 'contained' : 'outlined'} color="warning">
                    중요!
                </Button>
                <Box>
                    <Button onClick={onClose}>취소</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ ml: 1 }}>
                        {editingPost ? '수정 완료' : '작성 완료'}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

const InternalPolicyPage = ({ onBack }) => {
    const [posts, setPosts] = useState([
        { id: 1, type: '게시글', title: '개인정보 보호 정책 안내', content: '회사의 새로운 개인정보 보호 정책이 시행됩니다. 모든 직원은 내용을 숙지하여 주시기 바랍니다.', time: '2025-08-27T10:00:00', author: '관리자', isImportant: true },
        { id: 2, type: '게시글', title: '사내 PC 보안 수칙', content: 'PC 보안 강화를 위한 필수 수칙입니다. 자세한 내용은 첨부 문서를 확인해주세요.', time: '2025-08-26T14:30:00', author: '관리자', isImportant: false }
    ]);
    const [postCreateModalOpen, setPostCreateModalOpen] = useState(false);
    const [postDetailModalOpen, setPostDetailModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('latest');

    const handlePostClick = (item) => {
        setSelectedPost(item);
        setPostDetailModalOpen(true);
    };

    const handleEditClick = (post) => {
        setEditingPost(post);
        setPostCreateModalOpen(true);
        setPostDetailModalOpen(false);
    };

    const handlePostSubmit = (post) => {
        const now = new Date();
        const newPost = {
            id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
            type: '게시글',
            title: post.title,
            content: post.content,
            isImportant: post.isImportant,
            author: '김민준',
            time: now.toISOString()
        };
        setPosts(prev => [newPost, ...prev]);
    };

    const handlePostUpdate = (updatedPost) => {
        setPosts(prev => prev.map(post => post.id === updatedPost.id ? updatedPost : post));
        setEditingPost(null);
    };

    const filteredAndSortedPosts = posts
        .filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const dateA = new Date(a.time);
            const dateB = new Date(b.time);
            if (sortBy === 'oldest') {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });

    const pinnedPosts = filteredAndSortedPosts.filter(item => item.isImportant);
    const regularPosts = filteredAndSortedPosts.filter(item => !item.isImportant);
    const finalPosts = [...pinnedPosts, ...regularPosts];

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">사내 규정</Typography>
                <Box>
                    <Button variant="contained" startIcon={<PostAddIcon />} onClick={() => {
                        setEditingPost(null);
                        setPostCreateModalOpen(true);
                    }}>새 게시글 작성</Button>
                </Box>
            </Box>
            <Paper>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                        fullWidth
                        size="small"
                        label="검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        select
                        label="정렬"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        size="small"
                        sx={{ width: 150 }}
                    >
                        <MenuItem value="latest">최신 작성순</MenuItem>
                        <MenuItem value="oldest">오래된 게시글순</MenuItem>
                    </TextField>
                </Box>
                <List>
                    {finalPosts.map((post) => (
                        <React.Fragment key={post.id}>
                            <ListItemButton onClick={() => handlePostClick(post)}>
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="body1" sx={{ fontWeight: post.isImportant ? 'bold' : 'normal' }}>
                                                {post.title}
                                            </Typography>
                                            {post.isImportant && (
                                                <Chip label="중요" size="small" color="warning" icon={<Flag />} sx={{ ml: 1 }} />
                                            )}
                                        </Box>
                                    }
                                    secondary={`작성자: ${post.author} · ${post.time}`}
                                />
                            </ListItemButton>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
            <PolicyCreateModal
                open={postCreateModalOpen}
                onClose={() => setPostCreateModalOpen(false)}
                onPostSubmit={handlePostSubmit}
                onPostUpdate={handlePostUpdate}
                editingPost={editingPost}
            />
            <PolicyDetailModal
                open={postDetailModalOpen}
                onClose={() => setPostDetailModalOpen(false)}
                post={selectedPost}
                onEditClick={handleEditClick}
            />
        </Box>
    );
};

export default InternalPolicyPage;

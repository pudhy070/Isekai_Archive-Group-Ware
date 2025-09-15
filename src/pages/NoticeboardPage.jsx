import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper,
    Box,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button,
    ListItemIcon,
    TextField,
    Chip,
    InputAdornment,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Tabs,
    Tab
} from '@mui/material';
import {
    Flag,
    Search as SearchIcon,
    PostAdd as PostAddIcon
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

const PostCreateModal = ({ open, onClose, onPostSubmit, editingPost, onPostUpdate }) => {
    const [title, setTitle] = useState(editingPost ? editingPost.title : '');
    const [content, setContent] = useState(editingPost ? editingPost.content : '');
    const [isImportant, setIsImportant] = useState(editingPost ? editingPost.isImportant : false);

    useEffect(() => {
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
            if (editingPost) onPostUpdate({ ...editingPost, title, content, isImportant });
            else onPostSubmit({ title, content, isImportant });
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {editingPost ? '게시글 수정' : '새 게시글 작성'}
                <IconButton aria-label="close" onClick={onClose} sx={{ color: theme => theme.palette.grey[500] }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <TextField fullWidth label="제목" value={title} onChange={e => setTitle(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth label="내용" multiline rows={8} value={content} onChange={e => setContent(e.target.value)} />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between' }}>
                <Button
                    startIcon={<Flag />}
                    onClick={() => setIsImportant(!isImportant)}
                    variant={isImportant ? 'contained' : 'outlined'}
                    color="warning"
                >중요!</Button>
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

const PostDetailModal = ({ open, onClose, post, onEditClick }) => {
    if (!post) return null;
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {post.title}
                <IconButton aria-label="close" onClick={onClose} sx={{ color: theme => theme.palette.grey[500] }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">작성자: {post.author}</Typography>
                    <Typography variant="body2" color="text.secondary">{new Date(post.time).toLocaleString()}</Typography>
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


const NoticeBoardPage = () => {
    const navigate = useNavigate();
    const [postCreateModalOpen, setPostCreateModalOpen] = useState(false);
    const [postDetailModalOpen, setPostDetailModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [activeTab, setActiveTab] = useState(0); // 0: 중요공지, 1: 일반공지, 2: 게시판

    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('latest');

    const [posts, setPosts] = useState([
        { id: 1, title: '새로운 시스템 도입 안내', content: '다음주부터 새로운 근무 시스템이 적용됩니다.', time: '2025-08-27T10:00:00', author: '관리자', isImportant: true, type: 'important' },
        { id: 2, title: '개인정보 보호 교육 필수 확인', content: '개인정보 보호 교육을 이수해주세요.', time: '2025-08-27T09:00:00', author: '관리자', isImportant: true, type: 'important' },
        { id: 3, title: '사내 워크샵 장소 변경', content: '예정된 전사 워크샵 장소가 변경되었습니다. 첨부파일 확인', time: '2025-08-26T15:30:00', author: '관리자', isImportant: false, type: 'general' },
        { id: 4, title: '사내 게시판 이용 가이드', content: '게시판 이용에 대한 안내입니다. 가이드를 숙지해주세요.', time: '2025-08-25T11:00:00', author: '시스템 운영팀', isImportant: false, type: 'general' },
        { id: 5, title: '점심 메뉴 추천 받아요!', content: '오늘은 무엇을 먹을까요?', time: '2025-08-27T12:00:00', author: '김민준', isImportant: false, type: 'forum' },
        { id: 6, title: '팀 프로젝트 아이디어 공유', content: '새로운 프로젝트 아이디어를 자유롭게 올려주세요.', time: '2025-08-26T14:00:00', author: '박서준', isImportant: false, type: 'forum' },
    ]);

    const handlePostSubmit = post => {
        const now = new Date();
        const newPost = {
            id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
            title: post.title,
            content: post.content,
            isImportant: post.isImportant,
            author: '김민준',
            time: now.toISOString(),
            type: activeTab === 0 ? 'important' : (activeTab === 1 ? 'general' : 'forum'),
        };
        setPosts(prev => [newPost, ...prev]);
    };

    const handlePostUpdate = updatedPost => {
        setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
        setEditingPost(null);
    };

    const handlePostClick = post => {
        setSelectedPost(post);
        setPostDetailModalOpen(true);
    };

    const handleEditClick = post => {
        setEditingPost(post);
        setPostCreateModalOpen(true);
        setPostDetailModalOpen(false);
    };

    const getPostsForActiveTab = () => {
        switch (activeTab) {
            case 0: return posts.filter(p => p.type === 'important');
            case 1: return posts.filter(p => p.type === 'general');
            case 2: return posts.filter(p => p.type === 'forum');
            default: return [];
        }
    };

    const postsToDisplay = getPostsForActiveTab();

    const filteredSortedPosts = postsToDisplay
        .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.author.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => sortBy === 'oldest' ? new Date(a.time) - new Date(b.time) : new Date(b.time) - new Date(a.time));

    const pinnedPosts = filteredSortedPosts.filter(p => p.isImportant);
    const regularPosts = filteredSortedPosts.filter(p => !p.isImportant);
    const finalList = [...pinnedPosts, ...regularPosts];

    return (
        <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">공지사항 / 게시판</Typography>
                <Button
                    variant="contained"
                    startIcon={<PostAddIcon />}
                    onClick={() => { setEditingPost(null); setPostCreateModalOpen(true); }}
                >
                    새 글 작성
                </Button>
            </Box>

            <Tabs value={activeTab} onChange={handleChangeTab} aria-label="게시판 탭" sx={{ mb: 2 }}>
                <Tab label="중요공지" />
                <Tab label="일반공지" />
                <Tab label="게시판" />
            </Tabs>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                    fullWidth size="small" label="검색" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                />
                <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>정렬</InputLabel>
                    <Select value={sortBy} onChange={e => setSortBy(e.target.value)} label="정렬">
                        <MenuItem value="latest">최신순</MenuItem>
                        <MenuItem value="oldest">오래된순</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <List sx={{ p: 0 }}>
                    {finalList.length > 0 ? (
                        finalList.map(post => (
                            <React.Fragment key={post.id}>
                                <ListItemButton onClick={() => handlePostClick(post)}>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                                {post.isImportant && <Chip label="중요" size="small" color="warning" icon={<Flag />} sx={{ mr: 1, mb: { xs: 1, sm: 0 } }} />}
                                                <Typography variant="body1" sx={{ fontWeight: post.isImportant ? 'bold' : 'normal' }}>
                                                    {post.title}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={`작성자: ${post.author} | ${new Date(post.time).toLocaleString()}`}
                                    />
                                </ListItemButton>
                                <Divider component="li" />
                            </React.Fragment>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                            게시글이 없습니다.
                        </Typography>
                    )}
                </List>
            </Box>

            <PostCreateModal open={postCreateModalOpen} onClose={() => setPostCreateModalOpen(false)} onPostSubmit={handlePostSubmit} onPostUpdate={handlePostUpdate} editingPost={editingPost} />
            <PostDetailModal open={postDetailModalOpen} onClose={() => setPostDetailModalOpen(false)} post={selectedPost} onEditClick={handleEditClick} />
        </Paper>
    );
};

export default NoticeBoardPage;
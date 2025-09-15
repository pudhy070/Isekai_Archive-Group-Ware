import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, TextField, InputAdornment, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LinkIcon from '@mui/icons-material/Link';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import './ArchivePage.css';

const initialData = {
    id: 'root',
    name: '아카이브',
    children: [
        { id: '1', name: '영업 자료', items: [
                { id: '1-1', name: '2024년_영업보고서.docx', type: 'file', size: '1.2MB', date: '2024-08-27', icon: <InsertDriveFileIcon color="primary" /> },
                { id: '1-2', name: '제품_소개_브로슈어.pdf', type: 'file', size: '3.5MB', date: '2024-08-25', icon: <InsertDriveFileIcon color="error" /> },
            ], children: [
                { id: '1-1', name: '계약서류', items: [
                        { id: '1-1-1', name: '알파_프로젝트_계약서.docx', type: 'file', size: '1.5MB', date: '2024-08-28', icon: <InsertDriveFileIcon color="primary" /> },
                    ]},
            ]},
        { id: '2', name: '개발 문서', items: [], children: [
                { id: '2-1', name: '기술팀', items: [
                        { id: '2-1-1', name: '기술_규격서.pdf', type: 'file', size: '2.1MB', date: '2024-08-26', icon: <InsertDriveFileIcon color="error" /> },
                    ]},
                { id: '2-2', name: '디자인팀', items: [
                        { id: '2-2-1', name: '디자인_가이드라인.pptx', type: 'file', size: '5.8MB', date: '2024-08-15', icon: <InsertDriveFileIcon color="success" /> },
                    ]},
            ]},
        { id: '3', name: '외부링크', items: [
                { id: '3-1', name: '회사_깃허브', type: 'link', url: 'https://github.com/archive-project', date: '2024-08-20', icon: <LinkIcon color="secondary" /> },
                { id: '3-2', name: '사내_규정_위키', type: 'link', url: 'https://archive.com/policy', date: '2024-08-10', icon: <LinkIcon color="secondary" /> },
            ]},
    ],
    items: [
        { id: 'root-1', name: '시작하기.docx', type: 'file', size: '0.5MB', date: '2024-08-29', icon: <InsertDriveFileIcon color="action" /> },
    ]
};

const findNodeByPath = (node, pathArray) => {
    let currentNode = node;
    for (const pathId of pathArray) {
        if (pathId === currentNode.id) continue;
        const nextNode = currentNode.children.find(child => child.id === pathId);
        if (!nextNode) return null;
        currentNode = nextNode;
    }
    return currentNode;
};

const ArchivePage = ({ onBack }) => {
    const [currentPath, setCurrentPath] = useState(['root']);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    const currentNode = findNodeByPath(initialData, currentPath);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCreateFolder = () => {
        if (newFolderName.trim() && currentNode.children) {
            const newId = Date.now().toString();
            const newFolder = { id: newId, name: newFolderName, items: [], children: [] };
            currentNode.children.push(newFolder);
            setNewFolderName('');
            setIsAddFolderModalOpen(false);
        }
    };

    const handleFolderClick = (folder) => {
        setCurrentPath([...currentPath, folder.id]);
    };

    const handlePathClick = (index) => {
        setCurrentPath(currentPath.slice(0, index + 1));
    };

    const filteredItems = [...(currentNode.children || []), ...(currentNode.items || [])].filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isRoot = currentPath.length === 1;

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={onBack} sx={{ mr: 1 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Document Archive
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card className="archive-card">
                        <Box sx={{ p: 2, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>폴더</Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<AddIcon />}
                                onClick={() => setIsAddFolderModalOpen(true)}
                            >
                                폴더 추가
                            </Button>
                        </Box>
                        <List className="folder-list">
                            {!isRoot && (
                                <ListItem button onClick={() => handlePathClick(currentPath.length - 2)} className="go-back-item">
                                    <ListItemIcon><ArrowBackIcon /></ListItemIcon>
                                    <ListItemText primary=".." />
                                </ListItem>
                            )}
                            {currentNode.children?.map(folder => (
                                <ListItem
                                    button
                                    key={folder.id}
                                    onClick={() => handleFolderClick(folder)}
                                    className="folder-item"
                                >
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={folder.name} />
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card className="archive-card">
                        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    /
                                </Typography>
                                {currentPath.map((pathId, index) => {
                                    const node = findNodeByPath(initialData, currentPath.slice(0, index + 1));
                                    if (!node) return null;
                                    return (
                                        <React.Fragment key={node.id}>
                                            {index > 0 && <Typography variant="h6" sx={{ mx: 0.5 }}>/</Typography>}
                                            <Button
                                                onClick={() => handlePathClick(index)}
                                                sx={{
                                                    textTransform: 'none',
                                                    color: 'inherit',
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem',
                                                    p: 0, minWidth: 'auto',
                                                }}
                                            >
                                                {node.name}
                                            </Button>
                                        </React.Fragment>
                                    );
                                })}
                            </Box>
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="자료 검색..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ minWidth: { xs: '100%', sm: 250 } }}
                            />
                        </Box>
                        <Divider />
                        <Box sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                {filteredItems.length > 0 ? (
                                    filteredItems.map(item => (
                                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                                            <Card className="file-box">
                                                <CardContent>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                        <ListItemIcon sx={{ minWidth: 40, mr: 1 }}>
                                                            {item.icon}
                                                        </ListItemIcon>
                                                        <Typography variant="subtitle1" noWrap>
                                                            {item.name}
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {item.type === 'file' ? `크기: ${item.size}` : '유형: 바로가기'}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {`날짜: ${item.date}`}
                                                    </Typography>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="open"
                                                        onClick={() => window.open(item.url || '#', '_blank')}
                                                        sx={{ position: 'absolute', right: 8, bottom: 8 }}
                                                    >
                                                        <ArrowForwardIcon />
                                                    </IconButton>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))
                                ) : (
                                    <Grid item xs={12}>
                                        <Box sx={{ p: 3, textAlign: 'center' }}>
                                            <Typography variant="body1" color="text.secondary">
                                                해당 폴더에 자료가 없습니다.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <Dialog open={isAddFolderModalOpen} onClose={() => setIsAddFolderModalOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    새 폴더 만들기
                    <IconButton aria-label="close" onClick={() => setIsAddFolderModalOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="폴더 이름"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleCreateFolder();
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAddFolderModalOpen(false)}>취소</Button>
                    <Button onClick={handleCreateFolder} variant="contained">생성</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ArchivePage;
import React, { useState, useEffect } from 'react';
import {
    Box,
    Drawer,
    Typography,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Collapse,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Avatar,
    TextField,
    CircularProgress,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import './OrgChart.css';

// ------------------ 더미 데이터 ------------------
const defaultOrgData = {
    id: 'root',
    name: '(주)아카이브',
    children: [
        {
            id: '1', name: '경영지원본부', children: [
                {
                    id: '1-1', name: '인사팀', children: [
                        { id: '1-1-1', name: '홍길동', position: '과장', email: 'gdhong@archive.com', phone: '010-1234-5678', location: '본사 2층' },
                        { id: '1-1-2', name: '김철수', position: '사원', email: 'cskim@archive.com', phone: '010-9876-5432', location: '본사 2층' },
                    ]
                },
                {
                    id: '1-2', name: '총무팀', children: [
                        { id: '1-2-1', name: '이영희', position: '부장', email: 'yhlee@archive.com', phone: '010-1111-2222', location: '본사 2층' },
                    ]
                }
            ]
        },
        {
            id: '2', name: '기술연구소', children: [
                {
                    id: '2-1', name: '개발1팀', children: [
                        { id: '2-1-1', name: '이순신', position: '팀장', email: 'sslee@archive.com', phone: '010-3333-4444', location: '본사 3층' },
                        { id: '2-1-2', name: '박보검', position: '사원', email: 'bgpark@archive.com', phone: '010-5555-6666', location: '본사 3층' },
                    ]
                },
                {
                    id: '2-2', name: '개발2팀', children: [
                        { id: '2-2-1', name: '최강창민', position: '대리', email: 'cmchoi@archive.com', phone: '010-7777-8888', location: '본사 3층' },
                    ]
                },
                {
                    id: '2-3', name: '디자인팀', children: [
                        { id: '2-3-1', name: '유관순', position: '사원', email: 'gsyoo@archive.com', phone: '010-9999-0000', location: '본사 4층' },
                    ]
                },
            ]
        },
    ],
};

const MemberDetailModal = ({ open, onClose, member }) => {
    if (!member) return null;
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" className="member-detail-modal">
            <DialogTitle className="modal-title">
                {member.name}
                <IconButton onClick={onClose} className="modal-close-button">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers className="modal-content">
                <Box className="modal-header">
                    <Avatar className="modal-avatar">{member.name.charAt(0)}</Avatar>
                    <Typography variant="h5" className="modal-name">{member.name}</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>{member.position}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <List className="modal-info-list">
                    <ListItemButton>
                        <ListItemIcon><EmailIcon color="action" /></ListItemIcon>
                        <ListItemText primary="이메일" secondary={member.email} />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon><PhoneIcon color="action" /></ListItemIcon>
                        <ListItemText primary="연락처" secondary={member.phone} />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon><LocationOnIcon color="action" /></ListItemIcon>
                        <ListItemText primary="위치" secondary={member.location} />
                    </ListItemButton>
                </List>
            </DialogContent>
        </Dialog>
    );
};

const formatMessageTime = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffHours = (now - messageDate) / (1000 * 60 * 60);

    if (diffHours < 24) {
        return `${messageDate.getHours()}:${String(messageDate.getMinutes()).padStart(2, '0')}`;
    } else {
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays}일 전`;
    }
};

const Messenger = ({ open, onClose, initialRecipient }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversations, setConversations] = useState([
        { id: 1, name: '인사팀', isGroup: true, members: ['홍길동', '김철수'], lastMessage: '이번주 회의 일정 공유드립니다.' },
        { id: 2, name: '이영희', isGroup: false, lastMessage: '안녕하세요. 요청하신 자료 전달 드렸습니다.' },
    ]);
    const [activeConversation, setActiveConversation] = useState(null);

    useEffect(() => {
        if (initialRecipient) {
            setActiveConversation({ id: 0, name: initialRecipient.name, isGroup: false, members: ['나', initialRecipient.name] });
            setMessages([]);
        } else if (conversations.length > 0) {
            setActiveConversation(conversations[0]);
        }
    }, [initialRecipient]);

    const handleSendMessage = () => {
        if (newMessage.trim() && activeConversation) {
            const newMsg = {
                id: messages.length + 1,
                text: newMessage,
                sender: '나',
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, newMsg]);
            setNewMessage('');
        }
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            className="messenger-drawer"
        >
            <Box className="messenger-container">
                <Box className="messenger-header">
                    <Typography variant="h6">메신저</Typography>
                    <IconButton onClick={onClose} className="messenger-close-button">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                <Box className="messenger-content">
                    <Box className="conversation-list" sx={{ display: activeConversation ? 'none' : 'block' }}>
                        <Typography variant="subtitle1" className="conversation-list-title">채팅 목록</Typography>
                        {conversations.map(conv => (
                            <ListItemButton key={conv.id} onClick={() => setActiveConversation(conv)} className="conversation-item">
                                <ListItemIcon>
                                    <Avatar>{conv.isGroup ? <GroupIcon /> : conv.name.charAt(0)}</Avatar>
                                </ListItemIcon>
                                <ListItemText primary={conv.name} secondary={conv.lastMessage} />
                            </ListItemButton>
                        ))}
                    </Box>

                    {activeConversation && (
                        <Box className="chat-window">
                            <Box className="chat-header">
                                <IconButton onClick={() => setActiveConversation(null)} sx={{ mr: 1 }}>
                                    <ArrowBackIosIcon />
                                </IconButton>
                                <Typography variant="h6">{activeConversation.name}</Typography>
                            </Box>
                            <Box className="chat-messages">
                                {messages.map(msg => (
                                    <Box key={msg.id} className={`message-box ${msg.sender === '나' ? 'my-message-box' : 'other-message-box'}`}>
                                        <Box className="message-info-box">
                                            <Typography variant="caption" className="message-time">{formatMessageTime(msg.timestamp)}</Typography>
                                        </Box>
                                        <Box className={`message-bubble ${msg.sender === '나' ? 'my-bubble' : 'other-bubble'}`}>
                                            <Typography variant="body1">{msg.text}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                            <Box className="chat-input-container">
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="메시지 입력..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                                />
                                <IconButton color="primary" onClick={handleSendMessage}>
                                    <SendIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Drawer>
    );
};

const OrgTreeItem = ({ node, level = 0, onMemberClick, onChatClick }) => {
    const [open, setOpen] = useState(level === 0);
    const hasChildren = node.children && node.children.length > 0;
    const isMember = !hasChildren;

    const handleClick = () => {
        if (isMember) {
            onMemberClick(node);
        } else {
            setOpen(!open);
        }
    };

    return (
        <>
            <ListItemButton
                onClick={handleClick}
                className={`org-tree-item level-${level}`}
                sx={{ pl: `${16 + (level * 16)}px` }}
            >
                <ListItemIcon>
                    {isMember ? <PersonIcon /> : <GroupIcon />}
                </ListItemIcon>
                <ListItemText
                    primary={isMember ? `${node.name} (${node.position})` : node.name}
                    className="org-tree-item-text"
                />
                {!isMember && (open ? <ExpandLess className="org-tree-item-icon" /> : <ExpandMore className="org-tree-item-icon" />)}
                {isMember && (
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); onChatClick(node); }} sx={{ ml: 1 }}>
                        <ChatIcon fontSize="small" />
                    </IconButton>
                )}
            </ListItemButton>
            {hasChildren && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {node.children.map((childNode) => (
                            <OrgTreeItem key={childNode.id} node={childNode} level={level + 1} onMemberClick={onMemberClick} onChatClick={onChatClick} />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};

const OrgChart = ({ open, onClose, data = defaultOrgData }) => {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isMessengerOpen, setIsMessengerOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const handleMemberClick = (member) => {
        setSelectedMember(member);
        setIsDetailModalOpen(true);
    };

    const handleChatClick = (member) => {
        setSelectedMember(member);
        setIsMessengerOpen(true);
    };

    return (
        <>
            <Drawer
                anchor="bottom"
                open={open}
                onClose={onClose}
                className="org-chart-drawer"
            >
                <Box role="presentation" className="org-chart-container">
                    <Box className="org-chart-header">
                        <Typography variant="h6">조직도</Typography>
                        <Box>
                            <IconButton onClick={() => setIsMessengerOpen(true)}>
                                <ChatIcon />
                            </IconButton>
                            <IconButton onClick={onClose} className="org-chart-close-button">
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Divider />
                    <Box className="org-chart-content">
                        <List>
                            <OrgTreeItem node={data} onMemberClick={handleMemberClick} onChatClick={handleChatClick} />
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <MemberDetailModal
                open={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                member={selectedMember}
            />
            <Messenger
                open={isMessengerOpen}
                onClose={() => setIsMessengerOpen(false)}
                initialRecipient={selectedMember}
            />
        </>
    );
};

export default OrgChart;
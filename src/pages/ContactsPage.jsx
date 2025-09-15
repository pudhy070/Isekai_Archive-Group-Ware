import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Avatar,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button,
    List,
    ListItem,
    ListItemText,
    InputAdornment,
    Collapse,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';


const companyStructure = {
    '경영지원본부': {
        '인사팀': [
            { id: 1, name: '홍길동', position: '과장', email: 'gdhong@archive.com', phone: '010-1234-5678', location: '본사 2층', hireDate: '2019-03-01' },
            { id: 2, name: '김철수', position: '사원', email: 'cskim@archive.com', phone: '010-9876-5432', location: '본사 2층', hireDate: '2023-01-15' },
        ],
        '총무팀': [
            { id: 3, name: '이영희', position: '부장', email: 'yhlee@archive.com', phone: '010-1111-2222', location: '본사 2층', hireDate: '2018-05-20' },
        ],
    },
    '기술연구소': {
        '개발1팀': [
            { id: 4, name: '이순신', position: '팀장', email: 'sslee@archive.com', phone: '010-3333-4444', location: '본사 3층', hireDate: '2017-09-10' },
            { id: 5, name: '박보검', position: '사원', email: 'bgpark@archive.com', phone: '010-5555-6666', location: '본사 3층', hireDate: '2024-02-01' },
        ],
        '개발2팀': [
            { id: 6, name: '최강창민', position: '대리', email: 'cmchoi@archive.com', phone: '010-7777-8888', location: '본사 3층', hireDate: '2021-07-22' },
        ],
        '디자인팀': [
            { id: 7, name: '유관순', position: '사원', email: 'gsyoo@archive.com', phone: '010-9999-0000', location: '본사 4층', hireDate: '2022-11-05' },
        ],
    },
};

const ContactDetailModal = ({ open, onClose, contact }) => {
    if (!contact) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{contact.name}</Typography>
                <IconButton onClick={onClose} sx={{ color: theme => theme.palette.grey[500] }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                    <Avatar sx={{ width: 80, height: 80, mb: 2 }} />
                    <Typography variant="h5">{contact.name}</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>{contact.position}</Typography>
                    <Typography variant="body2" color="text.secondary">{contact.team}</Typography>
                </Box>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemText primary="이메일" secondary={contact.email} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="연락처" secondary={contact.phone} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="위치" secondary={contact.location} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="입사일" secondary={contact.hireDate} />
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>닫기</Button>
            </DialogActions>
        </Dialog>
    );
};

const ContactsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [expandedDepartments, setExpandedDepartments] = useState({});

    const handleCardClick = (contact, teamName) => {
        setSelectedContact({ ...contact, team: teamName });
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedContact(null);
    };

    const handleDepartmentToggle = (department) => {
        setExpandedDepartments(prev => ({
            ...prev,
            [department]: !prev[department],
        }));
    };

    const allContacts = Object.values(companyStructure)
        .flatMap(headquarter => Object.entries(headquarter)
            .flatMap(([teamName, contacts]) => contacts.map(contact => ({ ...contact, team: teamName }))
            ));

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>회사 주소록</Typography>
                <TextField
                    size="small"
                    variant="outlined"
                    placeholder="이름으로 검색"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Grid container spacing={3}>
                {Object.entries(companyStructure).map(([headquarter, teams]) => {
                    const isExpanded = expandedDepartments[headquarter];
                    const filteredContactsByDepartment = Object.entries(teams).flatMap(([teamName, contacts]) =>
                        contacts.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map(c => ({ ...c, team: teamName }))
                    );

                    const hasFilteredContacts = filteredContactsByDepartment.length > 0;

                    if (!hasFilteredContacts && searchTerm !== '') return null;

                    return (
                        <Grid item xs={12} key={headquarter}>
                            <Box
                                onClick={() => handleDepartmentToggle(headquarter)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    mb: 2,
                                    p: 1,
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                    userSelect: 'none',
                                }}
                            >
                                <IconButton size="small">
                                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{headquarter}</Typography>
                            </Box>

                            <Collapse in={isExpanded}>
                                <Box sx={{ pl: 4 }}>
                                    {Object.entries(teams).map(([teamName, contacts]) => {
                                        const filteredTeamContacts = contacts.filter(c =>
                                            c.name.toLowerCase().includes(searchTerm.toLowerCase())
                                        );

                                        if (filteredTeamContacts.length === 0 && searchTerm !== '') return null;

                                        return (
                                            <Box key={teamName} sx={{ mb: 4 }}>
                                                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>- {teamName}</Typography>
                                                <Grid container spacing={3}>
                                                    {filteredTeamContacts.map(c => (
                                                        <Grid item xs={12} sm={6} md={4} key={c.id}>
                                                            <Paper
                                                                onClick={() => handleCardClick(c, teamName)}
                                                                sx={{
                                                                    p: 2,
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                    textAlign: 'center',
                                                                    cursor: 'pointer',
                                                                    transition: 'transform 0.2s',
                                                                    '&:hover': {
                                                                        transform: 'scale(1.03)',
                                                                    }
                                                                }}
                                                            >
                                                                <Avatar sx={{ width: 56, height: 56, mb: 1 }} />
                                                                <Typography variant="h6">{c.name}</Typography>
                                                                <Typography color="text.secondary" sx={{ mb: 0.5 }}>{c.position}</Typography>
                                                                <Typography variant="body2" color="text.secondary">{c.email}</Typography>
                                                            </Paper>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Collapse>
                        </Grid>
                    );
                })}
            </Grid>
            <ContactDetailModal open={modalOpen} onClose={handleModalClose} contact={selectedContact} />
        </Box>
    );
};

export default ContactsPage;
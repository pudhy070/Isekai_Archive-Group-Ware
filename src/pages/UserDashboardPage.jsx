import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Alert,
    IconButton,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Avatar
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const roles = [
    '관리자',
    '회장',
    '부회장',
    '사장',
    '부사장',
    '전무',
    '상무',
    '이사',
    '부장',
    '차장',
    '과장',
    '대리',
    '사원'
];

const departments = ['경영지원본부', '기술연구소', '영업부', '마케팅팀'];

const UserDashboardPage = () => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [emailUsername, setEmailUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(roles[roles.length - 1]);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const EMAIL_DOMAIN = '@Isekai-archive.com';

    useEffect(() => {
        const savedUsers = localStorage.getItem('registeredUsers');
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        }
    }, []);

    const saveUsersToLocalStorage = (userList) => {
        localStorage.setItem('registeredUsers', JSON.stringify(userList));
        setUsers(userList);
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        if (!emailUsername.trim()) {
            setMessage({ severity: 'error', text: '이메일 아이디를 입력해주세요.' });
            return false;
        }
        if (!name.trim()) {
            setMessage({ severity: 'error', text: '이름을 입력해주세요.' });
            return false;
        }
        if (!department) {
            setMessage({ severity: 'error', text: '부서를 선택해주세요.' });
            return false;
        }
        if (!password.trim()) {
            setMessage({ severity: 'error', text: '비밀번호를 입력해주세요.' });
            return false;
        }
        if (password.length < 6) {
            setMessage({ severity: 'error', text: '비밀번호는 최소 6자 이상이어야 합니다.' });
            return false;
        }

        const email = `${emailUsername.trim()}${EMAIL_DOMAIN}`;
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            setMessage({ severity: 'error', text: '이미 존재하는 이메일 주소입니다.' });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        try {
            const email = `${emailUsername.trim()}${EMAIL_DOMAIN}`;
            const newUser = {
                id: Date.now(),
                name: name.trim(),
                department,
                email,
                password,
                role,
                createdAt: new Date().toISOString(),
                status: 'active'
            };

            try {
            } catch (apiError) {
                console.log('API 호출 실패, 로컬 저장소에 저장:', apiError.message);
            }

            const updatedUsers = [...users, newUser];
            saveUsersToLocalStorage(updatedUsers);

            const loginUsers = JSON.parse(localStorage.getItem('loginUsers') || '[]');
            const newLoginUser = {
                email,
                password,
                name: name.trim(),
                department,
                role
            };
            loginUsers.push(newLoginUser);
            localStorage.setItem('loginUsers', JSON.stringify(loginUsers));

            setMessage({
                severity: 'success',
                text: `새 계정 "${name.trim()}"이 성공적으로 생성되었습니다! 이메일: ${email}`
            });

            setName('');
            setDepartment('');
            setEmailUsername('');
            setPassword('');
            setRole(roles[roles.length - 1]);

        } catch (error) {
            console.error('계정 생성 실패:', error);
            setMessage({
                severity: 'error',
                text: `계정 생성 실패: ${error.message}`
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteUser = (user) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const confirmDeleteUser = () => {
        if (userToDelete) {
            const updatedUsers = users.filter(user => user.id !== userToDelete.id);
            saveUsersToLocalStorage(updatedUsers);

            const loginUsers = JSON.parse(localStorage.getItem('loginUsers') || '[]');
            const updatedLoginUsers = loginUsers.filter(user => user.email !== userToDelete.email);
            localStorage.setItem('loginUsers', JSON.stringify(updatedLoginUsers));

            setMessage({
                severity: 'success',
                text: `사용자 "${userToDelete.name}"가 삭제되었습니다.`
            });
        }
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    const getRoleColor = (role) => {
        const roleColors = {
            '관리자': 'error',
            '회장': 'primary',
            '부회장': 'primary',
            '사장': 'secondary',
            '부사장': 'secondary',
            '전무': 'info',
            '상무': 'info',
            '이사': 'success',
            '부장': 'warning',
            '차장': 'warning',
            '과장': 'default',
            '대리': 'default',
            '사원': 'default'
        };
        return roleColors[role] || 'default';
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
                관리자 대시보드
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, boxShadow: 3, height: 'fit-content' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <PersonAddIcon sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                    새로운 계정 생성
                                </Typography>
                            </Box>
                            {message && (
                                <Alert severity={message.severity} sx={{ mb: 2 }}>
                                    {message.text}
                                </Alert>
                            )}
                            <Box component="form" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="이름"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth required>
                                            <InputLabel>부서명</InputLabel>
                                            <Select
                                                value={department}
                                                label="부서명"
                                                onChange={(e) => setDepartment(e.target.value)}
                                            >
                                                {departments.map((dept) => (
                                                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="이메일 (아이디)"
                                            required
                                            value={emailUsername}
                                            onChange={(e) => setEmailUsername(e.target.value)}
                                            variant="outlined"
                                            placeholder="user.name"
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">{EMAIL_DOMAIN}</InputAdornment>
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="비밀번호"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            variant="outlined"
                                            helperText="최소 6자 이상"
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton onClick={handlePasswordVisibility} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                )
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel>역할</InputLabel>
                                            <Select
                                                value={role}
                                                label="역할"
                                                onChange={(e) => setRole(e.target.value)}
                                            >
                                                {roles.map((r) => (
                                                    <MenuItem key={r} value={r}>{r}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            size="large"
                                            sx={{ mt: 2 }}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? '생성 중...' : '계정 생성하기'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, boxShadow: 3 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <PeopleIcon sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                    등록된 사용자 ({users.length}명)
                                </Typography>
                            </Box>
                            {users.length > 0 ? (
                                <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>이름</TableCell>
                                                <TableCell>부서</TableCell>
                                                <TableCell>역할</TableCell>
                                                <TableCell>이메일</TableCell>
                                                <TableCell>작업</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                                                                {user.name.charAt(0)}
                                                            </Avatar>
                                                            {user.name}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>{user.department}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={user.role}
                                                            color={getRoleColor(user.role)}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: '0.875rem' }}>
                                                        {user.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            color="error"
                                                            size="small"
                                                            onClick={() => handleDeleteUser(user)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        등록된 사용자가 없습니다.
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>사용자 삭제</DialogTitle>
                <DialogContent>
                    <Typography>
                        정말로 "{userToDelete?.name}" 사용자를 삭제하시겠습니까?
                        <br />
                        이 작업은 되돌릴 수 없습니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>취소</Button>
                    <Button onClick={confirmDeleteUser} color="error" variant="contained">
                        삭제
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserDashboardPage;
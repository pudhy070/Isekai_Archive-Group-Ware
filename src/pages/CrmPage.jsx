import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    List,
    ListItem,
    ListItemText,
    InputAdornment
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

const initialRows = [
    { id: 1, company: '(주)알파고', contactPerson: '홍길동', status: '접촉 중', email: 'gdhong@alphago.com', phone: '010-1111-2222', lastContact: '2025-08-25', memo: '첫 미팅. 긍정적 반응.' },
    { id: 2, company: '(주)베타', contactPerson: '이순신', status: '계약 완료', email: 'sslee@beta.com', phone: '010-3333-4444', lastContact: '2025-08-20', memo: '계약 체결. 담당자 매우 협조적.' },
    { id: 3, company: '(주)감마테크', contactPerson: '김유신', status: '문의', email: 'yskim@gammatc.com', phone: '010-5555-6666', lastContact: '2025-08-27', memo: '서비스 관련 문의사항 접수.' },
    { id: 4, company: '(주)델타솔루션', contactPerson: '강감찬', status: '팔로우업', email: 'cckang@deltas.com', phone: '010-7777-8888', lastContact: '2025-08-26', memo: '추가 자료 요청. 다음 주 재방문 예정.' },
    { id: 5, company: '(주)엡실론', contactPerson: '안중근', status: '접촉 실패', email: 'jgan@epsilon.com', phone: '010-9999-0000', lastContact: '2025-08-24', memo: '담당자 연락 불가. 추후 재시도 필요.' },
];

const columns = [
    { field: 'company', headerName: '회사명', width: 200 },
    { field: 'contactPerson', headerName: '담당자', width: 150 },
    { field: 'status', headerName: '상태', width: 130 },
    { field: 'email', headerName: '이메일', flex: 1 },
    { field: 'phone', headerName: '연락처', width: 180 },
    { field: 'lastContact', headerName: '최근 접촉일', width: 150 }
];

const CustomerAddModal = ({ open, onClose, onAddCustomer }) => {
    const [formData, setFormData] = useState({
        company: '',
        contactPerson: '',
        status: '',
        email: '',
        phone: '',
        lastContact: new Date().toISOString().slice(0, 10),
        memo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (formData.company && formData.contactPerson) {
            onAddCustomer(formData);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">신규 고객 추가</Typography>
                <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <TextField fullWidth margin="dense" label="회사명" name="company" value={formData.company} onChange={handleChange} required />
                <TextField fullWidth margin="dense" label="담당자" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
                <TextField fullWidth margin="dense" label="상태" name="status" value={formData.status} onChange={handleChange} />
                <TextField fullWidth margin="dense" label="이메일" name="email" value={formData.email} onChange={handleChange} />
                <TextField fullWidth margin="dense" label="연락처" name="phone" value={formData.phone} onChange={handleChange} />
                <TextField fullWidth margin="dense" label="메모" name="memo" value={formData.memo} onChange={handleChange} multiline rows={4} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>취소</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">저장</Button>
            </DialogActions>
        </Dialog>
    );
};
const CustomerDetailModal = ({ open, onClose, customer, onSaveMemo }) => {
    const [memo, setMemo] = useState('');

    React.useEffect(() => {
        if (customer) {
            setMemo(customer.memo || '');
        }
    }, [customer]);

    if (!customer) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{customer.company} 정보</Typography>
                <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <List dense>
                    <ListItem>
                        <ListItemText primary="회사명" secondary={customer.company} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="담당자" secondary={customer.contactPerson} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="상태" secondary={customer.status} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="이메일" secondary={customer.email} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="연락처" secondary={customer.phone} />
                    </ListItem>
                </List>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>메모</Typography>
                <TextField fullWidth multiline rows={4} value={memo} onChange={(e) => setMemo(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>닫기</Button>
                <Button onClick={() => onSaveMemo(customer.id, memo)} variant="contained" color="primary">메모 저장</Button>
            </DialogActions>
        </Dialog>
    );
};

const CrmPage = () => {
    const [rows, setRows] = useState(initialRows);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRows = rows.filter(row =>
        row.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddCustomer = (newCustomer) => {
        const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
        setRows(prevRows => [...prevRows, { ...newCustomer, id: newId }]);
    };

    const handleRowClick = (params) => {
        setSelectedCustomer(params.row);
        setIsDetailModalOpen(true);
    };

    const handleSaveMemo = (id, newMemo) => {
        setRows(prevRows =>
            prevRows.map(row => (row.id === id ? { ...row, memo: newMemo } : row))
        );
        setIsDetailModalOpen(false);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                flexWrap: 'wrap',
                gap: 2
            }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>CRM 고객 관리</Typography>
                <Box>
                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder="회사명 또는 담당자 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ mr: 2 }}
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                    />
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsAddModalOpen(true)}>
                        신규 고객 추가
                    </Button>
                </Box>
            </Box>
            <Paper sx={{ height: '70vh', width: '100%' }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    checkboxSelection
                    onRowClick={handleRowClick}
                />
            </Paper>

            <CustomerAddModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddCustomer={handleAddCustomer} />
            <CustomerDetailModal open={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} customer={selectedCustomer} onSaveMemo={handleSaveMemo} />
        </Box>
    );
};

export default CrmPage;
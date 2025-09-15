import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Tabs, Tab, CircularProgress,
    Button, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField,
    Grid
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import Spreadsheet from 'react-spreadsheet';


const columns = [
    { field: 'docId', headerName: '문서 ID', width: 100 },
    { field: 'status', headerName: '상태', width: 100 },
    { field: 'title', headerName: '문서 제목', flex: 1 },
    { field: 'requester', headerName: '기안자', width: 150 },
    { field: 'date', headerName: '기안일', width: 180 },
];

const ApprovalPage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [pendingDocs, setPendingDocs] = useState([]);
    const [submittedDocs, setSubmittedDocs] = useState([]);
    const [completedDocs, setCompletedDocs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [docTypeTab, setDocTypeTab] = useState(0);

    const [vacationForm, setVacationForm] = useState({
        title: '[휴가] 개인 연차 사용 신청',
        startDate: '2025-09-01',
        endDate: '2025-09-02',
        period: '',
        reason: ''
    });

    const [expenseForm, setExpenseForm] = useState({
        title: '[경비] 2025년 하반기 워크샵 경비',
        spreadsheetData: [
            [{ value: '항목' }, { value: '금액' }],
            [{ value: '식대' }, { value: '' }],
            [{ value: '교통비' }, { value: '' }],
            [{ value: '총액', readOnly: true }, { value: '' }]
        ]
    });

    const fetchDocuments = async (tab) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        let mockData = [];
        switch(tab) {
            case 0:
                mockData = [
                    { id: 1, docId: 'APP-001', status: '대기', title: '[기안] 2025년 하반기 워크샵 경비', requester: '홍길동', date: '2025-08-26' },
                    { id: 2, docId: 'VAC-003', status: '대기', title: '[휴가] 개인 연차 사용 신청', requester: '이순신', date: '2025-08-25' },
                ];
                setPendingDocs(mockData);
                break;
            case 1:
                mockData = [
                    { id: 3, docId: 'APP-002', status: '진행중', title: '[기안] 2025년도 신규 입사자 교육', requester: '김철수', date: '2025-08-24' },
                    { id: 4, docId: 'VAC-004', status: '완료', title: '[휴가] 병가 사용 신청', requester: '박영희', date: ' ' },
                ];
                setSubmittedDocs(mockData);
                break;
            case 2:
                mockData = [
                    { id: 5, docId: 'APP-003', status: '완료', title: '[결재] 2025년 3분기 사무용품 구매', requester: '이순신', date: '2025-08-22' },
                    { id: 6, docId: 'VAC-005', status: '완료', title: '[휴가] 반차 사용 신청', requester: '홍길동', date: '2025-08-21' },
                ];
                setCompletedDocs(mockData);
                break;
            default:
                break;
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchDocuments(tabIndex);
    }, [tabIndex]);

    const getRowsForCurrentTab = () => {
        switch(tabIndex) {
            case 0: return pendingDocs;
            case 1: return submittedDocs;
            case 2: return completedDocs;
            default: return [];
        }
    };

    const handleNewDocClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setDocTypeTab(0);
        setVacationForm({ title: '[휴가] 개인 연차 사용 신청', startDate: '', endDate: '', period: '', reason: '' });
        setExpenseForm({
            title: '[경비] 2025년 하반기 워크샵 경비',
            spreadsheetData: [
                [{ value: '항목' }, { value: '금액' }],
                [{ value: '식대' }, { value: '' }],
                [{ value: '교통비' }, { value: '' }],
                [{ value: '총액', readOnly: true }, { value: '' }]
            ]
        });
    };

    const handleVacationFormChange = (e) => {
        const { name, value } = e.target;
        setVacationForm(prev => ({ ...prev, [name]: value }));
    };

    const handleExpenseFormChange = (e) => {
        const { name, value } = e.target;
        setExpenseForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let submittedData;
        if (docTypeTab === 0) {
            submittedData = { ...vacationForm, type: '연차 신청' };
        } else {
            let totalAmount = 0;
            if (expenseForm.spreadsheetData && expenseForm.spreadsheetData.length > 1) {
                for(let i = 1; i < expenseForm.spreadsheetData.length; i++) {
                    const row = expenseForm.spreadsheetData[i];
                    if (row[1] && row[1].value) {
                        totalAmount += Number(row[1].value) || 0;
                    }
                }
            }
            submittedData = { ...expenseForm, totalAmount, type: '경비 보고' };
        }

        console.log("Document submitted:", submittedData);
        handleCloseModal();
    };

    const renderDocumentForm = () => {
        switch(docTypeTab) {
            case 0:
                return (
                    <Box sx={{ mt: 2, border: '1px solid #ddd', p: 2 }}>
                        <Typography variant="h6" align="center" gutterBottom>
                            연차휴가 사용 신청서
                        </Typography>
                        <Grid container spacing={0} sx={{ border: '1px solid #ddd' }}>
                            <Grid item xs={2} sx={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', p: 1, backgroundColor: '#f5f5f5' }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>소속</Typography>
                            </Grid>
                            <Grid item xs={4} sx={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', p: 1 }}>
                                <TextField fullWidth size="small" variant="standard" />
                            </Grid>
                            <Grid item xs={2} sx={{ borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', p: 1, backgroundColor: '#f5f5f5' }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>직위</Typography>
                            </Grid>
                            <Grid item xs={4} sx={{ borderBottom: '1px solid #ddd', p: 1 }}>
                                <TextField fullWidth size="small" variant="standard" />
                            </Grid>
                            <Grid item xs={2} sx={{ borderRight: '1px solid #ddd', p: 1, backgroundColor: '#f5f5f5' }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>성명</Typography>
                            </Grid>
                            <Grid item xs={10} sx={{ p: 1 }}>
                                <TextField fullWidth size="small" variant="standard" />
                            </Grid>

                            <Grid item xs={2} sx={{ borderRight: '1px solid #ddd', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', p: 1, backgroundColor: '#f5f5f5' }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>기간</Typography>
                            </Grid>
                            <Grid item xs={10} sx={{ borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', p: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <TextField
                                        type="date"
                                        size="small"
                                        InputLabelProps={{ shrink: true }}
                                        value={vacationForm.startDate}
                                        onChange={handleVacationFormChange}
                                        name="startDate"
                                        sx={{ mr: 1 }}
                                    />
                                    <Typography variant="body2">일부터</Typography>
                                    <TextField
                                        type="date"
                                        size="small"
                                        InputLabelProps={{ shrink: true }}
                                        value={vacationForm.endDate}
                                        onChange={handleVacationFormChange}
                                        name="endDate"
                                        sx={{ mx: 1 }}
                                    />
                                    <Typography variant="body2">일까지</Typography>
                                    <TextField
                                        size="small"
                                        label="기간"
                                        name="period"
                                        value={vacationForm.period}
                                        onChange={handleVacationFormChange}
                                        sx={{ width: '80px', ml: 2 }}
                                    />
                                    <Typography variant="body2" sx={{ ml: 1 }}>(일간)</Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={2} sx={{ borderRight: '1px solid #ddd', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', p: 1, backgroundColor: '#f5f5f5' }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>사유</Typography>
                            </Grid>
                            <Grid item xs={10} sx={{ borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', p: 1 }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    name="reason"
                                    value={vacationForm.reason}
                                    onChange={handleVacationFormChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 1:
                return (
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="문서 제목"
                                    name="title"
                                    value={expenseForm.title}
                                    onChange={handleExpenseFormChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                                    경비 내역
                                </Typography>
                                <Spreadsheet
                                    data={expenseForm.spreadsheetData}
                                    onChange={(data) => {
                                        setExpenseForm(prev => ({ ...prev, spreadsheetData: data }));
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box className="page-header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">전자결재</Typography>
                <Button variant="contained" color="primary" onClick={handleNewDocClick}>
                    새 문서 작성
                </Button>
            </Box>
            <Paper>
                <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
                    <Tab label="결재 대기 문서" />
                    <Tab label="기안 문서" />
                    <Tab label="완료 문서" />
                </Tabs>
                <Box sx={{ height: '65vh', width: '100%' }}>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <DataGrid
                            rows={getRowsForCurrentTab()}
                            columns={columns}
                            pageSizeOptions={[10, 25, 50]}
                        />
                    )}
                </Box>
            </Paper>

            <Dialog
                open={isModalOpen}
                onClose={handleCloseModal}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>새 문서 작성</DialogTitle>
                <DialogContent>
                    <Tabs value={docTypeTab} onChange={(e, newValue) => setDocTypeTab(newValue)}>
                        <Tab label="연차 신청" />
                        <Tab label="경비 보고" />
                    </Tabs>
                    {renderDocumentForm()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary">
                        취소
                    </Button>
                    <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
                        제출
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ApprovalPage;


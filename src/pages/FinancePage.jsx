import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const columns = [ { field: 'date', headerName: '거래일', width: 150 }, { field: 'type', headerName: '구분', width: 130 }, { field: 'description', headerName: '내용', flex: 1 }, { field: 'amount', headerName: '금액', width: 180, type: 'number' }, ];
const rows = [ { id: 1, date: '2025-08-25', type: '매출', description: '알파 프로젝트 계약금', amount: 50000000 }, { id: 2, date: '2025-08-26', type: '매입', description: '서버 임대료', amount: -2000000 }, ];
const chartData = [ { name: '1월', '매출': 4000, '매입': 2400, }, { name: '2월', '매출': 3000, '매입': 1398, }, { name: '3월', '매출': 2000, '매입': 9800, }, ];

const FinancePage = () => (
    <Box>
        <Typography variant="h4" sx={{ mb: 4 }}>자금/회계</Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, height: 300 }}>
                    <Typography variant="h6" gutterBottom>월별 매출/매입 현황</Typography>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="매출" fill="#8884d8" />
                            <Bar dataKey="매입" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ height: '50vh', width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} />
                </Paper>
            </Grid>
        </Grid>
    </Box>
);
export default FinancePage;
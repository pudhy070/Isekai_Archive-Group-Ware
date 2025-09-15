import React, { useState, useEffect } from 'react';
import { Box, Grid, Stack, Fab, CircularProgress, Alert } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import {
    IconMenuBar,
    ProfileWidget,
    ExpenseWidget,
    BannerWidget,
    MailWidget,
    KissWidget,
    ScheduleWidget,
    RecentPostsWidget,
    NotificationWidget,
    CalendarWidget
} from '../components/dashboard';
import OrgChart from '../components/OrgChart.jsx';
import './Dashboard.css';

const statusOptions = [
    { id: 'blue', color: '#42a5f5', title: '협업 가능' },
    { id: 'green', color: '#66bb6a', title: '업무 중' },
    { id: 'orange', color: '#ffa726', title: '집중 업무' },
    { id: 'red', color: '#ef5350', title: '응답 불가' },
    { id: 'black', color: '#212121', title: '오프라인' },
];

const MainPage = ({ user, setUser, setIsAuthenticated }) => {
    const [currentStatus, setCurrentStatus] = useState('green');
    const [isOrgChartOpen, setIsOrgChartOpen] = useState(false);

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        try {
            const allUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            setUsers(allUsers);
        } catch (err) {
            setError('전체 사용자 목록을 불러오는 데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (!user) {

        return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 10 }} />;
    }
    
    if (isLoading) {
        return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 10 }} />;
    }

    if (error) {
        return <Alert severity="error" sx={{ mt: 10 }}>{error}</Alert>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <IconMenuBar />
            <Grid container spacing={3} sx={{ mt: 0.5 }}>
                <Grid item sx={{ width: 300 }}>
                    <Stack spacing={3}>
                        <ProfileWidget
                            currentStatus={currentStatus}
                            statusOptions={statusOptions}
                            setCurrentStatus={setCurrentStatus}
                            user={user}

                            setIsAuthenticated={setIsAuthenticated}
                            setUser={setUser}
                        />
                        <MailWidget />
                    </Stack>
                </Grid>

                <Grid item xs={12} lg={2.4}>
                    <Stack spacing={3}>
                        <NotificationWidget
                            currentStatus={currentStatus}
                            setCurrentStatus={setCurrentStatus}
                        />
                        <ScheduleWidget />
                    </Stack>
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Stack spacing={3}>
                        <BannerWidget />
                        <ExpenseWidget />
                    </Stack>
                </Grid>
                <Grid item sx={{ width: 330 }}>
                    <Stack spacing={3}>
                        <RecentPostsWidget />
                        <KissWidget />
                    </Stack>
                </Grid>
                <Grid item sx={{ width: 360 }}>
                    <Stack spacing={3}>
                        <CalendarWidget />
                    </Stack>
                </Grid>
            </Grid>

            <Fab
                color="primary"
                aria-label="organization chart"
                sx={{ position: 'fixed', bottom: 32, right: 32 }}
                onClick={() => setIsOrgChartOpen(true)}
            >
                <AccountTreeIcon />
            </Fab>

            <OrgChart
                open={isOrgChartOpen}
                onClose={() => setIsOrgChartOpen(false)}
                users={users}
            />
        </Box>
    );
};

export default MainPage;

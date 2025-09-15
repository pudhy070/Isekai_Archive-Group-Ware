import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const events = [
    { title: '정상근무', date: '2025-08-25', color: 'green' },
    { title: '휴가', date: '2025-08-26', color: 'blue' },
    { title: '지각', date: '2025-08-27', color: 'orange' },
];

const initialVacationData = {
    total: 15,
    used: 5,
    remaining: 10,
};

const AttendancePage = () => {
    const [vacationData, setVacationData] = useState(initialVacationData);

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4 }}>근태관리</Typography>

            <Paper sx={{ p: 2, mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>연차 휴가</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">총 연차</Typography>
                        <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold' }}>{vacationData.total}일</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">사용 연차</Typography>
                        <Typography variant="h5" color="primary" sx={{ mt: 1, fontWeight: 'bold' }}>{vacationData.used}일</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">잔여 연차</Typography>
                        <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold' }}>{vacationData.remaining}일</Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    locale="ko"
                    height="75vh"
                />
            </Paper>
        </Box>
    );
};
export default AttendancePage;
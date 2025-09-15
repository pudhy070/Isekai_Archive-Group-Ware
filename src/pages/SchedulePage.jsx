import React, { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const myEvents = [
    { title: '팀 프로젝트 마감', start: '2025-08-28', color: '#1976d2' },
    { title: '사내 교육 수강', start: '2025-08-29T10:00:00', end: '2025-08-29T12:00:00', color: '#66bb6a' },
];

const departmentEvents = [
    { title: '주간 정기회의', start: new Date(), color: '#ffa726' },
    { title: 'A프로젝트 고객사 미팅', start: '2025-08-27T14:00:00', end: '2025-08-27T15:00:00', color: '#ffa726' },
    { title: '부서 회식', start: '2025-08-30T19:00:00', color: '#ffa726' },
];

const companyEvents = [
    { title: '전사 워크샵', start: '2025-09-05', end: '2025-09-07', color: '#ef5350' },
    { title: '창립기념일 (휴무)', start: '2025-10-10', allDay: true, color: '#ef5350' },
];

const eventMap = {
    0: myEvents,
    1: departmentEvents,
    2: companyEvents,
};

const SchedulePage = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">일정관리</Typography>
            </Box>

            <Paper sx={{ mb: 2, borderRadius: 2 }}>
                <Tabs value={activeTab} onChange={handleChangeTab} aria-label="일정 탭" variant="fullWidth">
                    <Tab label="나의 일정" />
                    <Tab label="부서 일정" />
                    <Tab label="회사 일정" />
                </Tabs>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    events={eventMap[activeTab]}
                    editable={true}
                    selectable={true}
                    locale="ko"
                    dayMaxEvents={true}
                />
            </Paper>
        </Box>
    );
};

export default SchedulePage;

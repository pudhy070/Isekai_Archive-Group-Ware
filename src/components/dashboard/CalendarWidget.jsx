import React from 'react';
import { Paper } from '@mui/material';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';


import 'dayjs/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarWidget.css';

dayjs.locale('ko');

const localizer = dayjsLocalizer(dayjs);

const messages = {
    today: '오늘',
    previous: '이전',
    next: '다음',
    month: '월',
    week: '주',
    day: '일',
    agenda: '일정 목록',
    date: '날짜',
    time: '시간',
    event: '일정',
    noEventsInRange: '해당 기간에 일정이 없습니다.',
    showMore: total => `+${total}개 더 보기`,
};

const myEventsList = [
    {
        start: dayjs('2025-08-26T10:00:00').toDate(),
        end: dayjs('2025-08-26T11:00:00').toDate(),
        title: '주간 업무 회의',
    },
    {
        start: dayjs('2025-08-27T14:00:00').toDate(),
        end: dayjs('2025-08-27T15:00:00').toDate(),
        title: '클라이언트 미팅',
        allDay: false,
    },
];

const CalendarWidget = () => {
    return (
        <Paper
            className="widget-card"
            sx={{
                height: 550,
                padding: '16px',
            }}
        >
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                views={['month']}
                toolbar={true}

                culture='ko'
                messages={messages}
            />
        </Paper>
    );
};

export default CalendarWidget;
import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import WidgetHeader from './WidgetHeader';

const ApprovalTimeWidget = () => (
    <Paper className="widget-card">
        <WidgetHeader title="근무시간 승인" />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body2">2021-11-16(화)</Typography>
            <Typography variant="h3" sx={{ my: 1, fontWeight: 'bold', color: '#4e73df' }}>
                13<span style={{fontSize: '1rem', marginLeft: '4px'}}>건</span>
            </Typography>
        </Box>
    </Paper>
);

export default ApprovalTimeWidget;
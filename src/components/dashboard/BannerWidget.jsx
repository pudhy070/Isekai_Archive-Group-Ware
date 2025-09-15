import React from 'react';
import { Paper, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // 추가

const BannerWidget = () => (
    <Paper className="widget-card" style={{ padding: 0, overflow: 'hidden', height: '100%' }}>
        <Box
            sx={{
                p: 4,
                background: 'linear-gradient(135deg, #4e73df 0%, #1cc88a 100%)',
                color: 'white',
                height: '100%',
                boxSizing: 'border-box',
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                이세계 아카이브 1.0
            </Typography>
            <Typography>ERP 그 이상의 가치를 담은 차세대 디지털 솔루션!</Typography>

            <Button
                variant="outlined"
                color="inherit"
                sx={{ mt: 2 }}
                component={Link}
                to="/"
            >
                자세히 보기
            </Button>
        </Box>
    </Paper>
);

export default BannerWidget;

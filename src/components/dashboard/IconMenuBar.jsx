import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper,
    Grid,
    IconButton,
    Typography
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import CrmIcon from '@mui/icons-material/SupportAgent';
import PaymentIcon from '@mui/icons-material/Payment';
import MailIcon from '@mui/icons-material/Mail';
import OnefficeIcon from '@mui/icons-material/Widgets';

import menuBarBackground from '../../assets/images/background.png';

const IconMenuBar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { icon: <PersonIcon fontSize="large" />, label: '인사/조직', color: '#42a5f5', path: '/hr' },
        { icon: <WorkIcon fontSize="large" />, label: '근태관리', color: '#66bb6a', path: '/attendance' },
        { icon: <CrmIcon fontSize="large" />, label: 'CRM', color: '#ef5350', path: '/crm' },
        { icon: <PaymentIcon fontSize="large" />, label: '자금/회계', color: '#ffa726', path: '/finance' },
        { icon: <MailIcon fontSize="large" />, label: '메일', color: '#26a69a', path: '/mail' },
        { icon: <OnefficeIcon fontSize="large" />, label: 'ONEFFICE', color: '#7e57c2', path: '/oneffice' },
    ];

    return (
        <Paper
            className="widget-card icon-menu-bar"
            sx={{
                backgroundImage: `url(${menuBarBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Grid container spacing={2} justifyContent="center">
                {menuItems.map((item) => (
                    <Grid item key={item.label} sx={{ textAlign: 'center' }}>
                        <IconButton
                            // 4. onClick 이벤트에서 navigate 함수를 호출하여 페이지를 이동시킵니다.
                            onClick={() => navigate(item.path)}
                            sx={{
                                width: 64,
                                height: 64,
                                backgroundColor: item.color,
                                color: 'white',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    backgroundColor: item.color,
                                    opacity: 0.9,
                                    transform: 'scale(1.1)',
                                },
                            }}
                        >
                            {item.icon}
                        </IconButton>
                        <Typography variant="body2" sx={{ mt: 1, color: 'white', fontWeight: 500 }}>
                            {item.label}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default IconMenuBar;
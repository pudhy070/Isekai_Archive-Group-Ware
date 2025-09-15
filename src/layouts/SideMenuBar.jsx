import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, Tooltip } from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import MailIcon from '@mui/icons-material/Mail';
import CrmIcon from '@mui/icons-material/SupportAgent';
import PaymentIcon from '@mui/icons-material/Payment';
import WidgetsIcon from '@mui/icons-material/Widgets';

import './SideNavLayout.css';

const menuItems = [
    { text: '인사/조직', icon: <PeopleIcon />, path: '/hr' },
    { text: '근태관리', icon: <WorkHistoryIcon />, path: '/attendance' },
    { text: 'CRM', icon: <CrmIcon />, path: '/crm' },
    { text: '자금/회계', icon: <PaymentIcon />, path: '/finance' },
    { text: '메일', icon: <MailIcon />, path: '/mail' },
    { text: 'ONEFFICE', icon: <WidgetsIcon />, path: '/oneffice' },
];

const SideNavLayout = () => {
    return (

        <Box className="sidenav-layout-container">
            <Drawer
                variant="permanent"
                className="sidenav-drawer"
            >
                <List className="sidenav-list">
                    {menuItems.map((item) => (
                        <Tooltip title={item.text} placement="right" key={item.text}>
                            <ListItem disablePadding>
                                <ListItemButton component={NavLink} to={item.path} className="sidenav-list-item">
                                    <ListItemIcon className="sidenav-list-icon">{item.icon}</ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </Drawer>

            <Box component="main" className="sidenav-content">
                <Outlet />
            </Box>
        </Box>
    );
};

export default SideNavLayout;
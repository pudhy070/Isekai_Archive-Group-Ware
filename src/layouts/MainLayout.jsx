import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import Header from '../components/Header';

const MainLayout = ({ darkMode, setDarkMode, autoLogin, setAutoLogin, isAuthenticated, setIsAuthenticated, user, setUser }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CssBaseline />
            <Header
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                autoLogin={autoLogin}
                setAutoLogin={setAutoLogin}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                user={user}
                setUser={setUser}
            />
            <Box component="main" sx={{ flexGrow: 1, backgroundColor: 'background.default', width: '100%', p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;

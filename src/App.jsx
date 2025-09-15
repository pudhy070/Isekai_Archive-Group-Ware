import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';

import MainLayout from './layouts/MainLayout';
import SideNavLayout from './layouts/SideMenuBar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import NoticeBoardPage from './pages/NoticeBoardPage.jsx';
import SchedulePage from './pages/SchedulePage';
import ApprovalPage from './pages/ApprovalPage';
import ContactsPage from './pages/ContactsPage';
import HrPage from './pages/HrPage';
import AttendancePage from './pages/AttendancePage';
import CrmPage from './pages/CrmPage';
import FinancePage from './pages/FinancePage';
import MailPage from './pages/MailPage';
import OnefficePage from './pages/OnefficePage';
import UserDashboardPage from './pages/UserDashboardPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import ArchivePage from './pages/ArchivePage';
import InternalPolicyPage from './pages/InternalPolicyPage';


import { Outlet } from 'react-router-dom';

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    useEffect(() => {
        try {
            const storedUser = sessionStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Failed to parse user from sessionStorage", error);
        }
    }, []);

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode: darkMode ? 'dark' : 'light',
                primary: { main: darkMode ? '#90caf9' : '#1976d2' }
            },
        }), [darkMode]
    );

    const PrivateRoutes = () => {
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    };

    const settingsProps = { darkMode, setDarkMode, isAuthenticated, setIsAuthenticated, user, setUser };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>

                    <Route path="/" element={<HomePage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route 
                        path="/login" 
                        element={
                            isAuthenticated ? <Navigate to="/main" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                        } 
                    />

                    <Route element={<PrivateRoutes />}>
                        <Route element={<MainLayout {...settingsProps} />}>

                            <Route path="/main" element={<MainPage {...settingsProps}/>} />

                            <Route element={<SideNavLayout />}>
                                <Route path="/notices" element={<NoticeBoardPage />} />
                                <Route path="/schedule" element={<SchedulePage />} />
                                <Route path="/approval" element={<ApprovalPage />} />
                                <Route path="/contacts" element={<ContactsPage />} />
                                <Route path="/hr" element={<HrPage />} />
                                <Route path="/attendance" element={<AttendancePage />} />
                                <Route path="/crm" element={<CrmPage />} />
                                <Route path="/finance" element={<FinancePage />} />
                                <Route path="/mail" element={<MailPage />} />
                                <Route path="/oneffice" element={<OnefficePage />} />
                                <Route path="/archive" element={<ArchivePage />} />
                                <Route path="/policy" element={<InternalPolicyPage />} />
                                <Route path="/user" element={<UserDashboardPage />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route path="*" element={<Navigate to={isAuthenticated ? "/main" : "/"} />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;

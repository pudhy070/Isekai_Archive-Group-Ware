import React from 'react';
import { Container, Box, Typography, useTheme } from '@mui/material';

const Footer = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                py: 4,
                px: 2,
                mt: 'auto',
                backgroundColor: theme.palette.background.paper,
                borderTop: `1px solid ${theme.palette.divider}`
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body2" color="text.secondary" align="center">
                    © 2025 Isekai-Archive. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
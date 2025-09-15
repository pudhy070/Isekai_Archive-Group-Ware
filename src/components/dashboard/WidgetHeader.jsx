import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const WidgetHeader = ({ title, showLink = true, onMoreClick }) => (
    <Box className="widget-header">
        <Typography className="widget-title">{title}</Typography>
        {showLink && (
            <MuiLink component="button" onClick={onMoreClick} className="widget-more-link">
                더보기 <ArrowForwardIosIcon sx={{ fontSize: '0.7rem' }} />
            </MuiLink>
        )}
    </Box>
);

export default WidgetHeader;
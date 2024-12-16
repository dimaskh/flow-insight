import React from 'react';
import { Typography, IconButton, Tooltip } from '@mui/material';
import { Info } from '@mui/icons-material';
import './MetricCards.css';

const BaseMetricCard = ({ title, description, children, value, unit }) => {
  return (
    <div className="metric-card">
      <div className="metric-header-row">
        <Typography variant="body2" className="metric-title">
          {title}
        </Typography>
        {description && (
          <Tooltip title={description} arrow placement="top">
            <IconButton size="small" className="info-button">
              <Info fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <div className="metric-value-row">
        <Typography variant="h6" className="metric-value">
          {value} {unit}
        </Typography>
      </div>
      {children}
    </div>
  );
};

export default BaseMetricCard;

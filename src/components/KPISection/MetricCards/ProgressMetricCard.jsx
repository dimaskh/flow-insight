import React from 'react';
import { Typography, LinearProgress } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import BaseMetricCard from './BaseMetricCard';

const ProgressMetricCard = ({ title, value, unit, change, progress, color = '#9333EA', description }) => {
  const isPositive = change.isPositive;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  
  return (
    <BaseMetricCard title={title} description={description}>
      <div className="metric-content">
        <div className="metric-main">
          <div className="metric-value-container">
            <Typography className="metric-value">
              {value}
            </Typography>
            <Typography className="metric-unit">
              {unit}
            </Typography>
          </div>
          
          <div className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
            <TrendIcon className="trend-icon" />
            <span>{change.value}</span>
          </div>
        </div>

        <div className="progress-section">
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 2,
              borderRadius: 2,
              marginTop: 2,
              backgroundColor: `${color}15`,
              '& .MuiLinearProgress-bar': {
                borderRadius: 2,
                backgroundColor: color,
              },
            }}
          />
        </div>
      </div>
    </BaseMetricCard>
  );
};

export default ProgressMetricCard;

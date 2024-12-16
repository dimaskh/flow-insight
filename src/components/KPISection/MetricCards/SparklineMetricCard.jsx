import React from 'react';
import { Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import BaseMetricCard from './BaseMetricCard';

const SparklineMetricCard = ({ title, value, unit, change, data, color, description }) => {
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

        <div className="chart-container">
          <div className="sparkline-chart">
            <Sparklines data={data} margin={4} height={40}>
              <SparklinesLine 
                style={{ 
                  stroke: color,
                  strokeWidth: 2,
                  borderRadius: 2,
                  fill: 'none'
                }} 
              />
            </Sparklines>
          </div>
        </div>
      </div>
    </BaseMetricCard>
  );
};

export default SparklineMetricCard;

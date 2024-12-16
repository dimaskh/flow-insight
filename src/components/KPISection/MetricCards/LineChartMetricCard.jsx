import React from 'react';
import { Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import BaseMetricCard from './BaseMetricCard';

const LineChartMetricCard = ({ title, value, unit, change, data, color, description }) => {
  const chartData = data.map((value, index) => ({ value, index }));
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
          <ResponsiveContainer width="100%" height={40}>
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </BaseMetricCard>
  );
};

export default LineChartMetricCard;

import React from 'react';
import { Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import BaseMetricCard from './BaseMetricCard';

const generateRandomData = (baseValue) => {
  const variance = baseValue * 0.15; // 15% variance
  return Array.from({ length: 12 }, () => ({
    value: Math.floor(baseValue - variance + Math.random() * (variance * 2)),
    index: Math.random()
  }));
};

const BarChartMetricCard = ({ title, value, unit, change, color, description }) => {
  const baseValue = parseInt(value);
  const chartData = generateRandomData(baseValue);
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
            <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Bar
                dataKey="value"
                fill={color}
                radius={[2, 2, 0, 0]}
                isAnimationActive={false}
                minPointSize={2}
                style={{ strokeWidth: 3 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </BaseMetricCard>
  );
};

export default BarChartMetricCard;

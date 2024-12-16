import React, { useState, useEffect } from 'react';
import { Typography, IconButton } from '@mui/material';
import { MoreVert, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import './KPISection.css';
import LineChartMetricCard from './MetricCards/LineChartMetricCard';
import BarChartMetricCard from './MetricCards/BarChartMetricCard';
import ProgressMetricCard from './MetricCards/ProgressMetricCard';
import SparklineMetricCard from './MetricCards/SparklineMetricCard';

const KPISection = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [metrics, setMetrics] = useState([]);

  // Using a consistent color palette
  const colors = {
    primary: '#6366F1',    // Main color for primary metrics
    success: '#22C55E',    // For positive/success metrics
    warning: '#F59E0B',    // For warning/attention metrics
    info: '#3B82F6'        // For informational metrics
  };

  const generateRandomData = (min, max, length = 6) => {
    return Array.from({ length }, () => 
      Number((Math.random() * (max - min) + min).toFixed(1))
    );
  };

  const generateRandomChange = (min, max) => {
    const value = Number((Math.random() * (max - min) + min).toFixed(1));
    const isPositive = Math.random() > 0.3; // 70% chance of positive change
    return { value: value.toString(), isPositive };
  };

  useEffect(() => {
    // Process Efficiency (90-98%)
    const efficiencyValue = Number((Math.random() * (98 - 90) + 90).toFixed(1));
    const efficiencyChange = generateRandomChange(0.1, 3.0);
    
    // Cycle Time (3.5-4.8 min)
    const cycleTimeData = generateRandomData(3.5, 4.8);
    const cycleTimeChange = generateRandomChange(0.1, 0.5);
    
    // Output Rate (800-900 units/hr)
    const outputData = generateRandomData(800, 900).map(Math.floor);
    const outputChange = generateRandomChange(5, 20);
    
    // Quality Score (96-99%)
    const qualityData = generateRandomData(96, 99);
    const qualityChange = generateRandomChange(0.1, 0.8);

    const newMetrics = [
      {
        title: "Process Efficiency",
        value: efficiencyValue.toString(),
        unit: "%",
        change: efficiencyChange,
        description: "Overall process efficiency measured as productive time vs total time",
        type: "progress",
        progress: efficiencyValue,
        color: colors.success
      },
      {
        title: "Cycle Time",
        value: cycleTimeData[cycleTimeData.length - 1].toString(),
        unit: "min",
        change: cycleTimeChange,
        description: "Average time to complete one production cycle",
        type: "line",
        data: cycleTimeData,
        color: colors.warning
      },
      {
        title: "Output Rate",
        value: outputData[outputData.length - 1].toString(),
        unit: "units/hr",
        change: outputChange,
        description: "Number of units produced per hour",
        type: "bar",
        data: outputData,
        color: colors.primary
      },
      {
        title: "Quality Score",
        value: qualityData[qualityData.length - 1].toString(),
        unit: "%",
        change: qualityChange,
        description: "Percentage of products meeting quality standards",
        type: "sparkline",
        data: qualityData,
        color: colors.info
      }
    ];

    setMetrics(newMetrics);
  }, []); // Run once on component mount

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const renderMetricCard = (metric) => {
    const commonProps = {
      title: metric.title,
      value: metric.value,
      unit: metric.unit,
      change: metric.change,
      description: metric.description,
      color: metric.color
    };

    switch (metric.type) {
      case 'progress':
        return <ProgressMetricCard {...commonProps} progress={metric.progress} />;
      case 'line':
        return <LineChartMetricCard {...commonProps} data={metric.data} />;
      case 'bar':
        return <BarChartMetricCard {...commonProps} data={metric.data} />;
      case 'sparkline':
        return <SparklineMetricCard {...commonProps} data={metric.data} />;
      default:
        return null;
    }
  };

  return (
    <div className={`kpi-section ${!isExpanded ? 'collapsed' : ''}`}>
      <div 
        className="section-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="left-section">
          <Typography variant="h6" className="section-title">
            KPIs Overview
          </Typography>
        </div>
        <div className="right-section">
          <IconButton size="small">
            {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          <IconButton 
            size="small" 
            onClick={(e) => {
              e.stopPropagation();
              // Your menu handling logic here
            }}
          >
            <MoreVert />
          </IconButton>
        </div>
      </div>
      
      {isExpanded && (
        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-item">
              {renderMetricCard(metric)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KPISection;

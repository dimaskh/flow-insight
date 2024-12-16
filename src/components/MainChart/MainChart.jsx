import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import {
  ShowChart,
  Timeline,
  BarChart as BarChartIcon,
  RadioButtonChecked,
  Tune,
  FileDownload,
  Settings
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';
import ChartFilters from '../ChartFilters/ChartFilters';
import ChartExport from '../ChartExport/ChartExport';
import DisplayOptions from '../DisplayOptions/DisplayOptions';
import './MainChart.css';

const MainChart = ({ data, onTypeChange }) => {
  // Using consistent color palette
  const colors = {
    primary: '#6366F1',    // Main color for primary metrics
    success: '#22C55E',    // For positive/success metrics
    warning: '#F59E0B',    // For warning/attention metrics
    info: '#3B82F6'        // For informational metrics
  };

  const [filters, setFilters] = useState({
    leadTime: true,
    reactionTime: true,
    cycleTime: true,
    reviewTime: true
  });

  const [type, setType] = useState('line');
  const [selectedInventory, setSelectedInventory] = useState('Measure Comparison');
  const [showExport, setShowExport] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [showDisplayOptions, setShowDisplayOptions] = useState(false);
  const [activePanel, setActivePanel] = useState(null);

  const inventoryDetails = {
    'Measure Comparison': {
      title: 'Measure Comparison',
      description: 'Analyzing and comparing metrics'
    },
    'Trend Analysis': {
      title: 'Trend Analysis',
      description: 'Tracking patterns and changes over time'
    },
    'Quality Overview': {
      title: 'Quality Overview',
      description: 'Monitoring code quality and standards'
    },
    'Process Health': {
      title: 'Process Health',
      description: 'Evaluating workflow efficiency and bottlenecks'
    }
  };

  const handleFilterChange = (filterId, value) => {
    if (filterId === 'reset') {
      setFilters({
        leadTime: true,
        reactionTime: true,
        cycleTime: true,
        reviewTime: true
      });
    } else if (filterId === 'inventory') {
      setSelectedInventory(value);
    } else {
      setFilters(prev => ({
        ...prev,
        [filterId]: value
      }));
    }
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    onTypeChange(newType);
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 20, left: 0, bottom: 25 }, 
    };

    const commonLegendProps = {
      verticalAlign: "bottom",
      align: "center",
      iconType: "circle",
      iconSize: 8,
      wrapperStyle: {
        fontSize: "0.75rem", 
        paddingTop: "10px"
      }
    };

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend {...commonLegendProps} />
            {filters.leadTime && (
              <Line 
                name="Lead Time"
                type="monotone" 
                dataKey="leadTime" 
                stroke={colors.primary}
                fill={colors.primary}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
            {filters.reactionTime && (
              <Line 
                name="Reaction Time"
                type="monotone" 
                dataKey="reactionTime" 
                stroke={colors.warning}
                fill={colors.warning}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
            {filters.cycleTime && (
              <Line 
                name="Cycle Time"
                type="monotone" 
                dataKey="cycleTime" 
                stroke={colors.success}
                fill={colors.success}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
            {filters.reviewTime && (
              <Line 
                name="Review Time"
                type="monotone" 
                dataKey="reviewTime" 
                stroke={colors.info}
                fill={colors.info}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
          </LineChart>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend {...commonLegendProps} />
              {filters.leadTime && (
                <Area
                  type="monotone"
                  dataKey="leadTime"
                  name="Lead Time"
                  stroke={colors.primary}
                  fill={colors.primary}
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
              )}
              {filters.reactionTime && (
                <Area
                  type="monotone"
                  dataKey="reactionTime"
                  name="Reaction Time"
                  stroke={colors.warning}
                  fill={colors.warning}
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
              )}
              {filters.cycleTime && (
                <Area
                  type="monotone"
                  dataKey="cycleTime"
                  name="Cycle Time"
                  stroke={colors.success}
                  fill={colors.success}
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
              )}
              {filters.reviewTime && (
                <Area
                  type="monotone"
                  dataKey="reviewTime"
                  name="Review Time"
                  stroke={colors.info}
                  fill={colors.info}
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend {...commonLegendProps} />
              {filters.leadTime && (
                <Bar 
                  name="Lead Time" 
                  dataKey="leadTime" 
                  fill={colors.primary} 
                  fillOpacity={0.8}
                  onMouseEnter={(data, index) => {
                    document.querySelector(`[name="Lead Time"]`).style.fillOpacity = "0.95";
                  }}
                  onMouseLeave={(data, index) => {
                    document.querySelector(`[name="Lead Time"]`).style.fillOpacity = "0.8";
                  }}
                />
              )}
              {filters.reactionTime && (
                <Bar 
                  name="Reaction Time" 
                  dataKey="reactionTime" 
                  fill={colors.warning} 
                  fillOpacity={0.8}
                  onMouseEnter={(data, index) => {
                    document.querySelector(`[name="Reaction Time"]`).style.fillOpacity = "0.95";
                  }}
                  onMouseLeave={(data, index) => {
                    document.querySelector(`[name="Reaction Time"]`).style.fillOpacity = "0.8";
                  }}
                />
              )}
              {filters.cycleTime && (
                <Bar 
                  name="Cycle Time" 
                  dataKey="cycleTime" 
                  fill={colors.success} 
                  fillOpacity={0.8}
                  onMouseEnter={(data, index) => {
                    document.querySelector(`[name="Cycle Time"]`).style.fillOpacity = "0.95";
                  }}
                  onMouseLeave={(data, index) => {
                    document.querySelector(`[name="Cycle Time"]`).style.fillOpacity = "0.8";
                  }}
                />
              )}
              {filters.reviewTime && (
                <Bar 
                  name="Review Time" 
                  dataKey="reviewTime" 
                  fill={colors.info} 
                  fillOpacity={0.8}
                  onMouseEnter={(data, index) => {
                    document.querySelector(`[name="Review Time"]`).style.fillOpacity = "0.95";
                  }}
                  onMouseLeave={(data, index) => {
                    document.querySelector(`[name="Review Time"]`).style.fillOpacity = "0.8";
                  }}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart 
              {...commonProps} 
              cx="50%" 
              cy="50%" 
              outerRadius="65%"
              margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
            >
              <PolarGrid gridType="circle" />
              <PolarAngleAxis 
                dataKey="date"
                tick={{ dy: 3 }}
              />
              <PolarRadiusAxis angle={90} />
              <Tooltip />
              <Legend 
                {...commonLegendProps}
                verticalAlign="bottom"
                align="center"
              />
              {filters.leadTime && (
                <Radar
                  name="Lead Time"
                  dataKey="leadTime"
                  stroke={colors.primary}
                  fill={colors.primary}
                  fillOpacity={0.2}
                />
              )}
              {filters.reactionTime && (
                <Radar
                  name="Reaction Time"
                  dataKey="reactionTime"
                  stroke={colors.warning}
                  fill={colors.warning}
                  fillOpacity={0.2}
                />
              )}
              {filters.cycleTime && (
                <Radar
                  name="Cycle Time"
                  dataKey="cycleTime"
                  stroke={colors.success}
                  fill={colors.success}
                  fillOpacity={0.2}
                />
              )}
              {filters.reviewTime && (
                <Radar
                  name="Review Time"
                  dataKey="reviewTime"
                  stroke={colors.info}
                  fill={colors.info}
                  fillOpacity={0.2}
                />
              )}
            </RadarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const toggleExport = () => {
    if (!showExport) {
      if (!activePanel) {
        setShowFilters(false);
        setTimeout(() => {
          setShowExport(true);
          setActivePanel('export');
        }, 300);
      } else {
        setShowDisplayOptions(false);
        setShowExport(true);
        setActivePanel('export');
      }
    } else {
      setShowExport(false);
      setActivePanel(null);
      setTimeout(() => setShowFilters(true), 300);
    }
  };

  const toggleDisplayOptions = () => {
    if (!showDisplayOptions) {
      if (!activePanel) {
        setShowFilters(false);
        setTimeout(() => {
          setShowDisplayOptions(true);
          setActivePanel('display');
        }, 300);
      } else {
        setShowExport(false);
        setShowDisplayOptions(true);
        setActivePanel('display');
      }
    } else {
      setShowDisplayOptions(false);
      setActivePanel(null);
      setTimeout(() => setShowFilters(true), 300);
    }
  };

  return (
    <div className="main-chart-container">
      {showFilters && (
        <ChartFilters 
          filters={filters} 
          onFilterChange={handleFilterChange}
          selectedInventory={selectedInventory}
        />
      )}
      
      <div className="main-chart">
        <div className="main-chart-header">
          <div className="header-content">
            <Typography variant="h6">{inventoryDetails[selectedInventory].title}</Typography>
            <Typography variant="body2" className="section-subtitle">
              {inventoryDetails[selectedInventory].description}
            </Typography>
          </div>
          <div className="chart-controls">
            <div className="chart-types">
              <button
                className={`chart-type-button ${type === 'line' ? 'active' : ''}`}
                onClick={() => handleTypeChange('line')}
                title="Line Chart"
              >
                <ShowChart />
              </button>
              <button
                className={`chart-type-button ${type === 'area' ? 'active' : ''}`}
                onClick={() => handleTypeChange('area')}
                title="Area Chart"
              >
                <Timeline />
              </button>
              <button
                className={`chart-type-button ${type === 'bar' ? 'active' : ''}`}
                onClick={() => handleTypeChange('bar')}
                title="Bar Chart"
              >
                <BarChartIcon />
              </button>
              <button
                className={`chart-type-button ${type === 'radar' ? 'active' : ''}`}
                onClick={() => handleTypeChange('radar')}
                title="Radar Chart"
              >
                <RadioButtonChecked />
              </button>
            </div>
            <div className="chart-actions">
              <Button
                className="action-button"
                variant="outlined"
                size="small"
                startIcon={<Settings />}
                onClick={toggleDisplayOptions}
              >
                Display Options
              </Button>
              <Button
                className="action-button"
                variant="outlined"
                startIcon={<FileDownload />}
                onClick={toggleExport}
              >
                Export
              </Button>
            </div>
          </div>
        </div>
        <div className="chart-content">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>

      {showExport && (
        <ChartExport 
          onExport={(format) => {
            console.log(`Exporting as ${format}`);
            toggleExport();
          }}
          onClose={toggleExport}
        />
      )}

      {showDisplayOptions && (
        <DisplayOptions 
          onClose={toggleDisplayOptions}
        />
      )}
    </div>
  );
};

export default MainChart;

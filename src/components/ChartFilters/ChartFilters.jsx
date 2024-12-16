import React, { useState, useEffect } from 'react';
import './ChartFilters.css';
import { Typography, Menu, MenuItem } from '@mui/material';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { 
  KeyboardArrowDown, 
  CompareArrows,
  TrendingUp,
  Assessment,
  AutoGraph,
  RestartAlt
} from '@mui/icons-material';

const inventoryOptions = [
  { id: 'measure', label: 'Measure Comparison', icon: <CompareArrows /> },
  { id: 'trends', label: 'Trend Analysis', icon: <TrendingUp /> },
  { id: 'quality', label: 'Quality Overview', icon: <Assessment /> },
  { id: 'process', label: 'Process Health', icon: <AutoGraph /> }
];

const categories = {
  'Time Metrics': [
    { id: 'cycleTime', label: 'Cycle Time' },
    { id: 'leadTime', label: 'Lead Time' },
    { id: 'reactionTime', label: 'Reaction Time' },
    { id: 'reviewTime', label: 'Review Time' }
  ],
  'Performance Metrics': [
    { id: 'throughput', label: 'Throughput' },
    { id: 'velocity', label: 'Velocity' },
    { id: 'pointsAcceptanceRate', label: 'Points acceptance rate' },
    { id: 'tasksAcceptanceRate', label: 'Tasks acceptance rate' }
  ],
  'Task/Process Metrics': [
    { id: 'bulkStatusChanges', label: 'Bulk status changes' },
    { id: 'tasksMovingBackwards', label: 'Tasks moving backwards' },
    { id: 'staleTasks', label: 'Stale tasks' },
    { id: 'missingDays', label: 'Missing days' },
    { id: 'multiplePointChanges', label: 'Multiple point changes per task' },
    { id: 'readiness', label: 'Readiness' }
  ],
  'Quality Metrics': [
    { id: 'quality', label: 'Quality' },
    { id: 'declinedChangeRequests', label: 'Declined Change Requests' },
    { id: 'untestedTasks', label: 'Untested tasks' }
  ],
  'Consistency Metrics': [
    { id: 'cycleTimeInconsistency', label: 'Cycle time inconsistency' },
    { id: 'workPlanInconsistency', label: 'Work plan inconsistency' }
  ],
  'Complexity and Strategy': [
    { id: 'complexity', label: 'Complexity' },
    { id: 'strategy', label: 'Strategy' }
  ],
  'Dependency and Independence': [
    { id: 'independence', label: 'Independence' }
  ],
  'Technical Debt': [
    { id: 'technicalDebtTasks', label: 'Technical debt tasks' }
  ]
};

const ChartFilters = ({ filters, onFilterChange, selectedInventory }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState(Object.keys(categories).reduce((acc, category) => {
    acc[category] = true;
    return acc;
  }, {}));

  console.log('ChartFilters render:', {
    isExpanded,
    selectedInventory,
    filters
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log('Menu clicked:', event.currentTarget);
  };

  const handleClose = (value) => {
    console.log('Menu closed with value:', value);
    if (value) {
      onFilterChange('inventory', value);
    }
    setAnchorEl(null);
  };

  const toggleExpand = () => {
    console.log('Toggling expand state:', !isExpanded);
    setIsExpanded(!isExpanded);
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  useEffect(() => {
    console.log('Component mounted/updated:', {
      isExpanded,
      className: `collapse-icon ${isExpanded ? 'expanded' : ''}`
    });
  }, [isExpanded]);

  return (
    <div className={`chart-filters ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="filters-content-wrapper">
        <div className="filters-header">
          <div className="filters-header-left" onClick={toggleExpand}>
            <KeyboardArrowDown className={`collapse-icon ${isExpanded ? 'expanded' : ''}`} style={{ fontSize: 18 }} />
            <Typography variant="h6" className="section-title">
              Filters
            </Typography>
          </div>
          <button 
            className="reset-button" 
            onClick={() => onFilterChange('reset')}
          >
            <RestartAlt className="reset-icon" />
            Reset
          </button>
        </div>
        
        <div className="inventory-selector" onClick={handleClick}>
          {inventoryOptions.find(opt => opt.label === selectedInventory)?.icon}
          <span className="inventory-text">{selectedInventory}</span>
          <KeyboardArrowDown />
        </div>

        <div className="filters-content">
          {Object.entries(categories).map(([category, items]) => (
            <div key={category} className="filter-category">
              <div className="category-header" onClick={() => toggleCategory(category)}>
                <div className="category-title">{category}</div>
                <KeyboardArrowDown 
                  className={`category-collapse-icon ${expandedCategories[category] ? 'expanded' : ''}`}
                />
              </div>
              <FormGroup className={!expandedCategories[category] ? 'collapsed' : ''}>
                {items.map((metric) => (
                  <FormControlLabel
                    key={metric.id}
                    control={
                      <Checkbox
                        checked={filters[metric.id] || false}
                        onChange={(e) => onFilterChange(metric.id, e.target.checked)}
                        size="small"
                      />
                    }
                    className={filters[metric.id] ? 'Mui-checked' : ''}
                    label={metric.label}
                  />
                ))}
              </FormGroup>
            </div>
          ))}
        </div>
      </div>
      <div className="collapsed-title" onClick={toggleExpand}>
        <span>Filters</span>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
        className="inventory-menu"
      >
        {inventoryOptions.map((option) => (
          <MenuItem 
            key={option.id} 
            onClick={() => handleClose(option.label)}
            className="inventory-menu-item"
          >
            {option.icon}
            <span>{option.label}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ChartFilters;

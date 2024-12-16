import React from 'react';
import { Tabs, Tab } from '@mui/material';
import './NavigationTabs.css';

const NavigationTabs = ({ tabs = [], activeTab, onTabChange }) => {
  const handleChange = (event, newValue) => {
    if (tabs[newValue]) {
      onTabChange(tabs[newValue].id);
    }
  };

  const activeIndex = tabs ? tabs.findIndex(tab => tab.id === activeTab) : -1;

  return (
    <div className="tabs-container">
      <Tabs 
        value={activeIndex === -1 ? false : activeIndex} 
        onChange={handleChange}
        className="navigation-tabs"
        variant="standard"
        TabIndicatorProps={{
          style: { display: 'none' }
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            icon={tab.icon}
            iconPosition="start"
            label={tab.label}
            className={`tab-button ${activeTab === tab.id ? 'selected' : ''}`}
            disableRipple
          />
        ))}
      </Tabs>
    </div>
  );
};

export default NavigationTabs;

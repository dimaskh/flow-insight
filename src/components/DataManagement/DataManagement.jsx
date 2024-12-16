import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationTabs from './NavigationTabs';
import Workflows from './Workflows';
import AllWorkflows from './AllWorkflows';
import Portfolios from './Portfolios';
import Objects from './Objects';
import './DataManagement.css';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';

const DataManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tabs = [
    { id: 'objects', label: 'Objects', icon: <CodeIcon /> },
    { id: 'portfolios', label: 'Portfolios', icon: <FolderIcon /> },
    { id: 'workflows', label: 'Workflows', icon: <WorkIcon /> },
    { id: 'practices', label: 'Practices', icon: <ArticleIcon /> },
  ];

  const [activeTab, setActiveTab] = useState(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    return tab || location?.state?.activeTab || 'objects';
  });

  const [selectedWorkflowId, setSelectedWorkflowId] = useState(null);

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    } else if (location?.state?.activeTab && location.state.activeTab !== activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Clear selected workflow when changing tabs
    if (tabId !== 'workflows') {
      setSelectedWorkflowId(null);
    }
    navigate(`/data-management?tab=${tabId}`, { replace: true });
  };

  const handleWorkflowSelect = (workflowId) => {
    setSelectedWorkflowId(workflowId);
  };

  return (
    <div className="data-management">
      <NavigationTabs 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      {activeTab === 'workflows' && (
        <div className="data-management-content">
          <div className="workflows-section">
            <Workflows onWorkflowSelect={handleWorkflowSelect} selectedWorkflowId={selectedWorkflowId} />
          </div>
          <div className="all-workflows-section">
            <AllWorkflows selectedWorkflowId={selectedWorkflowId} onWorkflowSelect={handleWorkflowSelect} />
          </div>
        </div>
      )}
      {activeTab === 'objects' && <Objects />}
      {activeTab === 'portfolios' && <Portfolios />}
    </div>
  );
};

export default DataManagement;
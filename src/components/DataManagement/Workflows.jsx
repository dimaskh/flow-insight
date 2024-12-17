import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import GridViewIcon from '@mui/icons-material/GridView';
import { workflowData } from './AllWorkflows';
import './Workflows.css';

// Get status icon based on status
const getStatusIcon = (status) => {
  switch (status) {
    case 'calibrated':
      return <CheckCircleIcon className="status-icon" />;
    case 'not-calibrated':
      return <ErrorIcon className="status-icon" />;
    case 'needs-review':
      return <WarningIcon className="status-icon" />;
    default:
      return null;
  }
};

const Workflows = ({ onWorkflowSelect, selectedWorkflowId }) => {
  const [activeWorkflow, setActiveWorkflow] = useState(selectedWorkflowId || 'all');
  const [workflowsList, setWorkflowsList] = useState([
    { id: 'all', name: 'All Workflows', icon: <GridViewIcon /> },
    ...workflowData.map(w => ({
      id: w.id,
      name: w.name,
      status: w.status
    }))
  ]);
  const navigate = useNavigate();

  // Update workflowsList when workflowData changes
  useEffect(() => {
    const handleWorkflowDataUpdate = () => {
      const currentWorkflowData = window.workflowData || workflowData;
      setWorkflowsList([
        { id: 'all', name: 'All Workflows', icon: <GridViewIcon /> },
        ...currentWorkflowData.map(w => ({
          id: w.id,
          name: w.name,
          status: w.status
        }))
      ]);
    };

    // Initial setup
    handleWorkflowDataUpdate();

    // Listen for workflowData updates
    window.addEventListener('workflowDataUpdated', handleWorkflowDataUpdate);
    return () => window.removeEventListener('workflowDataUpdated', handleWorkflowDataUpdate);
  }, []);

  useEffect(() => {
    setActiveWorkflow(selectedWorkflowId || 'all');
  }, [selectedWorkflowId]);

  const handleAddWorkflow = () => {
    navigate('/data-management/add-workflow');
  };

  const handleWorkflowClick = (workflow) => {
    setActiveWorkflow(workflow.id);
    onWorkflowSelect(workflow.id === 'all' ? null : workflow.id);
  };

  return (
    <div className="workflows-container">
      <div className="workflows-list">
        <div 
          className="workflow-item add-workflow"
          onClick={handleAddWorkflow}
        >
          <AddIcon />
          <span>Add New Workflow</span>
        </div>
        <div className="workflow-divider"></div>
        <div
          key={workflowsList[0].id}
          className={`workflow-item ${workflowsList[0].id === activeWorkflow ? 'active' : ''}`}
          onClick={() => handleWorkflowClick(workflowsList[0])}
        >
          {workflowsList[0].icon}
          <span>{workflowsList[0].name}</span>
        </div>
        <div className="workflow-divider"></div>
        {workflowsList.slice(1).map((workflow) => (
          <div
            key={workflow.id}
            className={`workflow-item ${workflow.status || ''} ${workflow.id === activeWorkflow ? 'active' : ''}`}
            onClick={() => handleWorkflowClick(workflow)}
          >
            {workflow.icon || (workflow.status && getStatusIcon(workflow.status))}
            <span>{workflow.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workflows;

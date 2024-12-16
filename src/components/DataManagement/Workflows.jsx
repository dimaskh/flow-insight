import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import GridViewIcon from '@mui/icons-material/GridView';
import './Workflows.css';

const workflowsList = [
  { id: 0, name: 'All Workflows', icon: <GridViewIcon /> },
  { id: 1, name: 'R&D', status: 'calibrated' },
  { id: 2, name: 'Business Analysis', status: 'calibrated' },
  { id: 3, name: 'Development', status: 'not-calibrated' },
  { id: 4, name: 'Marketing', status: 'needs-review' }
];

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
  const [activeWorkflow, setActiveWorkflow] = useState(workflowsList[0].id);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedWorkflowId) {
      setActiveWorkflow(selectedWorkflowId);
    } else {
      setActiveWorkflow(workflowsList[0].id);
    }
  }, [selectedWorkflowId]);

  const handleAddWorkflow = () => {
    navigate('/data-management/add-workflow');
  };

  const handleWorkflowClick = (workflow) => {
    setActiveWorkflow(workflow.id);
    if (workflow.id === 0) {
      // Clear selected workflow in AllWorkflows
      onWorkflowSelect(null);
    } else {
      // Select the workflow in AllWorkflows
      onWorkflowSelect(workflow.id);
    }
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

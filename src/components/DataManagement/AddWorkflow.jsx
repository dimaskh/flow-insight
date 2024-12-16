import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PresetIcon from '@mui/icons-material/Dashboard';
import FileIcon from '@mui/icons-material/Description';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditNoteIcon from '@mui/icons-material/EditNote';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LoopIcon from '@mui/icons-material/Loop';
import Header from '../Header/Header';
import NavigationTabs from './NavigationTabs';
import './AddWorkflow.css';

const AddWorkflow = ({ isDarkMode, onThemeToggle }) => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('reuse');
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [step, setStep] = useState('select'); // 'select', 'configure'

  const templates = [
    { 
      id: 'design',
      name: 'Design',
      steps: [
        'User Research',
        'Wireframing',
        'UI Design',
        'Prototyping',
        'Usability Testing',
        'Design System Update',
        'Handoff to Development'
      ]
    },
    { 
      id: 'rd',
      name: 'R&D',
      steps: [
        'Market Research',
        'Feasibility Study',
        'Prototype Development',
        'Lab Testing',
        'Patent Review',
        'Documentation',
        'Stakeholder Demo'
      ]
    },
    { 
      id: 'ba',
      name: 'Business Analysis',
      steps: [
        'Data Collection',
        'Process Mapping',
        'Gap Analysis',
        'Cost-Benefit Analysis',
        'Risk Assessment',
        'Recommendations',
        'Executive Presentation'
      ]
    },
    { 
      id: 'dev',
      name: 'Development',
      steps: [
        'Technical Design',
        'Code Implementation',
        'Unit Testing',
        'Code Review',
        'Integration',
        'QA Testing',
        'Performance Optimization',
        'Deployment'
      ]
    },
    { 
      id: 'marketing',
      name: 'Marketing',
      steps: [
        'Market Analysis',
        'Campaign Strategy',
        'Content Creation',
        'A/B Testing',
        'Social Media Launch',
        'Performance Tracking',
        'ROI Analysis'
      ]
    },
    { 
      id: 'product',
      name: 'Product Launch',
      steps: [
        'Market Research',
        'Competitive Analysis',
        'MVP Definition',
        'Beta Testing',
        'User Feedback',
        'Feature Refinement',
        'Go-to-Market Strategy',
        'Launch Event'
      ]
    },
    {
      id: 'support',
      name: 'Customer Support',
      steps: [
        'Ticket Creation',
        'Priority Assessment',
        'Issue Investigation',
        'Solution Development',
        'Customer Communication',
        'Quality Check',
        'Feedback Collection'
      ]
    }
  ];

  const existingWorkflows = [
    { 
      id: 'rd',
      name: 'R&D',
      steps: [
        'Market Research',
        'Feasibility Study',
        'Prototype Development',
        'Lab Testing',
        'Patent Review',
        'Documentation',
        'Stakeholder Demo'
      ]
    },
    { 
      id: 'ba',
      name: 'Business Analysis',
      steps: [
        'Data Collection',
        'Process Mapping',
        'Gap Analysis',
        'Cost-Benefit Analysis',
        'Risk Assessment',
        'Recommendations',
        'Executive Presentation'
      ]
    },
    { 
      id: 'dev',
      name: 'Development',
      steps: [
        'Technical Design',
        'Code Implementation',
        'Unit Testing',
        'Code Review',
        'Integration',
        'QA Testing',
        'Performance Optimization',
        'Deployment'
      ]
    },
    { 
      id: 'marketing',
      name: 'Marketing',
      steps: [
        'Market Analysis',
        'Campaign Strategy',
        'Content Creation',
        'A/B Testing',
        'Social Media Launch',
        'Performance Tracking',
        'ROI Analysis'
      ]
    }
  ];

  const navigationTabs = [
    {
      id: 'reuse',
      label: 'Reuse Workflow',
      icon: <ReplayIcon />
    },
    {
      id: 'preset',
      label: 'Start from Preset',
      icon: <PresetIcon />
    },
    {
      id: 'scratch',
      label: 'Start from Scratch',
      icon: <FileIcon />
    }
  ];

  const handleTemplateClick = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleWorkflowClick = (workflowId) => {
    const workflow = existingWorkflows.find(w => w.id === workflowId);
    if (workflow) {
      setSelectedWorkflow(workflowId);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedTemplate(null);
    setSelectedWorkflow(null);
  };

  const handleContinue = () => {
    if (selectedOption === 'reuse' && selectedWorkflow) {
      const workflow = existingWorkflows.find(w => w.id === selectedWorkflow);
      if (workflow) {
        // Pre-populate the configuration with the selected workflow's data
        setSelectedTemplate(workflow.id);
        setStep('configure');
      }
    } else if (selectedOption === 'preset' && selectedTemplate) {
      setStep('configure');
    } else if (selectedOption === 'scratch') {
      setStep('configure');
    }
  };

  const handleBack = () => {
    navigate('/data-management', { state: { activeTab: 'workflows' } });
  };

  const isContinueDisabled = () => {
    if (!selectedOption) return true;
    if (selectedOption === 'reuse') return !selectedWorkflow;
    if (selectedOption === 'preset') return !selectedTemplate;
    return false; // for 'scratch' option
  };

  return (
    <div className="add-workflow">
      <Header 
        onThemeToggle={onThemeToggle}
        isDarkMode={isDarkMode}
        currentView="new-workflow" 
        onViewChange={handleBack}
      />
      
      <div className="workflow-content">
        <div className="define-workflow">
          {step === 'select' ? (
            <>
              <h2>Define Workflow</h2>
              <p className="description">
                {selectedOption === 'reuse' ? 
                  'Select an existing workflow to reuse its configuration.' :
                  'Select how you would like to create your workflow.'}
              </p>

              <NavigationTabs
                tabs={navigationTabs}
                activeTab={selectedOption}
                onTabChange={handleOptionClick}
              />

              <div className="workflow-options-content">
                {selectedOption === 'preset' && (
                  <div className="workflow-templates">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`workflow-template ${selectedTemplate === template.id ? 'active' : ''}`}
                        onClick={() => handleTemplateClick(template.id)}
                      >
                        <div className="template-header">
                          <h3>{template.name}</h3>
                        </div>
                        <div className="template-steps">
                          {template.steps.map((step, index) => (
                            <div key={index} className="step">
                              <div className={`step-icon ${index === 0 ? 'start' : index === template.steps.length - 1 ? 'end' : ''}`}></div>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedOption === 'reuse' && (
                  <div className="workflow-templates">
                    {existingWorkflows.map((workflow) => (
                      <div
                        key={workflow.id}
                        className={`workflow-template ${selectedWorkflow === workflow.id ? 'active' : ''}`}
                        onClick={() => handleWorkflowClick(workflow.id)}
                      >
                        <div className="template-header">
                          <h3>{workflow.name}</h3>
                        </div>
                        <div className="template-steps">
                          {workflow.steps.map((step, index) => (
                            <div key={index} className="step">
                              <div className={`step-icon ${index === 0 ? 'start' : index === workflow.steps.length - 1 ? 'end' : ''}`}></div>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedOption === 'scratch' && (
                  <div className="scratch-content">
                    <div className="scratch-tips">
                      <h3>Tips for Creating Your Workflow</h3>
                      <div className="tips-grid">
                        <div className="tip-card">
                          <div className="tip-icon">
                            <EditNoteIcon />
                          </div>
                          <h4>Start Simple</h4>
                          <p>Begin with basic stages that reflect your core process. You can always add more complexity later.</p>
                        </div>
                        <div className="tip-card">
                          <div className="tip-icon">
                            <TrackChangesIcon />
                          </div>
                          <h4>Define Clear Stages</h4>
                          <p>Each stage should represent a distinct phase of work with clear entry and exit criteria.</p>
                        </div>
                        <div className="tip-card">
                          <div className="tip-icon">
                            <AccountTreeIcon />
                          </div>
                          <h4>Consider Dependencies</h4>
                          <p>Think about how work flows between stages and what information needs to be passed along.</p>
                        </div>
                        <div className="tip-card">
                          <div className="tip-icon">
                            <LoopIcon />
                          </div>
                          <h4>Plan for Iteration</h4>
                          <p>Include stages for review and revision to help maintain quality and gather feedback.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {selectedOption && (
                <div className="workflow-actions">
                  <button 
                    className="primary-button" 
                    onClick={handleContinue}
                    disabled={isContinueDisabled()}
                  >
                    Continue
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="configure-workflow">
              <div className="back-button" onClick={() => setStep('select')}>
                <ArrowBackIcon />
                <span>Back to selection</span>
              </div>
              <h2>Configure Workflow</h2>
              {/* Configuration form will go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddWorkflow;

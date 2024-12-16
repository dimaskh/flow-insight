import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './AllWorkflows.css';

const workflowData = [
  {
    id: 1,
    name: 'R&D',
    status: 'calibrated',
    linkedBoards: 12,
    mappedStatuses: 7,
    lastUpdated: '4h 2m ago',
    description: 'Research and Development workflow tracking',
    boards: [
      { name: 'Research Planning', status: 'active' },
      { name: 'Development Sprints', status: 'active' },
      { name: 'Product Backlog', status: 'inactive' }
    ],
    statusLabels: [
      'Backlog',
      'To Do',
      'In Progress',
      'In Review',
      'In Testing',
      'In QA',
      'Done'
    ],
    mappedStatusesData: Array(7).fill([]),
    activeStatuses: [
      'In Progress',
      'Revising',
      'Waiting for Review',
      'In Review',
      'Development',
      'Code Review',
      'Testing',
      'QA'
    ],
    inactiveStatuses: [
      'In Development',
      'Code Review',
      'Bug Detected'
    ]
  },
  {
    id: 2,
    name: 'Business Analysis',
    status: 'calibrated',
    linkedBoards: 14,
    mappedStatuses: 6,
    lastUpdated: '4h 2m ago',
    description: 'Business analysis and requirements workflow',
    boards: [
      { name: 'Requirements Analysis', status: 'active' },
      { name: 'Stakeholder Reviews', status: 'active' }
    ],
    statusLabels: [
      'Backlog',
      'Requirements',
      'Analysis',
      'Review',
      'Approved',
      'Implementation',
      'Done'
    ],
    mappedStatusesData: Array(7).fill([]),
    activeStatuses: [
      'Requirements Gathering',
      'Analysis',
      'Stakeholder Review',
      'Documentation',
      'Implementation Planning'
    ],
    inactiveStatuses: [
      'On Hold',
      'Needs Clarification',
      'Pending Approval'
    ]
  },
  {
    id: 3,
    name: 'Development',
    status: 'not-calibrated',
    linkedBoards: 32,
    mappedStatuses: 4,
    lastUpdated: '4h 2m ago',
    description: 'Software development workflow tracking',
    boards: [
      { name: 'Sprint Planning', status: 'active' },
      { name: 'Bug Tracking', status: 'active' },
      { name: 'Code Reviews', status: 'active' }
    ],
    statusLabels: [
      'Backlog',
      'Ready',
      'In Dev',
      'Code Review',
      'Testing',
      'QA',
      'Done'
    ],
    mappedStatusesData: Array(7).fill([]),
    activeStatuses: [
      'Development',
      'Code Review',
      'Testing',
      'Bug Fixing',
      'QA Review',
      'Ready for Release'
    ],
    inactiveStatuses: [
      'On Hold',
      'Blocked',
      'Needs Info'
    ]
  },
  {
    id: 4,
    name: 'Marketing',
    status: 'needs-review',
    linkedBoards: 6,
    mappedStatuses: 2,
    lastUpdated: '4h 2m ago',
    description: 'Marketing campaign workflow management',
    boards: [
      { name: 'Campaign Planning', status: 'active' },
      { name: 'Content Calendar', status: 'inactive' }
    ],
    statusLabels: [
      'Ideas',
      'Planning',
      'Creation',
      'Review',
      'Approval',
      'Scheduled',
      'Published'
    ],
    mappedStatusesData: Array(7).fill([]),
    activeStatuses: [
      'Content Planning',
      'Design',
      'Review',
      'Approval',
      'Scheduling',
      'Publishing'
    ],
    inactiveStatuses: [
      'Draft',
      'Revision Needed',
      'On Hold'
    ]
  }
];

export { workflowData };

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

const getStatusText = (status) => {
  switch (status) {
    case 'calibrated':
      return 'Calibrated';
    case 'not-calibrated':
      return 'Not Calibrated';
    case 'needs-review':
      return 'Needs Review';
    default:
      return '';
  }
};

const StatusItem = ({ status, index, isInactive, onStatusToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = () => {
    onStatusToggle(status);
    handleClose();
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'STATUS',
    item: { status, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !isInactive,
  });

  return (
    <div
      ref={!isInactive ? drag : null}
      className={`status-item ${isInactive ? 'inactive' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {status}
      <MoreVertIcon 
        className="more-icon"
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleToggle}>
          {isInactive ? 'Make Status Active' : 'Make Status Inactive'}
        </MenuItem>
      </Menu>
    </div>
  );
};

const generateStatusColor = (label) => {
  // Color mapping based on common status keywords
  const colorMap = {
    // Backlog/Planning statuses (Soft Gray)
    backlog: '#64748B',     // Slate
    planning: '#64748B',    // Slate
    planned: '#64748B',     // Slate
    upcoming: '#64748B',    // Slate
    
    // New/Todo statuses (Indigo)
    new: '#6366F1',         // Indigo
    todo: '#6366F1',        // Indigo
    open: '#6366F1',        // Indigo
    created: '#6366F1',     // Indigo
    assigned: '#6366F1',    // Indigo
    
    // Active/Progress statuses (Blue)
    active: '#2563EB',      // Blue
    progress: '#2563EB',    // Blue
    ongoing: '#2563EB',     // Blue
    development: '#2563EB', // Blue
    developing: '#2563EB',  // Blue
    working: '#2563EB',     // Blue
    coding: '#2563EB',      // Blue
    implementing: '#2563EB',// Blue
    building: '#2563EB',    // Blue
    processing: '#2563EB',  // Blue
    running: '#2563EB',     // Blue
    executing: '#2563EB',   // Blue
    handling: '#2563EB',    // Blue
    modifying: '#2563EB',   // Blue
    updating: '#2563EB',    // Blue
    inwork: '#2563EB',      // Blue
    started: '#2563EB',     // Blue
    underway: '#2563EB',    // Blue
    current: '#2563EB',     // Blue
    
    // Investigation statuses (Blue-ish)
    investigating: '#3B82F6', // Lighter Blue
    analyzing: '#3B82F6',    // Lighter Blue
    researching: '#3B82F6',  // Lighter Blue
    exploring: '#3B82F6',    // Lighter Blue
    evaluating: '#3B82F6',   // Lighter Blue
    
    // Review statuses (Purple)
    review: '#9333EA',      // Purple
    reviewing: '#9333EA',   // Purple
    testing: '#9333EA',     // Purple
    qa: '#9333EA',          // Purple
    validation: '#9333EA',  // Purple
    checking: '#9333EA',    // Purple
    verifying: '#9333EA',   // Purple
    
    // Design statuses (Pink)
    design: '#EC4899',      // Pink
    designing: '#EC4899',   // Pink
    mockup: '#EC4899',      // Pink
    prototype: '#EC4899',   // Pink
    wireframe: '#EC4899',   // Pink
    
    // Documentation statuses (Cyan)
    documentation: '#06B6D4', // Cyan
    documenting: '#06B6D4',  // Cyan
    docs: '#06B6D4',         // Cyan
    writing: '#06B6D4',      // Cyan
    
    // Blocked statuses (Red)
    blocked: '#DC2626',     // Red
    hold: '#DC2626',        // Red
    waiting: '#DC2626',     // Red
    stopped: '#DC2626',     // Red
    paused: '#DC2626',      // Red
    suspended: '#DC2626',   // Red
    
    // Info needed statuses (Amber)
    info: '#F59E0B',        // Amber
    needs: '#F59E0B',       // Amber
    pending: '#F59E0B',     // Amber
    clarification: '#F59E0B',// Amber
    feedback: '#F59E0B',    // Amber
    input: '#F59E0B',       // Amber
    
    // Bug/Issue statuses (Orange)
    bug: '#EA580C',         // Orange
    issue: '#EA580C',       // Orange
    problem: '#EA580C',     // Orange
    defect: '#EA580C',      // Orange
    fixing: '#EA580C',      // Orange
    
    // Done/Success statuses (Green)
    done: '#16A34A',        // Green
    complete: '#16A34A',    // Green
    finished: '#16A34A',    // Green
    resolved: '#16A34A',    // Green
    shipped: '#16A34A',     // Green
    deployed: '#16A34A',    // Green
    released: '#16A34A',    // Green
    closed: '#16A34A',      // Green
    
    // Cancelled/Archived statuses (Gray)
    cancelled: '#4B5563',   // Gray
    archived: '#4B5563',    // Gray
    dropped: '#4B5563',     // Gray
    abandoned: '#4B5563',   // Gray
    
    // Default color for unmatched statuses
    default: '#6366F1'      // Indigo
  };

  // Convert label to lowercase and remove special characters
  const normalizedLabel = label.toLowerCase().replace(/[^a-z]/g, '');

  // Find the first matching status keyword
  const matchingColor = Object.entries(colorMap).find(([keyword]) => 
    normalizedLabel.includes(keyword)
  );

  return matchingColor ? matchingColor[1] : colorMap.default;
};

const EditableLabel = ({ value, onChange, isEditing, onEdit, onBlur, color }) => {
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const newValue = inputValue.trim() || 'Untitled';
    onChange(newValue);
    setInputValue(newValue);
    onBlur();
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        className="status-label-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleSubmit}
        onKeyDown={handleKeyDown}
        style={{ borderColor: color }}
      />
    );
  }

  return (
    <div className="status-label" onClick={onEdit} style={{ borderColor: color }}>
      {value || 'Untitled'}
    </div>
  );
};

const StatusBox = ({ index, onDrop, statuses, onRemove, label, onLabelChange, onReorder }) => {
  const [isEditing, setIsEditing] = useState(false);
  const boxColor = generateStatusColor(label);

  const [{ isDragging }, drag] = useDrag({
    type: 'STATUS_BOX',
    item: { index, type: 'STATUS_BOX' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ['STATUS', 'MAPPED_STATUS', 'STATUS_BOX'],
    drop: (item, monitor) => {
      if (item.type === 'STATUS_BOX') {
        return { index };
      } else if (item.type === 'MAPPED_STATUS') {
        onDrop(item.status, index, item.fromBoxIndex);
      } else {
        onDrop(item.status, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
    hover(item, monitor) {
      if (!monitor.canDrop()) return;
      
      if (item.type === 'STATUS_BOX') {
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) return;

        onReorder(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    }
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`status-box ${statuses?.length > 0 ? 'has-status' : ''} ${isOver ? 'drop-target' : ''}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        borderColor: boxColor,
      }}
    >
      <div className="status-box-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <EditableLabel
          value={label}
          onChange={(value) => onLabelChange(index, value)}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          color={boxColor}
        />
        <button
          className="remove-status"
          onClick={() => onRemove(index)}
          style={{
            background: 'none',
            border: 'none',
            color: boxColor,
            cursor: 'pointer',
            padding: '4px',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            opacity: 0.7,
          }}
        >
          ✕
        </button>
      </div>
      <div className="status-content">
        {statuses?.length > 0 ? (
          <div className="status-values">
            {statuses.map((status, statusIndex) => (
              <DraggableStatusValue
                key={statusIndex}
                status={status}
                boxIndex={index}
                statusIndex={statusIndex}
                onRemove={() => onRemove(index, statusIndex)}
                color={boxColor}
              />
            ))}
          </div>
        ) : (
          <div className="status-empty" style={{ borderColor: boxColor, color: boxColor }}>
            Drop status here
          </div>
        )}
      </div>
    </div>
  );
};

const DraggableStatusValue = ({ status, boxIndex, statusIndex, onRemove, color }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'MAPPED_STATUS',
    item: { type: 'MAPPED_STATUS', status, fromBoxIndex: boxIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`status-value ${status.type === 'waiting' ? 'waiting' : ''}`}
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span>{typeof status === 'string' ? status : status.label || status.toString()}</span>
      <button
        className="remove-status"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(boxIndex, statusIndex);
        }}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        ✕
      </button>
    </div>
  );
};

const WorkflowDetails = ({ workflow, onClose }) => {
  const defaultActiveStatuses = [
    'In Progress',
    'Revising',
    'Waiting for Review',
    'In Review',
    'Development',
    'Code Review',
    'Testing',
    'QA'
  ];

  const defaultInactiveStatuses = [
    'In Development',
    'Code Review',
    'Bug Detected'
  ];

  const defaultStatusLabels = [
    'Backlog',
    'To Do',
    'In Progress',
    'In Review',
    'In Testing',
    'In QA',
    'Done'
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBoards, setSelectedBoards] = useState([]);
  const [connectedBoards, setConnectedBoards] = useState([
    { project: 'Project Basketball', boards: ['Board Bulls', 'Board Lakers', 'Board Warriors'] },
    { project: 'Project Football', boards: ['Board Patriots'] },
    { project: 'Project Baseball', boards: ['Board Yankees'] },
    { project: 'Project Soccer', boards: ['Board Arsenal'] }
  ]);

  const projectsDatabase = [
    {
      name: 'Project Basketball',
      boards: ['Board Bulls', 'Board Cavs', 'Board Knicks', 'Board Lakers', 'Board Celtics', 'Board Warriors']
    },
    {
      name: 'Project Football',
      boards: ['Board Jets', 'Board Vikings', 'Board Eagles', 'Board Patriots', 'Board Dolphins']
    },
    {
      name: 'Project Baseball',
      boards: ['Board Angels', 'Board Dodgers', 'Board Padres', 'Board Yankees', 'Board Red Sox']
    },
    {
      name: 'Project Hockey',
      boards: ['Board Bruins', 'Board Rangers', 'Board Penguins', 'Board Sharks']
    },
    {
      name: 'Project Soccer',
      boards: ['Board Arsenal', 'Board Chelsea', 'Board Liverpool', 'Board Barcelona', 'Board Real Madrid']
    }
  ];

  const getAvailableBoards = () => {
    const connectedBoardsList = connectedBoards.flatMap(group => group.boards);
    return projectsDatabase.map(project => ({
      project: project.name,
      boards: project.boards.filter(board => !connectedBoardsList.includes(board))
    })).filter(group => group.boards.length > 0);
  };

  const getFilteredBoards = () => {
    if (!searchQuery) return [];
    
    return getAvailableBoards()
      .map(group => ({
        project: group.project,
        boards: group.boards.filter(board => 
          board.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }))
      .filter(group => group.boards.length > 0);
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleAddBoard = (projectName, board) => {
    setConnectedBoards(prev => {
      const projectGroup = prev.find(g => g.project === projectName);
      if (projectGroup) {
        return prev.map(g => 
          g.project === projectName 
            ? { ...g, boards: [...g.boards, board] }
            : g
        );
      } else {
        return [...prev, { project: projectName, boards: [board] }];
      }
    });
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const handleRemoveBoard = (projectName, board) => {
    setConnectedBoards(prev => 
      prev.map(group => 
        group.project === projectName
          ? { ...group, boards: group.boards.filter(b => b !== board) }
          : group
      ).filter(group => group.boards.length > 0)
    );
  };

  const [activeStatuses, setActiveStatuses] = useState(workflow?.activeStatuses || defaultActiveStatuses);
  const [inactiveStatuses, setInactiveStatuses] = useState(workflow?.inactiveStatuses || defaultInactiveStatuses);
  const [statusLabels, setStatusLabels] = useState(workflow?.statusLabels || defaultStatusLabels);
  const [mappedStatuses, setMappedStatuses] = useState(
    workflow?.mappedStatusesData || Array(7).fill([])
  );
  const inputRef = useRef(null);

  // Update state when workflow changes
  useEffect(() => {
    if (workflow) {
      setActiveStatuses(workflow.activeStatuses || defaultActiveStatuses);
      setInactiveStatuses(workflow.inactiveStatuses || defaultInactiveStatuses);
      setStatusLabels(workflow.statusLabels || defaultStatusLabels);
      setMappedStatuses(workflow.mappedStatusesData || Array(7).fill([]));
    }
  }, [workflow]);

  const updateWorkflowData = (updatedWorkflow) => {
    if (!workflow) return false;

    const updatedWorkflowData = workflowData.map(w => 
      w.id === updatedWorkflow.id ? { 
        ...w, 
        ...updatedWorkflow,
        activeStatuses: activeStatuses,
        inactiveStatuses: inactiveStatuses,
        statusLabels: statusLabels,
        mappedStatusesData: mappedStatuses
      } : w
    );
    window.workflowData = updatedWorkflowData;
    window.dispatchEvent(new Event('workflowDataUpdated'));
    return true;
  };

  const handleNameChange = async (newName) => {
    if (!workflow) return;

    const updatedWorkflow = {
      ...workflow,
      name: newName
    };
    
    const success = await updateWorkflowData(updatedWorkflow);
    if (success) {
      setWorkflowName(newName);
      setIsEditing(false);
    }
  };

  const calculateMappedStatusesCount = () => {
    return mappedStatuses.reduce((total, statuses) => total + (statuses ? statuses.length : 0), 0);
  };

  const [workflowName, setWorkflowName] = useState(workflow?.name || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusToggle = (status) => {
    if (activeStatuses.includes(status)) {
      // Move to inactive
      setActiveStatuses(activeStatuses.filter(s => s !== status));
      setInactiveStatuses([...inactiveStatuses, status]);
      
      // Remove from mapped statuses if present
      const newMappedStatuses = mappedStatuses.map(boxStatuses => 
        boxStatuses.filter(s => s !== status)
      );
      setMappedStatuses(newMappedStatuses);
    } else {
      // Move to active
      setInactiveStatuses(inactiveStatuses.filter(s => s !== status));
      setActiveStatuses([...activeStatuses, status]);
    }
  };

  const handleStatusDrop = (status, targetBoxIndex, fromBoxIndex = null) => {
    if (typeof fromBoxIndex === 'number') {
      // Moving between boxes
      setMappedStatuses(prevMappedStatuses => {
        const newMappedStatuses = [...prevMappedStatuses];
        // Remove from source box
        newMappedStatuses[fromBoxIndex] = newMappedStatuses[fromBoxIndex].filter(s => s !== status);
        // Add to target box
        newMappedStatuses[targetBoxIndex] = [...newMappedStatuses[targetBoxIndex], status];
        return newMappedStatuses;
      });
    } else {
      // New status from the list
      setMappedStatuses(prevMappedStatuses => {
        const newMappedStatuses = [...prevMappedStatuses];
        newMappedStatuses[targetBoxIndex] = [...newMappedStatuses[targetBoxIndex], status];
        return newMappedStatuses;
      });
      setActiveStatuses(prevStatuses => prevStatuses.filter(s => s !== status));
    }
  };

  const handleRemoveStatus = (boxIndex, statusIndex) => {
    setMappedStatuses(prevMappedStatuses => {
      const newMappedStatuses = [...prevMappedStatuses];
      newMappedStatuses[boxIndex] = newMappedStatuses[boxIndex].filter((_, i) => i !== statusIndex);
      return newMappedStatuses;
    });
  };

  const handleRemoveStatusBlock = (blockIndex) => {
    // Get the statuses from the block before removing it
    const statusesToReturn = mappedStatuses[blockIndex] || [];

    // Add the statuses back to active statuses
    setActiveStatuses(prev => [...prev, ...statusesToReturn]);

    // Remove the block
    setMappedStatuses(prev => {
      const newMappedStatuses = [...prev];
      newMappedStatuses.splice(blockIndex, 1);
      return newMappedStatuses;
    });

    // Remove the label
    setStatusLabels(prev => {
      const newLabels = [...prev];
      newLabels.splice(blockIndex, 1);
      return newLabels;
    });
  };

  const handleLabelChange = (index, newLabel) => {
    const newLabels = [...statusLabels];
    newLabels[index] = newLabel;
    setStatusLabels(newLabels);
  };

  const moveBox = React.useCallback((dragIndex, hoverIndex) => {
    setStatusLabels(prevLabels => {
      const newLabels = [...prevLabels];
      const [removed] = newLabels.splice(dragIndex, 1);
      newLabels.splice(hoverIndex, 0, removed);
      return newLabels;
    });

    setMappedStatuses(prevStatuses => {
      const newStatuses = [...prevStatuses];
      const [removed] = newStatuses.splice(dragIndex, 1);
      newStatuses.splice(hoverIndex, 0, removed);
      return newStatuses;
    });
  }, []);

  const handleAddStatusBlock = () => {
    setStatusLabels([...statusLabels, 'New Status']);
    setMappedStatuses([...mappedStatuses, []]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="workflow-details">
        <div className="workflow-details-header">
          <div className="workflow-title">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                onBlur={() => handleNameChange(workflowName)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleNameChange(workflowName);
                  } else if (e.key === 'Escape') {
                    setIsEditing(false);
                    setWorkflowName(workflow.name);
                  }
                }}
                className="workflow-name-input"
              />
            ) : (
              <>
                <h2>{workflowName}</h2>
                <IconButton onClick={() => setIsEditing(true)} size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </div>
          <div className="workflow-actions">
            <button className="cancel-button" onClick={onClose}>Close</button>
          </div>
        </div>
        
        <div className="workflow-content">
          <div className="workflow-columns">
            {/* Boards Column */}
            <div className="workflow-column">
              <div className="column-header">
                <h3>Boards</h3>
                <span className="count">
                  ({connectedBoards.reduce((sum, group) => sum + group.boards.length, 0)} connected)
                </span>
              </div>
              <div className="column-content boards-column">
                <div className="search-container">
                  <div className="search-box">
                    <SearchIcon className="search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search and Add Boards" 
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsSearchOpen(true);
                      }}
                      onFocus={() => setIsSearchOpen(true)}
                    />
                    {searchQuery && (
                      <CloseIcon 
                        className="clear-icon"
                        onClick={() => {
                          setSearchQuery('');
                          setIsSearchOpen(false);
                        }}
                      />
                    )}
                  </div>
                  
                  {isSearchOpen && searchQuery && (
                    <div className="search-dropdown">
                      {getFilteredBoards().map((group, groupIndex) => (
                        <div key={groupIndex} className="project-group">
                          <div className="project-name">{group.project}</div>
                          {group.boards.map((board, boardIndex) => (
                            <div 
                              key={boardIndex} 
                              className="board-item clickable"
                              onClick={() => handleAddBoard(group.project, board)}
                            >
                              <span>{board}</span>
                              <AddIcon className="add-icon" />
                            </div>
                          ))}
                        </div>
                      ))}
                      {getFilteredBoards().length === 0 && (
                        <div className="no-results">
                          No matching boards found
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="boards-list">
                  {connectedBoards.map((group, groupIndex) => (
                    <div key={groupIndex} className="project-group">
                      <div className="project-name">{group.project}</div>
                      {group.boards.map((board, boardIndex) => (
                        <div key={boardIndex} className="board-item">
                          <span>{board}</span>
                          <CloseIcon 
                            className="remove-icon" 
                            onClick={() => handleRemoveBoard(group.project, board)}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Statuses Column */}
            <div className="workflow-column">
              <div className="column-header">
                <h3>Active Statuses</h3>
              </div>
              <div className="column-content">
                <div className="status-list">
                  {activeStatuses.map((status, index) => (
                    <StatusItem
                      key={status}
                      status={status}
                      index={index}
                      isInactive={false}
                      onStatusToggle={handleStatusToggle}
                    />
                  ))}
                </div>
                
                <div className="inactive-label">Inactive Statuses</div>
                <div className="status-list">
                  {inactiveStatuses.map((status, index) => (
                    <StatusItem
                      key={status}
                      status={status}
                      index={index}
                      isInactive={true}
                      onStatusToggle={handleStatusToggle}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Status Map Column */}
            <div className="workflow-column">
              <div className="column-header">
                <h3>Status Map</h3>
              </div>
              <div className="column-content">
                <div className="status-map">
                  {mappedStatuses.map((statuses, index) => (
                    <React.Fragment key={statusLabels[index]}>
                      <div className="status-node">
                        <StatusBox
                          index={index}
                          onDrop={handleStatusDrop}
                          onRemove={handleRemoveStatusBlock}
                          statuses={statuses}
                          label={statusLabels[index]}
                          onLabelChange={handleLabelChange}
                          onReorder={moveBox}
                        />
                      </div>
                      {index < mappedStatuses.length - 1 && (
                        <>
                          <div className="connection-line"></div>
                          <div className="connection-dot"></div>
                        </>
                      )}
                    </React.Fragment>
                  ))}
                  <div 
                    className="add-status-block"
                    onClick={handleAddStatusBlock}
                  >
                    <AddIcon />
                    Add Status Block
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

const AllWorkflows = ({ selectedWorkflowId, onWorkflowSelect }) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  // Handle workflow selection from Workflows panel
  useEffect(() => {
    if (selectedWorkflowId) {
      const workflow = workflowData.find(w => w.id === selectedWorkflowId);
      if (workflow) {
        setIsTransitioning(true);
        setTimeout(() => {
          setSelectedWorkflow(workflow);
          setIsTransitioning(false);
        }, 150);
      }
    } else {
      handleBack();
    }
  }, [selectedWorkflowId]);

  const handleWorkflowSelect = (workflow) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedWorkflow(workflow);
      setIsTransitioning(false);
    }, 150);
  };

  const handleGridWorkflowClick = (workflow) => {
    handleWorkflowSelect(workflow);
    onWorkflowSelect(workflow.id);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedWorkflow(null);
      onWorkflowSelect(null);
      setIsTransitioning(false);
    }, 150);
  };

  const handleCreateWorkflow = () => {
    navigate('/data-management/add-workflow');
  };

  return (
    <div className={`workflows-container ${isTransitioning ? 'transitioning' : ''}`}> 
      {!selectedWorkflow ? (
        <>
          <div className="workflows-header">
            <h2>All Workflows</h2>
          </div>
          <div className="workflow-grid">
            {workflowData.map((workflow) => (
              <div 
                key={workflow.id} 
                className={`workflow-card ${workflow.status}`}
                onClick={() => handleGridWorkflowClick(workflow)}
              >
                <div className="workflow-header">
                  <div className="workflow-header-top">
                    <h3>{workflow.name}</h3>
                    <div className={`workflow-status ${workflow.status}`}>
                      {getStatusIcon(workflow.status)}
                      <span>{getStatusText(workflow.status)}</span>
                    </div>
                  </div>
                </div>
                <div className="workflow-stats">
                  <div className="workflow-stats-column">
                    <div className="stat-row">
                      <span className="stat-label">Linked Boards</span>
                      <span className="stat-value">{workflow.linkedBoards}</span>
                    </div>
                  </div>
                  <div className="workflow-stats-column">
                    <div className="stat-row">
                      <span className="stat-label">Mapped Statuses</span>
                      <span className="stat-value">{workflow.mappedStatuses}</span>
                    </div>
                  </div>
                  <div className="last-updated">
                    Last Updated {workflow.lastUpdated}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <WorkflowDetails 
          workflow={selectedWorkflow} 
          onClose={handleBack}
        />
      )}
    </div>
  );
};

export default AllWorkflows;

import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Popover,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  InputAdornment,
  Fade,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './ProjectBoardFilter.css';

const ProjectBoardFilter = ({ onFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState(['all']);
  const [selectedBoards, setSelectedBoards] = useState(['all']);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data structure - replace with your actual data
  const projects = [
    {
      id: 'project1',
      name: 'Main Project',
      boards: [
        { id: 'board1', name: 'Development Board' },
        { id: 'board2', name: 'Design Board' },
        { id: 'board3', name: 'Sprint Planning' }
      ]
    },
    {
      id: 'project2',
      name: 'Mobile App',
      boards: [
        { id: 'board4', name: 'Sprint Board' },
        { id: 'board5', name: 'Feature Board' },
        { id: 'board6', name: 'Bug Tracking' }
      ]
    },
    {
      id: 'project3',
      name: 'Web Platform',
      boards: [
        { id: 'board7', name: 'Frontend Tasks' },
        { id: 'board8', name: 'Backend Tasks' },
        { id: 'board9', name: 'API Development' }
      ]
    },
    {
      id: 'project4',
      name: 'Analytics Dashboard',
      boards: [
        { id: 'board10', name: 'Data Visualization' },
        { id: 'board11', name: 'Reporting System' },
        { id: 'board12', name: 'User Analytics' }
      ]
    },
    {
      id: 'project5',
      name: 'Customer Portal',
      boards: [
        { id: 'board13', name: 'User Management' },
        { id: 'board14', name: 'Authentication' },
        { id: 'board15', name: 'Support System' }
      ]
    },
    {
      id: 'project6',
      name: 'Infrastructure',
      boards: [
        { id: 'board16', name: 'Cloud Services' },
        { id: 'board17', name: 'DevOps Tasks' },
        { id: 'board18', name: 'Monitoring' }
      ]
    }
  ];

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projects;
    const query = searchQuery.toLowerCase();
    return projects.map(project => ({
      ...project,
      boards: project.boards.filter(board => 
        board.name.toLowerCase().includes(query)
      ),
      matched: project.name.toLowerCase().includes(query)
    })).filter(project => 
      project.matched || project.boards.length > 0
    );
  }, [projects, searchQuery]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchQuery('');
  };

  const handleProjectChange = (projectId) => {
    let newSelectedProjects;
    if (projectId === 'all') {
      newSelectedProjects = ['all'];
      setSelectedBoards(['all']);
    } else {
      const currentProjects = selectedProjects.filter(id => id !== 'all');
      if (currentProjects.includes(projectId)) {
        newSelectedProjects = currentProjects.filter(id => id !== projectId);
      } else {
        newSelectedProjects = [...currentProjects, projectId];
      }
      if (newSelectedProjects.length === 0) {
        newSelectedProjects = ['all'];
        setSelectedBoards(['all']);
      }
    }
    setSelectedProjects(newSelectedProjects);
    onFilterChange?.({ projects: newSelectedProjects, boards: selectedBoards });
  };

  const handleBoardChange = (boardId, projectId) => {
    let newSelectedBoards;
    if (boardId === 'all') {
      newSelectedBoards = ['all'];
    } else {
      const currentBoards = selectedBoards.filter(id => id !== 'all');
      if (currentBoards.includes(boardId)) {
        newSelectedBoards = currentBoards.filter(id => id !== boardId);
      } else {
        newSelectedBoards = [...currentBoards, boardId];
      }
      if (newSelectedBoards.length === 0) {
        newSelectedBoards = ['all'];
      }
    }
    setSelectedBoards(newSelectedBoards);
    onFilterChange?.({ projects: selectedProjects, boards: newSelectedBoards });
  };

  const getDisplayText = () => {
    if (selectedProjects.includes('all')) {
      if (selectedBoards.includes('all')) {
        return 'All Projects';
      }
      const boardCount = selectedBoards.length;
      if (boardCount === 1) {
        const board = projects.flatMap(p => p.boards).find(b => b.id === selectedBoards[0]);
        return `All Projects • ${board?.name || ''}`;
      }
      return `All Projects • ${boardCount} boards`;
    }

    if (selectedProjects.length === 1) {
      const project = projects.find(p => p.id === selectedProjects[0]);
      if (!project) return 'All Projects';

      if (selectedBoards.includes('all')) {
        return project.name;
      }

      const boardCount = selectedBoards.length;
      if (boardCount === 1) {
        const board = project.boards.find(b => b.id === selectedBoards[0]);
        return `${project.name} • ${board?.name || ''}`;
      }
      return `${project.name} • ${boardCount} boards`;
    }

    const projectCount = selectedProjects.length;
    const boardCount = selectedBoards.includes('all') ? 'All' : selectedBoards.length;
    return `${projectCount} Projects • ${boardCount} boards`;
  };

  const hasNoResults = filteredProjects.length === 0;
  const open = Boolean(anchorEl);

  return (
    <div className="project-board-filter">
      <Button
        onClick={handleClick}
        className="filter-button"
        endIcon={<KeyboardArrowDownIcon style={{ 
          transform: open ? 'rotate(180deg)' : 'none'
        }} />}
      >
        <div className="filter-button-content">
          {getDisplayText()}
        </div>
      </Button>
      
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        className="filter-popover"
      >
        <div className="filter-content">
          <div className="search-wrapper">
            <TextField
              size="small"
              placeholder="Search projects and boards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              autoFocus
            />
          </div>

          <div className="filter-section">
            {!hasNoResults && (
              <>
                <div className="filter-section-header">Projects</div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedProjects.includes('all')}
                      onChange={() => handleProjectChange('all')}
                      size="small"
                    />
                  }
                  label="All Projects"
                  className="filter-option project-option"
                />
                {filteredProjects.map(project => (
                  <React.Fragment key={project.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedProjects.includes(project.id)}
                          onChange={() => handleProjectChange(project.id)}
                          size="small"
                          indeterminate={
                            !selectedProjects.includes('all') &&
                            project.boards.some(board => selectedBoards.includes(board.id)) &&
                            !selectedProjects.includes(project.id)
                          }
                        />
                      }
                      label={project.name}
                      className="filter-option project-option"
                    />
                    {(selectedProjects.includes('all') || selectedProjects.includes(project.id)) && 
                      project.boards.map(board => (
                        <FormControlLabel
                          key={board.id}
                          control={
                            <Checkbox
                              checked={selectedBoards.includes('all') || selectedBoards.includes(board.id)}
                              onChange={() => handleBoardChange(board.id, project.id)}
                              size="small"
                            />
                          }
                          label={board.name}
                          className="filter-option board-option"
                        />
                      ))
                    }
                  </React.Fragment>
                ))}
              </>
            )}
            
            {hasNoResults && (
              <div className="no-results">
                No matches found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default ProjectBoardFilter;

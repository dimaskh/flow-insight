import React, { useState } from 'react';
import './AddProjects.css';
import { 
  Typography, 
  Checkbox, 
  FormGroup, 
  FormControlLabel, 
  Button,
  IconButton
} from '@mui/material';
import { Close, Add, Search } from '@mui/icons-material';

const AddProjects = ({ onClose, onAdd, allProjects = [] }) => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = allProjects.filter(project =>
    project.keyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.teamType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProjectToggle = (projectId) => {
    setSelectedProjects(prev => {
      if (prev.includes(projectId)) {
        return prev.filter(id => id !== projectId);
      } else {
        return [...prev, projectId];
      }
    });
  };

  const handleAddProjects = () => {
    onAdd(selectedProjects);
    onClose();
  };

  return (
    <div className="add-projects">
      <div className="add-projects-content">
        <div className="add-projects-header">
          <Typography variant="h6" className="section-title">Add Projects</Typography>
          <IconButton className="close-icon" onClick={onClose} size="small">
            <Close />
          </IconButton>
        </div>

        <div className="add-projects-body">
          <div className="search-section">
            <div className="search-field">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="projects-list">
            <FormGroup>
              {filteredProjects.map(project => (
                <FormControlLabel
                  key={project.id}
                  control={
                    <Checkbox
                      checked={selectedProjects.includes(project.id)}
                      onChange={() => handleProjectToggle(project.id)}
                    />
                  }
                  label={
                    <div className="project-item">
                      <span className="project-key">{project.keyName}</span>
                      <span className="project-type">{project.teamType}</span>
                    </div>
                  }
                />
              ))}
            </FormGroup>
          </div>
        </div>

        <div className="add-projects-footer">
          <Button
            variant="contained"
            className="add-button"
            onClick={handleAddProjects}
            disabled={selectedProjects.length === 0}
            fullWidth
          >
            Add Selected Projects
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProjects;

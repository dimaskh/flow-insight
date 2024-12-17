import React, { useState } from 'react';
import { 
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import './Practices.css';

const initialPractices = [
  { id: 1, name: 'Practice 1', type: 'Type A', lastModified: '2024-01-20' },
  { id: 2, name: 'Practice 2', type: 'Type B', lastModified: '2024-01-19' },
  { id: 3, name: 'Practice 3', type: 'Type A', lastModified: '2024-01-18' },
];

const Practices = () => {
  const [practices, setPractices] = useState(initialPractices);
  const [activePractice, setActivePractice] = useState(practices[0].id);
  const [showAddProjects, setShowAddProjects] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [practiceProjects, setPracticeProjects] = useState({});
  const [editingPractice, setEditingPractice] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const activePracticeData = practices.find(p => p.id === activePractice);

  const handleDeletePractice = () => {
    setPractices(prev => prev.filter(p => p.id !== activePractice));
    setPracticeProjects(prev => {
      const updatedProjects = { ...prev };
      delete updatedProjects[activePractice];
      return updatedProjects;
    });
    setActivePractice(practices[0]?.id);
    setDeleteConfirmOpen(false);
  };

  const startEditing = (practiceId) => {
    setEditingPractice(practiceId);
  };

  const handleKeyPress = (e, practiceId) => {
    if (e.key === 'Enter') {
      handleBlur(e, practiceId);
    }
  };

  const handleBlur = (e, practiceId) => {
    const newName = e.target.value.trim();
    if (newName) {
      setPractices(prev => prev.map(practice => 
        practice.id === practiceId ? { ...practice, name: newName } : practice
      ));
    }
    setEditingPractice(null);
  };

  return (
    <div className="practices-container">
      <div className={`practices-sidebar ${showAddProjects ? 'hidden' : ''}`}>
        <div className="practice-list">
          {practices.map((practice) => (
            <div
              key={practice.id}
              className={`practice-item ${practice.id === activePractice ? 'active' : ''}`}
              onClick={() => setActivePractice(practice.id)}
            >
              <Typography variant="body2" className="practice-name">
                {practice.name}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      <div className="practice-content">
        <div className="practice-header">
          <div className="practice-title">
            {editingPractice === activePractice ? (
              <input
                type="text"
                defaultValue={activePracticeData?.name}
                autoFocus
                onKeyPress={(e) => handleKeyPress(e, activePractice)}
                onBlur={(e) => handleBlur(e, activePractice)}
                className="practice-name-input"
              />
            ) : (
              <>
                <Typography variant="h6" component="h2">{activePracticeData?.name}</Typography>
                <IconButton 
                  size="small" 
                  aria-label="Edit practice name"
                  onClick={() => startEditing(activePractice)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </div>
          <div className="practice-actions">
            <div className="search-box">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {!showAddProjects && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  className="add-new-button"
                  onClick={() => setShowAddProjects(true)}
                  startIcon={<AddIcon />}
                >
                  Add Project
                </Button>
                <IconButton 
                  className="delete-icon" 
                  size="small"
                  onClick={() => setDeleteConfirmOpen(true)}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </div>
        </div>

        <div className="practice-table">
          {/* Table content will go here */}
        </div>
      </div>

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        PaperProps={{
          sx: {
            width: '400px',
            padding: '24px',
            backgroundColor: 'var(--background-paper)'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            color: 'var(--text-primary)', 
            fontWeight: 600,
            padding: '0 0 16px 0',
            fontSize: '18px',
            lineHeight: '24px',
            margin: 0
          }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogContent 
          sx={{ 
            padding: 0,
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <DialogContentText 
            sx={{ 
              color: 'var(--text-primary)', 
              fontSize: '14px',
              lineHeight: 1.5,
              fontWeight: 500
            }}
          >
            Are you sure you want to delete the selected practice?
          </DialogContentText>
          <DialogContentText 
            sx={{ 
              color: 'var(--text-secondary)', 
              fontSize: '13px',
              lineHeight: 1.5
            }}
          >
            This will permanently delete the practice and remove all associated projects. The projects will remain in the database.
          </DialogContentText>
        </DialogContent>
        <DialogActions 
          sx={{ 
            padding: 0,
            gap: '8px'
          }}
        >
          <Button 
            onClick={() => setDeleteConfirmOpen(false)} 
            variant="outlined"
            sx={{ 
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeletePractice}
            variant="contained"
            className="add-new-button MuiButton-containedError"
            sx={{ 
              textTransform: 'none',
              fontWeight: 500
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Practices;

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
import './Objects.css';

const initialObjects = [
  { id: 1, name: 'Object 1', type: 'Type A', lastModified: '2024-01-20' },
  { id: 2, name: 'Object 2', type: 'Type B', lastModified: '2024-01-19' },
  { id: 3, name: 'Object 3', type: 'Type A', lastModified: '2024-01-18' },
];

const Objects = () => {
  const [objects, setObjects] = useState(initialObjects);
  const [activeObject, setActiveObject] = useState(objects[0].id);
  const [showAddProjects, setShowAddProjects] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [objectProjects, setObjectProjects] = useState({});
  const [editingObject, setEditingObject] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const activeObjectData = objects.find(p => p.id === activeObject);

  const handleDeleteObject = () => {
    setObjects(prev => prev.filter(p => p.id !== activeObject));
    setObjectProjects(prev => {
      const updatedProjects = { ...prev };
      delete updatedProjects[activeObject];
      return updatedProjects;
    });
    setActiveObject(objects[0]?.id);
    setDeleteConfirmOpen(false);
  };

  const startEditing = (objectId) => {
    setEditingObject(objectId);
  };

  const handleKeyPress = (e, objectId) => {
    if (e.key === 'Enter') {
      handleBlur(e, objectId);
    }
  };

  const handleBlur = (e, objectId) => {
    const newName = e.target.value.trim();
    if (newName) {
      setObjects(prev => prev.map(obj => 
        obj.id === objectId ? { ...obj, name: newName } : obj
      ));
    }
    setEditingObject(null);
  };

  return (
    <div className="objects-container">
      <div className={`objects-sidebar ${showAddProjects ? 'hidden' : ''}`}>
        <div className="object-list">
          {objects.map((object) => (
            <div
              key={object.id}
              className={`object-item ${object.id === activeObject ? 'active' : ''}`}
              onClick={() => setActiveObject(object.id)}
            >
              <Typography variant="body2" className="object-name">
                {object.name}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      <div className="object-content">
        <div className="object-header">
          <div className="object-title">
            {editingObject === activeObject ? (
              <input
                type="text"
                defaultValue={activeObjectData?.name}
                autoFocus
                onKeyPress={(e) => handleKeyPress(e, activeObject)}
                onBlur={(e) => handleBlur(e, activeObject)}
                className="object-name-input"
              />
            ) : (
              <>
                <Typography variant="h6" component="h2">{activeObjectData?.name}</Typography>
                <IconButton 
                  size="small" 
                  aria-label="Edit object name"
                  onClick={() => startEditing(activeObject)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </div>
          <div className="object-actions">
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

        <div className="object-table">
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
            Are you sure you want to delete the selected object?
          </DialogContentText>
          <DialogContentText 
            sx={{ 
              color: 'var(--text-secondary)', 
              fontSize: '13px',
              lineHeight: 1.5
            }}
          >
            This will permanently delete the object and remove all associated projects. The projects will remain in the database.
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
            onClick={handleDeleteObject}
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

export default Objects;

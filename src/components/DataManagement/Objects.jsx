import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Objects.css';

const Objects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data - replace with actual data from your backend
  const [objects] = useState([
    { id: 1, name: 'Object 1', type: 'Type A', lastModified: '2024-01-20' },
    { id: 2, name: 'Object 2', type: 'Type B', lastModified: '2024-01-19' },
    { id: 3, name: 'Object 3', type: 'Type A', lastModified: '2024-01-18' },
  ]);

  const filteredObjects = objects.filter(obj =>
    obj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obj.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="objects-container">
      <div className="objects-header">
        <h2>Objects</h2>
        <TextField
          className="search-field"
          variant="outlined"
          size="small"
          placeholder="Search objects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      
      <TableContainer component={Paper} className="objects-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Last Modified</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredObjects.map((obj) => (
              <TableRow key={obj.id}>
                <TableCell>{obj.name}</TableCell>
                <TableCell>{obj.type}</TableCell>
                <TableCell>{obj.lastModified}</TableCell>
                <TableCell align="right">
                  <IconButton size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Objects;

import React from 'react';
import './ChartExport.css';
import { Typography, Checkbox, FormGroup, FormControlLabel, Button } from '@mui/material';
import { Close } from '@mui/icons-material';

const ChartExport = ({ onExport, onClose }) => {
  return (
    <div className="chart-export">
      <div className="export-content-wrapper">
        <div className="export-header">
          <Typography variant="h6" className="section-title">Export Options</Typography>
          <Close className="close-icon" onClick={onClose} />
        </div>

        <div className="export-body">
          <div className="export-section">
            <Typography className="section-title">Export Settings</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Include Legend"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Include Title"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Include Filters"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Include Notes"
              />
            </FormGroup>
          </div>

          <div className="export-section">
            <Typography className="section-title">Data Options</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Raw Data"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Aggregated Data"
              />
            </FormGroup>
          </div>

          <div className="export-buttons">
            <Button
              variant="contained"
              className="export-button"
              onClick={() => onExport('PNG')}
              fullWidth
            >
              PNG
            </Button>
            <Button
              variant="contained"
              className="export-button"
              onClick={() => onExport('PDF')}
              fullWidth
            >
              PDF
            </Button>
            <Button
              variant="contained"
              className="export-button"
              onClick={() => onExport('XLS')}
              fullWidth
            >
              XLS
            </Button>
            <Button
              variant="contained"
              className="export-button"
              onClick={() => onExport('CSV')}
              fullWidth
            >
              CSV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartExport;

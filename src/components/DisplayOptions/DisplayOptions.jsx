import React from 'react';
import './DisplayOptions.css';
import { Typography, Checkbox, FormGroup, FormControlLabel, Button } from '@mui/material';
import { Close } from '@mui/icons-material';

const DisplayOptions = ({ onClose }) => {
  return (
    <div className="display-options">
      <div className="options-content-wrapper">
        <div className="options-header">
          <Typography variant="h6" className="section-title">Display Options</Typography>
          <Close className="close-icon" onClick={onClose} />
        </div>

        <div className="options-body">
          <div className="options-section">
            <Typography className="section-title">Chart Elements</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Show Legend"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Show Title"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Show Grid Lines"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Show Data Labels"
              />
            </FormGroup>
          </div>

          <div className="options-section">
            <Typography className="section-title">Appearance</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Dark Theme"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Show Tooltips"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Enable Animation"
              />
            </FormGroup>
          </div>

          <div className="options-section">
            <Typography className="section-title">Data Display</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Show Outliers"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Show Trends"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Show Statistics"
              />
            </FormGroup>
          </div>
        </div>
      </div>
      <div className="collapsed-title" onClick={onClose}>
        <span>Display Options</span>
      </div>
    </div>
  );
};

export default DisplayOptions;

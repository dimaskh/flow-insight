import React from 'react';
import { IconButton } from '@mui/material';
import { Close, CheckCircleOutline } from '@mui/icons-material';
import './TopNotification.css';

const TopNotification = ({ message, onClose }) => {
  return (
    <div className="top-notification">
      <div className="notification-content">
        <CheckCircleOutline fontSize="small" />
        <span>{message}</span>
        <IconButton size="small" onClick={onClose}>
          <Close fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};

export default TopNotification;

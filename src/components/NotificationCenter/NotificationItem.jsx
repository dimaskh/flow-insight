import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button
} from '@mui/material';
import {
  ErrorOutlined,
  TaskAltOutlined,
  UpdateOutlined,
  CampaignOutlined,
  NotificationsActiveOutlined,
  NewReleasesOutlined,
  Done
} from '@mui/icons-material';
import './NotificationCenter.css';

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'alert':
        return <ErrorOutlined className="notification-icon alert" sx={{ fontSize: 18 }} />;
      case 'task':
        return <TaskAltOutlined className="notification-icon task" sx={{ fontSize: 18 }} />;
      case 'update':
        return <UpdateOutlined className="notification-icon update" sx={{ fontSize: 18 }} />;
      case 'announcement':
        return <CampaignOutlined className="notification-icon announcement" sx={{ fontSize: 18 }} />;
      case 'reminder':
        return <NotificationsActiveOutlined className="notification-icon reminder" sx={{ fontSize: 18 }} />;
      case 'release':
        return <NewReleasesOutlined className="notification-icon release" sx={{ fontSize: 18 }} />;
      default:
        return <NotificationsActiveOutlined className="notification-icon info" sx={{ fontSize: 18 }} />;
    }
  };

  const getPriorityClass = () => {
    switch (notification.priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
      default:
        return 'priority-low';
    }
  };

  return (
    <Box className={`notification-item ${notification.status === 'unread' ? 'unread' : ''}`}>
      <Box className="notification-content">
        <Box className="notification-icon-wrapper">
          {getIcon()}
        </Box>
        <Box className="notification-text">
          <Box className="notification-title-row">
            <Typography variant="subtitle2" className="notification-title">
              {notification.title}
            </Typography>
            <Box className="notification-meta">
              <Typography variant="caption" className="notification-time">
                {notification.timestamp}
              </Typography>
              <Box className={`priority-indicator ${getPriorityClass()}`} />
            </Box>
          </Box>
          <Typography variant="body2" className="notification-message">
            {notification.message}
          </Typography>
          {notification.actions && notification.actions.length > 0 && (
            <Box className="notification-actions" sx={{ mt: 1 }}>
              {notification.actions.map((action, index) => (
                <Button
                  key={index}
                  size="small"
                  variant={action.type === 'primary' ? 'contained' : 'outlined'}
                  sx={{
                    textTransform: 'none',
                    mr: 1,
                    fontSize: '12px',
                    py: 0.5,
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      {notification.status === 'unread' && (
        <IconButton
          size="small"
          onClick={() => onMarkAsRead(notification.id)}
          className="mark-read-button"
        >
          <Done fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default NotificationItem;

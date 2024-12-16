import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import { 
  Close,
  AllInboxOutlined,
  NotificationsActiveOutlined,
  DoneAllOutlined,
  SystemUpdateAltOutlined,
  ErrorOutlineOutlined,
  InfoOutlined,
  WarningAmberOutlined
} from '@mui/icons-material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import NotificationItem from './NotificationItem';
import './NotificationCenter.css';

const mockNotifications = [
  {
    id: 1,
    type: 'alert',
    title: 'Project Process Alert',
    message: 'Task "Design System Implementation" is blocked. Dependency on UI Components not met.',
    timestamp: '5 min ago',
    status: 'unread',
    priority: 'high',
    actions: [
      { label: 'View Task', type: 'primary' },
      { label: 'Dismiss', type: 'secondary' }
    ]
  },
  {
    id: 2,
    type: 'info',
    title: 'Sprint Progress Update',
    message: 'Current sprint "UI Enhancement" is at 45% completion. 3 tasks pending review.',
    timestamp: '30 min ago',
    status: 'unread',
    priority: 'low'
  },
  {
    id: 3,
    type: 'alert',
    title: 'Deadline Approaching',
    message: 'Project milestone "Beta Release" due in 48 hours. 2 critical tasks remaining.',
    timestamp: '2 hours ago',
    status: 'unread',
    priority: 'medium',
    actions: [
      { label: 'View Timeline', type: 'primary' }
    ]
  },
  {
    id: 4,
    type: 'info',
    title: 'Sprint Goal Achieved',
    message: 'Team completed all acceptance criteria for "User Authentication" feature.',
    timestamp: '3 hours ago',
    status: 'read',
    priority: 'low'
  },
  {
    id: 5,
    type: 'updates',
    title: 'Project Framework Update',
    message: 'New development workflow implemented. Updated CI/CD pipeline with automated testing.',
    timestamp: '5 hours ago',
    status: 'read',
    priority: 'medium',
    actions: [
      { label: 'View Changes', type: 'primary' }
    ]
  },
  {
    id: 6,
    type: 'alert',
    title: 'Resource Allocation Alert',
    message: 'Frontend development team is over-allocated for next sprint planning.',
    timestamp: '6 hours ago',
    status: 'read',
    priority: 'high'
  },
  {
    id: 7,
    type: 'info',
    title: 'Code Review Status',
    message: '5 pull requests pending review. Average review time: 2.5 hours.',
    timestamp: '1 day ago',
    status: 'read',
    priority: 'low',
    actions: [
      { label: 'View PRs', type: 'primary' }
    ]
  },
  {
    id: 8,
    type: 'updates',
    title: 'Development Standards Update',
    message: 'Updated coding guidelines and PR review checklist now available in documentation.',
    timestamp: '1 day ago',
    status: 'read',
    priority: 'medium'
  }
];

const NotificationCenter = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, status: 'read' } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, status: 'read' })));
  };

  const filteredNotifications = activeTab === 0 
    ? notifications 
    : activeTab === 1 
    ? notifications.filter(n => n.status === 'unread') 
    : activeTab === 2 
    ? notifications.filter(n => n.status === 'read') 
    : notifications.filter(n => n.type === 'updates');

  if (!open) return null;

  return (
    <>
      <div className="notification-overlay" onClick={onClose} />
      <div className="notification-panel">
        <div className="notification-header">
          <Typography variant="h6">
            <NotificationsOutlinedIcon fontSize="small" />
            Notifications
          </Typography>
          <div className="notification-header-actions">
            {unreadCount > 0 && (
              <Button
                size="small"
                onClick={handleMarkAllAsRead}
                className="mark-all-read-button"
              >
                Mark all as read
              </Button>
            )}
            <IconButton onClick={onClose} size="small" className="close-button">
              <Close fontSize="small" />
            </IconButton>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          className="notification-tabs"
        >
          <Tab iconPosition="start" icon={<AllInboxOutlined sx={{ fontSize: 18 }} />} label="All" />
          <Tab iconPosition="start" icon={<NotificationsActiveOutlined sx={{ fontSize: 18 }} />} label={`Unread (${unreadCount})`} />
          <Tab iconPosition="start" icon={<DoneAllOutlined sx={{ fontSize: 18 }} />} label="Read" />
          <Tab iconPosition="start" icon={<SystemUpdateAltOutlined sx={{ fontSize: 18 }} />} label="Updates" />
        </Tabs>

        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <Box className="no-notifications">
              <Typography color="textSecondary">
                {activeTab === 1 
                  ? 'No unread notifications' 
                  : activeTab === 2 
                  ? 'No read notifications'
                  : activeTab === 3
                  ? 'No updates'
                  : 'No notifications'}
              </Typography>
            </Box>
          ) : (
            filteredNotifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={() => handleMarkAsRead(notification.id)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationCenter;

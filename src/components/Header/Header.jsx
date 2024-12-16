import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { 
  HelpOutline,
  DarkModeOutlined,
  LightModeOutlined,
  NotificationsOutlined,
  AssessmentOutlined,
  ArrowBack,
  StorageOutlined
} from '@mui/icons-material';
import NotificationCenter from '../NotificationCenter/NotificationCenter';
import HelpPanel from '../HelpPanel/HelpPanel';
import TopNotification from '../TopNotification/TopNotification';
import UserMenu from '../UserMenu/UserMenu';
import './Header.css';

const Header = ({ onThemeToggle, isDarkMode, onViewChange, currentView }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showTopNotification, setShowTopNotification] = useState(false);
  const unreadCount = 3;

  const handleMouseEnter = () => {
    if (unreadCount > 0) {
      setShowTopNotification(true);
    }
  };

  return (
    <header className="main-header">
      <div className="header-left">
        {currentView === 'data-management' ? (
          <>
            <IconButton 
              className="header-action-button"
              onClick={() => onViewChange('dashboard')}
            >
              <ArrowBack />
            </IconButton>
            <StorageOutlined className="header-icon" />
            <span className="header-title">Data Management</span>
          </>
        ) : currentView === 'new-workflow' ? (
          <>
            <IconButton 
              className="header-action-button"
              onClick={() => onViewChange('data-management')}
            >
              <ArrowBack />
            </IconButton>
            <input
              type="text"
              className="header-title"
              defaultValue="New Workflow"
              placeholder="Enter workflow name"
            />
          </>
        ) : (
          <>
            <AssessmentOutlined className="header-icon" />
            <span className="header-title">Process Analysis</span>
          </>
        )}
      </div>

      <div className="header-right">
        <IconButton 
          className="header-action-button"
          onClick={onThemeToggle}
        >
          {isDarkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
        </IconButton>

        <IconButton 
          className="header-action-button"
          onClick={() => setShowHelp(true)}
        >
          <HelpOutline />
        </IconButton>

        <div 
          className="notification-icon-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setShowTopNotification(false)}
        >
          <IconButton 
            className="header-action-button"
            onClick={() => setShowNotification(true)}
          >
            <div className="notification-icon-wrapper">
              <NotificationsOutlined />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </div>
          </IconButton>
          {showTopNotification && (
            <TopNotification 
              message="You have unread notifications"
              onClose={() => setShowTopNotification(false)}
            />
          )}
        </div>

        <UserMenu onViewChange={onViewChange} />
      </div>

      {showHelp && (
        <HelpPanel onClose={() => setShowHelp(false)} />
      )}

      {showNotification && (
        <NotificationCenter 
          open={showNotification} 
          onClose={() => setShowNotification(false)} 
        />
      )}
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import { IconButton, Popover, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar } from '@mui/material';
import {
  AccountCircle,
  BusinessOutlined,
  IntegrationInstructionsOutlined,
  StorageOutlined,
  GroupOutlined,
  BookmarkBorderOutlined,
  DescriptionOutlined,
  HelpOutlineOutlined,
  ExitToAppOutlined,
  Settings,
  Person
} from '@mui/icons-material';
import './UserMenu.css';

const UserMenu = ({ onViewChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    if (action === 'data-management') {
      onViewChange('data-management');
    }
    handleClose();
  };

  const open = Boolean(anchorEl);

  const menuItems = [
    { icon: <AccountCircle sx={{ fontSize: 20 }} />, text: 'Profile' },
    { icon: <BusinessOutlined sx={{ fontSize: 20 }} />, text: 'Organization' },
    { icon: <IntegrationInstructionsOutlined sx={{ fontSize: 20 }} />, text: 'Integrations' },
    { divider: true },
    { icon: <StorageOutlined sx={{ fontSize: 20 }} />, text: 'Data Management', action: 'data-management' },
    { icon: <GroupOutlined sx={{ fontSize: 20 }} />, text: 'Users & Teams' },
    { icon: <BookmarkBorderOutlined sx={{ fontSize: 20 }} />, text: 'Saved Views' },
    { divider: true },
    { icon: <DescriptionOutlined sx={{ fontSize: 20 }} />, text: 'Documentation' },
    { icon: <HelpOutlineOutlined sx={{ fontSize: 20 }} />, text: 'Help Center' },
    { icon: <ExitToAppOutlined sx={{ fontSize: 20 }} />, text: 'Sign Out' }
  ];

  return (
    <>
      <IconButton
        onClick={handleClick}
        className={open ? 'active user-menu-button' : 'user-menu-button'}
      >
        <AccountCircle />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className="user-menu-popover"
      >
        <div className="user-info">
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'var(--primary)' }}>JD</Avatar>
          <div className="user-text">
            <h3>John Doe</h3>
            <p className="user-email">john.doe@company.com</p>
          </div>
        </div>
        <List>
          {menuItems.map((item, index) => (
            item.divider ? (
              <Divider key={`divider-${index}`} />
            ) : (
              <ListItem 
                button 
                key={item.text} 
                onClick={() => handleMenuItemClick(item.action)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            )
          ))}
        </List>
      </Popover>
    </>
  );
};

export default UserMenu;

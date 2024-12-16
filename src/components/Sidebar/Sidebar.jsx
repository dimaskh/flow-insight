import {
  AccountBalanceOutlined,
  AccountTreeOutlined,
  AssessmentOutlined,
  BugReportOutlined,
  CalendarMonthOutlined,
  ChevronLeft,
  ChevronRight,
  FolderOutlined,
  GridViewOutlined,
  InsightsOutlined,
  KeyboardArrowDown,
  Menu,
  PeopleOutlined,
  SettingsOutlined,
  SpeedOutlined,
  TipsAndUpdatesOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { Menu as MuiMenu, MenuItem as MuiMenuItem } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./Sidebar.css";

function Sidebar({ onCollapse, currentView }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState(
    "Product Development"
  );
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const workspaces = [
    "Product Development",
    "Marketing Campaigns",
    "Digital Transformation",
    "Customer Experience",
    "Research & Innovation",
  ];

  const handleWorkspaceSelect = (workspace) => {
    setSelectedWorkspace(workspace);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleWorkspaceClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const toggleSidebar = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapse?.(newCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMobileMenu();
  };

  return (
    <>
      <button className="mobile-toggle" onClick={toggleMobileMenu}>
        <Menu />
      </button>

      <div
        className={`mobile-overlay ${isMobileOpen ? "visible" : ""}`}
        onClick={closeMobileMenu}
      />

      <aside
        className={`sidebar ${isCollapsed ? "collapsed" : ""} ${
          isMobileOpen ? "mobile-open" : ""
        }`}
      >
        <div className="sidebar-header">
          <a href="/" className="logo">
            <img src={logo} alt="Logo" className="logo-icon" />
            {!isCollapsed && <span className="logo-text">Flow Insight</span>}
          </a>
        </div>

        <div className="sidebar-content">
          <div className="workspace-section">
            <button className="workspace-button" onClick={handleWorkspaceClick}>
              <div className="workspace-info">
                <div className="workspace-avatar">
                  {selectedWorkspace.charAt(0)}
                </div>
                {!isCollapsed && (
                  <span className="workspace-name">{selectedWorkspace}</span>
                )}
              </div>
              {!isCollapsed && (
                <KeyboardArrowDown
                  className={`arrow-icon ${Boolean(anchorEl) ? "open" : ""}`}
                />
              )}
            </button>
            <MuiMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  mt: 1,
                  minWidth: 180,
                  backgroundColor: "var(--background-paper)",
                  border: "1px solid var(--border)",
                  boxShadow:
                    "0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)",
                  borderRadius: "8px",
                  "& .MuiList-root": {
                    padding: "4px",
                  },
                  "& .MuiMenuItem-root": {
                    borderRadius: "6px",
                    margin: "2px",
                    padding: "8px 12px",
                    fontSize: "14px",
                    color: "var(--text-primary)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "var(--hover-background)",
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "left", vertical: "top" }}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            >
              {workspaces.map((workspace) => (
                <MuiMenuItem
                  key={workspace}
                  onClick={() => handleWorkspaceSelect(workspace)}
                  sx={{
                    fontSize: "14px",
                    py: 1,
                  }}
                >
                  {workspace}
                </MuiMenuItem>
              ))}
            </MuiMenu>
          </div>

          <nav className="sidebar-nav">
            {/* Strategy & Planning */}
            <div className="nav-group">
              <div className="nav-divider" />
              <a
                className="nav-item"
                onClick={() => handleNavigation("/strategy")}
              >
                <TipsAndUpdatesOutlined />
                {!isCollapsed && <span>Strategy</span>}
              </a>
              <a
                className="nav-item"
                onClick={() => handleNavigation("/projects")}
              >
                <FolderOutlined />
                {!isCollapsed && <span>Projects</span>}
              </a>
              <a
                className="nav-item"
                onClick={() => handleNavigation("/financials")}
              >
                <AccountBalanceOutlined />
                {!isCollapsed && <span>Financials</span>}
              </a>
            </div>

            {/* Process Analytics */}
            <div className="nav-group">
              <div className="nav-divider" />
              <a
                className="nav-item"
                onClick={() => handleNavigation("/process-map")}
              >
                <AccountTreeOutlined />
                {!isCollapsed && <span>Process Map</span>}
              </a>
              <a
                className={`nav-item ${
                  currentView === "dashboard" ? "active" : ""
                }`}
                onClick={() => handleNavigation("/")}
              >
                <AssessmentOutlined />
                {!isCollapsed && <span>Process Analysis</span>}
              </a>
              <a
                className="nav-item"
                onClick={() => handleNavigation("/performance")}
              >
                <SpeedOutlined />
                {!isCollapsed && <span>Performance</span>}
              </a>
            </div>

            {/* Development */}
            <div className="nav-group">
              <div className="nav-divider" />
              <a
                className="nav-item"
                onClick={() => handleNavigation("/sprint-analysis")}
              >
                <TrendingUpOutlined />
                {!isCollapsed && <span>Sprint Analysis</span>}
              </a>
              <a
                className="nav-item"
                onClick={() => handleNavigation("/issues")}
              >
                <BugReportOutlined />
                {!isCollapsed && <span>Issues</span>}
              </a>
              <a
                className="nav-item"
                onClick={() => handleNavigation("/team-metrics")}
              >
                <PeopleOutlined />
                {!isCollapsed && <span>Team Metrics</span>}
              </a>
            </div>

            {/* Planning */}
            <div className="nav-group">
              <div className="nav-divider" />
              <a
                className="nav-item"
                onClick={() => handleNavigation("/sprints")}
              >
                <CalendarMonthOutlined />
                {!isCollapsed && <span>Sprint Planning</span>}
              </a>
              <a
                className="nav-item"
                onClick={() => handleNavigation("/insights")}
              >
                <InsightsOutlined />
                {!isCollapsed && <span>Insights</span>}
              </a>
            </div>

            {/* Settings */}
            <div className="nav-group">
              <div className="nav-divider" />
              <a
                className={`nav-item ${
                  currentView === "data-management" ? "active" : ""
                }`}
                onClick={() => handleNavigation("/data-management")}
              >
                <GridViewOutlined />
                {!isCollapsed && <span>Data Management</span>}
              </a>
              <a
                className="nav-item"
                onClick={() => handleNavigation("/settings")}
              >
                <SettingsOutlined />
                {!isCollapsed && <span>Settings</span>}
              </a>
            </div>
          </nav>
        </div>

        <button className="collapse-button" onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </aside>
    </>
  );
}

export default Sidebar;

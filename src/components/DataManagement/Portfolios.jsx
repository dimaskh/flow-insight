import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import AddProjects from "./AddProjects";
import "./Portfolios.css";

const mockProjects = [
  {
    id: 1,
    keyName: "GHF-Design Sprints",
    totalBoards: 4,
    activeBoards: 3,
    teamType: "Facilities",
    owner: "Devon Lane",
  },
  {
    id: 2,
    keyName: "GHF-Random Web Project",
    totalBoards: 4,
    activeBoards: 1,
    teamType: "Information technology (IT)",
    owner: "Kathryn Murphy",
  },
  {
    id: 3,
    keyName: "GHF-Random Mobile App",
    totalBoards: 12,
    activeBoards: 2,
    teamType: "Marketing",
    owner: "Darlene Robertson",
  },
  {
    id: 4,
    keyName: "GHF-Random Web Project",
    totalBoards: 3,
    activeBoards: 5,
    teamType: "Information technology (IT)",
    owner: "Kathryn Murphy",
  },
  {
    id: 5,
    keyName: "KLX-Global Initiatives",
    totalBoards: 5,
    activeBoards: 2,
    teamType: "Information technology (IT)",
    owner: "Kathryn Murphy",
  },
  {
    id: 6,
    keyName: "RMS-Product Launch",
    totalBoards: 8,
    activeBoards: 6,
    teamType: "Product Management",
    owner: "Leslie Alexander",
  },
  {
    id: 7,
    keyName: "PTL-Customer Research",
    totalBoards: 6,
    activeBoards: 4,
    teamType: "Research",
    owner: "Jenny Wilson",
  },
  {
    id: 8,
    keyName: "MKT-Brand Strategy",
    totalBoards: 9,
    activeBoards: 7,
    teamType: "Marketing",
    owner: "Robert Fox",
  },
  {
    id: 9,
    keyName: "DEV-Backend Services",
    totalBoards: 15,
    activeBoards: 8,
    teamType: "Development",
    owner: "Jacob Jones",
  },
  {
    id: 10,
    keyName: "UX-Design System",
    totalBoards: 7,
    activeBoards: 5,
    teamType: "Design",
    owner: "Esther Howard",
  },
  {
    id: 11,
    keyName: "HR-Talent Acquisition",
    totalBoards: 4,
    activeBoards: 3,
    teamType: "Human Resources",
    owner: "Brooklyn Simmons",
  },
  {
    id: 12,
    keyName: "FIN-Budget Planning",
    totalBoards: 6,
    activeBoards: 4,
    teamType: "Finance",
    owner: "Marvin McKinney",
  },
  {
    id: 13,
    keyName: "OPS-Process Optimization",
    totalBoards: 10,
    activeBoards: 6,
    teamType: "Operations",
    owner: "Wade Warren",
  },
  {
    id: 14,
    keyName: "SEC-Security Audit",
    totalBoards: 8,
    activeBoards: 5,
    teamType: "Security",
    owner: "Cameron Williamson",
  },
  {
    id: 15,
    keyName: "CST-Support Enhancement",
    totalBoards: 12,
    activeBoards: 8,
    teamType: "Customer Support",
    owner: "Dianne Russell",
  },
  {
    id: 16,
    keyName: "QA-Test Automation",
    totalBoards: 9,
    activeBoards: 6,
    teamType: "Quality Assurance",
    owner: "Guy Hawkins",
  },
  {
    id: 17,
    keyName: "DPS-Data Pipeline",
    totalBoards: 14,
    activeBoards: 8,
    teamType: "Data Science",
    owner: "Eleanor Pena",
  },
  {
    id: 18,
    keyName: "CLD-Cloud Migration",
    totalBoards: 11,
    activeBoards: 7,
    teamType: "Infrastructure",
    owner: "Albert Flores",
  },
  {
    id: 19,
    keyName: "AI-ML Integration",
    totalBoards: 8,
    activeBoards: 5,
    teamType: "Development",
    owner: "Ralph Edwards",
  },
  {
    id: 20,
    keyName: "UI-Component Library",
    totalBoards: 6,
    activeBoards: 4,
    teamType: "Design",
    owner: "Bessie Cooper",
  },
  {
    id: 21,
    keyName: "API-Gateway Service",
    totalBoards: 10,
    activeBoards: 6,
    teamType: "Development",
    owner: "Jerome Bell",
  },
  {
    id: 22,
    keyName: "SEC-Identity Management",
    totalBoards: 7,
    activeBoards: 4,
    teamType: "Security",
    owner: "Courtney Henry",
  },
  {
    id: 23,
    keyName: "PM-Resource Planning",
    totalBoards: 5,
    activeBoards: 3,
    teamType: "Project Management",
    owner: "Theresa Webb",
  },
  {
    id: 24,
    keyName: "MKT-Social Media",
    totalBoards: 8,
    activeBoards: 5,
    teamType: "Marketing",
    owner: "Annette Black",
  },
  {
    id: 25,
    keyName: "DEV-Mobile SDK",
    totalBoards: 13,
    activeBoards: 8,
    teamType: "Development",
    owner: "Floyd Miles",
  },
];

const Portfolios = () => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePortfolio, setActivePortfolio] = useState("product");
  const [portfolios, setPortfolios] = useState([
    { id: "product", name: "Product Development" },
    { id: "marketing", name: "Marketing Campaigns" },
    { id: "digital", name: "Digital Transformation" },
    { id: "customer", name: "Customer Experience" },
    { id: "research", name: "Research & Innovation" },
  ]);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [showAddProjects, setShowAddProjects] = useState(false);
  const [portfolioProjects, setPortfolioProjects] = useState({
    product: mockProjects,
    marketing: mockProjects.map((p) => ({
      ...p,
      id: `mkt-${p.id}`,
      keyName: `MKT-${p.keyName.split("-")[1]}`,
      teamType: "Marketing",
    })),
    digital: mockProjects.map((p) => ({
      ...p,
      id: `dig-${p.id}`,
      keyName: `DIG-${p.keyName.split("-")[1]}`,
      teamType: "Digital",
    })),
    customer: mockProjects.map((p) => ({
      ...p,
      id: `cust-${p.id}`,
      keyName: `CUST-${p.keyName.split("-")[1]}`,
      teamType: "Customer",
    })),
    research: mockProjects.map((p) => ({
      ...p,
      id: `res-${p.id}`,
      keyName: `RES-${p.keyName.split("-")[1]}`,
      teamType: "Research",
    })),
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const projects = useMemo(() => {
    return portfolioProjects[activePortfolio] || [];
  }, [portfolioProjects, activePortfolio]);

  const sortedProjects = useMemo(() => {
    if (!sortConfig.key) return projects;

    return [...projects].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [projects, sortConfig]);

  const filteredProjects = useMemo(() => {
    return sortedProjects.filter(
      (project) =>
        project.keyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.teamType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.owner.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedProjects, searchQuery]);

  const handleAddPortfolio = () => {
    const newId = `portfolio-${Date.now()}`;
    const newPortfolio = {
      id: newId,
      name: "New Portfolio",
    };
    setPortfolios((prev) => [...prev, newPortfolio]);

    // Initialize empty projects for the new portfolio
    setPortfolioProjects((prev) => ({
      ...prev,
      [newId]: [],
    }));

    setActivePortfolio(newId);
  };

  const handleEditPortfolioName = (portfolioId, newName) => {
    setPortfolios((prev) =>
      prev.map((p) => (p.id === portfolioId ? { ...p, name: newName } : p))
    );
    setEditingPortfolio(null);
  };

  const startEditing = (portfolioId) => {
    setEditingPortfolio(portfolioId);
  };

  const handleKeyPress = (event, portfolioId) => {
    if (event.key === "Enter") {
      handleEditPortfolioName(portfolioId, event.target.value);
    }
  };

  const handleBlur = (event, portfolioId) => {
    handleEditPortfolioName(portfolioId, event.target.value);
  };

  const handleAddProjects = (selectedProjectIds) => {
    // Ensure the active portfolio exists in portfolioProjects
    const updatedPortfolioProjects = { ...portfolioProjects };
    if (!updatedPortfolioProjects[activePortfolio]) {
      updatedPortfolioProjects[activePortfolio] = [];
    }

    // Find the selected projects from the mock projects
    const newProjects = selectedProjectIds.map((id) => {
      const project = mockProjects.find((p) => p.id === id);

      // Create a unique identifier for the project in this portfolio
      return {
        ...project,
        id: `${activePortfolio}-${project.id}`,
        keyName: `${activePortfolioData.name.substring(0, 3).toUpperCase()}-${
          project.keyName.split("-")[1]
        }`,
      };
    });

    // Add new projects to the current portfolio
    updatedPortfolioProjects[activePortfolio] = [
      ...(updatedPortfolioProjects[activePortfolio] || []),
      ...newProjects,
    ];

    // Update state to trigger re-render
    setPortfolioProjects(updatedPortfolioProjects);
    setShowAddProjects(false);
  };

  const handleDeleteSelected = () => {
    // Create a copy of the current portfolio projects
    const updatedPortfolioProjects = { ...portfolioProjects };

    // Filter out the selected projects from the current portfolio
    updatedPortfolioProjects[activePortfolio] = (
      updatedPortfolioProjects[activePortfolio] || []
    ).filter((project) => !selectedProjects.includes(project.id));

    // Update the state
    setPortfolioProjects(updatedPortfolioProjects);

    // Clear the selected projects
    setSelectedProjects([]);

    // Close the confirmation dialog
    setConfirmDialogOpen(false);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedProjects(filteredProjects.map((project) => project.id));
    } else {
      setSelectedProjects([]);
    }
  };

  const handleSelectProject = (projectId) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  const activePortfolioData = portfolios.find((p) => p.id === activePortfolio);

  return (
    <div className="portfolios-container">
      <div className={`portfolios-sidebar ${showAddProjects ? "hidden" : ""}`}>
        <div className="portfolio-list">
          <div
            className="workflow-item add-workflow"
            onClick={handleAddPortfolio}
          >
            <AddIcon />
            <span>Add Portfolio</span>
          </div>
          <div className="workflow-divider"></div>
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className={`portfolio-workflow-item ${
                activePortfolio === portfolio.id ? "selected" : ""
              }`}
              onClick={() => setActivePortfolio(portfolio.id)}
            >
              {portfolio.name}
              <span className="project-count-tag">
                {(portfolioProjects[portfolio.id] || []).length}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="portfolio-content">
        <div className="portfolio-header">
          <div className="portfolio-title">
            {editingPortfolio === activePortfolio ? (
              <input
                type="text"
                defaultValue={activePortfolioData?.name}
                autoFocus
                onKeyPress={(e) => handleKeyPress(e, activePortfolio)}
                onBlur={(e) => handleBlur(e, activePortfolio)}
                className="portfolio-name-input"
              />
            ) : (
              <>
                <Typography variant="h6" component="h2">
                  {activePortfolioData?.name}
                </Typography>
                <IconButton
                  size="small"
                  aria-label="Edit portfolio name"
                  onClick={() => startEditing(activePortfolio)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </div>
          <div className="portfolio-actions">
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
              <Button
                variant="contained"
                color="primary"
                className="add-new-button"
                onClick={() => setShowAddProjects(true)}
                startIcon={<AddIcon />}
              >
                Add Project
              </Button>
            )}
          </div>
        </div>

        <div className="portfolio-table">
          {projects.length > 0 ? (
            <>
              <div className="table-header">
                <div className="header-cell checkbox-cell">
                  <Checkbox
                    checked={
                      selectedProjects.length === filteredProjects.length
                    }
                    indeterminate={
                      selectedProjects.length > 0 &&
                      selectedProjects.length < filteredProjects.length
                    }
                    onChange={handleSelectAll}
                    size="small"
                    color="primary"
                  />
                </div>
                <div
                  className="header-cell sortable"
                  onClick={() => handleSort("keyName")}
                >
                  Project Key-Name {renderSortIcon("keyName")}
                </div>
                <div
                  className="header-cell sortable"
                  onClick={() => handleSort("totalBoards")}
                >
                  Total Boards {renderSortIcon("totalBoards")}
                </div>
                <div
                  className="header-cell sortable"
                  onClick={() => handleSort("activeBoards")}
                >
                  Active Boards {renderSortIcon("activeBoards")}
                </div>
                <div
                  className="header-cell sortable"
                  onClick={() => handleSort("teamType")}
                >
                  Team Type {renderSortIcon("teamType")}
                </div>
                <div
                  className="header-cell sortable"
                  onClick={() => handleSort("owner")}
                >
                  Owner {renderSortIcon("owner")}
                </div>
              </div>
              <div className="table-content">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`table-row ${
                      selectedProjects.includes(project.id) ? "selected" : ""
                    }`}
                  >
                    <div className="table-cell checkbox-cell">
                      <Checkbox
                        checked={selectedProjects.includes(project.id)}
                        onChange={() => handleSelectProject(project.id)}
                        size="small"
                        color="primary"
                      />
                    </div>
                    <div className="table-cell">{project.keyName}</div>
                    <div className="table-cell">{project.totalBoards}</div>
                    <div className="table-cell">{project.activeBoards}</div>
                    <div className="table-cell">{project.teamType}</div>
                    <div className="table-cell">{project.owner}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-state-content">
                <Typography variant="h6">No Projects Yet</Typography>
                <Typography color="textSecondary">
                  This portfolio is empty. Click "Add Project" to start adding
                  projects.
                </Typography>
              </div>
            </div>
          )}
        </div>
        {selectedProjects.length > 0 && (
          <div className="action-panel">
            <Button
              variant="contained"
              color="error"
              className="add-new-button"
              startIcon={<DeleteIcon />}
              disableElevation
              onClick={() => setConfirmDialogOpen(true)}
            >
              Delete {selectedProjects.length} Project
              {selectedProjects.length > 1 ? "s" : ""}
            </Button>
          </div>
        )}
      </div>
      {showAddProjects && (
        <AddProjects
          onClose={() => setShowAddProjects(false)}
          onAdd={handleAddProjects}
          allProjects={mockProjects}
        />
      )}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "var(--background-paper)",
            color: "var(--text-primary)",
            borderRadius: "8px",
            maxWidth: "400px",
            padding: "24px",
          },
        }}
      >
        <DialogTitle
          id="delete-dialog-title"
          sx={{
            color: "var(--text-primary)",
            fontWeight: 600,
            padding: "0 0 16px 0",
            fontSize: "18px",
            lineHeight: "24px",
            margin: 0,
          }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogContent
          sx={{
            padding: 0,
            marginBottom: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <DialogContentText
            id="delete-dialog-description"
            sx={{
              color: "var(--text-primary)",
              fontSize: "14px",
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            Are you sure you want to delete the selected project?
          </DialogContentText>
          <DialogContentText
            sx={{
              color: "var(--text-secondary)",
              fontSize: "13px",
              lineHeight: 1.5,
            }}
          >
            This will remove it from your portfolio but not from the database.
            You can re-add it anytime.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            padding: 0,
            gap: "8px",
          }}
        >
          <Button
            onClick={() => setConfirmDialogOpen(false)}
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteSelected}
            variant="contained"
            className="add-new-button MuiButton-containedError"
            sx={{
              textTransform: "none",
              fontWeight: 500,
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

export default Portfolios;

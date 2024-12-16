import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Autocomplete,
  IconButton,
  InputAdornment,
  Button,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Popper,
  Tooltip,
  Typography,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  ManageSearch,
  Clear as ClearIcon,
  FilterList,
  KeyboardArrowDown,
  Check,
  CalendarMonth,
  Add as AddIcon,
  BookmarkBorder as BookmarkBorderIcon,
  History,
  Close,
  DateRange,
} from '@mui/icons-material';
import { format, addDays } from 'date-fns';
import './TopFilters.css';
import { getFilteredResults } from './mockSearchData';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ProjectBoardFilter from './ProjectBoardFilter/ProjectBoardFilter';

const TopFilters = ({ onFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('Last 14 Days');
  const [dateAnchorEl, setDateAnchorEl] = useState(null);
  const [sprintsAnchorEl, setSprintsAnchorEl] = useState(null);
  const [startDate, setStartDate] = useState(addDays(new Date(), -14));
  const [endDate, setEndDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState('14d');
  const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [filteredSprints, setFilteredSprints] = useState(null);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (searchHistory.length === 0) {
      const initialHistory = ['Test search 1', 'Test search 2'];
      setSearchHistory(initialHistory);
      localStorage.setItem('searchHistory', JSON.stringify(initialHistory));
    }
  }, []);

  const addToHistory = (query) => {
    if (!query.trim()) return;
    
    const newHistory = [
      query,
      ...searchHistory.filter(item => item !== query).slice(0, 4)
    ];
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const removeFromHistory = (query) => {
    const newHistory = searchHistory.filter(item => item !== query);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    handleClose();

    const today = new Date();
    switch (filter) {
      case 'Last 7 Days':
        setStartDate(addDays(today, -7));
        setEndDate(today);
        break;
      case 'Last 14 Days':
        setStartDate(addDays(today, -14));
        setEndDate(today);
        break;
      case 'Last 30 Days':
        setStartDate(addDays(today, -30));
        setEndDate(today);
        break;
      case 'Last 90 Days':
        setStartDate(addDays(today, -90));
        setEndDate(today);
        break;
      default:
        break;
    }
  };

  const handleDateClick = (event) => {
    setDateAnchorEl(event.currentTarget);
  };

  const handleDateClose = () => {
    setDateAnchorEl(null);
    setIsSelectingEndDate(false);
  };

  const handleQuickRangeChange = (event, newRange) => {
    if (!newRange) return;
    
    const today = new Date();
    switch (newRange) {
      case '7d':
        setStartDate(addDays(today, -7));
        setEndDate(today);
        break;
      case '14d':
        setStartDate(addDays(today, -14));
        setEndDate(today);
        break;
      case '30d':
        setStartDate(addDays(today, -30));
        setEndDate(today);
        break;
      case '90d':
        setStartDate(addDays(today, -90));
        setEndDate(today);
        break;
    }
    setSelectedRange(newRange);
  };

  const handleDateSelect = (newValue) => {
    if (isSelectingEndDate) {
      setEndDate(newValue);
      setDateAnchorEl(null);
    } else {
      setStartDate(newValue);
      setIsSelectingEndDate(true);
    }
  };

  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
    }
    return 'Select dates';
  };

  const handleFocus = () => {
    if (!inputValue) {
      setShowHistory(true);
      setIsOpen(true);
    }
  };

  const handleBlur = (event) => {
    // Only hide if we're not clicking inside the popper
    const isClickInsidePopper = event.relatedTarget?.closest('.search-results-container');
    if (!isClickInsidePopper) {
      setTimeout(() => {
        setShowHistory(false);
        setIsOpen(false);
      }, 200);
    }
  };

  const handleInputClick = () => {
    if (!inputValue) {
      setShowHistory(true);
      setIsOpen(true);
    }
  };

  const handleSearchChange = (event, value, reason) => {
    if (reason === 'input') {
      setInputValue(value);
      setShowHistory(false);
      if (value) {
        setIsOpen(true);
        const filtered = getFilteredResults(value);
        setSearchResults(filtered);
      } else {
        setIsOpen(false);
        setSearchResults([]);
      }
    } else if (reason === 'clear') {
      setInputValue('');
      setIsOpen(false);
      setSearchResults([]);
      setShowHistory(false);
    }
  };

  const handleSearchClear = () => {
    setInputValue('');
    setIsOpen(false);
    setSearchResults([]);
    setShowHistory(false);
  };

  const handleSearchSelect = (event, option) => {
    if (!option) return;
    
    const query = typeof option === 'string' ? option : option.title;
    setInputValue(query);
    addToHistory(query);
    setShowHistory(false);
    setIsOpen(false);
  };

  const handleRemoveHistory = (query) => {
    removeFromHistory(query);
    const updatedHistory = searchHistory.filter(item => item !== query);
    setSearchResults(updatedHistory.map(item => ({
      type: 'history',
      title: item,
    })));
    if (updatedHistory.length === 0) {
      setShowHistory(false);
      setIsOpen(false);
    }
  };

  const CustomPopper = function(props) {
    const showContent = (showHistory && searchHistory.length > 0) || (!showHistory && searchResults.length > 0);
    if (!props.open || !showContent) return null;
    
    return (
      <Popper
        {...props}
        className="search-results-popper custom-scroll"
        placement="bottom-start"
      >
        <Paper className="search-results-container">
          {showHistory ? (
            <>
              <div className="history-header">Recent Searches</div>
              {searchResults.map((option, index) => (
                <Box 
                  {...props}
                  component="li" 
                  key={`history-${option.title}`}
                  onClick={props.onClick}
                  className={`history-item ${props.className}`}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <History className="history-icon" />
                  <span className="history-text">{option.title}</span>
                  <Box 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveHistory(option.title);
                    }}
                    sx={{ marginLeft: 'auto', cursor: 'pointer' }}
                  >
                    <ClearIcon />
                  </Box>
                </Box>
              ))}
            </>
          ) : (
            <div className="search-results">
              {props.children}
            </div>
          )}
        </Paper>
      </Popper>
    );
  };

  const filters = [
    'Last 7 Days',
    'Last 14 Days',
    'Last 30 Days',
    'Last 90 Days',
  ];

  const [sprints] = useState([
    // Main Project (5 sprints)
    { 
      id: 1, 
      projectName: 'Main Project',
      name: 'Sprint 1', 
      startDate: '2023-12-04', 
      endDate: '2023-12-17',
      status: 'completed',
      tasks: 24,
      progress: 100
    },
    { 
      id: 2, 
      projectName: 'Main Project',
      name: 'Sprint 2', 
      startDate: '2023-12-18', 
      endDate: '2023-12-31',
      status: 'completed',
      tasks: 18,
      progress: 100
    },
    { 
      id: 3, 
      projectName: 'Main Project',
      name: 'Sprint 3', 
      startDate: '2024-01-01', 
      endDate: '2024-01-14',
      status: 'completed',
      tasks: 22,
      progress: 100
    },
    { 
      id: 4, 
      projectName: 'Main Project',
      name: 'Sprint 4', 
      startDate: '2024-01-15', 
      endDate: '2024-01-28',
      status: 'completed',
      tasks: 20,
      progress: 100
    },
    { 
      id: 5, 
      projectName: 'Main Project',
      name: 'Sprint 5', 
      startDate: '2024-02-12', 
      endDate: '2024-02-25',
      status: 'in-progress',
      tasks: 26,
      progress: 45
    },
    
    // Mobile App (4 sprints)
    { 
      id: 6, 
      projectName: 'Mobile App',
      name: 'Sprint 1', 
      startDate: '2023-12-18', 
      endDate: '2023-12-31',
      status: 'completed',
      tasks: 16,
      progress: 100
    },
    { 
      id: 7, 
      projectName: 'Mobile App',
      name: 'Sprint 2', 
      startDate: '2024-01-01', 
      endDate: '2024-01-14',
      status: 'completed',
      tasks: 20,
      progress: 100
    },
    { 
      id: 8, 
      projectName: 'Mobile App',
      name: 'Sprint 3', 
      startDate: '2024-01-15', 
      endDate: '2024-01-28',
      status: 'completed',
      tasks: 18,
      progress: 100
    },
    { 
      id: 9, 
      projectName: 'Mobile App',
      name: 'Sprint 4', 
      startDate: '2024-02-12', 
      endDate: '2024-02-25',
      status: 'in-progress',
      tasks: 22,
      progress: 65
    },

    // Web Platform (6 sprints)
    { 
      id: 10, 
      projectName: 'Web Platform',
      name: 'Sprint 1', 
      startDate: '2023-11-20', 
      endDate: '2023-12-03',
      status: 'completed',
      tasks: 25,
      progress: 100
    },
    { 
      id: 11, 
      projectName: 'Web Platform',
      name: 'Sprint 2', 
      startDate: '2023-12-04', 
      endDate: '2023-12-17',
      status: 'completed',
      tasks: 22,
      progress: 100
    },
    { 
      id: 12, 
      projectName: 'Web Platform',
      name: 'Sprint 3', 
      startDate: '2023-12-18', 
      endDate: '2023-12-31',
      status: 'completed',
      tasks: 20,
      progress: 100
    },
    { 
      id: 13, 
      projectName: 'Web Platform',
      name: 'Sprint 4', 
      startDate: '2024-01-01', 
      endDate: '2024-01-14',
      status: 'completed',
      tasks: 23,
      progress: 100
    },
    { 
      id: 14, 
      projectName: 'Web Platform',
      name: 'Sprint 5', 
      startDate: '2024-01-15', 
      endDate: '2024-01-28',
      status: 'completed',
      tasks: 19,
      progress: 100
    },
    { 
      id: 15, 
      projectName: 'Web Platform',
      name: 'Sprint 6', 
      startDate: '2024-02-12', 
      endDate: '2024-02-25',
      status: 'in-progress',
      tasks: 24,
      progress: 40
    }
  ]);

  const handleSprintSelect = (sprint) => {
    setSelectedSprint(sprint);
    setStartDate(new Date(sprint.startDate));
    setEndDate(new Date(sprint.endDate));
    setDateAnchorEl(null);
  };

  const handleDateAnchorClose = () => {
    if (selectedRange === 'sprint' && !selectedSprint) {
      setSelectedRange('14d'); // Reset to default if no sprint was selected
      setStartDate(addDays(new Date(), -14));
      setEndDate(new Date());
    }
    setDateAnchorEl(null);
    setIsSelectingEndDate(false);
  };

  const handleRangeChange = (event, newRange) => {
    if (!newRange) return;

    setSelectedRange(newRange);
    // Always use the button group as anchor for consistent positioning
    const buttonGroup = event.currentTarget.closest('.MuiToggleButtonGroup-root');
    if (!dateAnchorEl) {
      setDateAnchorEl(buttonGroup);
    }
    
    if (newRange !== 'sprint') {
      const days = parseInt(newRange);
      setStartDate(addDays(new Date(), -days));
      setEndDate(new Date());
    }
  };

  const handleProjectBoardChange = (filters) => {
    onFilterChange?.({ type: 'projectBoard', ...filters });
  };

  const groupSprintsByProject = (sprints) => {
    const grouped = sprints.reduce((acc, sprint) => {
      if (!acc[sprint.projectName]) {
        acc[sprint.projectName] = [];
      }
      acc[sprint.projectName].push(sprint);
      return acc;
    }, {});
    
    // Convert to array and sort by project name
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  };

  return (
    <div className="top-filters">
      <div className="filters-left-group">
        <ProjectBoardFilter onFilterChange={handleProjectBoardChange} />
        <Button
          className="date-range-button"
          onClick={handleDateClick}
          variant="outlined"
          startIcon={<CalendarMonth />}
        >
          {formatDateRange()}
        </Button>
      </div>
      <div className="filters-right-group">
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Autocomplete
            freeSolo
            options={searchResults}
            filterOptions={(x) => x}
            value={inputValue}
            onChange={handleSearchSelect}
            onInputChange={handleSearchChange}
            open={isOpen}
            PopperComponent={(props) => (
              <Popper
                {...props}
                className="search-results-popper custom-scroll"
                placement="bottom-start"
              >
                <Paper className="search-results-container">
                  {showHistory ? (
                    <>
                      <div className="history-header">Recent Searches</div>
                      {searchResults.map((option, index) => (
                        <Box 
                          {...props}
                          component="li" 
                          key={`history-${option.title}`}
                          onClick={props.onClick}
                          className={`history-item ${props.className}`}
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <History className="history-icon" />
                          <span className="history-text">{option.title}</span>
                          <Box 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveHistory(option.title);
                            }}
                            sx={{ marginLeft: 'auto', cursor: 'pointer' }}
                          >
                            <ClearIcon />
                          </Box>
                        </Box>
                      ))}
                    </>
                  ) : (
                    <div className="search-results">
                      {props.children}
                    </div>
                  )}
                </Paper>
              </Popper>
            )}
            clearOnBlur={false}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClose={() => setIsOpen(false)}
            clearIcon={null}
            sx={{
              '& .MuiOutlinedInput-root': {
                padding: '0 16px',
                '& .MuiInputAdornment-root': {
                  margin: '0',
                }
              }
            }}
            getOptionLabel={(option) => {
              if (typeof option === 'string') return option;
              return option.title || '';
            }}
            renderOption={(props, option) => {
              if (option.type === 'history') {
                return (
                  <Box 
                    {...props}
                    component="li" 
                    key={`history-${option.title}`}
                    className={`history-item ${props.className || ''}`}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <History className="history-icon" />
                    <span className="history-text">{option.title}</span>
                    <Box 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveHistory(option.title);
                      }}
                      sx={{ marginLeft: 'auto', cursor: 'pointer' }}
                    >
                      <ClearIcon />
                    </Box>
                  </Box>
                );
              }
              return (
                <li 
                  {...props}
                  key={`${option.type}-${option.title}`}
                  className={`search-result-item ${props.className}`}
                >
                  <div className="result-icon">
                    <option.icon className="search-item-icon" />
                  </div>
                  <div className="result-content">
                    <div 
                      className="result-title"
                      dangerouslySetInnerHTML={{ __html: option.highlight.title }}
                    />
                    <div 
                      className="result-description"
                      dangerouslySetInnerHTML={{ __html: option.highlight.description }}
                    />
                  </div>
                  <div className={`result-type ${option.type}`}>
                    {option.type}
                  </div>
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search for initiative, sprint, epic or task…"
                onClick={handleInputClick}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    height: '40px',
                    fontSize: '13px',
                    padding: '0 14px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--background)',
                    '&:hover': {
                      borderColor: 'var(--border-hover)'
                    },
                    '&.Mui-focused': {
                      borderColor: 'var(--primary)',
                      boxShadow: 'none'
                    }
                  },
                  '& .MuiInputBase-input': {
                    padding: '0',
                    '&::placeholder': {
                      fontSize: '13px',
                      opacity: 1,
                      color: 'var(--text-secondary)'
                    }
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '20px'
                  }
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <ManageSearch />
                    </InputAdornment>
                  ),
                  endAdornment: inputValue ? (
                    <InputAdornment position="end" sx={{ marginRight: '4px' }}>
                      <IconButton 
                        size="small" 
                        onClick={handleSearchClear}
                        edge="end"
                        sx={{
                          padding: '4px',
                          '& .MuiSvgIcon-root': {
                            fontSize: '20px',
                            color: 'var(--text-secondary)'
                          }
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }}
              />
            )}
          />
        </Box>
      </div>

      <Popover
        open={Boolean(dateAnchorEl)}
        anchorEl={dateAnchorEl}
        onClose={handleDateAnchorClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disablePortal
        keepMounted
        PaperProps={{
          sx: {
            width: 'auto',
            p: 2,
            mt: 1,
            overflow: 'visible',
            '& .MuiToggleButtonGroup-root': {
              position: 'sticky',
              top: 0,
              backgroundColor: 'transparent',
              border: 'none',
              zIndex: 1,
              mb: 2,
            },
          },
        }}
      >
        <Stack spacing={0}>
          <ToggleButtonGroup
            value={selectedRange}
            exclusive
            onChange={handleRangeChange}
            aria-label="date range"
            size="small"
            sx={{
              gap: '8px',
              '.MuiToggleButton-root': {
                border: '1px solid var(--border)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                '&:hover': {
                  borderColor: 'var(--border-hover)',
                  backgroundColor: 'var(--hover-background)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'var(--primary-dark)',
                  },
                },
              },
            }}
          >
            <ToggleButton value="7d">7D</ToggleButton>
            <ToggleButton value="14d">14D</ToggleButton>
            <ToggleButton value="30d">30D</ToggleButton>
            <ToggleButton value="90d">90D</ToggleButton>
            <ToggleButton value="sprint">Sprints</ToggleButton>
          </ToggleButtonGroup>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ textAlign: 'left', color: 'var(--text-secondary)', mb: 1 }}>
              {selectedRange === 'sprint' ? 'Select sprint' : (isSelectingEndDate ? 'Select end date' : 'Select start date')}
            </Box>
            {selectedRange === 'sprint' ? (
              <Box>
                <TextField
                  size="small"
                  placeholder="Search by projects or sprints."
                  fullWidth
                  sx={{
                    pb: 2,
                    '& .MuiOutlinedInput-root': {
                      height: '40px',
                      backgroundColor: 'var(--background)',
                      borderRadius: '8px',
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'var(--border-hover)',
                        }
                      },
                      '& fieldset': {
                        borderColor: 'var(--border)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'var(--primary) !important',
                        borderWidth: '1px',
                      }
                    }
                  }}
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    const filtered = sprints.filter(sprint => 
                      sprint.name.toLowerCase().includes(searchTerm) ||
                      sprint.projectName.toLowerCase().includes(searchTerm)
                    );
                    setFilteredSprints(filtered);
                  }}
                />
                <Stack 
                  spacing={2} 
                  sx={{ 
                    maxHeight: 400, 
                    overflowY: 'auto',
                    pr: 1
                  }}
                  className="custom-scroll"
                >
                  {groupSprintsByProject(filteredSprints || sprints).map(([projectName, projectSprints]) => (
                    <Box key={projectName}>
                      <Typography
                        sx={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          px: 1.5,
                          mb: 1,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {projectName}
                      </Typography>
                      <Stack spacing={1}>
                        {projectSprints.map((sprint) => (
                          <Box
                            key={sprint.id}
                            onClick={() => handleSprintSelect(sprint)}
                            sx={{
                              p: '12px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              color: sprint.id === selectedSprint?.id ? '#6C5CE7' : 'var(--text-primary)',
                              backgroundColor: sprint.id === selectedSprint?.id ? 'rgba(108, 92, 231, 0.08)' : 'transparent',
                              '&:hover': {
                                backgroundColor: sprint.id === selectedSprint?.id 
                                  ? 'rgba(108, 92, 231, 0.08)' 
                                  : 'rgba(108, 92, 231, 0.04)',
                              },
                              '[data-theme="dark"] &': {
                                color: sprint.id === selectedSprint?.id ? '#818CF8' : 'var(--text-primary)',
                                backgroundColor: sprint.id === selectedSprint?.id ? 'rgba(129, 140, 248, 0.16)' : 'transparent',
                                '&:hover': {
                                  backgroundColor: sprint.id === selectedSprint?.id 
                                    ? 'rgba(129, 140, 248, 0.16)' 
                                    : 'rgba(129, 140, 248, 0.08)',
                                }
                              }
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography 
                                sx={{ 
                                  fontSize: '14px',
                                  fontWeight: sprint.id === selectedSprint?.id ? 500 : 400
                                }}
                              >
                                {sprint.name}
                              </Typography>
                              <Chip 
                                label={sprint.status} 
                                size="small"
                                sx={{ 
                                  height: '20px',
                                  fontSize: '12px',
                                  backgroundColor: sprint.status === 'completed' ? 'rgba(34, 197, 94, 0.12)' : 
                                              sprint.status === 'in-progress' ? 'rgba(108, 92, 231, 0.12)' : 
                                              'rgba(100, 116, 139, 0.12)',
                                  color: sprint.status === 'completed' ? 'rgb(34, 197, 94)' : 
                                      sprint.status === 'in-progress' ? '#6C5CE7' : 
                                      'rgb(100, 116, 139)',
                                  textTransform: 'capitalize',
                                  border: '1px solid',
                                  borderColor: sprint.status === 'completed' ? 'rgba(34, 197, 94, 0.24)' : 
                                           sprint.status === 'in-progress' ? 'rgba(108, 92, 231, 0.24)' : 
                                           'rgba(100, 116, 139, 0.24)',
                                  '[data-theme="dark"] &': {
                                    backgroundColor: sprint.status === 'completed' ? 'rgba(34, 197, 94, 0.16)' : 
                                                sprint.status === 'in-progress' ? 'rgba(129, 140, 248, 0.16)' : 
                                                'rgba(148, 163, 184, 0.16)',
                                    color: sprint.status === 'completed' ? 'rgb(34, 197, 94)' : 
                                        sprint.status === 'in-progress' ? '#818CF8' : 
                                        'rgb(148, 163, 184)',
                                    borderColor: sprint.status === 'completed' ? 'rgba(34, 197, 94, 0.32)' : 
                                             sprint.status === 'in-progress' ? 'rgba(129, 140, 248, 0.32)' : 
                                             'rgba(148, 163, 184, 0.32)'
                                  }
                                }}
                              />
                            </Box>
                            <Typography 
                              sx={{ 
                                fontSize: '12px',
                                color: 'var(--text-secondary)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: sprint.status !== 'planned' ? 1 : 0
                              }}
                            >
                              <span>{format(new Date(sprint.startDate), 'MMM d')} - {format(new Date(sprint.endDate), 'MMM d')}</span>
                              <span>{sprint.tasks} tasks</span>
                            </Typography>
                            {sprint.status !== 'planned' && (
                              <LinearProgress 
                                variant="determinate" 
                                value={sprint.progress}
                                sx={{ 
                                  height: 2,
                                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                  borderRadius: '1px',
                                  '[data-theme="dark"] &': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)'
                                  },
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: sprint.status === 'completed' ? 'rgb(34, 197, 94)' : '#6C5CE7',
                                    transition: 'transform 0.3s ease',
                                    '[data-theme="dark"] &': {
                                      backgroundColor: sprint.status === 'completed' ? 'rgb(34, 197, 94)' : '#818CF8'
                                    }
                                  }
                                }}
                              />
                            )}
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Box>
            ) : (
              <DateCalendar
                value={isSelectingEndDate ? endDate : startDate}
                onChange={(newValue) => {
                  if (isSelectingEndDate) {
                    setEndDate(newValue);
                    setDateAnchorEl(null);
                  } else {
                    setStartDate(newValue);
                    setIsSelectingEndDate(true);
                  }
                }}
              />
            )}
          </LocalizationProvider>
        </Stack>
      </Popover>

      <Box className="action-buttons">
        <Tooltip title="Save View">
          <Button
            variant="outlined"
            startIcon={<BookmarkBorderIcon />}
            className="save-view-button"
          >
            Save View
          </Button>
        </Tooltip>

        <Tooltip title="Add New">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className="add-new-button"
          >
            Add New
          </Button>
        </Tooltip>
      </Box>
    </div>
  );
};

export default TopFilters;

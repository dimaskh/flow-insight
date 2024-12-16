import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  IconButton, 
  Typography,
  InputAdornment,
  Chip,
  Button,
  Tooltip
} from '@mui/material';
import { 
  Close,
  KeyboardArrowDown,
  HelpOutline,
  Dashboard,
  FilterList,
  InsertChart,
  Support,
  Search,
  TipsAndUpdates,
  School,
  Bookmark,
  VideoLibrary,
  QuestionAnswer,
  NewReleases
} from '@mui/icons-material';
import './HelpPanel.css';

const HELP_SECTIONS = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Dashboard,
    content: [
      {
        type: 'text',
        content: 'Welcome to the Process Analysis dashboard. This tool helps you analyze and visualize your process metrics effectively.'
      },
      {
        type: 'video',
        title: 'Quick Start Guide',
        duration: '2:15',
        url: '#'
      },
      {
        type: 'steps',
        title: 'Basic Setup',
        steps: [
          'Navigate to your workspace',
          'Select date range for analysis',
          'Choose relevant metrics',
          'Apply filters as needed'
        ]
      }
    ]
  },
  {
    id: 'video-tutorials',
    title: 'Video Tutorials',
    icon: VideoLibrary,
    content: [
      {
        type: 'text',
        content: 'Learn how to use the Process Analysis dashboard with our comprehensive video tutorials.'
      },
      {
        type: 'video',
        title: 'Dashboard Overview',
        duration: '3:45',
        url: '#',
        description: 'Get familiar with the main dashboard features and layout'
      },
      {
        type: 'video',
        title: 'Working with KPIs',
        duration: '4:20',
        url: '#',
        description: 'Learn how to analyze and interpret key performance indicators'
      },
      {
        type: 'video',
        title: 'Advanced Filtering',
        duration: '5:10',
        url: '#',
        description: 'Master the filtering system to get precise insights'
      },
      {
        type: 'video',
        title: 'Custom Reports',
        duration: '6:30',
        url: '#',
        description: 'Create and save custom reports for your needs'
      },
      {
        type: 'video',
        title: 'Data Export Guide',
        duration: '2:45',
        url: '#',
        description: 'Export your analysis results in various formats'
      },
      {
        type: 'tip',
        content: 'Pro Tip: You can save videos for offline viewing by clicking the bookmark icon'
      }
    ]
  },
  {
    id: 'kpis',
    title: 'KPIs Overview',
    icon: InsertChart,
    content: [
      {
        type: 'text',
        content: 'The KPIs section shows key performance indicators:'
      },
      {
        type: 'list',
        items: [
          {
            title: 'Process Efficiency',
            description: 'Measures the overall efficiency of your processes',
            tip: 'Aim for >95% efficiency'
          },
          {
            title: 'Resource Utilization',
            description: 'Tracks how effectively resources are being used',
            tip: 'Optimal range: 75-85%'
          },
          {
            title: 'Quality Metrics',
            description: 'Monitors the quality of process outputs',
            tip: 'Target: <1% defect rate'
          },
          {
            title: 'Time Performance',
            description: 'Analyzes process completion times',
            tip: 'Compare with industry benchmarks'
          }
        ]
      }
    ]
  },
  {
    id: 'filters',
    title: 'Using Filters',
    icon: FilterList,
    content: [
      {
        type: 'text',
        content: 'Customize your view using the following filters:'
      },
      {
        type: 'list',
        items: [
          {
            title: 'Date Range',
            description: 'Select specific time periods for analysis'
          },
          {
            title: 'Process Types',
            description: 'Filter by different process categories'
          },
          {
            title: 'Metrics Selection',
            description: 'Choose which metrics to display'
          },
          {
            title: 'Comparison Mode',
            description: 'Compare data across different periods'
          }
        ]
      },
      {
        type: 'tip',
        content: 'Pro Tip: Save your frequently used filter combinations for quick access'
      }
    ]
  },
  {
    id: 'faq',
    title: 'FAQ',
    icon: QuestionAnswer,
    content: [
      {
        type: 'faq',
        items: [
          {
            question: 'How often is data updated?',
            answer: 'Data is refreshed every 5 minutes automatically.'
          },
          {
            question: 'Can I export reports?',
            answer: 'Yes, use the export button in the top right of any chart.'
          },
          {
            question: 'How do I share dashboards?',
            answer: 'Click the share icon and enter email addresses to collaborate.'
          }
        ]
      }
    ]
  },
  {
    id: 'whats-new',
    title: "What's New",
    icon: NewReleases,
    content: [
      {
        type: 'updates',
        items: [
          {
            version: '2.1.0',
            date: '2024-01-15',
            changes: [
              'New comparison view',
              'Enhanced filter options',
              'Performance improvements'
            ]
          }
        ]
      }
    ]
  }
];

const HelpSection = ({ section, searchTerm }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const renderContent = (content) => {
    switch (content.type) {
      case 'text':
        return <p>{content.content}</p>;
      
      case 'video':
        return (
          <div className="help-video-item">
            <VideoLibrary fontSize="small" />
            <div className="help-video-info">
              <span className="help-video-title">{content.title}</span>
              <span className="help-video-duration">{content.duration}</span>
              {content.description && (
                <span className="help-video-description">{content.description}</span>
              )}
            </div>
            <Button size="small" variant="outlined">
              Watch
            </Button>
          </div>
        );
      
      case 'steps':
        return (
          <div className="help-steps">
            <div className="help-list-title">{content.title}</div>
            <div className="help-list">
              {content.steps.map((step, idx) => (
                <div key={idx} className="help-list-item">
                  <div className="help-list-description">
                    <span className="help-step-number">{idx + 1}.</span> {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'list':
        return (
          <ul className="help-list">
            {content.items.map((item, idx) => (
              <li key={idx} className="help-list-item">
                <div className="help-list-title">{item.title}</div>
                <div className="help-list-description">{item.description}</div>
                {item.tip && (
                  <Tooltip title={item.tip}>
                    <Chip
                      icon={<TipsAndUpdates fontSize="small" />}
                      label="Tip"
                      size="small"
                      className="help-tip-chip"
                    />
                  </Tooltip>
                )}
              </li>
            ))}
          </ul>
        );
      
      case 'tip':
        return (
          <div className="help-tip">
            <TipsAndUpdates fontSize="small" />
            {content.content}
          </div>
        );

      case 'faq':
        return (
          <div className="help-faq">
            {content.items.map((item, idx) => (
              <div key={idx} className="help-faq-item">
                <div className="help-faq-question">{item.question}</div>
                <div className="help-faq-answer">{item.answer}</div>
              </div>
            ))}
          </div>
        );
      
      case 'updates':
        return (
          <div className="help-updates">
            {content.items.map((update, idx) => (
              <div key={idx} className="help-update-item">
                <div className="help-update-header">
                  <span className="help-update-version">v{update.version}</span>
                  <span className="help-update-date">{update.date}</span>
                </div>
                <ul>
                  {update.changes.map((change, changeIdx) => (
                    <li key={changeIdx}>{change}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  const shouldShow = !searchTerm || 
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.some(content => 
      content.type === 'text' && content.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (!shouldShow) return null;

  return (
    <div className={`help-section ${isExpanded ? 'expanded' : ''}`}>
      <div className="help-section-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="help-section-title">
          <section.icon fontSize="small" />
          {section.title}
        </div>
        <KeyboardArrowDown 
          className="expand-icon" 
          style={{ 
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }} 
        />
      </div>
      <div className="help-section-content">
        <div className="help-section-inner">
          {section.content.map((content, idx) => (
            <div key={idx} className="help-content-item">
              {renderContent(content)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="help-contact-form">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>
        <div className="form-field">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>
        <div className="form-field">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
          />
        </div>
        <div className="form-field">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help you?"
            required
            rows={4}
          />
        </div>
        <div className="form-actions">
          <Button
            className="cancel-button save-view-button"
            onClick={onCancel}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            className="submit-button"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

const HelpPanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const tabsRef = useRef(null);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filterSections = useCallback(() => {
    if (activeTab === 'all') {
      return HELP_SECTIONS;
    }

    const tabMapping = {
      'tutorials': ['getting-started', 'video-tutorials'],
      'guides': ['kpis', 'filters'],
      'faq': ['faq'],
      'updates': ['whats-new']
    };

    return HELP_SECTIONS.filter(section => 
      tabMapping[activeTab]?.includes(section.id)
    );
  }, [activeTab]);

  useEffect(() => {
    const updatePanelWidth = () => {
      if (tabsRef.current) {
        // Calculate total width of all chips including gaps
        const chips = Array.from(tabsRef.current.children);
        const totalChipsWidth = chips.reduce((width, chip, index) => {
          const chipWidth = chip.getBoundingClientRect().width;
          // Add 8px gap between chips (not after the last one)
          const gapWidth = index < chips.length - 1 ? 8 : 0;
          return width + chipWidth + gapWidth;
        }, 0);

        // Add side padding (16px each side)
        const minWidth = 440;
        const newWidth = Math.max(minWidth, totalChipsWidth + 32);
        document.documentElement.style.setProperty('--help-panel-width', `${newWidth}px`);
      }
    };

    // Run on mount and after any render that might affect chip sizes
    setTimeout(updatePanelWidth, 0);
    
    // Update on resize
    window.addEventListener('resize', updatePanelWidth);
    return () => window.removeEventListener('resize', updatePanelWidth);
  }, []);

  return (
    <>
      <div className="help-panel-overlay" onClick={onClose} />
      <div className="help-panel">
        <div className="help-panel-header">
          <Typography variant="h6">
            <HelpOutline fontSize="small" />
            {showContactForm ? 'Contact Support' : 'Help Center'}
          </Typography>
          <IconButton onClick={onClose} size="small" className="close-button">
            <Close fontSize="small" />
          </IconButton>
        </div>

        {showContactForm ? (
          <ContactForm onCancel={() => setShowContactForm(false)} />
        ) : (
          <>
            <div className="help-search">
              <div className="help-search-input-wrapper">
                <Search className="help-search-icon" />
                <input
                  type="text"
                  placeholder="Search help articles..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="help-search-input"
                />
              </div>
            </div>

            <div className="help-quick-actions" ref={tabsRef}>
              <Chip
                icon={<School fontSize="small" />}
                label="All"
                onClick={() => setActiveTab('all')}
                variant={activeTab === 'all' ? 'filled' : 'outlined'}
                color={activeTab === 'all' ? 'primary' : 'default'}
                className="help-action-chip"
              />
              <Chip
                icon={<VideoLibrary fontSize="small" />}
                label="Tutorials"
                onClick={() => setActiveTab('tutorials')}
                variant={activeTab === 'tutorials' ? 'filled' : 'outlined'}
                color={activeTab === 'tutorials' ? 'primary' : 'default'}
                className="help-action-chip"
              />
              <Chip
                icon={<Bookmark fontSize="small" />}
                label="Guides"
                onClick={() => setActiveTab('guides')}
                variant={activeTab === 'guides' ? 'filled' : 'outlined'}
                color={activeTab === 'guides' ? 'primary' : 'default'}
                className="help-action-chip"
              />
              <Chip
                icon={<QuestionAnswer fontSize="small" />}
                label="FAQ"
                onClick={() => setActiveTab('faq')}
                variant={activeTab === 'faq' ? 'filled' : 'outlined'}
                color={activeTab === 'faq' ? 'primary' : 'default'}
                className="help-action-chip"
              />
              <Chip
                icon={<NewReleases fontSize="small" />}
                label="Updates"
                onClick={() => setActiveTab('updates')}
                variant={activeTab === 'updates' ? 'filled' : 'outlined'}
                color={activeTab === 'updates' ? 'primary' : 'default'}
                className="help-action-chip"
              />
            </div>

            <div className="help-panel-content">
              {filterSections().map((section) => (
                <HelpSection
                  key={section.id}
                  section={section}
                  searchTerm={searchTerm}
                />
              ))}
            </div>

            <div className="help-panel-footer">
              <Button
                variant="outlined"
                startIcon={<Support />}
                onClick={() => setShowContactForm(true)}
                fullWidth
              >
                Contact Support
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HelpPanel;

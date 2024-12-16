import {
  Flag,
  DirectionsRun,
  Bookmark,
  CheckCircle
} from '@mui/icons-material';

export const mockSearchData = [
  // Initiatives
  {
    id: 'init-1',
    type: 'initiative',
    title: 'Digital Transformation 2024',
    description: 'Company-wide digital transformation initiative',
    status: 'In Progress',
    icon: Flag
  },
  {
    id: 'init-2',
    type: 'initiative',
    title: 'Customer Experience Enhancement',
    description: 'Improving overall customer satisfaction',
    status: 'Active',
    icon: Flag
  },

  // Sprints
  {
    id: 'sprint-1',
    type: 'sprint',
    title: 'Sprint 23.4',
    description: 'Oct 15 - Oct 29',
    status: 'In Progress',
    icon: DirectionsRun
  },
  {
    id: 'sprint-2',
    type: 'sprint',
    title: 'Sprint 23.3',
    description: 'Oct 1 - Oct 14',
    status: 'Completed',
    icon: DirectionsRun
  },

  // Epics
  {
    id: 'epic-1',
    type: 'epic',
    title: 'Authentication System Upgrade',
    description: 'Implementing SSO and 2FA',
    status: 'In Progress',
    icon: Bookmark
  },
  {
    id: 'epic-2',
    type: 'epic',
    title: 'Performance Optimization',
    description: 'Improving application response time',
    status: 'Planned',
    icon: Bookmark
  },

  // Tasks
  {
    id: 'task-1',
    type: 'task',
    title: 'Implement OAuth2 Flow',
    description: 'Part of Authentication System Upgrade',
    status: 'In Progress',
    epic: 'Authentication System Upgrade',
    icon: CheckCircle
  },
  {
    id: 'task-2',
    type: 'task',
    title: 'Database Query Optimization',
    description: 'Part of Performance Optimization',
    status: 'To Do',
    epic: 'Performance Optimization',
    icon: CheckCircle
  }
];

export const getFilteredResults = (searchQuery) => {
  const query = searchQuery.toLowerCase();
  return mockSearchData.filter(item => 
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  ).map(item => ({
    ...item,
    highlight: {
      title: highlightMatch(item.title, query),
      description: highlightMatch(item.description, query)
    }
  }));
};

const highlightMatch = (text, query) => {
  if (!query) return text;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() ? 
    `<mark>${part}</mark>` : 
    part
  ).join('');
};

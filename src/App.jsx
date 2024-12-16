import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import TopFilters from './components/TopFilters/TopFilters';
import KPISection from './components/KPISection/KPISection';
import MainChart from './components/MainChart/MainChart';
import DataManagement from './components/DataManagement/DataManagement';
import AddWorkflow from './components/DataManagement/AddWorkflow';
import './App.css';

const data = [
  { date: '2024 Oct 1', leadTime: 70, reactionTime: 90, cycleTime: 95, reviewTime: 65 },
  { date: '2024 Oct 7', leadTime: 95, reactionTime: 22, cycleTime: 78, reviewTime: 28 },
  { date: '2024 Oct 14', leadTime: 48, reactionTime: 91, cycleTime: 88, reviewTime: 18 },
  { date: '2024 Oct 21', leadTime: 73, reactionTime: 85, cycleTime: 20, reviewTime: 80 },
  { date: '2024 Oct 28', leadTime: 95, reactionTime: 25, cycleTime: 15, reviewTime: 15 },
  { date: '2024 Nov 5', leadTime: 85, reactionTime: 85, cycleTime: 55, reviewTime: 45 },
];

const metricData = [
  {
    title: 'Average Lead Time',
    value: '3.2',
    unit: 'Days',
    change: { value: '12%', isPositive: true },
    subtitle: 'from last month',
    trendData: data.map(d => ({ value: d.leadTime })),
    color: '#6C5CE7'
  },
  {
    title: 'Average Reaction Time',
    value: '45',
    unit: 'mins',
    change: { value: '8%', isPositive: false },
    subtitle: 'from last month',
    trendData: data.map(d => ({ value: d.reactionTime })),
    color: '#FF7675'
  },
  {
    title: 'Average Cycle Time',
    value: '2.8',
    unit: 'Days',
    change: { value: '5%', isPositive: true },
    subtitle: 'from last month',
    trendData: data.map(d => ({ value: d.cycleTime })),
    color: '#00B894'
  },
  {
    title: 'Review Time',
    value: '4.5',
    unit: 'hrs',
    change: { value: '15%', isPositive: false },
    subtitle: 'from last month',
    trendData: data.map(d => ({ value: d.reviewTime })),
    color: '#FFA502'
  }
];

// Lazy load DataManagement component
const DataManagementLazy = lazy(() => import('./components/DataManagement/DataManagement'));

// Loading component
const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="loading-spinner"></div>
  </div>
);

const AppContent = () => {
  const [chartType, setChartType] = useState('line');
  const [filters, setFilters] = useState({
    leadTime: true,
    reactionTime: true,
    cycleTime: true,
    reviewTime: true
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Remove initial no-transition class
    document.body.classList.remove('no-transition');
  }, []);

  const toggleTheme = () => {
    // Add no-transition class
    document.body.classList.add('no-transition');
    
    setIsDarkMode(prev => {
      const newTheme = !prev ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      document.documentElement.style.colorScheme = newTheme;
      localStorage.setItem('theme', newTheme);
      return !prev;
    });

    // Remove no-transition class after a short delay
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.remove('no-transition');
      });
    });
  };

  const handleSidebarCollapse = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const currentView = location.pathname === '/' ? 'dashboard' : location.pathname.slice(1);

  return (
    <div className="app">
      <Sidebar onCollapse={handleSidebarCollapse} currentView={currentView} />
      <div className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header 
          onThemeToggle={toggleTheme} 
          isDarkMode={isDarkMode}
          onViewChange={(view) => navigate(view === 'dashboard' ? '/' : `/${view}`)}
          currentView={currentView}
        />
        <div className="page-content">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={
                <>
                  <TopFilters />
                  <div className="sections-container">
                    <KPISection metricData={metricData} />
                    <MainChart
                      data={data}
                      type={chartType}
                      filters={filters}
                      onTypeChange={setChartType}
                    />
                  </div>
                </>
              } />
              <Route path="/data-management" element={
                <DataManagementLazy onBack={() => navigate('/')} />
              } />
              <Route path="/data-management/add-workflow" element={
                <AddWorkflow 
                  isDarkMode={isDarkMode}
                  onThemeToggle={toggleTheme}
                />
              } />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

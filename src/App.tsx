import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/DashboardNew';
import { WeeklyOverview } from './pages/WeeklyOverview';
import { MonthlyCalendar } from './pages/MonthlyCalendar';
import { HabitManagement } from './pages/HabitManagement';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { Settings } from './pages/Settings';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ThemeProvider } from './hooks/useTheme';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={() => setCurrentPage('dashboard')} />;
      case 'weekly':
        return <WeeklyOverview />;
      case 'monthly':
        return <MonthlyCalendar />;
      case 'manage':
        return <HabitManagement />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'settings':
        return <Settings />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div style={{
        paddingTop: currentPage === 'landing' ? '0' : '80px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        <main style={{ flex: 1 }}>
          {renderPage()}
        </main>
        {currentPage !== 'landing' && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;

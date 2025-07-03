import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import KanbanBoard from '../components/KanbanBoard';
import Analytics from '../components/Analytics';
import GanttChart from '../components/GannChart';
import TeamView from '../components/TeamView';
import Profile from './Profile';
import './Dashboard.css';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('kanban');
  const { user, logout } = useAuth();
  const handleLogout = () => {
  logout();
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'kanban':
        return <KanbanBoard />;
      case 'analytics':
        return <Analytics />;
      case 'gantt':
        return <GanttChart />;
      case 'team':
        return <TeamView />;
      case 'profile':
        return <Profile />;
      default:
        return <KanbanBoard />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        user={user}
        onLogout={handleLogout}
      />
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome back, {user?.email || 'User'}!</h1>
        </header>
        {renderActiveView()}
      </main>
    </div>
  );
};

export default Dashboard;
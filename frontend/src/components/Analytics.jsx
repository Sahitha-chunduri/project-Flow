import { BarChart3, TrendingUp, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import './Analytics.css';

const Analytics = () => {
  const stats = [
    {
      title: 'Total Tasks',
      value: '48',
      change: '+12%',
      trend: 'up',
      icon: CheckCircle,
      color: '#10b981'
    },
    {
      title: 'Completed',
      value: '32',
      change: '+8%',
      trend: 'up',
      icon: CheckCircle,
      color: '#059669'
    },
    {
      title: 'In Progress',
      value: '12',
      change: '+3%',
      trend: 'up',
      icon: Clock,
      color: '#f59e0b'
    },
    {
      title: 'Overdue',
      value: '4',
      change: '-2%',
      trend: 'down',
      icon: AlertCircle,
      color: '#ef4444'
    }
  ];

  const projectData = [
    { name: 'Website Redesign', completed: 75, total: 100, team: 5 },
    { name: 'Mobile App', completed: 45, total: 80, team: 8 },
    { name: 'API Development', completed: 90, total: 120, team: 3 },
    { name: 'User Testing', completed: 30, total: 50, team: 4 }
  ];

  const teamPerformance = [
    { name: 'John Doe', tasks: 15, completed: 12, efficiency: 80 },
    { name: 'Jane Smith', tasks: 18, completed: 16, efficiency: 89 },
    { name: 'Mike Johnson', tasks: 12, completed: 10, efficiency: 83 },
    { name: 'Sarah Wilson', tasks: 14, completed: 13, efficiency: 93 }
  ];

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h2 className="analytics-title">Project Analytics</h2>
        <div className="date-range">
          <select className="date-select">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-content">
                <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                  <Icon size={24} />
                </div>
                <div className="stat-info">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-title">{stat.title}</p>
                  <div className={`stat-change ${stat.trend}`}>
                    <TrendingUp size={14} />
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title">Project Progress</h3>
          <div className="project-list">
            {projectData.map((project, index) => (
              <div key={index} className="project-item">
                <div className="project-info">
                  <h4 className="project-name">{project.name}</h4>
                  <div className="project-meta">
                    <span>{project.completed}/{project.total} tasks</span>
                    <div className="team-size">
                      <Users size={14} />
                      <span>{project.team}</span>
                    </div>
                  </div>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(project.completed / project.total) * 100}%` }}
                  ></div>
                </div>
                <div className="progress-percentage">
                  {Math.round((project.completed / project.total) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Team Performance</h3>
          <div className="team-list">
            {teamPerformance.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-info">
                  <div className="member-avatar">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="member-details">
                    <h4 className="member-name">{member.name}</h4>
                    <p className="member-tasks">{member.completed}/{member.tasks} tasks completed</p>
                  </div>
                </div>
                <div className="efficiency-score">
                  <div className="score-circle" style={{ '--percentage': `${member.efficiency}%` }}>
                    <span>{member.efficiency}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="activity-feed">
        <h3 className="feed-title">Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon completed">
              <CheckCircle size={16} />
            </div>
            <div className="activity-content">
              <p><strong>John Doe</strong> completed "Design Homepage Layout"</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon progress">
              <Clock size={16} />
            </div>
            <div className="activity-content">
              <p><strong>Jane Smith</strong> started working on "Database Schema"</p>
              <span className="activity-time">4 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon commented">
              <BarChart3 size={16} />
            </div>
            <div className="activity-content">
              <p><strong>Mike Johnson</strong> added a comment to "User Authentication"</p>
              <span className="activity-time">6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
import { BarChart3, Calendar, Kanban, Users } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'kanban', label: 'Kanban Board', icon: Kanban },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'gantt', label: 'Gantt Chart', icon: Calendar },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'profile', label: 'Profile', icon: Users },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">ProjectFlow</h1>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeView === item.id ? 'active' : ''}`}
              onClick={() => setActiveView(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;


// import { BarChart3, Calendar, Kanban, Users, User } from 'lucide-react';
// import './Sidebar.css';

// interface SidebarProps {
//   activeView: string;
//   setActiveView: (view: string) => void;
// }

// const Sidebar = ({ activeView, setActiveView }: SidebarProps) => {
//   const menuItems = [
//     { id: 'kanban', label: 'Kanban Board', icon: Kanban },
//     { id: 'analytics', label: 'Analytics', icon: BarChart3 },
//     { id: 'gantt', label: 'Gantt Chart', icon: Calendar },
//     { id: 'team', label: 'Team', icon: Users },
//     { id: 'profile', label: 'Profile', icon: User },
//   ];

//   return (
//     <aside className="sidebar">
//       <div className="sidebar-header">
//         <h1 className="sidebar-title">ProjectFlow</h1>
//       </div>
//       <nav className="sidebar-nav">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           return (
//             <button
//               key={item.id}
//               className={`nav-item ${activeView === item.id ? 'active' : ''}`}
//               onClick={() => setActiveView(item.id)}
//             >
//               <Icon size={20} />
//               <span>{item.label}</span>
//             </button>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

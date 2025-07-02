import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import TaskModal from './TaskModal';
import './GanttChart.css';

const GanttChart = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  
  const [tasks, setTasks] = useState([
    {
      id: '1',
      name: 'Project Planning',
      startDate: '2024-06-01',
      endDate: '2024-06-07',
      progress: 100,
      assignee: 'John Doe',
      dependencies: []
    },
    {
      id: '2',
      name: 'Design Phase',
      startDate: '2024-06-05',
      endDate: '2024-06-15',
      progress: 75,
      assignee: 'Jane Smith',
      dependencies: ['1']
    },
    {
      id: '3',
      name: 'Frontend Development',
      startDate: '2024-06-12',
      endDate: '2024-06-25',
      progress: 45,
      assignee: 'Mike Johnson',
      dependencies: ['2']
    },
    {
      id: '4',
      name: 'Backend Development',
      startDate: '2024-06-10',
      endDate: '2024-06-28',
      progress: 60,
      assignee: 'Sarah Wilson',
      dependencies: ['1']
    },
    {
      id: '5',
      name: 'Testing & QA',
      startDate: '2024-06-20',
      endDate: '2024-06-30',
      progress: 20,
      assignee: 'Alex Brown',
      dependencies: ['3', '4']
    },
    {
      id: '6',
      name: 'Deployment',
      startDate: '2024-06-28',
      endDate: '2024-07-02',
      progress: 0,
      assignee: 'John Doe',
      dependencies: ['5']
    }
  ]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getTaskPosition = (task) => {
    const startDate = new Date(task.startDate);
    const endDate = new Date(task.endDate);
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    const totalDays = getDaysInMonth(currentMonth);
    const startDay = Math.max(1, startDate.getDate());
    const endDay = Math.min(totalDays, endDate.getDate());
    const duration = endDay - startDay + 1;

    return {
      left: ((startDay - 1) / totalDays) * 100,
      width: (duration / totalDays) * 100
    };
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newMonth;
    });
  };

  const formatMonth = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const renderDateHeaders = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div key={i} className="date-header">
          {i}
        </div>
      );
    }

    return days;
  };

  const handleAddTask = (newTaskData) => {
    const newTask = {
      id: Date.now().toString(),
      name: newTaskData.title, 
      startDate: newTaskData.dueDate || new Date().toISOString().split('T')[0],
      endDate: newTaskData.dueDate || new Date().toISOString().split('T')[0],
      progress: 0,
      assignee: newTaskData.assignee || 'Unassigned',
      dependencies: []
    };
    
    setTasks([...tasks, newTask]);
    setIsAddTaskModalOpen(false); 
  };

  const handleCloseModal = () => {
    setIsAddTaskModalOpen(false);
  };

  const handleAddTaskButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddTaskModalOpen(true);
  };

  return (
    <div className="gantt-chart">
      <div className="gantt-header">
        <h2 className="gantt-title">Project Timeline</h2>
        <div className="gantt-controls">
          <div className="month-navigation">
            <button onClick={() => navigateMonth('prev')} className="nav-btn">
              <ChevronLeft size={20} />
            </button>
            <span className="current-month">{formatMonth(currentMonth)}</span>
            <button onClick={() => navigateMonth('next')} className="nav-btn">
              <ChevronRight size={20} />
            </button>
          </div>
          <button 
            className="add-task-btn"
            onClick={handleAddTaskButtonClick}
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>
      </div>

      <div className="gantt-container">
        <div className="gantt-sidebar">
          <div className="sidebar-header">
            <div className="task-column">Task</div>
            <div className="assignee-column">Assignee</div>
            <div className="progress-column">Progress</div>
          </div>
          <div className="tasks-sidebar">
            {tasks.map((task) => (
              <div key={task.id} className="task-row-sidebar">
                <div className="task-name">{task.name}</div>
                <div className="task-assignee">
                  <div className="assignee-avatar">
                    {task.assignee.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span>{task.assignee}</span>
                </div>
                <div className="task-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <span>{task.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gantt-timeline">
          <div className="timeline-header">
            {renderDateHeaders()}
          </div>
          <div className="timeline-body">
            {tasks.map((task) => {
              const position = getTaskPosition(task);
              return (
                <div key={task.id} className="task-row-timeline">
                  <div 
                    className="task-bar"
                    style={{
                      left: `${position.left}%`,
                      width: `${position.width}%`
                    }}
                  >
                    <div 
                      className="task-progress-bar"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                    <span className="task-bar-label">{task.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="gantt-legend">
        <div className="legend-item">
          <div className="legend-color completed"></div>
          <span>Completed</span>
        </div>
        <div className="legend-item">
          <div className="legend-color in-progress"></div>
          <span>In Progress</span>
        </div>
        <div className="legend-item">
          <div className="legend-color not-started"></div>
          <span>Not Started</span>
        </div>
      </div>

      {isAddTaskModalOpen && (
        <TaskModal
          task={null} 
          onClose={handleCloseModal}
          onSave={handleAddTask}
        />
      )}
    </div>
  );
};

export default GanttChart;
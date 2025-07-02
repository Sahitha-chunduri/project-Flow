import { useState } from 'react';
import { Plus, MoreHorizontal, User, Calendar, MessageCircle } from 'lucide-react';
import TaskModal from './TaskModal';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: '1',
          title: 'Design Homepage Layout',
          description: 'Create wireframes and mockups for the new homepage',
          assignee: 'John Doe',
          priority: 'high',
          dueDate: '2024-06-10',
          comments: 3,
          labels: ['Design', 'Frontend']
        },
        {
          id: '2',
          title: 'Set up Database Schema',
          description: 'Design and implement the database structure',
          assignee: 'Jane Smith',
          priority: 'medium',
          dueDate: '2024-06-12',
          comments: 1,
          labels: ['Backend', 'Database']
        }
      ]
    },
    {
      id: 'progress',
      title: 'In Progress',
      tasks: [
        {
          id: '3',
          title: 'User Authentication',
          description: 'Implement login and registration functionality',
          assignee: 'Mike Johnson',
          priority: 'high',
          dueDate: '2024-06-08',
          comments: 5,
          labels: ['Backend', 'Security']
        }
      ]
    },
    {
      id: 'review',
      title: 'Review',
      tasks: [
        {
          id: '4',
          title: 'API Documentation',
          description: 'Document all API endpoints and responses',
          assignee: 'Sarah Wilson',
          priority: 'low',
          dueDate: '2024-06-15',
          comments: 2,
          labels: ['Documentation']
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: '5',
          title: 'Project Setup',
          description: 'Initialize project repository and development environment',
          assignee: 'John Doe',
          priority: 'medium',
          dueDate: '2024-06-01',
          comments: 0,
          labels: ['Setup']
        }
      ]
    }
  ]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="kanban-board">
      <div className="board-header">
        <h2 className="board-title">Project Management Board</h2>
        <button className="add-task-btn" onClick={handleAddTask}>
          <Plus size={20} />
          Add Task
        </button>
      </div>

      <div className="columns-container">
        {columns.map((column) => (
          <div key={column.id} className="column">
            <div className="column-header">
              <h3 className="column-title">{column.title}</h3>
              <span className="task-count">{column.tasks.length}</span>
            </div>

            <div className="tasks-list">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className="task-card"
                  onClick={() => handleTaskClick(task)}
                >
                  <div className="task-header">
                    <h4 className="task-title">{task.title}</h4>
                    <button className="task-menu">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>

                  <p className="task-description">{task.description}</p>

                  <div className="task-labels">
                    {task.labels.map((label, index) => (
                      <span key={index} className="task-label">
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="task-footer">
                    <div className="task-meta">
                      <div className="assignee">
                        <User size={14} />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="due-date">
                        <Calendar size={14} />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>

                    <div className="task-actions">
                      <div className="comments">
                        <MessageCircle size={14} />
                        <span>{task.comments}</span>
                      </div>
                      <div
                        className="priority-indicator"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="add-task-column" onClick={handleAddTask}>
              <Plus size={16} />
              Add a task
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          onClose={() => setIsModalOpen(false)}
          onSave={(task) => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default KanbanBoard;

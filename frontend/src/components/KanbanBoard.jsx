import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, MoreHorizontal, User, Calendar, MessageCircle } from 'lucide-react';
import TaskModal from './TaskModal';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const { projectName } = useParams(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [kanbanData, setKanbanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = 'http://localhost:5000';
  const fetchKanbanData = async () => {
  try {
    
    setLoading(true);
    setError(null);
    
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No authentication token found. Please login.');
    }
    
    let url, boardTitle;
    if (projectName) {
      url = `${API_BASE_URL}/api/kanban/projects/${encodeURIComponent(projectName)}/board`;
      boardTitle = decodeURIComponent(projectName);
    } else {
      url = `${API_BASE_URL}/api/kanban/tasks`;
      boardTitle = 'All Projects';
    }
    
    // try {
    //   const testResponse = await fetch(`${API_BASE_URL}/api/kanban/tasks`, {
    //     method: 'HEAD',
    //     headers: {
    //       'Authorization': `Bearer ${token}`,
    //     }
    //   });
    // } catch (connectError) {
    //   throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Make sure the backend server is running.`);
    // }
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      throw new Error(`Server returned non-JSON response. Status: ${response.status}`);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetched data:', data);
    if (!projectName) {
      const organizedData = {
        project: {
          name: boardTitle,
          _id: 'all-projects'
        },
        columns: [
          {
            id: 'todo',
            title: 'To Do',
            status: 'todo',
            tasks: data.filter(task => task.status === 'todo')
          },
          {
            id: 'in-progress',
            title: 'In Progress',
            status: 'in-progress',
            tasks: data.filter(task => task.status === 'in-progress')
          },
          {
            id: 'review',
            title: 'Review',
            status: 'review',
            tasks: data.filter(task => task.status === 'review')
          },
          {
            id: 'completed',
            title: 'Completed',
            status: 'completed',
            tasks: data.filter(task => task.status === 'completed')
          }
        ]
      };
      setKanbanData(organizedData);
    } else {
      setKanbanData(data);
    }
  } catch (err) {
    console.error('Fetch error:', err);
    let errorMessage = err.message;
    if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
      errorMessage = `Network error: Cannot connect to backend server. Please check:
      1. Backend server is running on ${API_BASE_URL}
      2. CORS is configured correctly
      3. No firewall blocking the connection`;
    }
    
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchKanbanData();
  }, [projectName]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleTaskSave = async (taskData) => {
    try {
      const token = localStorage.getItem('accessToken');
      
      if (selectedTask) {
        const response = await fetch(`${API_BASE_URL}/api/kanban/tasks/${selectedTask._id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(taskData)
        });

        if (!response.ok) {
          throw new Error('Failed to update task');
        }
      } else {
        const projectNameForTask = projectName || taskData.projectName;
        
        if (!projectNameForTask) {
          throw new Error('Project name is required for new tasks');
        }
        
        const response = await fetch(`${API_BASE_URL}/api/kanban/projects/${encodeURIComponent(projectNameForTask)}/tasks`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(taskData)
        });

        if (!response.ok) {
          throw new Error('Failed to create task');
        }
      }
      await fetchKanbanData();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleTaskMove = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_BASE_URL}/api/kanban/tasks/${taskId}/move`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to move task');
      }
      await fetchKanbanData();
    } catch (err) {
      console.error('Error moving task:', err);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_BASE_URL}/api/kanban/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      await fetchKanbanData();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const getAssigneeName = (assignedTo) => {
    if (!assignedTo) return 'Unassigned';
    return `${assignedTo.firstName} ${assignedTo.lastName}`;
  };

  if (loading) {
    return (
      <div className="kanban-board">
        <div className="loading-message">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="kanban-board">
        <div className="error-message">Error: {error}</div>
        <button onClick={fetchKanbanData} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (!kanbanData) {
    return (
      <div className="kanban-board">
        <div className="no-data-message">No project data available</div>
      </div>
    );
  }

  return (
    <div className="kanban-board">
      <div className="board-header">
        <h2 className="board-title">{kanbanData.project.name}</h2>
        <button className="add-task-btn" onClick={handleAddTask}>
          <Plus size={20} />
          Add Task
        </button>
      </div>

      <div className="columns-container">
        {kanbanData.columns.map((column) => (
          <div key={column.id} className="column">
            <div className="column-header">
              <h3 className="column-title">{column.title}</h3>
              <span className="task-count">{column.tasks.length}</span>
            </div>

            <div className="tasks-list">
              {column.tasks.map((task) => (
                <div
                  key={task._id}
                  className="task-card"
                  onClick={() => handleTaskClick(task)}
                >
                  <div className="task-header">
                    <h4 className="task-title">{task.title}</h4>
                    <button 
                      className="task-menu"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>

                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}

                  {task.tags && task.tags.length > 0 && (
                    <div className="task-labels">
                      {task.tags.map((tag, index) => (
                        <span key={index} className="task-label">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="task-footer">
                    <div className="task-meta">
                      <div className="assignee">
                        <User size={14} />
                        <span>{getAssigneeName(task.assignedTo)}</span>
                      </div>
                      {task.dueDate && (
                        <div className="due-date">
                          <Calendar size={14} />
                          <span>{formatDate(task.dueDate)}</span>
                        </div>
                      )}
                    </div>

                    <div className="task-actions">
                      <div className="comments">
                        <MessageCircle size={14} />
                        <span>0</span>
                      </div>
                      <div
                        className="priority-indicator"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      ></div>
                    </div>
                  </div>
                  {!projectName && (
                    <div className="task-project-name">
                      <span className="project-badge">{task.projectName}</span>
                    </div>
                  )}
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
    onSave={handleTaskSave}
    onDelete={selectedTask ? () => handleTaskDelete(selectedTask._id) : null}
    currentProject={projectName ? decodeURIComponent(projectName) : null}
  />
)}
    </div>
  );
};

export default KanbanBoard;
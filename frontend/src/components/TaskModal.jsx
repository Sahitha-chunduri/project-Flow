import { useState, useEffect } from 'react';
import { X, User, Calendar, Flag } from 'lucide-react';
import './TaskModal.css';

const TaskModal = ({ task, onClose, onSave, onDelete, currentProject }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    dueDate: '',
    status: 'todo',
    tags: [],
    projectName: currentProject || ''
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:5000/api/kanban/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const usersData = await response.json();
          setUsers(usersData);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        assignedTo: task.assignedTo?._id || '',
        priority: task.priority || 'medium',
        status: task.status || 'todo',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        tags: task.tags || [],
        projectName: task.projectName || currentProject || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        assignedTo: '',
        priority: 'medium',
        dueDate: '',
        status: 'todo',
        tags: [],
        projectName: currentProject || ''
      });
    }
    setError('');
  }, [task, currentProject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Task title is required');
      return;
    }

    if (!formData.projectName.trim()) {
      setError('Project name is required');
      return;
    }

    setLoading(true);
    try {
      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        assignedTo: formData.assignedTo || null,
        priority: formData.priority,
        status: formData.status,
        dueDate: formData.dueDate || null,
        tags: formData.tags,
        projectName: formData.projectName.trim(),
        category: 'task'
      };

      console.log('Submitting task data:', taskData);
      await onSave(taskData);
    } catch (error) {
      console.error('Error saving task:', error);
      setError('Failed to save task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData({ ...formData, tags });
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    setLoading(true);
    setError('');
    try {
      console.log('Deleting task:', task._id);
      await onDelete();
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      setError(error.message || 'Failed to delete task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-modal-overlay" onClick={onClose}>
      <div className="task-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="task-modal-header">
          <h2 className="task-modal-title">{task ? 'Edit Task' : 'Create New Task'}</h2>
          <button 
            className="task-modal-close-btn" 
            onClick={onClose} 
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {error && <div className="task-modal-error">{error}</div>}

        <form onSubmit={handleSubmit} className="task-form">
          <div className="task-form-group">
            <label htmlFor="title">Task Title *</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title..."
              required
              disabled={loading}
            />
          </div>

          <div className="task-form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the task..."
              rows={4}
              disabled={loading}
            />
          </div>

          <div className="task-form-group">
            <label htmlFor="projectName">Project Name *</label>
            <input
              id="projectName"
              type="text"
              value={formData.projectName}
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              placeholder="Enter project name..."
              required
              disabled={loading}
            />
          </div>

          <div className="task-form-row">
            <div className="task-form-group">
              <label htmlFor="assignedTo"><User size={16} className="inline-icon" /> Assignee</label>
              <select
                id="assignedTo"
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                disabled={loading}
              >
                <option value="">Select assignee...</option>
                {users.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="task-form-group">
              <label htmlFor="dueDate"><Calendar size={16} className="inline-icon" /> Due Date</label>
              <input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <div className="task-form-row">
            <div className="task-form-group">
              <label htmlFor="status"><Flag size={16} className="inline-icon" /> Status</label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                disabled={loading}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="task-form-group">
              <label htmlFor="priority"><Flag size={16} className="inline-icon" /> Priority</label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                disabled={loading}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="task-form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              id="tags"
              type="text"
              value={formData.tags.join(', ')}
              onChange={handleTagsChange}
              placeholder="tag1, tag2, tag3"
              disabled={loading}
            />
          </div>

          <div className="task-modal-footer">
            <div>
              {task && onDelete && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-delete"
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              )}
            </div>
            <div className="task-modal-buttons">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-cancel"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-submit"
                disabled={loading}
              >
                {loading ? 'Saving...' : (task ? 'Update Task' : 'Create Task')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;

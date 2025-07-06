const express = require('express');
const router = express.Router();
const { Task, User, Activity } = require('../models/models');
const auth = require('../middleware/validateTokenHandler'); 

// GET /api/kanban/projects - Get all project names for user 
router.get('/projects', auth, async (req, res) => {
  try {
    const projects = await Task.aggregate([
      {
        $match: {
          $or: [
            { createdBy: req.user.id },
            { assignedTo: req.user.id }
          ],
          isArchived: false,
          projectName: { $exists: true, $ne: null, $ne: '' }
        }
      },
      {
        $group: {
          _id: '$projectName',
          taskCount: { $sum: 1 },
          lastUpdated: { $max: '$updatedAt' },
          createdBy: { $first: '$createdBy' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'creator'
        }
      },
      {
        $project: {
          _id: '$_id',
          name: '$_id',
          taskCount: 1,
          lastUpdated: 1,
          creator: { $arrayElemAt: ['$creator', 0] }
        }
      },
      {
        $sort: { lastUpdated: -1 }
      }
    ]);

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/kanban/projects/:name/board - Get Kanban board data for a project name
router.get('/projects/:name/board', auth, async (req, res) => {
  try {
    const projectName = decodeURIComponent(req.params.name);
    const userTasks = await Task.find({
      projectName: projectName,
      $or: [
        { createdBy: req.user.id },
        { assignedTo: req.user.id }
      ]
    }).limit(1);

    if (userTasks.length === 0) {
      return res.status(404).json({ message: 'Project not found or access denied' });
    }

    const tasks = await Task.find({ 
      projectName: projectName,
      isArchived: false 
    })
      .populate('assignedTo', 'firstName lastName email avatar')
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 });

    const kanbanData = {
      project: {
        name: projectName,
        _id: projectName 
      },
      columns: [
        {
          id: 'todo',
          title: 'To Do',
          status: 'todo',
          tasks: tasks.filter(task => task.status === 'todo')
        },
        {
          id: 'in-progress',
          title: 'In Progress',
          status: 'in-progress',
          tasks: tasks.filter(task => task.status === 'in-progress')
        },
        {
          id: 'review',
          title: 'Review',
          status: 'review',
          tasks: tasks.filter(task => task.status === 'review')
        },
        {
          id: 'completed',
          title: 'Completed',
          status: 'completed',
          tasks: tasks.filter(task => task.status === 'completed')
        }
      ]
    };

    res.json(kanbanData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/kanban/projects/:name/tasks - Create new task
router.post('/projects/:name/tasks', auth, async (req, res) => {
  try {
    const { title, description, assignedTo, priority, dueDate, status, category, tags } = req.body;
    const projectName = decodeURIComponent(req.params.name);
    const mongoose = require('mongoose');

    console.log('Request body:', req.body);
    console.log('Project name from URL:', projectName);
    console.log('User ID:', req.user.id);
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    if (!projectName || !projectName.trim()) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    let assignedToId = null;
    if (assignedTo && assignedTo.trim() !== '') {
      try {
        if (mongoose.Types.ObjectId.isValid(assignedTo) && assignedTo.length === 24) {
          const userExists = await User.findById(assignedTo);
          if (userExists) {
            assignedToId = new mongoose.Types.ObjectId(assignedTo);
          } else {
            console.log('User not found for ObjectId:', assignedTo);
            return res.status(400).json({ message: 'Assigned user not found' });
          }
        } else {
          console.log('Invalid ObjectId format:', assignedTo);
          return res.status(400).json({ message: 'Invalid user ID format' });
        }
      } catch (error) {
        console.log('Error processing assignedTo:', error);
        return res.status(400).json({ message: 'Error processing assigned user' });
      }
    }
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    const taskData = {
      title: title.trim(),
      description: description ? description.trim() : '',
      projectName: projectName.trim(),
      assignedTo: assignedToId, 
      createdBy: new mongoose.Types.ObjectId(req.user.id),
      status: status || 'todo',
      priority: priority || 'medium',
      category: category || 'task',
      dueDate: dueDate || null,
      tags: Array.isArray(tags) ? tags.filter(tag => tag && tag.trim()) : [],
      isArchived: false
    };

    console.log('Task data before save:', taskData);

    const newTask = new Task(taskData);
    const savedTask = await newTask.save();
    
    await savedTask.populate('assignedTo', 'firstName lastName email avatar');
    await savedTask.populate('createdBy', 'firstName lastName email');

    try {
      const activity = new Activity({
        user: new mongoose.Types.ObjectId(req.user.id),
        action: 'task_created',
        target: 'task',
        targetId: savedTask._id,
        project: projectName,
        description: `Created task "${title.trim()}"`,
        metadata: { taskId: savedTask._id, taskTitle: title.trim(), projectName }
      });
      await activity.save();
    } catch (activityError) {
      console.log('Activity log error:', activityError);
    }

    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Task creation error:', error);
    console.error('Error details:', error.message);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        path: err.path,
        message: err.message,
        value: err.value
      }));
      console.log('Validation errors:', validationErrors);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors,
        details: error.message
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid data format', 
        error: `${error.path}: ${error.message}`,
        value: error.value
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Duplicate task detected',
        error: 'A task with similar properties already exists'
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to create task', 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});
// PUT /api/kanban/tasks/:id - Update task
router.put('/tasks/:id', auth, async (req, res) => {
  try {
    const { title, description, assignedTo, priority, dueDate, status, category, tags } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Fixed authorization logic - properly handle ObjectId comparison
    const isCreator = task.createdBy.toString() === req.user.id;
    const isAssignee = task.assignedTo && task.assignedTo.toString() === req.user.id;
    
    if (!isCreator && !isAssignee) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const oldStatus = task.status;
    const oldPriority = task.priority;

    // Update task fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    
    // Handle assignedTo field properly - convert to ObjectId if needed
    if (assignedTo !== undefined) {
      if (assignedTo === null || assignedTo === '') {
        task.assignedTo = null;
      } else {
        const mongoose = require('mongoose');
        if (mongoose.Types.ObjectId.isValid(assignedTo)) {
          task.assignedTo = new mongoose.Types.ObjectId(assignedTo);
        } else {
          return res.status(400).json({ message: 'Invalid assignedTo user ID' });
        }
      }
    }
    
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (status !== undefined) {
      task.status = status;
      if (status === 'completed' && oldStatus !== 'completed') {
        task.completedAt = new Date();
        task.completedBy = req.user.id;
      }
    }
    if (category !== undefined) task.category = category;
    if (tags !== undefined) task.tags = tags;

    const updatedTask = await task.save();
    await updatedTask.populate('assignedTo', 'firstName lastName email avatar');
    await updatedTask.populate('createdBy', 'firstName lastName email');

    // Log activity if status changed
    if (oldStatus !== status) {
      try {
        const activity = new Activity({
          user: req.user.id,
          action: 'status_changed',
          target: 'task',
          targetId: task._id,
          project: task.projectName,
          description: `Changed task status from "${oldStatus}" to "${status}"`,
          metadata: { taskId: task._id, taskTitle: task.title, oldStatus, newStatus: status }
        });
        await activity.save();
      } catch (activityError) {
        console.log('Activity log error:', activityError);
      }
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Task update error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// DELETE /api/kanban/tasks/:id - Delete task
router.delete('/tasks/:id', auth, async (req, res) => {
  console.log("User from token:", req.user);

  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }
    const taskTitle = task.title;
    const taskProjectName = task.projectName;

    await Task.findByIdAndDelete(req.params.id);
    
    try {
      const activity = new Activity({
        user: req.user.id,
        action: 'task_deleted', 
        target: 'task',
        targetId: req.params.id, 
        projectName: taskProjectName,
        description: `Deleted task "${taskTitle}"`, 
        metadata: {
          title: taskTitle,
          projectName: taskProjectName
        }
      });

      await activity.save();
    } catch (activityError) {
      console.log('Activity log error:', activityError);
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// PUT /api/kanban/tasks/:id/move - Move task to different status/column
router.put('/tasks/:id/move', auth, async (req, res) => {
  try {
    const { status, position } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Fixed authorization logic - same fix as above
    const isCreator = task.createdBy.toString() === req.user.id;
    const isAssignee = task.assignedTo && task.assignedTo.toString() === req.user.id;
    
    if (!isCreator && !isAssignee) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const oldStatus = task.status;
    task.status = status;
    
    if (status === 'completed' && oldStatus !== 'completed') {
      task.completedAt = new Date();
      task.completedBy = req.user.id;
    }

    const updatedTask = await task.save();
    await updatedTask.populate('assignedTo', 'firstName lastName email avatar');
    await updatedTask.populate('createdBy', 'firstName lastName email');

    // Log activity
    try {
      const activity = new Activity({
        user: req.user.id,
        action: 'status_changed',
        target: 'task',
        targetId: task._id,
        project: task.projectName,
        description: `Moved task "${task.title}" from "${oldStatus}" to "${status}"`,
        metadata: { taskId: task._id, taskTitle: task.title, oldStatus, newStatus: status }
      });
      await activity.save();
    } catch (activityError) {
      console.log('Activity log error:', activityError);
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Task move error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/kanban/projects/:name/members - Get users who have worked on this project
router.get('/projects/:name/members', auth, async (req, res) => {
  try {
    const projectName = decodeURIComponent(req.params.name);
    const userTasks = await Task.find({
      projectName: projectName,
      $or: [
        { createdBy: req.user.id },
        { assignedTo: req.user.id }
      ]
    }).limit(1);

    if (userTasks.length === 0) {
      return res.status(404).json({ message: 'Project not found or access denied' });
    }

    const tasks = await Task.find({ projectName: projectName })
      .populate('createdBy', 'firstName lastName email avatar')
      .populate('assignedTo', 'firstName lastName email avatar');

    const membersMap = new Map();
    
    tasks.forEach(task => {
      if (task.createdBy) {
        membersMap.set(task.createdBy._id.toString(), {
          _id: task.createdBy._id,
          firstName: task.createdBy.firstName,
          lastName: task.createdBy.lastName,
          email: task.createdBy.email,
          avatar: task.createdBy.avatar,
          role: 'contributor'
        });
      }
      if (task.assignedTo) {
        membersMap.set(task.assignedTo._id.toString(), {
          _id: task.assignedTo._id,
          firstName: task.assignedTo.firstName,
          lastName: task.assignedTo.lastName,
          email: task.assignedTo.email,
          avatar: task.assignedTo.avatar,
          role: 'contributor'
        });
      }
    });

    const allMembers = Array.from(membersMap.values());

    res.json(allMembers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/kanban/tasks/:id - Get single task details
router.get('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'firstName lastName email avatar')
      .populate('createdBy', 'firstName lastName email');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.createdBy._id.toString() !== req.user.id && 
        (task.assignedTo && task.assignedTo._id.toString() !== req.user.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/kanban/tasks - Get all tasks for user (optional: filter by project)
router.get('/tasks', auth, async (req, res) => {
  try {
    const { projectName, status, priority, assignedTo } = req.query;
    
    const filter = {
      $or: [
        { createdBy: req.user.id },
        { assignedTo: req.user.id }
      ],
      isArchived: false
    };

    if (projectName) filter.projectName = projectName;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;

    const tasks = await Task.find(filter)
      .populate('assignedTo', 'firstName lastName email avatar')
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/kanban/users - Get all users for task assignment
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
      .select('firstName lastName email avatar')
      .sort({ firstName: 1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
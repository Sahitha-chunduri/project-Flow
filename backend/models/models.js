const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a username"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please add an email address"],
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6
    },
    firstName: {
        type: String,
        required: [true, "Please add first name"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Please add last name"],
        trim: true
    },
    avatar: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add project name"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        role: {
            type: String,
            enum: ['owner', 'manager', 'member', 'viewer'],
            default: 'member'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['planning', 'active', 'on-hold', 'completed', 'cancelled'],
        default: 'planning'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    budget: {
        type: Number,
        min: 0
    },
    color: {
        type: String,
        default: '#3498db'
    },
    isArchived: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add task title"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Project"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'review', 'completed', 'cancelled'],
        default: 'todo'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    category: {
        type: String,
        enum: ['feature', 'bug', 'improvement', 'task', 'research'],
        default: 'task'
    },
    dueDate: {
        type: Date
    },
    estimatedHours: {
        type: Number,
        min: 0
    },
    actualHours: {
        type: Number,
        min: 0,
        default: 0
    },
    tags: [{
        type: String,
        trim: true
    }],
    attachments: [{
        filename: String,
        originalName: String,
        url: String,
        size: Number,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    subtasks: [{
        title: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        completedAt: Date,
        completedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }],
    dependencies: [{
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        },
        type: {
            type: String,
            enum: ['blocks', 'depends-on'],
            default: 'depends-on'
        }
    }],
    completedAt: {
        type: Date
    },
    completedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});


const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, "Please add comment content"],
        trim: true
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Task"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    mentions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    attachments: [{
        filename: String,
        originalName: String,
        url: String,
        size: Number
    }],
    isEdited: {
        type: Boolean,
        default: false
    },
    editedAt: {
        type: Date
    }
}, {
    timestamps: true
});

const activitySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    action: {
        type: String,
        required: true,
        enum: [
            'task_created', 'task_updated', 'task_deleted', 'task_assigned',
            'project_created', 'project_updated', 'project_deleted',
            'comment_added', 'comment_updated', 'comment_deleted',
            'user_joined', 'user_left', 'status_changed', 'priority_changed'
        ]
    },
    target: {
        type: String,
        required: true,
        enum: ['task', 'project', 'comment', 'user']
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    description: {
        type: String,
        required: true
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true
});


const notificationSchema = mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        required: true,
        enum: [
            'task_assigned', 'task_due', 'task_completed', 'task_overdue',
            'project_invitation', 'comment_mention', 'status_update',
            'deadline_reminder', 'project_update'
        ]
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    relatedTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    },
    relatedProject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    isRead: {
        type: Boolean,
        default: false
    },
    readAt: {
        type: Date
    }
}, {
    timestamps: true
});

const timeEntrySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Task"
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Project"
    },
    description: {
        type: String,
        trim: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date
    },
    duration: {
        type: Number, 
        required: true,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true
});


const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please add the contact Email Address"],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    phone: {
        type: String,
        required: [true, "Please add the contact Phone number"],
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    position: {
        type: String,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = {
    User: mongoose.model("User", userSchema),
    Project: mongoose.model("Project", projectSchema),
    Task: mongoose.model("Task", taskSchema),
    Comment: mongoose.model("Comment", commentSchema),
    Activity: mongoose.model("Activity", activitySchema),
    Notification: mongoose.model("Notification", notificationSchema),
    TimeEntry: mongoose.model("TimeEntry", timeEntrySchema),
    Contact: mongoose.model("Contact", contactSchema)
};
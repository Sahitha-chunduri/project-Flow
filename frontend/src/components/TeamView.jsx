import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Calendar, MessageCircle, Plus, MoreHorizontal, Trash2, X, Loader2 } from 'lucide-react';
import './TeamView.css';

const TeamView = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [showMemberMenu, setShowMemberMenu] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newMember, setNewMember] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
    tags: []
  });

  const API_BASE_URL =  'http://localhost:5000/api';

  const getAuthToken = () => {
    return localStorage.getItem('accessToken') || localStorage.getItem('token');
  };

  const makeAPIRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getAuthToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (response.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Authentication failed');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [currentPage, searchTerm]);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage);
      queryParams.append('limit', 12);
      if (searchTerm) queryParams.append('search', searchTerm);
      
      const response = await makeAPIRequest(`/contacts?${queryParams.toString()}`);

      if (response.success) {
        const transformedMembers = response.data.map(contact => ({
          id: contact.id,
          name: contact.name,
          role: contact.position || 'Team Member',
          email: contact.email,
          phone: contact.phone,
          location: contact.company || 'Not specified',
          avatar: generateAvatar(contact.name),
          status: 'online', 
          tasksCompleted: Math.floor(Math.random() * 20), //mock data
          tasksInProgress: Math.floor(Math.random() * 5),
          joinDate: new Date(contact.createdAt).toISOString().split('T')[0],
          notes: contact.notes,
          tags: contact.tags || []
        }));

        setTeamMembers(transformedMembers);
        setTotalPages(response.pagination.totalPages);
      }
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError(err.message || 'Failed to load team members. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'busy': return '#f59e0b';
      case 'offline': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const generateAvatar = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    
    if (!newMember.name || !newMember.position || !newMember.email) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const memberData = {
        name: newMember.name,
        email: newMember.email,
        phone: newMember.phone || '+1 (555) 000-0000',
        company: newMember.company || '',
        position: newMember.position,
        notes: newMember.notes || '',
        tags: newMember.tags || []
      };

      const response = await makeAPIRequest('/contacts', {
        method: 'POST',
        body: JSON.stringify(memberData),
      });

      if (response.success) {
        const newTeamMember = {
          id: response.data.id,
          name: response.data.name,
          role: response.data.position || 'Team Member',
          email: response.data.email,
          phone: response.data.phone,
          location: response.data.company || 'Not specified',
          avatar: generateAvatar(response.data.name),
          status: 'online',
          tasksCompleted: 0,
          tasksInProgress: 0,
          joinDate: new Date(response.data.createdAt).toISOString().split('T')[0],
          notes: response.data.notes,
          tags: response.data.tags || []
        };

        setTeamMembers([newTeamMember, ...teamMembers]);
        setNewMember({
          name: '',
          position: '',
          email: '',
          phone: '',
          company: '',
          notes: '',
          tags: []
        });
        
        setIsAddMemberModalOpen(false);
        alert('Team member added successfully!');
      }
    } catch (err) {
      console.error('Error adding team member:', err);
      setError(err.message || 'Failed to add team member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      setError(null);
      
      const response = await makeAPIRequest(`/contacts/${memberId}`, {
        method: 'DELETE',
      });
      
      if (response.success) {
        setTeamMembers(teamMembers.filter(member => member.id !== memberId));
        setMemberToRemove(null);
        setShowMemberMenu(null);
        
        if (selectedMember?.id === memberId) {
          setSelectedMember(null);
        }
        
        alert('Team member removed successfully!');
      }
    } catch (err) {
      console.error('Error removing team member:', err);
      setError(err.message || 'Failed to remove team member. Please try again.');
    }
  };

  const toggleMemberMenu = (memberId, e) => {
    e.stopPropagation();
    setShowMemberMenu(showMemberMenu === memberId ? null : memberId);
  };

  const handleInputChange = (field, value) => {
    setNewMember(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const handleClickOutside = () => {
      setShowMemberMenu(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (loading && teamMembers.length === 0) {
    return (
      <div className="team-view">
        <div className="loading-container">
          <Loader2 className="spinner" size={48} />
          <p>Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="team-view">
      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="team-header">
        <h2 className="team-title">Team Members</h2>
        <div className="header-actions">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <button 
            className="add-member-btn"
            onClick={() => setIsAddMemberModalOpen(true)}
          >
            <Plus size={20} />
            Add Member
          </button>
        </div>
      </div>

      <div className="team-stats">
        <div className="stat-item">
          <div className="stat-value">{teamMembers.length}</div>
          <div className="stat-label">Total Members</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{teamMembers.filter(m => m.status === 'online').length}</div>
          <div className="stat-label">Online Now</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{teamMembers.reduce((acc, m) => acc + m.tasksCompleted, 0)}</div>
          <div className="stat-label">Tasks Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{teamMembers.reduce((acc, m) => acc + m.tasksInProgress, 0)}</div>
          <div className="stat-label">Tasks In Progress</div>
        </div>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div 
            key={member.id} 
            className="team-card"
            onClick={() => handleMemberClick(member)}
          >
            <div className="card-header">
              <div className="member-avatar-container">
                <div className="member-avatar">
                  {member.avatar}
                </div>
                <div 
                  className="status-indicator"
                  style={{ backgroundColor: getStatusColor(member.status) }}
                ></div>
              </div>
              <div className="member-menu-container">
                <button 
                  className="member-menu"
                  onClick={(e) => toggleMemberMenu(member.id, e)}
                >
                  <MoreHorizontal size={16} />
                </button>
                {showMemberMenu === member.id && (
                  <div className="member-dropdown">
                    <button 
                      className="dropdown-item remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMemberToRemove(member);
                        setShowMemberMenu(null);
                      }}
                    >
                      <Trash2 size={14} />
                      Remove Member
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="member-info">
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
            </div>

            <div className="member-contact">
              <div className="contact-item">
                <Mail size={14} />
                <span>{member.email}</span>
              </div>
              <div className="contact-item">
                <MapPin size={14} />
                <span>{member.location}</span>
              </div>
            </div>

            <div className="member-stats">
              <div className="stat-group">
                <div className="stat-number">{member.tasksCompleted}</div>
                <div className="stat-text">Completed</div>
              </div>
              <div className="stat-group">
                <div className="stat-number">{member.tasksInProgress}</div>
                <div className="stat-text">In Progress</div>
              </div>
            </div>

            <div className="card-actions">
              <button className="action-btn">
                <MessageCircle size={16} />
                Message
              </button>
              <button className="action-btn">
                <Phone size={16} />
                Call
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}

      {selectedMember && (
        <div className="member-modal" onClick={() => setSelectedMember(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-avatar-container">
                <div className="modal-avatar">
                  {selectedMember.avatar}
                </div>
                <div 
                  className="modal-status"
                  style={{ backgroundColor: getStatusColor(selectedMember.status) }}
                ></div>
              </div>
              <div className="modal-info">
                <h2>{selectedMember.name}</h2>
                <p>{selectedMember.role}</p>
                <span className={`status-badge ${selectedMember.status}`}>
                  {selectedMember.status.charAt(0).toUpperCase() + selectedMember.status.slice(1)}
                </span>
              </div>
              <button 
                className="close-modal"
                onClick={() => setSelectedMember(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="contact-section">
                <h3>Contact Information</h3>
                <div className="contact-details">
                  <div className="detail-item">
                    <Mail size={16} />
                    <span>{selectedMember.email}</span>
                  </div>
                  <div className="detail-item">
                    <Phone size={16} />
                    <span>{selectedMember.phone}</span>
                  </div>
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{selectedMember.location}</span>
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>Joined {new Date(selectedMember.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="performance-section">
                <h3>Performance</h3>
                <div className="performance-stats">
                  <div className="perf-stat">
                    <div className="perf-number">{selectedMember.tasksCompleted}</div>
                    <div className="perf-label">Tasks Completed</div>
                  </div>
                  <div className="perf-stat">
                    <div className="perf-number">{selectedMember.tasksInProgress}</div>
                    <div className="perf-label">Tasks In Progress</div>
                  </div>
                  <div className="perf-stat">
                    <div className="perf-number">
                      {selectedMember.tasksCompleted + selectedMember.tasksInProgress > 0 
                        ? Math.round((selectedMember.tasksCompleted / (selectedMember.tasksCompleted + selectedMember.tasksInProgress)) * 100)
                        : 0}%
                    </div>
                    <div className="perf-label">Success Rate</div>
                  </div>
                </div>
              </div>

              {selectedMember.notes && (
                <div className="notes-section">
                  <h3>Notes</h3>
                  <p>{selectedMember.notes}</p>
                </div>
              )}

              {selectedMember.tags && selectedMember.tags.length > 0 && (
                <div className="tags-section">
                  <h3>Tags</h3>
                  <div className="tags-container">
                    {selectedMember.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {memberToRemove && (
        <div className="member-modal" onClick={() => setMemberToRemove(null)}>
          <div className="modal-content remove-member-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="warning-icon">
                <Trash2 size={24} />
              </div>
              <div className="modal-info">
                <h2>Remove Team Member</h2>
                <p>
                  Are you sure you want to remove <strong>{memberToRemove.name}</strong> from the team? This action cannot be undone.
                </p>
              </div>
              <button 
                className="close-modal"
                onClick={() => setMemberToRemove(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setMemberToRemove(null)}
              >
                Cancel
              </button>
              <button 
                className="remove-btn"
                onClick={() => handleRemoveMember(memberToRemove.id)}
              >
                Remove Member
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddMemberModalOpen && (
        <div className="member-modal" onClick={() => setIsAddMemberModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Member</h2>
              <button 
                className="close-modal"
                onClick={() => setIsAddMemberModalOpen(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddMember} className="add-member-form">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-group">
                <label>Position *</label>
                <input
                  type="text"
                  value={newMember.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  required
                  placeholder="Enter job position"
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  placeholder="Enter email address"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={newMember.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={newMember.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Enter company name"
                />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={newMember.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional notes..."
                  rows={3}
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsAddMemberModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="spinner" />
                      Adding...
                    </>
                  ) : (
                    'Add Member'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamView;
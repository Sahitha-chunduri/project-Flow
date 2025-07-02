import { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, MessageCircle, Plus, MoreHorizontal, Trash2, X } from 'lucide-react';

const TeamView = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [showMemberMenu, setShowMemberMenu] = useState(null);
  const [teamMembers, setTeamMembers] = useState([
    {
      id: '1',
      name: 'John Doe',
      role: 'Frontend Developer',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, USA',
      avatar: 'JD',
      status: 'online',
      tasksCompleted: 24,
      tasksInProgress: 3,
      joinDate: '2023-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Backend Developer',
      email: 'jane.smith@company.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, USA',
      avatar: 'JS',
      status: 'online',
      tasksCompleted: 31,
      tasksInProgress: 2,
      joinDate: '2022-08-20'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      role: 'Full Stack Developer',
      email: 'mike.johnson@company.com',
      phone: '+1 (555) 345-6789',
      location: 'Austin, USA',
      avatar: 'MJ',
      status: 'busy',
      tasksCompleted: 18,
      tasksInProgress: 5,
      joinDate: '2023-03-10'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      role: 'UI/UX Designer',
      email: 'sarah.wilson@company.com',
      phone: '+1 (555) 456-7890',
      location: 'Seattle, USA',
      avatar: 'SW',
      status: 'offline',
      tasksCompleted: 22,
      tasksInProgress: 1,
      joinDate: '2022-11-05'
    },
    {
      id: '5',
      name: 'Alex Brown',
      role: 'QA Engineer',
      email: 'alex.brown@company.com',
      phone: '+1 (555) 567-8901',
      location: 'Boston, USA',
      avatar: 'AB',
      status: 'online',
      tasksCompleted: 16,
      tasksInProgress: 4,
      joinDate: '2023-05-12'
    },
    {
      id: '6',
      name: 'Emily Davis',
      role: 'Project Manager',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 678-9012',
      location: 'Chicago, USA',
      avatar: 'ED',
      status: 'online',
      tasksCompleted: 28,
      tasksInProgress: 6,
      joinDate: '2022-06-18'
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    location: '',
    status: 'online'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'busy': return '#f59e0b';
      case 'offline': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusBadgeStyle = (status) => {
    const baseStyle = {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      marginTop: '8px'
    };
    switch (status) {
      case 'online':
        return { ...baseStyle, backgroundColor: '#dcfce7', color: '#166534' };
      case 'busy':
        return { ...baseStyle, backgroundColor: '#fef3c7', color: '#92400e' };
      case 'offline':
        return { ...baseStyle, backgroundColor: '#f1f5f9', color: '#475569' };
      default:
        return { ...baseStyle, backgroundColor: '#f1f5f9', color: '#475569' };
    }
  };

  const generateAvatar = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    
    if (!newMember.name || !newMember.role || !newMember.email) {
      alert('Please fill in all required fields');
      return;
    }

    const memberToAdd = {
      id: Date.now().toString(),
      name: newMember.name,
      role: newMember.role,
      email: newMember.email,
      phone: newMember.phone || 'Not provided',
      location: newMember.location || 'Not specified',
      avatar: generateAvatar(newMember.name),
      status: newMember.status,
      tasksCompleted: 0,
      tasksInProgress: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };

    setTeamMembers([...teamMembers, memberToAdd]);
    setNewMember({
      name: '',
      role: '',
      email: '',
      phone: '',
      location: '',
      status: 'online'
    });
    setIsAddMemberModalOpen(false);
  };

  const handleRemoveMember = (memberId) => {
    setTeamMembers(teamMembers.filter(member => member.id !== memberId));
    setMemberToRemove(null);
    setShowMemberMenu(null);
    if (selectedMember?.id === memberId) {
      setSelectedMember(null);
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

  return (
    <div className="team-view" style={{
      padding: '24px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div className="team-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <h2 className="team-title" style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#1e293b',
          margin: 0
        }}>Team Members</h2>
        <button 
          className="add-member-btn"
          onClick={() => setIsAddMemberModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          <Plus size={20} />
          Add Member
        </button>
      </div>

      <div className="team-stats" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div className="stat-item" style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div className="stat-value" style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '8px'
          }}>{teamMembers.length}</div>
          <div className="stat-label" style={{
            fontSize: '14px',
            color: '#64748b',
            fontWeight: '500'
          }}>Total Members</div>
        </div>
        <div className="stat-item" style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div className="stat-value" style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '8px'
          }}>{teamMembers.filter(m => m.status === 'online').length}</div>
          <div className="stat-label" style={{
            fontSize: '14px',
            color: '#64748b',
            fontWeight: '500'
          }}>Online Now</div>
        </div>
        <div className="stat-item" style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div className="stat-value" style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '8px'
          }}>{teamMembers.reduce((acc, m) => acc + m.tasksCompleted, 0)}</div>
          <div className="stat-label" style={{
            fontSize: '14px',
            color: '#64748b',
            fontWeight: '500'
          }}>Tasks Completed</div>
        </div>
        <div className="stat-item" style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div className="stat-value" style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '8px'
          }}>{teamMembers.reduce((acc, m) => acc + m.tasksInProgress, 0)}</div>
          <div className="stat-label" style={{
            fontSize: '14px',
            color: '#64748b',
            fontWeight: '500'
          }}>Tasks In Progress</div>
        </div>
      </div>

      <div className="team-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {teamMembers.map((member) => (
          <div 
            key={member.id} 
            className="team-card"
            onClick={() => handleMemberClick(member)}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: '1px solid #e2e8f0'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div className="card-header" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '16px'
            }}>
              <div className="member-avatar-container" style={{ position: 'relative' }}>
                <div className="member-avatar" style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  {member.avatar}
                </div>
                <div 
                  className="status-indicator"
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: '2px solid white',
                    backgroundColor: getStatusColor(member.status)
                  }}
                ></div>
              </div>
              <div className="member-menu-container" style={{ position: 'relative' }}>
                <button 
                  className="member-menu"
                  onClick={(e) => toggleMemberMenu(member.id, e)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    color: '#64748b'
                  }}
                >
                  <MoreHorizontal size={16} />
                </button>
                {showMemberMenu === member.id && (
                  <div className="member-dropdown" style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    zIndex: 10,
                    minWidth: '150px'
                  }}>
                    <button 
                      className="dropdown-item remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMemberToRemove(member);
                        setShowMemberMenu(null);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '8px 12px',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#dc2626',
                        borderRadius: '6px'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#fef2f2'}
                      onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <Trash2 size={14} />
                      Remove Member
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="member-info" style={{ marginBottom: '16px' }}>
              <h3 className="member-name" style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1e293b',
                margin: '0 0 4px 0'
              }}>{member.name}</h3>
              <p className="member-role" style={{
                fontSize: '14px',
                color: '#64748b',
                margin: 0
              }}>{member.role}</p>
            </div>

            <div className="member-contact" style={{ marginBottom: '16px' }}>
              <div className="contact-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#64748b'
              }}>
                <Mail size={14} />
                <span>{member.email}</span>
              </div>
              <div className="contact-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#64748b'
              }}>
                <MapPin size={14} />
                <span>{member.location}</span>
              </div>
            </div>

            <div className="member-stats" style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
              padding: '16px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px'
            }}>
              <div className="stat-group" style={{ textAlign: 'center' }}>
                <div className="stat-number" style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '4px'
                }}>{member.tasksCompleted}</div>
                <div className="stat-text" style={{
                  fontSize: '12px',
                  color: '#64748b',
                  fontWeight: '500'
                }}>Completed</div>
              </div>
              <div className="stat-group" style={{ textAlign: 'center' }}>
                <div className="stat-number" style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '4px'
                }}>{member.tasksInProgress}</div>
                <div className="stat-text" style={{
                  fontSize: '12px',
                  color: '#64748b',
                  fontWeight: '500'
                }}>In Progress</div>
              </div>
            </div>

            <div className="card-actions" style={{
              display: 'flex',
              gap: '12px'
            }}>
              <button 
                className="action-btn"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f8fafc'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
              >
                <MessageCircle size={16} />
                Message
              </button>
              <button 
                className="action-btn"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f8fafc'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
              >
                <Phone size={16} />
                Call
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="member-modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setSelectedMember(null)}>
          <div className="modal-content" style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              marginBottom: '24px',
              position: 'relative'
            }}>
              <div className="modal-avatar-container" style={{ position: 'relative' }}>
                <div className="modal-avatar" style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: '600'
                }}>
                  {selectedMember.avatar}
                </div>
                <div 
                  className="modal-status"
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    right: '4px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '3px solid white',
                    backgroundColor: getStatusColor(selectedMember.status)
                  }}
                ></div>
              </div>
              <div className="modal-info" style={{ flex: 1 }}>
                <h2 style={{margin: '0 0 4px 0', fontSize: '24px', color: '#1e293b'}}>{selectedMember.name}</h2>
                <p style={{margin: '0 0 8px 0', fontSize: '16px', color: '#64748b'}}>{selectedMember.role}</p>
                <span style={getStatusBadgeStyle(selectedMember.status)}>
                  {selectedMember.status.charAt(0).toUpperCase() + selectedMember.status.slice(1)}
                </span>
              </div>
              <button 
                className="close-modal"
                onClick={() => setSelectedMember(null)}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#f1f5f9',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#64748b'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#e2e8f0'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#f1f5f9'}
              >
                ×
              </button>
            </div>

            <div className="modal-body" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              <div className="contact-section">
                <h3 style={{margin: '0 0 12px 0', fontSize: '18px', color: '#1e293b'}}>Contact Information</h3>
                <div className="contact-details" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginTop: '12px'
                }}>
                  <div className="detail-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 0',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    <Mail size={16} />
                    <span>{selectedMember.email}</span>
                  </div>
                  <div className="detail-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 0',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    <Phone size={16} />
                    <span>{selectedMember.phone}</span>
                  </div>
                  <div className="detail-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 0',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    <MapPin size={16} />
                    <span>{selectedMember.location}</span>
                  </div>
                  <div className="detail-item" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 0',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    <Calendar size={16} />
                    <span>Joined {new Date(selectedMember.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="performance-section">
                <h3 style={{margin: '0 0 12px 0', fontSize: '18px', color: '#1e293b'}}>Performance</h3>
                <div className="performance-stats" style={{
                  display: 'flex',
                  gap: '20px',
                  marginTop: '12px'
                }}>
                  <div className="perf-stat" style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px'
                  }}>
                    <div className="perf-number" style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '4px'
                    }}>{selectedMember.tasksCompleted}</div>
                    <div className="perf-label" style={{
                      fontSize: '12px',
                      color: '#64748b',
                      fontWeight: '500'
                    }}>Tasks Completed</div>
                  </div>
                  <div className="perf-stat" style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px'
                  }}>
                    <div className="perf-number" style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '4px'
                    }}>{selectedMember.tasksInProgress}</div>
                    <div className="perf-label" style={{
                      fontSize: '12px',
                      color: '#64748b',
                      fontWeight: '500'
                    }}>Tasks In Progress</div>
                  </div>
                  <div className="perf-stat" style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px'
                  }}>
                    <div className="perf-number" style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '4px'
                    }}>
                      {selectedMember.tasksCompleted + selectedMember.tasksInProgress > 0 
                        ? Math.round((selectedMember.tasksCompleted / (selectedMember.tasksCompleted + selectedMember.tasksInProgress)) * 100)
                        : 0}%
                    </div>
                    <div className="perf-label" style={{
                      fontSize: '12px',
                      color: '#64748b',
                      fontWeight: '500'
                    }}>Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Remove Member Confirmation Modal */}
      {memberToRemove && (
        <div className="member-modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setMemberToRemove(null)}>
          <div className="modal-content remove-member-modal" style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{
              display: 'flex',
              alignItems: 'flex-start',gap: '16px',
              marginBottom: '24px',
              position: 'relative'
            }}>
              <div className="warning-icon" style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                <Trash2 size={24} />
              </div>
              <div className="modal-info" style={{ flex: 1 }}>
                <h2 style={{margin: '0 0 8px 0', fontSize: '20px', color: '#1e293b'}}>Remove Team Member</h2>
                <p style={{margin: 0, fontSize: '14px', color: '#64748b'}}>
                  Are you sure you want to remove <strong>{memberToRemove.name}</strong> from the team? This action cannot be undone.
                </p>
              </div>
              <button 
                className="close-modal"
                onClick={() => setMemberToRemove(null)}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#f1f5f9',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#64748b'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#e2e8f0'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#f1f5f9'}
              >
                ×
              </button>
            </div>

            <div className="modal-actions" style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <button 
                className="cancel-btn"
                onClick={() => setMemberToRemove(null)}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#64748b'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f8fafc'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
              >
                Cancel
              </button>
              <button 
                className="remove-btn"
                onClick={() => handleRemoveMember(memberToRemove.id)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
              >
                Remove Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {isAddMemberModalOpen && (
        <div className="member-modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setIsAddMemberModalOpen(false)}>
          <div className="modal-content" style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}>
              <h2 style={{margin: 0, fontSize: '24px', color: '#1e293b'}}>Add New Member</h2>
              <button 
                className="close-modal"
                onClick={() => setIsAddMemberModalOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: '#f1f5f9',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#64748b'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#e2e8f0'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#f1f5f9'}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddMember} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div className="form-group">
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Name *</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-group">
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Role *</label>
                <input
                  type="text"
                  value={newMember.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter job role"
                />
              </div>

              <div className="form-group">
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Email *</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter email address"
                />
              </div>

              <div className="form-group">
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Phone</label>
                <input
                  type="tel"
                  value={newMember.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Location</label>
                <input
                  type="text"
                  value={newMember.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter location"
                />
              </div>

              <div className="form-group">
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>Status</label>
                <select
                  value={newMember.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="online">Online</option>
                  <option value="busy">Busy</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              <div className="form-actions" style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
                marginTop: '20px'
              }}>
                <button 
                  type="button"
                  onClick={() => setIsAddMemberModalOpen(false)}
                  style={{
                    padding: '12px 20px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#64748b'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#f8fafc'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{
                    padding: '12px 20px',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                >
                  Add Member
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
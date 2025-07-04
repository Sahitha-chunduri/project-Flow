import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Shield, LogOut, Edit2, Save, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { logout, getAuthToken } = useAuth();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    joinedDate: ''
  });

  const [editValues, setEditValues] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Fetch current user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/user/current', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (response.ok) {
          const user = await response.json();
          const formattedUser = {
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role === 'user' ? 'User' : 
                  user.role === 'admin' ? 'Administrator' : 
                  user.role === 'manager' ? 'Manager' : 'User',
            joinedDate: new Date(user.joinedDate).toLocaleDateString()
          };
          
          setUserData(formattedUser);
          setEditValues({
            username: formattedUser.username,
            email: formattedUser.email,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        } else if (response.status === 401) {
          // Token expired or invalid
          logout();
          navigate('/login');
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, logout, getAuthToken]);

  const handleSaveUsername = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:5000/user/update-username', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username: editValues.username })
      });

      if (response.ok) {
        setUserData(prev => ({ ...prev, username: editValues.username }));
        setIsEditingUsername(false);
        alert('Username updated successfully');
      } else {
        throw new Error('Failed to update username');
      }
    } catch (error) {
      console.error('Error updating username:', error);
      alert('Failed to update username');
    }
  };

  const handleSaveEmail = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:5000/user/update-email', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email: editValues.email })
      });

      if (response.ok) {
        setUserData(prev => ({ ...prev, email: editValues.email }));
        setIsEditingEmail(false);
        alert('Email updated successfully');
      } else {
        throw new Error('Failed to update email');
      }
    } catch (error) {
      console.error('Error updating email:', error);
      alert('Failed to update email');
    }
  };

  const handleChangePassword = async () => {
    if (editValues.newPassword !== editValues.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:5000/user/change-password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ 
          currentPassword: editValues.currentPassword,
          newPassword: editValues.newPassword 
        })
      });

      if (response.ok) {
        alert('Password changed successfully');
        setIsChangingPassword(false);
        setEditValues(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert(error.message || 'Failed to change password');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      // Always call the context logout to clear local state
      logout();
      
      if (response.ok) {
        console.log('Logout successful');
        navigate('/login');
      } else {
        console.error("Server logout failed, but local state cleared");
        // Still navigate to login since we cleared local state
        navigate('/login');
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state and navigate
      logout();
      navigate('/login');
    }
  };

  const handleCancel = (type) => {
    if (type === 'username') {
      setEditValues(prev => ({ ...prev, username: userData.username }));
      setIsEditingUsername(false);
    } else if (type === 'email') {
      setEditValues(prev => ({ ...prev, email: userData.email }));
      setIsEditingEmail(false);
    } else if (type === 'password') {
      setEditValues(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setIsChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Profile Settings</h1>
        <p className="profile-subtitle">Manage your account information and preferences</p>
      </div>

      <div className="profile-content">
        <Card className="profile-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Your basic account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Full Name Display */}
            <div className="profile-field">
              <label className="profile-label">Full Name</label>
              <div className="profile-field-content">
                <div className="profile-display-group">
                  <span className="profile-value">{userData.firstName} {userData.lastName}</span>
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="profile-field">
              <label className="profile-label">Username</label>
              <div className="profile-field-content">
                {isEditingUsername ? (
                  <div className="profile-edit-group">
                    <input
                      type="text"
                      value={editValues.username}
                      onChange={(e) => setEditValues(prev => ({ ...prev, username: e.target.value }))}
                      className="profile-input"
                    />
                    <div className="profile-edit-actions">
                      <Button size="sm" onClick={handleSaveUsername}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleCancel('username')}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="profile-display-group">
                    <span className="profile-value">{userData.username}</span>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditingUsername(true)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="profile-field">
              <label className="profile-label">Email</label>
              <div className="profile-field-content">
                {isEditingEmail ? (
                  <div className="profile-edit-group">
                    <input
                      type="email"
                      value={editValues.email}
                      onChange={(e) => setEditValues(prev => ({ ...prev, email: e.target.value }))}
                      className="profile-input"
                    />
                    <div className="profile-edit-actions">
                      <Button size="sm" onClick={handleSaveEmail}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleCancel('email')}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="profile-display-group">
                    <span className="profile-value">{userData.email}</span>
                    <Button size="sm" variant="ghost" onClick={() => setIsEditingEmail(true)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Role */}
            <div className="profile-field">
              <label className="profile-label">Role</label>
              <div className="profile-field-content">
                <div className="profile-display-group">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="profile-value">{userData.role}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Joined Date */}
            <div className="profile-field">
              <label className="profile-label">Member Since</label>
              <div className="profile-field-content">
                <div className="profile-display-group">
                  <span className="profile-value">{userData.joinedDate}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="profile-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Manage your password and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isChangingPassword ? (
              <div className="profile-field">
                <label className="profile-label">Password</label>
                <div className="profile-field-content">
                  <div className="profile-display-group">
                    <span className="profile-value">••••••••</span>
                    <Button size="sm" variant="outline" onClick={() => setIsChangingPassword(true)}>
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="profile-field">
                  <label className="profile-label">Current Password</label>
                  <input
                    type="password"
                    value={editValues.currentPassword}
                    onChange={(e) => setEditValues(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="profile-input"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="profile-field">
                  <label className="profile-label">New Password</label>
                  <input
                    type="password"
                    value={editValues.newPassword}
                    onChange={(e) => setEditValues(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="profile-input"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="profile-field">
                  <label className="profile-label">Confirm New Password</label>
                  <input
                    type="password"
                    value={editValues.confirmPassword}
                    onChange={(e) => setEditValues(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="profile-input"
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="profile-edit-actions">
                  <Button onClick={handleChangePassword}>Update Password</Button>
                  <Button variant="outline" onClick={() => handleCancel('password')}>Cancel</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="profile-card">
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Manage your session and account</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={handleLogout} className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
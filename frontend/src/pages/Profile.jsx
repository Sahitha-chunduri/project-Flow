import React, { useState } from 'react';
import { User, Mail, Lock, Shield, LogOut, Edit2, Save, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [userData, setUserData] = useState({
    username: 'john_doe',
    email: 'john.doe@example.com',
    role: 'Project Manager',
    joinedDate: '2024-01-15'
  });

  const [editValues, setEditValues] = useState({
    username: userData.username,
    email: userData.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveUsername = () => {
    setUserData(prev => ({ ...prev, username: editValues.username }));
    setIsEditingUsername(false);
  };

  const handleSaveEmail = () => {
    setUserData(prev => ({ ...prev, email: editValues.email }));
    setIsEditingEmail(false);
  };

  const handleChangePassword = () => {
    if (editValues.newPassword !== editValues.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password changed successfully');
    setIsChangingPassword(false);
    setEditValues(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleLogout = () => {
    navigate('/login');
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

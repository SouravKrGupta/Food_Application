import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Profile.css';

const Profile = () => {
  const { url, token } = useContext(AdminContext);
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${url}/api/user/profile`, {
        headers: { token }
      });
      if (response.data.success) {
        setProfile(response.data.data);
      } else {
        toast.error('Failed to fetch profile');
      }
    } catch (error) {
      toast.error('Error fetching profile');
    }
  };

  const updateProfile = async () => {
    try {
      const response = await axios.put(`${url}/api/user/profile`, profile, {
        headers: { token }
      });
      if (response.data.success) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  return (
    <div className='profile'>
      <h2>Admin Profile</h2>
      <div className="profile-form">
        <div className="form-group">
          <label>Name</label>
          {isEditing ? (
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          ) : (
            <p>{profile.name}</p>
          )}
        </div>
        <div className="form-group">
          <label>Email</label>
          <p>{profile.email}</p>
        </div>
        <div className="form-group">
          <label>Phone</label>
          {isEditing ? (
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          ) : (
            <p>{profile.phone}</p>
          )}
        </div>
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button onClick={updateProfile}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
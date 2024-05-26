import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Profile.css';

const Profile = () => {
  const { user, token } = useContext(StoreContext);

  if (!token) {
    return <div>Please log in to see your profile.</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const userDetails = [
    { label: 'Name', value: user.name },
    { label: 'Email', value: user.email },
    { label: 'Phone', value: user.phone },
    // Add more user details here as needed
  ];

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        {userDetails.map((detail, index) => (
          <p key={index}>
            <strong>{detail.label}:</strong> {detail.value}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Profile;

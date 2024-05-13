import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({ movieName: '', email: '' });
  const history = useHistory();

  useEffect(() => {
    // Fetch user details from local storage when the component mounts
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  const updateUserDetails = (details) => {
    // Update user details in local storage and state
    localStorage.setItem('userDetails', JSON.stringify(details));
    setUserDetails(details);
  };

  const clearUserDetails = () => {
    // Clear user details from local storage and reset state
    localStorage.removeItem('userDetails');
    setUserDetails(null);
  };

  return (
    <div className="userdetails">
      {/* Display user details if they exist */}
      {userDetails && (
        <div>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          {/* Display other user details as needed */}
        </div>
      )}

      {/* Example form to update user details */}
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <input
          type="text"
          placeholder="Enter name"
          value={userDetails ? userDetails.name : ''}
          onChange={(e) => updateUserDetails({ ...userDetails, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={userDetails ? userDetails.email : ''}
          onChange={(e) => updateUserDetails({ ...userDetails, email: e.target.value })}
        />
        <button type="submit">Update Details</button>
      </form>

      {/* Button to clear user details */}
      <button onClick={clearUserDetails}>Clear Details</button>
    </div>
  );
};

export default UserDetails;

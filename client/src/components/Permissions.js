import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../context/AuthContext';

export default function Permissions({ onCancel, user }) {
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    setSelectedRoles(user.permissions || []);
  }, [user]);

  const handleRoleToggle = (value) => {
    if (selectedRoles.includes(value)) {
      setSelectedRoles((prevRoles) => prevRoles.filter((role) => role !== value));
    } else {
      setSelectedRoles((prevRoles) => [...prevRoles, value]);
    }
  };

  const permissionsHaveChanged = () => {
    return JSON.stringify(selectedRoles) !== JSON.stringify(user.permissions);
  };
  
  const isSaveDisabled = !permissionsHaveChanged();
  
  const handleSave = () => {
    if (isSaveDisabled) {
       
        return;
      }
    axiosInstance
      .post('/user/permissions', {userId: user._id, selectedRoles} )
      .then((response) => {
        setIsSuccess(true);
        setIsLoading(false);
        setTimeout(() => {
          setIsSuccess(false);
          window.location.reload();
          
     
        }, 2000); 
      })
      .catch((error) => {
     
      });
  };

  return (
    <div className="m-2">
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Select Roles:</label>
        <div className="mt-1">
          <div className="mb-2">
            <label className="inline-flex items-center">
              <div
                className={`${
                  selectedRoles.includes('curator') ? 'bg-blue-500' : 'bg-gray-200'
                } relative inline-flex items-center h-6 rounded-full w-11`}
                onClick={() => handleRoleToggle('curator')}
              >
                <span
                  className={`${
                    selectedRoles.includes('curator') ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full`}
                />
              </div>
              <span className="ml-2">Curator</span>
            </label>
          </div>
          <div className="mb-2">
            <label className="inline-flex items-center">
              <div
                className={`${
                  selectedRoles.includes('admin') ? 'bg-blue-500' : 'bg-gray-200'
                } relative inline-flex items-center h-6 rounded-full w-11`}
                onClick={() => handleRoleToggle('admin')}
              >
                <span
                  className={`${
                    selectedRoles.includes('admin') ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full`}
                />
              </div>
              <span className="ml-2">Admin</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <div
                className={`${
                  selectedRoles.includes('artist') ? 'bg-blue-500' : 'bg-gray-200'
                } relative inline-flex items-center h-6 rounded-full w-11`}
                onClick={() => handleRoleToggle('artist')}
              >
                <span
                  className={`${
                    selectedRoles.includes('artist') ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full`}
                />
              </div>
              <span className="ml-2">Artist</span>
            </label>
          </div>
        </div>
      </div>
      <div className="mt-2">
      {isLoading ? (
          <p>Saving...</p> // Show loading indicator
        ) : isSuccess ? (
          <p className="text-green-500">Permissions saved successfully!</p> // Show success message
        ) : (
          <button
            className={`px-4 py-2 mr-2 font-semibold text-white bg-blue-500 rounded ${
              isSaveDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleSave}
            disabled={isSaveDisabled}
          >
            Save
          </button>
        )}
        <button
          className="px-4 py-2 font-semibold text-white bg-red-500 rounded"
          onClick={() => onCancel()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

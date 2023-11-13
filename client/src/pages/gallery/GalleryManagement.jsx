import React, { useEffect, useState, useCallback } from 'react';
import { axiosInstance } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';


export default function GalleryManagement() {
    const { id } = useParams();
    const [galleryData, setGalleryData] = useState({ gallery: {}, users: [] });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    const fetchGallery = useCallback(async () => {
        try {
          const response = await axiosInstance.get(`/gallery/${id}`);
          setGalleryData(response.data);
        } catch (error) {
          console.error('Error fetching gallery:', error);
        }
      }, [id]);
    
  
      const fetchUsersByName = useCallback(async () => {
        try {
            if (searchTerm.trim() !== '') {
                const response = await axiosInstance.get(
                    `/user?limit=${100}&page=${1}&search=${searchTerm}`,
                );
                setSearchResults(response.data);
            } else {
                // If the search term is empty, set searchResults to an empty array
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [searchTerm]);

    useEffect(() => {
        if(!searchTerm){
            setSearchResults([]);
            
          }
        fetchUsersByName();
    }, [fetchUsersByName, searchTerm]);
    
    useEffect(() => {
      fetchGallery();
    }, [fetchGallery]);
  
    
  
    const handleUserClick = async (userId) => {

      try {
        await axiosInstance.put(`/user/${userId}`, {
          galleryId: id,
          method: 'add'
        });
        setSearchTerm('')
        fetchGallery();
        setSearchResults([]);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };

    const handleRemoveUserClick = async (userId) => {
        try {
            await axiosInstance.put(`/user/${userId}`, {
                galleryId: id,
                method: 'delete'
              });
        
      
          fetchGallery();
          setSearchResults([]);
        } catch (error) {
          console.error('Error removing user:', error);
        }
      };
  
    // Render connected users in a table
    const renderConnectedUsers = () => (
      <table className="w-full border table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border">User</th>
            <th className="px-4 py-2 text-left border">Email</th>
            <th className="px-4 py-2 text-left border">Action</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {galleryData.users.map((user, index) => (
            <tr key={user._id}>
              <td className="px-4 py-2 border">
                {user.firstName && user.firstName} {user.lastName && user.lastName}
              </td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">
                <button
                  className="px-4 py-2 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent"
                  onClick={() => handleRemoveUserClick(user._id)}
                >
                  Remove user
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  
    return (
      <div className="relative m-6">
        {galleryData ? (
          <>
            <h1 className="mb-2 text-3xl">{galleryData.gallery?.displayName}</h1>
            <p>
              <strong>Technical Contact Email:</strong>{' '}
              {galleryData.gallery?.technicalContactEmail}
            </p>
            <p>
              <strong>Technical Contact Phone:</strong>{' '}
              {galleryData.gallery?.technicalContactPhone}
            </p>
  
            <div className="relative mt-4">
              <h3 className="mb-1 text-2xl">Connected Users</h3>
  
              {/* Search form */}
              <div className="relative w-1/4 mb-2">
                <input
                  type="text"
                  placeholder="Search users by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
  
                {/* Display search results as a list */}
                {searchResults.users?.length > 0 && (
                  <ul className="absolute left-0 z-10 p-2 list-none bg-white border rounded top-full">
                    {searchResults.users.map((user) => (
                      <li
                        key={user._id}
                        onClick={() => handleUserClick(user._id)}
                        className="mb-2 border border-gray-300 cursor-pointer hover:bg-gray-200"
                      >
                        <strong className="text-sm">
                          {user.firstName} {user.lastName}
                        </strong>
                        <br />
                        <small className="text-xs text-gray-600">{user.email}</small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
  
              {/* Display connected users in a table */}
              {renderConnectedUsers()}
            </div>
          </>
        ) : (
          <p>Loading gallery information...</p>
        )}
      </div>
    );
  }

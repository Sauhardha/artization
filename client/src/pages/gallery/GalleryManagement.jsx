import React, { useEffect, useState, useCallback } from 'react';
import { axiosInstance } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';


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
      <table className="w-full self-center box-shadow bg-neutral-50 shadow-xl text-lg m-4 rounded-xl table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left ">User</th>
            <th className="px-4 py-2 text-left ">Email</th>
            <th className="px-4 py-2 text-left ">Action</th>
          </tr>
        </thead>
        <tbody className="md:text-base text-xs">
          {galleryData.users.map((user, index) => (
            <tr key={user._id}>
              <td className="px-4 py-2 border-t">
                {user.firstName && user.firstName} {user.lastName && user.lastName}
              </td>
              <td className="px-4 py-2 border-t">{user.email}</td>
              <td className="px-10 py-4 border-t border-l">
                <button
                  className="px-4 py-2 font-semibold text-white bg-red-500 border border-red-500 rounded hover:bg-red-600 hover:text-white hover:border-transparent"
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
      <>
      <Navbar />
      <div className="flex flex-col h-screen GalleryPage mt-12 md:mx-20 mx-4">
        {galleryData ? (
          <>
          <div className="self-start py-8 md:text-5xl text-3xl font-bold headFont">
          
            <h1 className="text-sky-950 uppercase">{galleryData.gallery?.displayName}</h1>
          </div>
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
                   className="w-96 px-4 py-3 border rounded-full mb-4 box-shadow shadow-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                 
                />

                <div className='flex justify-center'>
  
                {/* Display search results as a list */}
                {searchResults.users?.length > 0 && (
                  <ul className=" left-0 z-10 p-2 list-none bg-neutral-50 rounded top-full">
                    {searchResults.users.map((user) => (
                      <li
                        key={user._id}
                        onClick={() => handleUserClick(user._id)}
                        className="mb-2  border-gray-300 cursor-pointer hover:bg-gray-200"
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
              </div>
  
              {/* Display connected users in a table */}
              {renderConnectedUsers()}
            </div>
          </>
        ) : (
          <p>Loading gallery information...</p>
        )}
      </div>
      </>
    );
  }

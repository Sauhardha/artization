import React, { useState, useEffect } from 'react';
import CreateNewGallery from '../../components/CreateNewGallery';
import { axiosInstance } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Galleries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateGallery, setShowCreateGallery] = useState(false);
  const [galleries, setGalleries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalGalleriesCount, setTotalGalleriesCount] = useState(0);
  const itemsPerPage = 10;

  const handleSetupNewClick = () => {
    setShowCreateGallery(true);
  };

  const handleCancelClick = () => {
    setShowCreateGallery(false);
  };

  const fetchGalleries = async () => {
    try {
      const response = await axiosInstance.get(`/gallery?page=${page}&limit=${itemsPerPage}&search=${searchQuery}`);
      setGalleries(response.data.galleries);
      setTotalGalleriesCount(response.data.totalGalleriesCount);
    } catch (error) {
      console.error('Error fetching galleries:', error);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, [page, searchQuery]);

  return (
    <div className="m-2 ">
      <h1 className="text-3xl">Galleries</h1>

      <small>Please manage Portal galleries with this interface.</small>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="w-full px-4 py-3 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="w-full border table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border">Name</th>
            <th className="px-4 py-2 text-left border">Setup since</th>
          </tr>
        </thead>
        <tbody className="text-xs">
  {galleries.map((gallery) => (
    <tr key={gallery._id}>
      <td className="px-4 py-2 border">
        <Link to={`/gallery-management/${gallery._id}`} className="text-blue-500 hover:underline">
          {gallery.displayName}
        </Link>
      </td>
      <td className="px-4 py-2 border">
        {new Date(gallery.createdAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </td>
    </tr>
  ))}
</tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
        <p className="ml-2 text-sm text-gray-500">
          Showing {(page - 1) * itemsPerPage + 1} -{' '}
          {Math.min(page * itemsPerPage, totalGalleriesCount)} of {totalGalleriesCount} galleries
        </p>
        <div>
          <button
            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={page === 1}
            className={`px-2 py-1 mr-2 ${
              page === 1
                ? 'text-gray-400 bg-gray-200'
                : 'text-white bg-blue-500 '
            } rounded`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            disabled={galleries.length < itemsPerPage}
            className={`px-2 py-1 ${
              galleries.length < itemsPerPage
                ? 'text-gray-400 bg-gray-200'
                : 'text-white bg-blue-500 '
            } rounded`}
          >
            Next
          </button>
        </div>
      </div>

      {showCreateGallery ? (
        <CreateNewGallery onCancel={handleCancelClick} />
      ) : (
        <div className="mt-4">
          <button
            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
            onClick={handleSetupNewClick}
          >
            Setup New
          </button>
        </div>
      )}
    </div>
  );
}

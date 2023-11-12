import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../context/AuthContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import Permissions from '../components/Permissions'
import CustomDialog from '../components/CustomDialog'

export default function InternalAdmin() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [showPermissions, setShowPermissions] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [totalCount, setTotalCount] = useState(0)
  const itemsPerPage = 10


  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});

  const openDialog = (title, message, onConfirm) => {
    setDialogData({ title, message, onConfirm });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const disconnectUser = async (user) => {
    openDialog(
      'Confirmation',
      `Are you sure you want to disconnect ${user.userName? user.userName : user.email}?`,
      async () => {
        try {
          await axiosInstance.delete(`/user/${user._id}`);
          // Reload the users after disconnection
          fetchUsers();
        } catch (error) {
          console.error('Error disconnecting user: ', error);
        } finally {
          closeDialog();
        }
      }
    );
  };
  

  useEffect(() => {
    fetchUsers()
    if (user && !user.permissions.includes('admin')) {
      navigate('/home')
    }
  }, [page, searchQuery])

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(
        `/user?limit=${itemsPerPage}&page=${page}&search=${searchQuery}`,
      )
      setUsers(response.data.users)
      setTotalCount(response.data.totalUsersCount)
      setShowPermissions(Array(response.data.users.length).fill(false))
    } catch (error) {
      console.error('Error fetching users: ', error)
    }
  }

  const togglePermissions = (index) => {
    setShowPermissions((prevShowPermissions) => {
      const newShowPermissions = [...prevShowPermissions]
      newShowPermissions[index] = !newShowPermissions[index]
      return newShowPermissions
    })
  }

  const handleCancel = (index) => {
    setShowPermissions((prevShowPermissions) => {
      const newShowPermissions = [...prevShowPermissions]
      newShowPermissions[index] = false
      return newShowPermissions
    })
  }


  return (
    <div className="m-2 ">
      <h1 className="text-3xl">Users</h1>

      <small>Please manage Portal users with this interface.</small>

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
            <th className="px-4 py-2 text-left border">User</th>
            <th className="px-4 py-2 text-left border">Email</th>
            <th className="px-4 py-2 text-left border">Action</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border">
                {user.firstName && user.firstName}{' '}
                {user.lastName && user.lastName}
              </td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">
                {showPermissions[index] ? (
                  <Permissions
                    key={`permissions-${user.id}`}
                    onCancel={() => handleCancel(index)}
                    user={user}
                    fetchUsers={fetchUsers}
                  />
                ) : (
                  <>
                    <button
                      className="px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
                      onClick={() => togglePermissions(index)}
                    >
                      Edit Permissions
                    </button>
                    <button
                    className="px-4 py-2 mr-6 font-semibold text-white bg-red-500 border border-red-500 rounded hover:bg-red-600 hover:border-transparent"
                    onClick={() => disconnectUser(user)}
                  >
                    Disconnect User
                  </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustomDialog
        isOpen={isDialogOpen}
        title={dialogData.title}
        message={dialogData.message}
        onConfirm={dialogData.onConfirm}
        onCancel={closeDialog}
      />

      <div className="flex items-center justify-between mt-4">
        <p className="ml-2 text-sm text-gray-500">
          Showing {(page - 1) * itemsPerPage + 1} -{' '}
          {Math.min(page * itemsPerPage, totalCount)} of {totalCount} users
        </p>
        <div>
          <button
            onClick={() => setPage((prevPage) => prevPage - 1)}
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
            disabled={users.length < itemsPerPage}
            className={`px-2 py-1 mr-2 ${
              users.length < itemsPerPage
                ? 'text-gray-400 bg-gray-200'
                : 'text-white bg-blue-500 '
            } rounded`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

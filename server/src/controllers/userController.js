const User = require('../models/userModel')

const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const search = req.query.search || ''

  try {
    const skip = (page - 1) * limit

    let query = {}
    if (search) {
      query = {
        $or: [
          { email: { $regex: search, $options: 'i' } },
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
        ],
      }
    }

    const totalUsersCount = await User.countDocuments(query)

    const users = await User.find(query)
      .select('firstName lastName email permissions')
      .skip(skip)
      .limit(limit)

    res.status(200).json({
      users: users,
      totalUsersCount: totalUsersCount,
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const setUserPermissions = async (req, res) => {
  try {
    const { userId, selectedRoles } = req.body

    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User does not exist')
    }

    await user.updateOne({ permissions: selectedRoles })
    res.status(200).json({})
  } catch (e) {}
}

const getUserPermissions = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      throw new Error('Id is required')
    }

    const user = await User.findOne({ _id: id }).select('permissions')

    if (!user) {
      return res.status(404).json({ error: 'User does not exist' })
    }

    res.status(200).json(user.permissions || {})
  } catch (e) {
    console.error('Error in getUserPermissions:', e)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const deleteUser = async (req, res) => {
  const userId = req.params.id

  try {
    // Assuming you have a User model with a method like findByIdAndDelete
    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { galleryId, method } = req.body;
    try {
        const _id = id;

        if (method === 'add') {
            const user = await User.findById(_id);
            if (user.galleryId && user.galleryId !== galleryId) {
                return res.status(400).json({ error: 'User is already connected to another gallery' });
            }
        }

        const updateObject = method === 'add' ? { galleryId } : { $unset: { galleryId: 1 } };

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            updateObject,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  

module.exports = {
  getAllUsers,
  setUserPermissions,
  getUserPermissions,
  deleteUser,
  updateUser,
}

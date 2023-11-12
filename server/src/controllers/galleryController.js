const Gallery = require('../models/GalleryModel');
const User = require('../models/userModel')


const getGalleries = async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;

        const skip = (page - 1) * limit;

        let query = {};

        if (search) {
            query = {
                displayName: { $regex: search, $options: 'i' }, 
            };
        }

        const galleries = await Gallery.find(query).skip(skip).limit(parseInt(limit));
        const totalGalleriesCount = await Gallery.countDocuments(query);

        return res.status(200).json({ galleries, totalGalleriesCount });
    } catch (error) {
        console.error('Error fetching galleries:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getGalleries };


const createGallery = async (req, res) => {
  try {
    const { displayName, technicalContactEmail, technicalContactPhone } = req.body;

    if (!displayName || !technicalContactEmail || !technicalContactPhone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newGallery = new Gallery({
      displayName,
      technicalContactEmail,
      technicalContactPhone,
    });

    await newGallery.save();

    return res.status(201).json({ message: 'Gallery created successfully', gallery: newGallery });
  } catch (error) {
    console.error('Error creating gallery:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getOneGallery = async (req, res) => {
  try {
    const galleryId = req.params.id;

    const gallery = await Gallery.findById(galleryId);

    if (!gallery) {
      return res.status(404).json({ error: 'Gallery not found' });
    }

    const users = await User.find({ galleryId });

    return res.status(200).json({ gallery, users });
  } catch (error) {
    console.error('Error fetching gallery details:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getGalleries, createGallery, getOneGallery };

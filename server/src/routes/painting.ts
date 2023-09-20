import express from 'express';
import Painting from '../model/painting/paintingModel';

const router = express.Router();

router.get('/new', async (req, res) => {
  // try {
  //   const paint = await Painting.create(req.body);
  //   res.status(200).json(paint);
  // } catch (error:any) {
  //   res.status(500).json({ message: error.message })
  // }
})

export default router;

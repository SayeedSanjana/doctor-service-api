import express from 'express';
import { doctorList } from '../controllers/DoctorsController.js'
const router = express.Router();
//import upload from '../middleware/upload.js';


// GET: /api/doctors
router.get('/', doctorList);

export default router;
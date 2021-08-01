import express from 'express';
import { doctorList,create, doctor ,doctorAffiliationList} from '../controllers/DoctorsController.js'
const router = express.Router();
import upload from '../middleware/upload.js';


// GET: /api/doctors
router.get('/:page', doctorList);

// POST: /api/doctors/create
router.post('/create', create );

// GET: /api/doctors/:id
router.get('/:id/specific-doctor', doctor);

// GET: /api/doctors/:id
router.get('/:id/doctor-affiliationList', doctorAffiliationList);


export default router;
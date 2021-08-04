import express from 'express';
import { doctorList,create, doctor ,doctorAffiliationList,update, addEducation, updateEducation, removeEducation, addAffiliations, addSchedule, addRole, updateAffiliation} from '../controllers/DoctorsController.js'
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

// PUT: /api/doctors/:id/update
router.put('/:id/update', update);


// POST: /api/doctors/:id/add-doctor-education
router.post('/:id/add-doctor-education', addEducation);

// PUT: /api/doctors/:id/:eid/update-doctor-education
router.put('/:id/:eid/update-doctor-education', updateEducation);

// DELETE: /api/doctors/:id/:eid/remove-doctor-education
router.delete('/:id/:eid/remove-doctor-education', removeEducation);

// POST: /api/doctors/:id/add-doctor-affiliation
router.post('/:id/add-doctor-affiliation', addAffiliations);

// POST: /api/doctors/:id/:affid/add-schedule
router.post('/:id/:affid/add-schedule', addSchedule);

// POST: /api/doctors/:id/:affid/add-role
router.post('/:id/:affid/add-role', addRole);


// PUT: /api/doctors/:id/:affid/update-doctor-affiliation
router.put('/:id/:affid/update-doctor-affiliation', updateAffiliation);






export default router;
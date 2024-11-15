import express from 'express';
import { doctorList,create, doctor ,doctorAffiliationList,update, addEducation, updateEducation, removeEducation, addAffiliations, addSchedule, addRole, updateAffiliation, updateSchedule, updateRole, updateAffiliationAddress, removeSchedule, removeAffiliationAddress, removeRole, removeAffiliation, updateAddress, removeAddress, updateProfileImage, doctorAffiliation} from '../controllers/DoctorsController.js'
const router = express.Router();
import upload from '../middleware/upload.js';
import {validateRequestSchema} from '../middleware/validate-request-schema.js';
import {doctorSchemaValidator,doctorEducationValidator,doctorAffiliationValidator,doctorScheduleValidator} from '../middleware/doctor-schema.js';


// GET: /api/doctors
router.get('/', doctorList);

// POST: /api/doctors/create
router.post('/create', doctorSchemaValidator,validateRequestSchema, create );

// GET: /api/doctors/:id
router.get('/:id', doctor);

// GET: /api/doctors/:id
router.get('/:id/doctor-affiliationList', doctorAffiliationList);

// GET: /api/doctors/:id/:affid
router.get('/:id/:affid/doctor-specific-affiliation', doctorAffiliation);

// PUT: /api/doctors/:id/update
router.put('/:id/update', update);

// PUT: /api/doctors/:id/update-address
router.put('/:id/update-address', updateAddress);

// DELETE: /api/doctors/:id/remove-address
router.delete('/:id/remove-address', removeAddress);

// POST: /api/doctors/:id/add-doctor-education
router.post('/:id/add-doctor-education',doctorEducationValidator,validateRequestSchema, addEducation);

// PUT: /api/doctors/:id/:eid/update-doctor-education
router.put('/:id/:eid/update-doctor-education', updateEducation);

// DELETE: /api/doctors/:id/:eid/remove-doctor-education
router.delete('/:id/:eid/remove-doctor-education', removeEducation);

// POST: /api/doctors/:id/add-doctor-affiliation
router.post('/:id/add-doctor-affiliation',doctorAffiliationValidator,validateRequestSchema, addAffiliations);

// POST: /api/doctors/:id/:affid/add-schedule
router.post('/:id/:affid/add-schedule',doctorScheduleValidator,validateRequestSchema,addSchedule);

// POST: /api/doctors/:id/:affid/add-role
router.post('/:id/:affid/add-role', addRole);

// PUT: /api/doctors/:id/:affid/update-doctor-affiliation
router.put('/:id/:affid/update-doctor-affiliation', updateAffiliation);

// PUT: /api/doctors/:id/:affid/:schid/update-doctor-schedule
router.put('/:id/:affid/:schid/update-doctor-schedule', updateSchedule);

// PUT: /api/doctors/:id/:affid/:roleid/update-doctor-role
router.put('/:id/:affid/:roleid/update-doctor-role', updateRole);

// PUT: /api/doctors/:id/:affid/:roleid/update-doctor-affiliation-address
router.put('/:id/:affid/update-doctor-affiliation-address', updateAffiliationAddress);

// DELETE: /api/doctors/:id/:affid/:schid/remove-schedule
router.delete('/:id/:affid/:schid/remove-schedule', removeSchedule);

// DELETE: /api/doctors/:id/:affid/remove-affiliation-address
router.delete('/:id/:affid/remove-affiliation-address', removeAffiliationAddress);

// DELETE: /api/doctors/:id/:affid/remove-role
router.delete('/:id/:affid/remove-role', removeRole);

// DELETE: /api/doctors/:id/:affid/remove-affiliation
router.delete('/:id/:affid/remove-affiliation', removeAffiliation);

// PUT: /api/doctors/:id/update-profile-image
router.put('/:id/update-profile-image', upload.single("images"),updateProfileImage);



export default router;
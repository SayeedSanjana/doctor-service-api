import express from 'express';
import { doctorList,create, doctor ,doctorAffiliationList,update, addEducation, updateEducation, removeEducation, addAffiliations, addSchedule, addRole, updateAffiliation, updateSchedule, updateRole, updateAffiliationAddress, removeSchedule, removeAffiliationAddress, removeRole, removeAffiliation, updateAddress, removeAddress, updateProfileImage, doctorAffiliation} from '../controllers/DoctorsController.js'
const router = express.Router();
import upload from '../middleware/upload.js';
import {validateRequestSchema} from '../middleware/validate-request-schema.js';
import {doctorSchemaValidator,doctorEducationValidator,doctorAffiliationValidator,doctorScheduleValidator} from '../middleware/doctor-schema.js';




/**
 * @swagger
 * /api/doctors:
 *  get:
 *      summary: Represents all doctors
 *      description: returns the doctor list
 *      tags:
 *          - Doctor's Basic Profile
 *      responses:
 *          200:
 *            description: list of all doctors
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Displaying Results"
 *                    result:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          _id:
 *                            type: integer
 *                            description: The user ID.
 *                            example: 0
 *                          firstName:
 *                            type: string
 *                            description: The user's first name.
 *                            example: Leanne 
 *                          lastName:
 *                            type: string
 *                            description: The user's last name.
 *                            example: Graham 
 *                          contact:
 *                            type: string
 *                            description: The user's contact.
 *                            example: +880-123-456-7890 
 *                          dob:
 *                            type: date
 *                            example: 1990-10-12  
 *                          gender:
 *                            type: string
 *                            description: The user's gender.
 *                            example: female 
 *                          religion:
 *                            type: string
 *                            description: The user's religion.
 *                            example: long cucumber 
 *                          bloodGroup:
 *                            type: string
 *                            description: The user's contact.
 *                            example: O +ve 
 *                          nationality:
 *                            type: string
 *                            description: The user's nationality.
 *                            example: no mans land 
 *                          address:
 *                            type: object
 *                            properties:
 *                                _id:
 *                                  type: string
 *                                  example: 1
 *                               
 *                                country:
 *                                  type: string
 *                                  example: Wano
 *                                city:
 *                                  type: string
 *                                  example: Onigashima
 *                                area:
 *                                  type: string
 *                                  example: kaido's place
 *                                zipcode:
 *                                  type: string
 *                                  example: 1207
 *                                location:
 *                                  type: object
 *                                  properties:
 *                                    type:
 *                                      type: string
 *                                      example: point
 *                                    coordinates:
 *                                      type: array
 *                                      example: [91.1112, 84.3223]
 *                          duuid:
 *                            type: string
 *                            description: The user's nationality.
 *                            example: D00000001
 *  
 * 
 */

// GET: /api/doctors
router.get('/', doctorList);


/**
 * @swagger
 * /api/doctors/create:
 *   post:
 *     summary: creates general info of doctors.
 *     description: when called creates a general profile for the corresponding doctors
 *     tags:
 *       - Doctor's Basic Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name.
 *                 example: Leanne 
 *               lastName:
 *                 type: string
 *                 description: The user's last name.
 *                 example: Graham 
 *               contact:
 *                 type: string
 *                 description: The user's contact.
 *                 example: +880-123-456-7890 
 *               dob:
 *                 type: date
 *                 example: 1990-10-12 
 *               gender:
 *                 type: string
 *                 description: The user's gender.
 *                 example: female 
 *               religion:
 *                 type: string
 *                 description: The user's religion.
 *                 example: long cucumber 
 *               bloodGroup:
 *                 type: string
 *                 description: The user's contact.
 *                 example: O +ve 
 *               nationality:
 *                 type: string
 *                 description: The user's nationality.
 *                 example: no mans land 
 *               address:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                     example: Wano
 *                   city:
 *                     type: string
 *                     example: Onigashima
 *                   area:
 *                     type: string
 *                     example: kaido's place
 *                   zipcode:
 *                     type: string
 *                     example: 1207
 *                   location:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: point
 *                       coordinates:
 *                         type: array
 *                         example: [91.1112, 84.3223]
 *               duuid:
 *                 type: string
 *                 description: The user's nationality.
 *                 example: D00000001
 *     responses:
 *       201:
 *         description: General profile created
 *       403:
 *         description: Error Occured During Creating Information
 *         
 */

// POST: /api/doctors/create
router.post('/create', doctorSchemaValidator,validateRequestSchema, create );


/**
 * @swagger
 * /api/doctors/{id}:
 *   get:
 *     summary: Retrieve a single doctor.
 *     description: Retrieve a single doctor based on id or duuid.
 *     tags:
 *       - Doctor's Basic Profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Displaying Results"
 *                    result:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          _id:
 *                            type: integer
 *                            description: The user ID.
 *                            example: 0
 *                          firstName:
 *                            type: string
 *                            description: The user's first name.
 *                            example: Leanne 
 *                          lastName:
 *                            type: string
 *                            description: The user's last name.
 *                            example: Graham 
 *                          contact:
 *                            type: string
 *                            description: The user's contact.
 *                            example: +880-123-456-7890
 *                          dob:
 *                            type: date
 *                            example: 1990-10-12  
 *                          gender:
 *                            type: string
 *                            description: The user's gender.
 *                            example: female 
 *                          religion:
 *                            type: string
 *                            description: The user's religion.
 *                            example: long cucumber 
 *                          bloodGroup:
 *                            type: string
 *                            description: The user's contact.
 *                            example: O +ve 
 *                          nationality:
 *                            type: string
 *                            description: The user's nationality.
 *                            example: no mans land 
 *                          address:
 *                            type: object
 *                            properties:
 *                                _id:
 *                                  type: string
 *                                  example: 1                   
 *                                country:
 *                                  type: string
 *                                  example: Wano
 *                                city:
 *                                  type: string
 *                                  example: Onigashima
 *                                area:
 *                                  type: string
 *                                  example: kaido's place
 *                                zipcode:
 *                                  type: string
 *                                  example: 1207
 *                                location:
 *                                  type: object
 *                                  properties:
 *                                    type:
 *                                      type: string
 *                                      example: point
 *                                    coordinates:
 *                                      type: array
 *                                      example: [91.1112, 84.3223]
 *                          duuid:
 *                            type: string
 *                            description: The user's nationality.
 *                            example: D00000001
 */

// GET: /api/doctors/:id
router.get('/:id', doctor);

// GET: /api/doctors/:id
router.get('/:id/doctor-affiliationList', doctorAffiliationList);

// GET: /api/doctors/:id/:affid
router.get('/:id/:affid/doctor-specific-affiliation', doctorAffiliation);


/**
 * @swagger
 * /api/doctors/{id}/update:
 *   put:
 *     summary: updates general info of doctors.
 *     description: when called updates a general profile of the patients except profile picture, address, education and affiliation
 *     tags:
 *       - Doctor's Basic Profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name.
 *                 example: Leanne 
 *               lastName:
 *                 type: string
 *                 description: The user's last name.
 *                 example: Graham 
 *               contact:
 *                 type: string
 *                 description: The user's contact.
 *                 example: +880-123-456-7890 
 *               dob:
 *                 type: date
 *                 example: 1990-10-12 
 *               gender:
 *                 type: string
 *                 description: The user's gender.
 *                 example: female 
 *               religion:
 *                 type: string
 *                 description: The user's religion.
 *                 example: long cucumber 
 *               bloodGroup:
 *                 type: string
 *                 description: The user's contact.
 *                 example: O +ve 
 *               nationality:
 *                 type: string
 *                 description: The user's nationality.
 *                 example: no mans land       
 *     responses:
 *       200:
 *         description: Your General Information has been updated
 *       400:
 *         description: Something went wrong
 */


// PUT: /api/doctors/:id/update
router.put('/:id/update', update);

/**
 * @swagger
 * /api/doctors/{id}/update-address:
 *   put:
 *     summary: updates doctor's address.
 *     description: updates doctor address. any field empty will be removed automatically and any field not passed will remain same as before
 *     tags:
 *       - Doctor's Basic Profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: object
 *                 properties:                             
 *                   country:
 *                     type: string
 *                     example: Wano
 *                   city:
 *                     type: string
 *                     example: Onigashima
 *                   area:
 *                     type: string
 *                     example: kaido's place
 *                   zipcode:
 *                     type: string
 *                     example: 1207
 *                   location:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: point
 *                       coordinates:
 *                         type: array
 *                         example: [91.1112, 84.3223]         
 *     responses:
 *       200:
 *         description: Doctor Address Updated
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Displaying Results"
 *                    result:
 *                      type: object
 *                      properties:
 *                        address:
 *                          type: object
 *                          properties:
 *                            _id:
 *                              type: string
 *                              example: 1  
 *                            country:
 *                              type: string
 *                              example: Wano
 *                            city:
 *                              type: string
 *                              example: Onigashima
 *                            area:
 *                              type: string
 *                              example: kaido's place
 *                            zipcode:
 *                              type: string
 *                              example: 1207
 *                            location:
 *                              type: object
 *                              properties:
 *                                type:
 *                                  type: string
 *                                  example: point
 *                                coordinates:
 *                                  type: array
 *                                  example: [91.1112, 84.3223]
 *       400:
 *         description: Something went wrong
 *         
 */

// PUT: /api/doctors/:id/update-address
router.put('/:id/update-address', updateAddress);


/**
 * @swagger
 * /api/doctors/{id}/remove-address:
 *   delete:
 *     summary: deletes doctor address.
 *     description: deletes doctor address 
 *     tags:
 *       - Doctor's Basic Profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.        
 *     responses:
 *       200:
 *         description: Address Removed
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Address Removed
 *                    result:
 *                      type: object
 *                      properties:
 *                        address:
 *                          type: object
 *                          properties:
 *                            _id:
 *                              type: string
 *                              example: 1
 *                            country:
 *                              type: string
 *                              example: Wano
 *                            city:
 *                              type: string
 *                              example: Onigashima
 *                            area:
 *                              type: string
 *                              example: kaido's place
 *                            zipcode:
 *                              type: string
 *                              example: 1207
 *                            location:
 *                              type: object
 *                              properties:
 *                                type:
 *                                  type: string
 *                                  example: point
 *                                coordinates:
 *                                  type: array
 *                                  example: [91.1112, 84.3223]
 *       400:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Error! Address does not exist
 *                    result:
 *                      type: object
 *                      properties:
 *                        address:
 *                          type: object
 *                          properties:         
 *       403:
 *         description: Error Occured!! During Removing Address
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Error Occured!! During Removing Address
 *                    result:
 *                      type: object
 *                      properties:
 *                        address:
 *                          type: object
 *                          properties:
 */



// DELETE: /api/doctors/:id/remove-address
router.delete('/:id/remove-address', removeAddress);


/**
 * @swagger
 * /api/doctors/{id}/add-doctor-education:
 *   post:
 *     summary: add education of doctor.
 *     tags:
 *       - Doctor's Basic Profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:                           
 *                 education:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       degreeTitle:
 *                         type: string
 *                         example: MBBS
 *                       graduationYear:
 *                         type: date
 *                         example: 2019-09-08
 *                       institution:
 *                         type: string
 *                         example: DMC         
 *     responses:
 *       201:
 *         description: Education Added
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Education Added
 *                    result:
 *                      type: object
 *                      properties:
 *                        education:
 *                          type: array
 *                          items:
 *                            type: object
 *                            properties:
 *                              _id:
 *                                type: string
 *                                example: 1
 *                              degreeTitle:
 *                                type: string
 *                                example: MBBS
 *                              graduationYear:
 *                                type: date
 *                                example: 2019-08-09
 *                              institution:
 *                                type: string
 *                                example: DMC
 *       406:
 *         description: Education already exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Education already exist
 *       400:
 *         desctiption: Something went wrong (Bad Request)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *                 error:
 *                   type: object
 *                   example: {}           
 */

// POST: /api/doctors/:id/add-doctor-education
router.post('/:id/add-doctor-education',doctorEducationValidator,validateRequestSchema, addEducation);


/**
 * @swagger
 * /api/doctors/{id}/{eid}/update-doctor-education:
 *   put:
 *     summary: update education of doctor.
 *     tags:
 *       - Doctor's Basic Profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *       - in: path
 *         name: eid
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               degreeTitle:
 *                 type: string
 *                 example: MBBS
 *               graduationYear:
 *                 type: date
 *                 example: 2019-08-09
 *               institution:
 *                 type: string
 *                 example: DMC         
 *     responses:
 *       200:
 *         description: Education updated
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Education updated
 *                    result:
 *                      type: object
 *                      properties:
 *                        education:
 *                          type: array
 *                          items:
 *                            type: object
 *                            properties:
 *                              _id:
 *                                type: string
 *                                example: 1
 *                              degreeTitle:
 *                                type: string
 *                                example: MBBS
 *                              graduationYear:
 *                                type: string
 *                                example: 2019-09-08
 *                              institution:
 *                                type: string
 *                                example: DMC
 *       406:
 *         description: Education already exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Education already exist
 *       400:
 *         desctiption: Something went wrong (Bad Request)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *                 error:
 *                   type: object
 *                   example: {}           
 */
// PUT: /api/doctors/:id/:eid/update-doctor-education
router.put('/:id/:eid/update-doctor-education', updateEducation);


/**
 * @swagger
 * /api/doctors/{id}/{eid}/remove-doctor-education:
 *   delete:
 *     summary: remove education.
 *     description: remove education - only one can be removed at a time 
 *     tags:
 *       - Doctor's Basic Profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *       - in: path
 *         name: eid
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: Education Deleted
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Education Deleted
 *                    result:
 *                      type: object
 *                      properties:
 *                        education:
 *                          type: array
 *                          items:
 *                            type: object
 *                            properties:
 *                              _id:
 *                                type: string
 *                                example: 1
 *                              degreeTitle:
 *                                type: string
 *                                example: MBBS
 *                              graduationYear:
 *                                type: date
 *                                example: 2019-09-08
 *                              institution:
 *                                type: string
 *                                example: DMC
 *       400:
 *         desctiption: Something went wrong (Bad Request)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *                 error:
 *                   type: object
 *                   example: {}           
 */


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



/**
 * @swagger
 * /api/doctors/{id}/update-profile-image:
 *   put:
 *     summary: add or update profile image .
 *     description: add or update profile picture
 *     tags:
 *       - Doctor's Basic Profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: alpha numeric ID of the user to retrieve.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               duuid:
 *                 type: string
 *                 example: D000000001
 *               images:
 *                 type: string
 *                 format: binary
 *               
 *     responses:
 *       200:
 *         description: Profile picture updated
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Profile picture updated
 *                    result:
 *                      type: string
 *                      example: "uploads\\patients\\img-undefined\\1627564544677.png"
 *       400:
 *         desctiption: Something went wrong (Bad Request)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *                 error:
 *                   type: object
 *                   example: {}           
 */


// PUT: /api/doctors/:id/update-profile-image
router.put('/:id/update-profile-image', upload.single("images"),updateProfileImage);



export default router;
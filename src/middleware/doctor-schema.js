
import {check} from 'express-validator';

const doctorSchema=[

  
  check('firstName','Please enter your first name').notEmpty().isAlpha(),
  check('lastName').optional().isAlpha(),
  check('contact','Please enter valid phone number').isMobilePhone().notEmpty().withMessage('Please enter phone number'),
  check('gender','Please enter your gender').notEmpty().isAlpha(),
  check('religion','Please enter religion').notEmpty().isAlpha(),
  check('nationality','Please enter your nationality').notEmpty().isAlpha(),
  check('nid').optional().isString(),
  check('bloodGroup','Please enter your blood group').notEmpty().isString(),
  check('dob','Please enter date of birth').notEmpty().isDate().withMessage('Please enter valid date of birth'),
  check('address.country','Please enter the country name').notEmpty().isAlpha(),
  check('address.area','Please enter the area name').notEmpty().isAlpha(),
  check('address.city','Please enter the city name').notEmpty().isAlpha(),
  check('address.zipcode','Please enter valid zipcode').notEmpty().isString().isLength({ min: 4,max:4 }).withMessage('zipcode must be 4 characters')
  
 
  //check('address.*.zipcode').notEmpty().isPostalCode().withMessage('Please enter a valid zip code')


];



//----------------------------------------------------------------------------------------------------------------------------

const doctorEducation=[
  check('education.*.degreeTitle','Please enter degree title').notEmpty().isString(),
  check('education.*.graduationYear','Please enter graduation year').notEmpty().isDate(),
  check('education.*.institution','Please enter institution').notEmpty().isString()
];




//--------------------------------------------------------------------------------------------------------------------

const doctorAffiliation=[
  
  check('affiliations.*.organizationId','Please enter organization id').notEmpty().isString(),
  check('affiliations.*.organizationName','Please enter organization name').notEmpty().isString(),
  check('affiliations.*.address.country','Please enter the country name').notEmpty().isAlpha(),
  check('affiliations.*.address.area','Please enter the area name').notEmpty().isAlpha(),
  check('affiliations.*.address.city','Please enter the city name').notEmpty().isAlpha(),
  check('affiliations.*.address.zipcode','Please enter valid zipcode').notEmpty().isString().isLength({ min: 4,max:4 }).withMessage('zipcode must be 4 characters'),
  check('affiliations.*.schedule.*.day','Please enter day').notEmpty().isAlpha(),
  check('affiliations.*.schedule.*.startTime','Please enter start time').notEmpty().isString(),
  check('affiliations.*.schedule.*.endTime','Please enter end time').notEmpty().isString()
  
];


//--------------------------------------------------------------------------------------------------------------------------------

const doctorSchedule=[

  check('schedule.*.day','Please enter day').notEmpty().isString(),
  check('schedule.*.startTime','Please enter start time').notEmpty().isString(),
  check('schedule.*.endTime','Please enter end time').notEmpty().isString()

];




export {
  doctorSchema as doctorSchemaValidator,
  doctorEducation as doctorEducationValidator,
  doctorAffiliation as doctorAffiliationValidator,
  doctorSchedule as doctorScheduleValidator
};
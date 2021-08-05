import {Doctor} from "../models/Doctor.js";
import mongoose from "mongoose";
import {convertToDotNotation,removeObjKeyValueNull,reshape} from "../helpers/reshape.js";
import moment from "moment";
//import upload from "../middleware/upload.js";
//Get Doctor List
export const doctorList = async (req, res, next) => {
  try {
    let docList = '';
    const resPerPage = 2; // results per page
    const page = req.params.page; // Page 
    //console.log(page);

    if (Object.keys(req.query).length > 0) {
      const search = req.query.search;
      if (mongoose.Types.ObjectId.isValid(search)) {
        docList = await Doctor.findById(search);

      } else {
        docList = await Doctor.find({

            $or: [

              {
                duuid: {
                  $regex: search,
                  $options: '$i'
                }
              },
              {
                firstName: {
                  $regex: search,
                  $options: '$i'
                }
              },
              {
                lastName: {
                  $regex: search,
                  $options: '$i'
                }
              },
              {
                contact: {
                  $regex: search,
                  $options: '$i'
                }
              },
            ]

          }).skip((resPerPage * page) - resPerPage)
          .limit(resPerPage);
      }
    } else {

      docList = await Doctor.find({})
        .skip((resPerPage * page) - resPerPage)
        .limit(resPerPage);
    }


    res.status(200).json({
      message: "Displaying Results",
      result: docList
    })

    next();
  } catch (err) {
    res.status(400).json({
      error: err
    });
    next(err);
  }

};

//-----------------------------------------------------------------------------------------------------------------------------

//Get Specific Doctor 
export const doctor = async (req, res, next) => {
  let doctor = '';
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {

      doctor = await Doctor.findById(req.params.id);

    } else {

      doctor = await Doctor.findOne({
        duuid: req.params.id
      });

    }

    res.status(200).json({
      message: "Displaying Result",
      result: doctor
    });
    next();

  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err
    });
    next(err);
  }
};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Get Specific Doctor Affiliation Lists
export const doctorAffiliationList = async (req, res, next) => {
  let doctor = '';
  try {


    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      doctor = await Doctor.findById(req.params.id).select('affiliations');
    } else {
      doctor = await Doctor.findOne({
        duuid: req.params.id
      }).select('affiliations');

    }

    res.status(200).json({
      message: "Displaying Result",
      result: doctor
    });
    next();

  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err
    });
    next(err);
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------

//Create Doctor
export const create = async (req, res, next) => {

  try {

    const existDoctor = await Doctor.findOne({
      duuid: req.body.duuid
    });

    if (existDoctor) {
      res.status(403).json("Doctor General Info Already Exist");

    } else {
      //if there exists image file

      if (req.file) {
        req.body.images = req.file.path;

      }

      const newDoctorInfoCreate = await Doctor.create(req.body);

      res.status(201).json({
        message: "User Information Created",
        result: newDoctorInfoCreate
      });
    }
    next();

  } catch (err) {

    res.status(400).json({
      message: "Error Occured During Creating General Information",
      error: err

    });
    next(err);

  }

};

//-----------------------------------------------------------------------------------------------------------------------------------------

//update general information of the doctor except address, education,images,affiliations and role

export const update = async (req, res, next) => {

  try {
    // parameters that should be dropped when reaching this api

    const dropParams = ['address', 'education', 'images', 'affiliations'];

    // only call reshape if any of the drop params exist
    let existParams = Object.keys(req.body).some(item => dropParams.includes(item));
    console.log(existParams);
    const requestBody = existParams ? reshape(req.body, dropParams) : req.body;
    //console.log(requestBody);

    let doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      requestBody, {
        runValidators: true,
        new: true
      }
    );
    //console.log("---------",doctor)

    doctor = reshape(doctor.toObject(), dropParams);

    //console.log(doctor);
    res.status(201).json({
      message: "Your General Information has been updated",
      result: doctor
    });
    next();

  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err
    });
    next(err);
  }

};

//--------------------------------------------------------------------------------------------------------------------------------------------------

//add education of doctors

export const addEducation = async (req, res, next) => {

  try {

    let addEducation = req.body.education;


    let doctor = await Doctor.findById(req.params.id);

    doctor = doctor.education;
    //console.log(doctor);


    if (doctor.length == 0) {
      const doctorEducationQualification = await Doctor.findByIdAndUpdate({
        _id: req.params.id
      }, {
        $set: {
          education: addEducation

        }
      }, {
        new: true
      });
      res.status(201).json({
        message: "Added",
        result: doctorEducationQualification.education
      });

    } else {

      let result = addEducation.filter(v => !doctor.some(u => (u.degreeTitle.toLowerCase().replace(/[^a-zA-Z ]/g, "") === v.degreeTitle.toLowerCase().replace(/[^a-zA-Z ]/g, ""))));
      console.log(result)
      if (result.length > 0) {

        const doctorDegree = await Doctor.findByIdAndUpdate({
          _id: req.params.id
        }, {

          $push: {
            education: result
          }
        }, {
          new: true
        });
        res.status(201).json({
          message: "Education Added",
          result: doctorDegree.education
        });

      } else {
        res.status(409).json({
          message: "Information regarding this degree already exist"
        });
      }

    }
    next();
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong!",
      error: err
    });
    next(err);
  }
};

//--------------------------------------------------------------------------------------------------------------------

//update existing education field of a doctor

export const updateEducation = async (req, res, next) => {

  try {

    let updateEducation = req.body;
    //console.log(updateEducation);

    // fetching education of doctor
    let doctorEducation = await Doctor.findById(req.params.id).select({
      'education': 1,
      '_id': 0
    }).lean();

    //console.log(doctorEducation);

    //check existence of the similar  degree in education
    doctorEducation.education.forEach(item => {
      if (item.degreeTitle.toLowerCase().replace(/[^a-zA-Z ]/g, "") === (req.body.degreeTitle).toLowerCase().replace(/[^a-zA-Z ]/g, "")) {
        res.status(409).json({
          message: "Degree Title already exist"
        });
        next();
      }
    });

    //get index of the matched object passed in the parameter
    let idx = 0;
    doctorEducation.education.forEach((item, index) => {

      if (JSON.stringify(item._id) === JSON.stringify(req.params.eid)) return idx = index;

    });
    //console.log(idx);

    let prefix = "education." + idx + ".";

    let requestBody = convertToDotNotation(updateEducation, {}, prefix);
    console.log(requestBody);

    //request body filter any key value null
    removeObjKeyValueNull(requestBody);

    console.log(requestBody);


    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id, {
        $set: requestBody
      }, {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Education updated",
      result: doctor.education
    });

    next();


  } catch (err) {
    res.status(400).json({
      message: "Something went wrong!",
      error: err
    });
    next(err);
  }
};

//------------------------------------------------------------------------------------------------------------------

//remove education of doctor

export const removeEducation = async (req, res, next) => {
  try {

    const doctor = await Doctor.findByIdAndUpdate({
      _id: mongoose.Types.ObjectId(req.params.id)
    }, {
      $pull: {
        education: {
          _id: mongoose.Types.ObjectId(req.params.eid)
        }
      }
    }, {
      new: true,
      safe: true
    })
    res.status(200).json({
      message: "Education has been deleted",
      result: doctor.education
    });
    next();

  } catch (err) {
    res.status(403).json({
      message: "Education cannot be deleted",
      error: err
    });
    next(err);
  }
};

//------------------------------------------------------------------------------------------------------------------


export const addAffiliations = async (req, res, next) => {
  try {

    let addAffiliation = req.body.affiliations;
    //console.log(addAffiliation);


    let doctor = await Doctor.findById(req.params.id);

    doctor = doctor.affiliations;
    console.log(doctor);


    if (doctor.length == 0) {
      const doctorAffiliation = await Doctor.findByIdAndUpdate({
        _id: req.params.id
      }, {
        $set: {
          affiliations: addAffiliation

        }
      }, {
        new: true
      });
      res.status(201).json({
        message: "Added",
        result: doctorAffiliation.affiliations
      });
    } else {

      let result = addAffiliation.filter(v => !doctor.some(u => (u.organizationId.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "") === v.organizationId.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, ""))));
      console.log(result)
      if (result.length > 0) {

        const doctorAffiliation = await Doctor.findByIdAndUpdate({
          _id: req.params.id
        }, {

          $push: {
            affiliations: result
          }
        }, {
          new: true
        });
        res.status(201).json({
          message: "Affiliation Added",
          result: doctorAffiliation.affiliations
        });

      } else {
        res.status(409).json({
          message: "Affiliation already exist"
        });
      }

    }
    next();
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong!",
      error: err
    });
    next(err);
  }
};

// -----------------------------------------------------------------------------------------------------------------------

//add schedule to specific affiliation

export const addSchedule = async (req, res, next) => {
  try {
    let addSchedule = req.body.schedule;
    //console.log("Add Schedule",addSchedule);


    let doctorAffiliation = await Doctor.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
      "affiliations._id": mongoose.Types.ObjectId(req.params.affid)
    }).select({
      'affiliations': 1,
      '_id': 0
    }).lean();


    //get index of the matched affiliation object Id  passed in the parameter

    let idx = 0;
    doctorAffiliation.affiliations.forEach((item, index) => {

      if (JSON.stringify(item._id) === JSON.stringify(req.params.affid)) return idx = index;

    });
    //console.log(idx);

    //chossing the schedule array of the matched affiliation 

    doctorAffiliation = doctorAffiliation.affiliations[idx].schedule;

    //deleting _id from each object stored in achedule array so that it matches with the req.body
    doctorAffiliation.forEach(a => delete a._id);
    //console.log("Doctor Affilliation",doctorAffiliation);


    let result = addSchedule.filter(v => !doctorAffiliation.some(u => (u.day.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "") === v.day.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "") &&
      u.startTime === v.startTime &&
      u.endTime === v.endTime)));
    //console.log("-------",result);

    if (result.length > 0) {

      const doctor = await Doctor.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(req.params.id),
        "affiliations._id": mongoose.Types.ObjectId(req.params.affid),
      }, {
        $push: {
          "affiliations.$.schedule": result
        }
      });


      res.status(201).json({
        message: "Schedule Added",
        result: doctor.affiliation
      });


    } else {
      res.status(406).json({
        message: "Schedule Already Exist",
      });
    }

    next();
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong!",
      error: err
    });
    next(err);
  }
};




// -----------------------------------------------------------------------------------------------------------------------

//add role of a doctor to specific affiliation

export const addRole = async (req, res, next) => {
  try {
    let addRole = req.body.role;


    let doctorAffiliation = await Doctor.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
      "affiliations._id": mongoose.Types.ObjectId(req.params.affid)
    }).select({
      'affiliations': 1,
      '_id': 0
    }).lean();


    //get index of the matched affiliation object Id  passed in the parameter

    let idx = 0;
    doctorAffiliation.affiliations.forEach((item, index) => {

      if (JSON.stringify(item._id) === JSON.stringify(req.params.affid)) return idx = index;

    });
    //console.log(idx);

    //chossing the schedule array of the matched affiliation 

    doctorAffiliation = doctorAffiliation.affiliations[idx].role;

    // //deleting _id from each object stored in achedule array so that it matches with the req.body
    // doctorAffiliation.forEach(a => delete a._id);
    // //console.log("Doctor Affilliation",doctorAffiliation);


    let result = addRole.filter(v => !doctorAffiliation.some(u => (u.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "") === v.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, ""))));
    //console.log("-------",result);

    if (result.length > 0) {

      const doctor = await Doctor.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(req.params.id),
        "affiliations._id": mongoose.Types.ObjectId(req.params.affid),
      }, {
        $push: {
          "affiliations.$.role": result
        }
      });


      res.status(201).json({
        message: "Role Added",
        result: doctor.role
      });


    } else {
      res.status(406).json({
        message: "Role Already Exist",
      });
    }

    next();
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong!",
      error: err
    });
    next(err);
  }
};




//------------------------------------------------------------------------------------------------------

//update affiliation except schedule, address and role

export const updateAffiliation = async (req, res, next) => {

  try {
    // parameters that should be dropped when reaching this api
    let updateAffiliations = req.body;

    const dropParams = ['schedule', 'role', 'address'];

    // only call reshape if any of the drop params exist
    let existParams = Object.keys(req.body).some(item => dropParams.includes(item));
    console.log(existParams);
    updateAffiliations = existParams ? reshape(req.body, dropParams) : req.body;
    //console.log(requestBody);


    // fetching affiliations of a doctor
    let doctorAffiliation = await Doctor.findById(req.params.id).select({
      'affiliations': 1,
      '_id': 0
    }).lean();

    //console.log(doctorEducation);

    //check existence of the similar  degree in education
    doctorAffiliation.affiliations.forEach(item => {
      if (item.organizationName.toLowerCase().replace(/[^a-zA-Z ]/g, "") === (req.body.organizationName).toLowerCase().replace(/[^a-zA-Z ]/g, "") ||
        (item.organizationId === req.body.organizationId)) {
        res.status(409).json({
          message: "Affiliation already exist"
        });
        next();
      }
    });

    //get index of the matched object passed in the parameter
    let idx = 0;
    doctorAffiliation.affiliations.forEach((item, index) => {

      if (JSON.stringify(item._id) === JSON.stringify(req.params.affid)) return idx = index;

    });
    console.log(idx);

    let prefix = "affiliations." + idx + ".";

    let requestBody = convertToDotNotation(updateAffiliations, {}, prefix);
    //console.log(requestBody);

    //request body filter any key value null
    removeObjKeyValueNull(requestBody);

    //console.log(requestBody);
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id, {
        $set: requestBody
      }, {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Affiliation updated",
      result: doctor.affiliations
    });

    next();
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong!",
      error: err
    });
    next(err);
  }
};


//---------------------------------------------------------------------------------------------------------------

//update existing schedule of a doctor

export const updateSchedule= async(req,res,next) =>{

  try {
    // parameters that should be dropped when reaching this api
    let updateSchedule=req.body;
    //console.log(updateSchedule);
  
    
      // fetching affiliations of a doctor
      let doctorAffiliation = await Doctor.findById(req.params.id).select({
        'affiliations': 1,
        '_id': 0
      }).lean();
  
      //console.log(doctorAffiliation.affiliations);

      
      //get index of the matched affiliation passed in the parameter
      let idx = 0;
      doctorAffiliation.affiliations.forEach((item, index) => {
  
        if (JSON.stringify(item._id) === JSON.stringify(req.params.affid)) return idx = index;
  
      });
      console.log(idx);

      doctorAffiliation = doctorAffiliation.affiliations[idx].schedule;

      console.log(doctorAffiliation);
  
    //   //check existence of the similar  schedule in the affiliation
      doctorAffiliation.forEach(item => {
        if (item.day.toLowerCase().replace(/[^a-zA-Z ]/g, "") === (req.body.day).toLowerCase().replace(/[^a-zA-Z ]/g, "")
        && (item.startTime===req.body.startTime) && (item.endTime===req.body.endTime)) {
            res.status(409).json({
            message: "Schedule already exist"
          });
          next();
        }
      });
  
    //   //get index of the matched schedule passed in the parameter
       let idxsc = 0;
      doctorAffiliation.forEach((item, index) => {
  
        if (JSON.stringify(item._id) === JSON.stringify(req.params.schid)) return idx = index;
  
      });
      console.log(idxsc);
  
      let prefix = "affiliations." + idx + "." + "schedule."+idxsc + ".";
      console.log(prefix);
  
      let requestBody = convertToDotNotation(updateSchedule, {}, prefix);
       //console.log(requestBody);
  
      //request body filter any key value null
      removeObjKeyValueNull(requestBody);
  
    console.log(requestBody);
      const doctor = await Doctor.findByIdAndUpdate(
        req.params.id, {
          $set: requestBody
        }, {
          new: true,
          runValidators: true,
        }
      );
  
      res.status(200).json({
        message: "Schedule updated",
        result: doctor.affiliations[idx].schedule
      });
  
      next();
  }catch (err) {
    res.status(400).json({
      message: "Something went wrong!",
      error: err
    });
    next(err);
  }
  };
  

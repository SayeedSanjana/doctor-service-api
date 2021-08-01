import {Doctor} from "../models/Doctor.js";
import mongoose from "mongoose";
//import {convertToDotNotation,removeObjKeyValueNull,reshape} from "../helpers/reshape.js";
//import upload from "../middleware/upload.js";

//Get Doctor List
export const doctorList = async (req, res,next) => {
  try {
    let docList='';
    const resPerPage = 2; // results per page
    const page = req.params.page ; // Page 
    //console.log(page);
    
    if (Object.keys(req.query).length>0){
      const search=req.query.search;
      if(mongoose.Types.ObjectId.isValid(search)){
        docList=await Doctor.findById(search);

      }else{
        docList = await Doctor.find({

          $or: [
            
            { duuid: { $regex:search, $options: '$i' } },
            { firstName: { $regex:search, $options: '$i' } },
            { lastName: { $regex:search, $options: '$i' } },
            {contact: { $regex:search, $options: '$i' }},
          ]
          
        }).skip((resPerPage * page) - resPerPage)
        .limit(resPerPage);
      }
    }else{

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
export const doctor = async (req, res,next) => {
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
      message:"Displaying Result",
      result:doctor
    });
    next();

  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error:err
    });
    next(err);
  }
};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Get Specific Doctor Affiliation Lists
export const doctorAffiliationList = async (req, res,next) => {
  let doctor = '';
  try {
    
      
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
          doctor=await Doctor.findById(req.params.id).select('affiliations');
        }else{
          doctor=await Doctor.findOne({duuid:req.params.id}).select('affiliations');

        }
          
    res.status(200).json({
      message:"Displaying Result",
      result:doctor
    });
    next();

  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error:err
    });
    next(err);
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------

//Create Doctor
export const create = async (req, res, next) => {
  
  try {

    const existDoctor = await Doctor.findOne({
      duuid:req.body.duuid
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
import {Doctor} from "../models/Doctor.js";
import mongoose from "mongoose";
//import {convertToDotNotation,removeObjKeyValueNull,reshape} from "../helpers/reshape.js";
//import upload from "../middleware/upload.js";


export const doctorList = async (req, res) => {
  try {
    const docList = await Doctor.find({});
    res.status(200).json({
      message: "Displaying Results",
      result: docList
    });
  } catch (error) {
    res.status(403).json({
      error: error
    });
  }
  
};
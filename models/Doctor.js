import mongoose from 'mongoose';

const reqString = {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 50,
};
const opString = {
    type: String,
    maxlength: 50,
};
const opMediumString = {
    type: String,
    maxlength: 255,
};

const opNidString = { // optional string
    type: String,
    minlength: 10,
    maxlength: 20,
};

const reqDate = {
    type: Date,
    required: true
};

const opDate = {
    type: Date
};

const reqContactString = {
    type: String,
    required: true,
    trim: true,
    minlength: 11,
    maxlength: 17,
};
const duuidString = {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 9,
    maxlength: 9,
};

//========================================================================================================================
// geo location schema 
const geoSchema = mongoose.Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

//========================================================================================================================
// Doctor Schema holding general information
const doctorSchema = mongoose.Schema({

    duuid: duuidString,
    //profilePic:[opMediumString],
    firstName: reqString,
    lastName: opString,
    contact: reqContactString,
    dob: reqDate,
    gender: reqString,
    religion: reqString,
    bloodGroup: reqString,
    nid: opNidString,
    nationality: reqString,
    address: {
        // addressType:reqString, // present(0), permanant(1) or history(2)
        country: reqString,
        city: reqString,
        area: reqString,
        zipcode: reqString,
        location: geoSchema,
    },
    images: [String],
    education: [{
        degreeTitle: reqString,
        graduationYear: reqString,
        institution: reqString
    }],
    affiliations: [{
        organizationId: reqString,
        organizationName: reqString,
        address: {
            country: reqString,
            city: reqString,
            area: reqString,
            zipcode: reqString,
            location: geoSchema,

        },
        
        schedule: [{
            day: reqString,
            startTime: reqString,
            endtime: reqString
        }],
        role:[String],
        startDate: reqDate,
        endDate: opDate,
    }],
       



}, {
    timestamps: true
});

// patientSchema.createIndexes({puuid:1,unique:true})

export const Doctor = mongoose.model('Doctors', doctorSchema);
//========================================================================================================================
//address log independent schema for internal tracking of info
// const addressLogSchema = mongoose.Schema({
//     patientId:{type: mongoose.Types.ObjectId, ref: 'Patients'},
//     addressType: reqString,
//     country:reqString,
//     city:reqString,
//     area:reqString,
//     zipcode:reqString,
//     location:geoSchema,
// });
// export const AddressLog = mongoose.model('AddressLog', addressLogSchema);
//========================================================================================================================

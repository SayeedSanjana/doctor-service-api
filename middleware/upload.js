import path from 'path';
import multer from 'multer';
import fs from 'fs';
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{

        
        let dir = req.baseUrl.split('/')
        dir = dir.pop();
        const loc = `./uploads/${dir}/img-${req.body.duuid}`

        // check if directory exists
        if (!fs.existsSync(loc)) {
        // if not create directory
            fs.mkdirSync(loc, {recursive:true});

        }
        cb(null, loc);



        
    },
    filename: (req,file, cb)=>{
        let ext = path.extname(file.originalname);
        cb(null,  Date.now() + ext);
    }
});

const upload = multer({
    storage:storage,
    fileFilter: (req, file,cb)=>{
        
        if (file.mimetype == 'image/jpeg'||file.mimetype == 'image/png') {
            // console.log(path.relative(file.filename));
            // console.log(file);
            cb(null,true);
        }else{
            console.log("Only JPG or PNG file type supported");
            cb(null, false);
        }
    },
    limits:{
        fileSize: 1024 * 1024 * 2
    },
    
   
});

export default upload;
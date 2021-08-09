import { doctorSerciveLogger, doctorSerciveLoggerDebug } from "./doctor-service-logger.js";

let NODE_ENV = process.env.NODE_ENV;
let log = null;

const processRequest= async(req,res)=>{
    let correlationId=req.headers['x-correlation-id'];
    if(!correlationId){
        correlationId=Date.now().toString();
        req.headers['x-correlation-id']=correlationId;
    }
    res.set('x-correlation-id',correlationId);
    return ;

}

export const logger = (req,res, next)=>{ 
   
    if (NODE_ENV !== 'production') {
        processRequest(req,res);
        log = doctorSerciveLoggerDebug();
        log.debug({
            correlationId:  req.headers['x-correlation-id'],
            ip:             req.ip,
            hostname:       req.hostname,
            method:         req.method,
            originalUrl:    req.originalUrl,
            query:          req.query, 
            body:           req.body, 
                       


        });
    }else{
       
        processRequest(req,res);
        log = doctorSerciveLogger();
        log.info({
            correlationId:  req.headers['x-correlation-id'],
            ip:             req.ip,
            method:         req.method,
            originalUrl:    req.originalUrl,
            query:          req.query,
            body:           req.body
        });
    }
    next();

}



export const errorlogger = (err,req,res, next)=>{ 
   
    if (NODE_ENV !== 'production') {
        processRequest(req,res);
        log = doctorSerciveLoggerDebug();
        log.error(
            {   
            correlationId:  req.headers['x-correlation-id'],
            ip:             req.ip,
            hostname:       req.hostname,
            method:         req.method,
            originalUrl:    req.originalUrl,
            query:          req.query, 
            body:           req.body, 
            reason:         err,
            //meta:       err.stack
            

        });
    }else{
       
        processRequest(req,res);
        log = doctorSerciveLogger();
        log.error(
             `Something went wrong - Error ${res.statusCode||500}`,
            {
            
            correlationId:  req.headers['x-correlation-id'],
            ip:             req.ip,
            method:         req.method,
            originalUrl:    req.originalUrl,
            query:          req.query,
            body:           req.body,
            reason:         err,
            //meta:           err.stack
         
        });
    }
    next();

}




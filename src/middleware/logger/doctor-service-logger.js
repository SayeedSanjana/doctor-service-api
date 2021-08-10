import winston  from 'winston';
import winstonMongo from 'winston-mongodb';


const { createLogger, format, transports }  = winston;
const { combine, timestamp, printf, json , errors,metadata}  = format;

 
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${JSON.stringify(message)}`;
}); 


export const doctorSerciveLogger = ()=> {
    
    return createLogger({
        
        level: 'info',
        format: combine(
            timestamp(),
            json(),
            errors({stack:true}),
            metadata()
        ),
        
        defaultMeta: {
            service: 'doctor-service-api'
        },
        
        transports: [
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            new transports.File({
                filename: 'error.log',
                level: 'error'
            }),
            new transports.MongoDB({
                level: 'error',
                db:process.env.CONNECTION_STRING.replace('<DBPORT>', process.env.DBPORT),
                options: { useUnifiedTopology: true },
                collection:'doctor-logs',
                storeHost: true,
	           
            }),
            
            new transports.File({
                filename: 'combined.log'
            }),
        ],
        meta: true
    });
}

export const doctorSerciveLoggerDebug = ()=> {
    
    return createLogger({
        level: 'debug',
        defaultMeta: {
            service: 'doctor-service-api'
        },
        format: combine(
            timestamp(),
            myFormat,
            errors({stack:true})
            ),
        transports: [
            new transports.Console(),
            
            
        ],
    });
}
export const SwaggerOptions={
    
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title:"doctor-service-api",
            description:"### *Doctor Service Web Api for the doctors to store their personal information and retrieve their schedule and appointment list*",
            version:"V1.0",
        },

        servers:[
            {
                url:`http://localhost:${process.env.PORT}`,
            }
        ],
    },
    apis:['src/index.js','src/routes/*.js'],
};
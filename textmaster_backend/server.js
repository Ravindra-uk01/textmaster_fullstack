import http from "http";

process.on('uncaughtException', (err)=>{
    console.error('UNCAUGHT REJECTION: ', err);
    process.exit(1);
})

import app from './app.js';
import connectDB from './config/db.config.js'

const port = process.env.PORT || 8800;

const server = http.createServer(app); 

connectDB();

server.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});

process.on('unhandledRejection', (err) =>{
    console.error('UNHANDLED REJECTION: ', err);
    server.close(()=>{
        process.exit(1);
    });
})




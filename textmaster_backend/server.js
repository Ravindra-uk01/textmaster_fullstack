import http from "http";

process.on('uncaughtException', (err)=>{
    console.error('UNCAUGHT REJECTION: ', err);
    process.exit(1);
})

import app from './app.js';
import connectDB from './config/db.config.js'
import Thread from "./models/thread_schema.js";

const port = process.env.PORT || 8800;

const server = http.createServer(app); 

connectDB();

server.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});

// Function to update thread documents
// async function updateThreads() {
//     try {
//       // Update all threads to add the 'visibility' field if it doesn't exist
//       const result = await Thread.updateMany(
//         { visibility: { $exists: false } }, 
//         { $set: { visibility: 'everyone' } } 
//       );
  
//       console.log(`Updated ${result.nModified} thread documents with visibility set to "everyone".`);
//     } catch (error) {
//       console.error('Error updating threads:', error);
//     } 
//   }
  
//   updateThreads();

process.on('unhandledRejection', (err) =>{
    console.error('UNHANDLED REJECTION: ', err);
    server.close(()=>{
        process.exit(1);
    });
})




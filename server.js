const mongoose = require ('mongoose');
const app = require('./app');
require('dotenv').config();

// connect to MongoDB
mongoose
    .connect (process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        // listen for incoming requests ( start teh server)
         app.listen(3001, () => {
            console.log('server is running on http://localhost:3001');
        });
    })
    .catch((err) => console.error('could not connect to MongoDB', err)); 


const express = require("express");
const routes = require('./routes/routes.js');
const app = express();
var cors = require('cors')


// CORS Policy
app.use(cors());
//middleware
app.use(express.json());

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})

// routes
app.use('/api', routes)
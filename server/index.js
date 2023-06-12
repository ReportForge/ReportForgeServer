const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const scenariosRoutes = require('./routes/scenarios'); // Path to your scenarios routes file
const hebrewScenariosRoutes = require('./routes/hebrewScenario'); // Path to your Hebrew scenarios routes file

// create express app
const app = express();

// enable CORS
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', scenariosRoutes);
app.use('/', hebrewScenariosRoutes); // Use the Hebrew scenarios routes with your Express application

// connect to MongoDB
mongoose.connect('mongodb+srv://reportforge:Ilovereport@reportforge.83zhein.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(5000, () => {
        console.log('Server is listening on port 5000');
    }))
    .catch(err => {
        console.error('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to our application."});
});
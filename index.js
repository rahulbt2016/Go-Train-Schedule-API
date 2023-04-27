//INCLUDING PACKAGES
const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs/promises');
const scheduleRoutes = require('./routes/scheduleRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

//CONFIGURATIONS
const app = express();
dotenv.config();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Go Train Schedule API",
      version: "1.0.0",
      description: "The GO Train Schedule API is a NodeJS service that provides a simplified train timetable with weekday train times leaving Union Station.",
      contact: {
        name: "Rahul Tiwari",
        email: "rahulbt2016@gmail.com"
      }
    },
    servers: [
      {
        url: "https://go-train-schedule-api.azurewebsites.net/"
      },
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);

//DECLARING TRAIN DATA
var trainData;

//MIDDLEWARE - PASSING TRAIN DATA TO ROUTES
setTrainData = (req, res, next) => {
    req.trainData = trainData;
    next();
}


//SWAGGER DOCUMENTATION ROUTE
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

//SCHEDULE ROUTES
app.use('/schedule', setTrainData, scheduleRoutes);

//UNDEFINED ROUTES
app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});
  
//SETTING UP PORT
const PORT = process.env.PORT || 3000;

//READING JSON FILE
fs.readFile('./data/go-train-schedule.json')
  .then((data) => {
    //INITIALIZING TRAIN DATA
    trainData =  JSON.parse(data);

    //STARTING SERVER
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)); 
  })
  .catch((err) => console.log('Cannot read file: ', err.message));

module.exports = app;
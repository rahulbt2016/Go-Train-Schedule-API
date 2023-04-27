//INCLUDING PACKAGES
const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs/promises');
const scheduleRoutes = require('./routes/scheduleRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');


//CONFIGURATIONS
const app = express();
dotenv.config();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

//DECLARING TRAIN DATA
var trainData;

//MIDDLEWARE - PASSING TRAIN DATA TO ROUTES
setTrainData = (req, res, next) => {
    req.trainData = trainData;
    next();
}

//ROUTES
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
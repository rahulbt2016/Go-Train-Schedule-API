//INCLUDING PACKAGES
const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs/promises');
const scheduleRoutes = require('./routes/scheduleRoutes');

//CONFIGURATIONS
const app = express();
dotenv.config();

//DECLARING TRAIN DATA
var trainData;

//MIDDLEWARE - PASSING TRAIN DATA TO ROUTES
setTrainData = (req, res, next) => {
    req.trainData = trainData;
    next();
}

//ROUTES
app.use('/schedule', setTrainData, scheduleRoutes);

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});
  
//SETTING UP PORT
const PORT = process.env.PORT || 3000;

//READING JSON FILE
fs.readFile('./data/go-train-schedule.json')
  .then(async (data) => {
    //INITIALIZING TRAIN DATA
    trainData =  JSON.parse(data);

    //STARTING SERVER
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)); 
  })
  .catch((err) => console.log('Cannot read file: ', err.message));
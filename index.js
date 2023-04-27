//INCLUDING PACKAGES
const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs/promises');
const scheduleRoutes = require('./routes/scheduleRoutes');
const { setTrainData } = require('./models/trainData');

//CONFFIGURATIONS
const app = express();
dotenv.config();

//DECLARING TRAIN DATA
var trainData;

//ROUTES
app.use('/schedule', scheduleRoutes);
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
    setTrainData(trainData);

    //STARTING SERVER
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)); 
  })
  .catch((err) => console.log('Cannot read file: ', err.message));
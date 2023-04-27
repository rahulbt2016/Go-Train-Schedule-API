const { trainData } = require('../models/trainData');

const getSchedule = (req, res) => {

    res.status(200).json(trainData);
}

module.exports = getSchedule;
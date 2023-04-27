express = require("express");
const router = express.Router();
const { getSchedule,  getLineSchedule} = require("../controllers/scheduleController");

//ROUTE THAT RETURNS ALL TRAINS IN THE SCHEDULE
router.get("/", getSchedule);

//ROUTE THAT RETURNS ALL TRAINS IN THE SCHEDULE FOR A SPECIFIC LINE AND DEPARTURE TIME
router.get("/:line", getLineSchedule);

module.exports = router;

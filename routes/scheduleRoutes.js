express = require("express");
const router = express.Router();
const { getSchedule,  getLineSchedule} = require("../controllers/scheduleController");

router.get("/", getSchedule);
router.get("/:line", getLineSchedule);

module.exports = router;

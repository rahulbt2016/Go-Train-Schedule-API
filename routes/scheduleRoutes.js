express = require("express");
const router = express.Router();
const { getSchedule,  getLineSchedule} = require("../controllers/scheduleController");

/**
 * @swagger
 * components: 
 *  schemas:
 *     Train: 
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *              description: The train ID 
 *          line:
 *              type: string
 *              description: Line Name
 *          departure:
 *              type: integer
 *              description: Departure Time in 24-Hour Format (Military Time)
 *          arrival: 
 *              type: integer
 *              description: Arrival Time in 24-Hour Format (Military Time)
 *       example:
 *          id: 1
 *          line: "Lakeshore"
 *          departure: 800
 *          arrival: 900
 * 
 * 
 */

/**
 * @swagger
 * tags:
 *    name: Train Schedule
 *    description: The GO Train Schedule API 
 */

//ROUTE THAT RETURNS ALL TRAINS IN THE SCHEDULE
/**
 * @swagger
 * /schedule:
 *    get:
 *     summary: Returns all trains in the schedule
 *     tags: [Train Schedule]
 *     responses:
 *        200:
 *           description: A list of trains in the schedule
 *           content:
 *              application/json:
 *                 schema:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Train'
 */ 
router.get("/", getSchedule);

//ROUTE THAT RETURNS ALL TRAINS IN THE SCHEDULE FOR A SPECIFIC LINE AND DEPARTURE TIME
/**
 * @swagger
 * /schedule/{line}:
 *   get:
 *     summary: Returns all trains for a specific line in the schedule
 *     tags: [Train Schedule]
 *     parameters:
 *       - in: path
 *         name: line
 *         description: The name of the train line to get the schedule for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of trains in the schedule for the specified line
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                $ref: '#/components/schemas/Train'
 *       404:
 *         description: Not Found - The specified line does not exist
 */
/**
 * @swagger
 * /schedule/{line}?departure={departure}:
 *   get:
 *     summary: Returns all trains for a specific line, departing at a specific time in the schedule
 *     tags: [Train Schedule]
 *     parameters:
 *       - in: path
 *         name: line
 *         description: The name of the train line to get the schedule for
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: departure
 *         description: The departure time to get the schedule for (24-Hour or 12-Hour Format)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of trains in the schedule for the specified line and departure time
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                $ref: '#/components/schemas/Train'
 *       404:
 *         description: Not Found - The specified line does not exist
 *       
 *       400:
 *        description: Bad Request - The specified departure time is invalid
 */
router.get("/:line", getLineSchedule);

module.exports = router;

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");


let passport = require("passport");

let carController = require("../controllers/cars");



/* GET Route for the businesscontact List page - READ Operation */
router.get("/", carController.displayCarList);

// /* GET Route for displaying the Car Add page - CREATE Operation */
router.get("/add", carController.caraddpage);

// /* POST Route for processing the Add page - CREATE Operation */
router.post("/add",carController.addprocesspage);

// /* GET Route for displaying the Edit page - UPDATE Operation */
router.get("/edit/:id", carController.displayeditpage);

// /* POST Route for processing the Edit page - UPDATE Operation */
router.post("/edit/:id",carController.processingeditpage);

// /* GET to perform  Deletion - DELETE Operation */

router.get("/delete/:id", carController.deletepage);

module.exports = router;

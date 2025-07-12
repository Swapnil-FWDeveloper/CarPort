const express = require('express');

const {getAllVehicles } = require("../controllers/vehicleController");

const router = express.Router();

router.get("/",getAllVehicles);

module.exports = router;
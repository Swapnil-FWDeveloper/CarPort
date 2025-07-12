const mongoose = require("mongoose");

const dotenv = require("dotenv");

const fs = require("fs");

const Vehicle = require("../models/Vehicle");

const connectDB = require("../config/db");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    const rawData = JSON.parse(
      fs.readFileSync(`${__dirname}/vehicles.json`, "utf-8")
    );

    // console.log("RAW DATA TYPE:", typeof rawData); 
    // console.log("RAW DATA:", rawData);    

    const vehiclesData = rawData.products || rawData;

    // console.log("VEHICLES DATA TYPE:", typeof vehiclesData);
    // console.log("VEHICLES DATA IS ARRAY?", Array.isArray(vehiclesData));

    const cleanedVehicles = vehiclesData.filter(
      (v) => v.id && v.name && v.price && v.main_image
    );
    // console.log(` Found ${cleanedVehicles.length} valid vehicles to import`);

    await Vehicle.deleteMany();
    await Vehicle.insertMany(cleanedVehicles);

    console.log("data imported");
    process.exit();
  } catch (err) {
    console.error("Error importing data:", err);
    process.exit(1);
  }
};
importData();

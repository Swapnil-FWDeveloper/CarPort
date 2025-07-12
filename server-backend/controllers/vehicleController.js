const Vehical = require('../models/Vehicle');

const getAllVehicles = async (req, res)=>{
try {
    const vehicles = await Vehical.find();
    res.json({message:"all vehicles",vehicles});
} catch (err) {
     res.status(500).json({ message: "Error fetching vehicles" });
}
}

module.exports = {getAllVehicles};
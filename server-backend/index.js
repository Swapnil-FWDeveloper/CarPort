express = require('express');

const dotenv = require("dotenv");

const cors = require('cors');

const connectDB = require('./config/db');

const vehicleRoutes = require("./routes/vehicleRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/vehicles',vehicleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
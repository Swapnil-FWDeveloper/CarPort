const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    main_image: {
      type: String,
      required: true,
    },
    gallery_images: {
      type: [String],
      default: [],
    },
    brand_logo: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String, // Keeping as string due to currency format (₹45,00,000)
      required: true,
    },
    ncap_rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    description: {
      type: String,
    },
    condition: {
      type: String,
      enum: ["New", "Used"],
    },
    fuel: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG", "Other"],
    },
    manufacturing_year: {
      type: Number,
    },
    years_left: {
      type: Number,
    },
    category: {
      type: String, // e.g., Sedan, SUV, etc.
    },
    available: {
      type: Boolean,
      default: true,
    },
    dealership_options: {
      type: [String], // ["Franchise", "Direct Purchase"]
      default: [],
    },
    location: {
      type: String,
    },
    brand: {
      type: String,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;



// {
//       "id": "audi001",
//       "main_image": "https://imgd.aeplcdn.com/370x208/n/51vlkbb_1686149.jpg?q=80",
//       "gallery_images": [
//         "https://imgd.aeplcdn.com/370x208/n/f2a7kbb_1686151.jpg?q=80",
//         "https://imgd.aeplcdn.com/370x208/n/sgulkbb_1686147.jpg?q=80",
//         "https://imgd.aeplcdn.com/370x208/n/91fkkbb_1686097.jpg?q=80",
//         "https://imgd.aeplcdn.com/370x208/n/ittlkbb_1686145.jpg?q=80"
//       ],
//       "brand_logo": "https://e7.pngegg.com/pngimages/960/454/png-clipart-audi-rs-4-car-bmw-logo-benz-logo-text-trademark.png",
//       "name": "Audi A4",
//       "price": "₹45,00,000",
//       "ncap_rating": 5,
//       "description": "A premium sedan with advanced tech and quattro all-wheel drive.",
//       "condition": "Used",
//       "fuel": "Diesel",
//       "manufacturing_year": 2018,
//       "years_left": 8,
//       "category": "Sedan",
//       "available": true,
//       "dealership_options": ["Franchise", "Direct Purchase"],
//       "location": "Mumbai",
//       "brand": "Audi"
//     },

// {
//   "id": "bmw001",
//   "main_image": "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/140591/x1-exterior-right-front-three-quarter-7.jpeg?isig=0",
//   "gallery_images": [
//     "https://imgd.aeplcdn.com/664x374/n/cw/ec/140591/x1-exterior-left-rear-three-quarter-2.jpeg?isig=0",
//     "https://imgd.aeplcdn.com/664x374/n/cw/ec/140591/x1-exterior-left-side-view-3.jpeg?isig=0",
//     "https://imgd.aeplcdn.com/664x374/n/cw/ec/140591/x1-exterior-left-side-view-3.jpeg?isig=0&q=80",
//     "https://img.youtube.com/vi/CY_yNr47ZS8/mqdefault.jpg"
//   ],
//   "brand_logo": "https://example.com/bmw-logo.png",
//   "name": "BMW 3 Series",
//   "price": "₹52,00,000",
//   "ncap_rating": 5,
//   "description": "Sporty and dynamic sedan with BMW's signature driving experience.",
//   "category": "Car",
//   "available": true,
//   "dealership_options": ["Franchise", "Direct Purchase"],
//   "location": "Nagpur",
//   "brand" : "bmw"
// },

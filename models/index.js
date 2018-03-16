var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/express-api-development")
module.exports.City = require('./city.js')
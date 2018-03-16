var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var CitySchema = new Schema({
    name: String,
    desc: String,
    country: String,
    lat: Number,
    lng: Number
});

var City = mongoose.model('City', CitySchema)
module.exports = City;
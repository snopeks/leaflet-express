var db = require('./models')

var city_list = [
  {
    name: "Vancouver",
    desc: "City of rain",
    country: "Canada",
    lat: 49.2827,
    lng: -123.1207
  },
  {
    name: "San Francisco",
    desc: "Lots of fun times",
    country: "USA",
    lat: 37.7749,
    lng: -122.4194
  },
  {
    name: "Portland",
    desc: "Amazing donuts",
    country: "USA",
    lat: 45.5231,
    lng: -122.6765
  },
  {
    name: "Paris",
    desc: "The best city",
    country: "France",
    lat: 48.8566,
    lng: 2.3522
  }
]

db.City.remove({}, function(err, city){
  if(err){
    console.log('there was an error on removal!', err);
  } else {
    console.log("removed all cities")
    db.City.create(city_list, function (err, cities){
      if(err){
        console.log("error creating cities", err);
      } else {
        console.log("Created ", cities.length, "cities");
        process.exit();
      }
    })
  }
})

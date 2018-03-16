// REQUIREMENTS
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extend: false}));
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs')

var db = require('./models')

app.get("/", function(req, res){
  res.status(200).render("index")
});
app.get('/about', function(req, res){
  res.status(200).render("about")
})
// pk.eyJ1Ijoic3RlcGhzbm9wZWsiLCJhIjoiY2plaGg1OXY4MGF0NjJ3bmxwNXZiY3VoayJ9.nDLlDzAz5UZYZH0I5SYSpA
// app.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1Ijoic3RlcGhzbm9wZWsiLCJhIjoiY2plaGg1OXY4MGF0NjJ3bmxwNXZiY3VoayJ9.nDLlDzAz5UZYZH0I5SYSpA`, function (req, res){
//   var query = req.body.name
//   console.log(query)
// })
app.get('/test', function(req,res){
  var newCity = new db.City({name: "something", desc: "something!!!"})
  newCity.save(function(err, city){
    if(err){
      console.log(err)
    } else {
      console.log("your city was saved!", city)
    }
  })
})

app.get('/api/cities', function(req, res){
  // res.json(cities)
  db.City.find().exec(function getAllCity(err, allCities){
    if(err){ return console.log('error!');}
    res.json(allCities)
  })
});

app.post("/api/cities", function(req, res){
  var name = req.body.name;
  var desc = req.body.desc;
  console.log("this is the name!", name, "this is the desc!", desc)

  var newCity = db.City.create({ name: name, desc: desc }, function(err, city){
    if(err){ console.log("there was an error creating your city!")}
    console.log("your new city is created!", city)
    res.json(city)
  })
});

app.get("/cities", function(req, res){
    db.City.find(function(err, cities){
      if(err) return console.error(err);
      res.status(200).render('cities', {'cities': cities});
    })
});
app.get('/cities/:name', function (req, res){
  console.log("PARAMS!!!!", req.params.name)
  var cityName = req.params.name
  db.City.find({name: cityName}, function(err, city){
    if(err){res.send(418);}
    console.log(city);
    res.status(200).render("city", {"city" : city});
  })
})
// SERVER START
app.listen(3000, function () {
  console.log("HTTP server listening at localhost:3000");
});
// REQUIREMENTS //
var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')

// CONFIG //

app.use(function(req, res, next) {
  console.log('you made a ' + req.method + ' request to ' + req.url + ' from ' + req.ip);
  console.log('%s request to %s from %s', req.method, req.url, req.ip);
  next();
})

// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'))

// body parser config
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// DATA //

// pre-seeded food data
var foods =[
  {id: 0, name: "Sushiritto", yumminess: "quite"},
  {id: 3, name: "Foie Gras", yumminess: "omg"},
  {id: 1, name: "Green Eggs & Ham", yumminess: "sure"},
  {id: 2, name: "Crayfish", yumminess: "depending"},
  {id: 4, name: "Kale", yumminess: "meh"}
]

// ROUTES //

// root path
app.get("/", function (req, res) {
  // render index.html
  res.sendFile(path.join(__dirname + '/public/views/index.html'))
})

// foods index path
app.get("/foods", function (req, res) {
  // render foods index as JSON
  res.json(foods)
})

app.post("/foods", function (req, res) {
  // add a unique id
  current_ids = [];
  Object.keys(foods).forEach(function(key) {
    current_ids.push(key);
  })
  console.log(current_ids)
  largest_id = current_ids.reduce(function(x,y){
       return (x > y) ? x : y;
  });
  unique_id = parseInt(largest_id) + 1; // I haven't used foods.length because of delete later on...
  // req.body["id"] = unique_id
  var params = req.body
  newFood = {"id":unique_id, "name":params.name, "yumminess":params.yumminess}
  // add new food to DB (array, really...)
  foods.push(newFood);
  // send a response with newly created object
  res.json(newFood)
})

app.delete("/foods/:id", function (req, res) {
  console.log("hitting delete route");
  console.log(foods)
  // finding an object with id = req.body.id out of the foods
  for (var i = 0; i < foods.length; i++) {
    // console.log(typeof foods[i].id)
    // console.log(typeof req.params.id)
    if (foods[i].id === parseInt(req.params.id)) {
      index = foods.indexOf(foods[i])
      foods.splice(index,1)
    }
  }
  console.log(foods)
  // console.log(foods)
  // remove item from array
  // render deleted object
})

// listen on port 3000
app.listen(3000, function (){
  console.log("listening on port 3000")
})
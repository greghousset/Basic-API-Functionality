var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// our db models
var Person = require("../models/person.js");
var Course = require("../models/course.js");

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/', function(req, res) {

  var jsonData = {
  	'name': 'itp-directory',
  	'api-status':'OK'
  }

  // respond with json data
  res.json(jsonData)
});

// router.get('/add-person', function(req,res){

//   res.render('add.html')

// })

// router.get('/directory', function(req,res){

//   res.render('directory.html')

// })


router.post('/api/create/place', function(req,res){

  //console.log('!!!!!GOT HERE!!!!!!')
  console.log(req.body);

  var placeObj = {

    //for arrays
    //interests: req.body.interests.split(','),

    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    type: req.body.type,
    price: req.body.price,
    neighborhood: req.body.neighborhood,
    cuisine: req.body.cuisine,
    vibe: req.body.vibe,
    image: req.body.image,
    food: req.body.food,
    imageUrl: req.body.imageUrl,
    url: req.body.url,
    dateAdded : { type: Date, default: Date.now }
  }

  var place = new Place(placeObj);

  place.save(function(err,data){
    if(err){
      var error = {
        status: "ERROR",
        message: err
      }
      return res.json(err)
    }

    var jsonData = {
      status: "OK",
      person: data
    }

    return res.json(jsonData);

  })

})

router.post('/api/create/person', function(req,res){

  //console.log('!!!!!GOT HERE!!!!!!')
  console.log(req.body);

  var personObj = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    imageUrl: req.body.imageUrl,
    dateAdded : { type: Date, default: Date.now }
  }

  var person = new Person(personObj);

  person.save(function(err,data){
    if(err){
      var error = {
        status: "ERROR",
        message: err
      }
      return res.json(err)
    }

    var jsonData = {
      status: "OK",
      person: data
    }

    return res.json(jsonData);

  })

})


router.get('/api/get', function(req,res){

  Person.find(function(err,data){

      if(err){
        var error = {
          status: "ERROR",
          message: err
        }
        return res.json(err)
      }

      var jsonData = {
        status: "OK",
        people: data
      }

      return res.json(jsonData);

  })

})





module.exports = router;








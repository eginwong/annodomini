var express = require('express');
var app = express();
var server = require('http').Server(app);
var request = require('request');

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/parishes', function(req, res) {
  res.json(
    { 'country': 'Canada',
      'parishes': [
        {'name': 'St. Patrick\'s Parish, Markham', 'Mass Times': {0: ['8:00', '9:30', '11:00', '12:30', '16:30'], 1: ['8:30'], 2: ['8:30'], 3: ['8:30', '19:00'], 4: ['8:30'], 5: ['8:30'], 6: ['8:30']}, 'website': 'http://stpatrick.on.ca/sp/'},
        {'name': 'St. Justin Martyr Parish, Unionville', 'Mass Times': {0: ['8:30', '10:30', '12:30', '16:00'], 1: ['9:10'], 2: ['9:10'], 3: ['19:00'], 4: ['9:10'], 5: ['9:10'], 6: ['9:10']}, 'website': 'http://www.sjmunionville.com/'},
        {'name': 'St. Thomas the Apostle', 'Mass Times': {0: ['9:00', '10:30', '12:00'], 1: ['12:10', '19:30'], 2: ['12:10', '19:30'], 3: ['12:30', '19:30'], 4: ['12:10', '19:30'], 5: ['12:10', '19:30'], 6: ['9:00', '17:00']}, 'website': 'http://www.saintthomastheapostle.ca/'},
        {'name': 'St. Barnabas', 'Mass Times': [2,3,4], 'website': 'http://google.ca'},
        {'name': 'St. Rose of Lima', 'Mass Times': [2,3,4], 'website': 'http://google.ca'},
        {'name': 'St. Agnes Tsao Kuoying', 'Mass Times': [2,3,4], 'website': 'http://google.ca'},
        {'name': 'Chinese Martyrs Catholic Church', 'Mass Times': [2,3,4], 'website': 'http://google.ca'}
      ]}
  );
});

//http://stackoverflow.com/questions/25300213/how-to-covert-1200-pm-into-date-object-in-javascript for time parsing if needed

// REGISTER OUR ROUTES -------------------------------
// // all of our routes will be prefixed with /api
app.use('/api', router);

app.use(express.static('client'));

app.get('/*', function(req, res, next){
  var url = req.url;
  //Checking for urls like ../../passwd etc
  if(!url.match(/\.\.+?\//)){
    res.sendFile(req.url, {root:'./client'});
  } else if(url === '/'){
    next();
  } else {
    res.status(405).send('Did you try something naughty?');
  }
});

app.get('/', function(req, res){
  res.sendFile('index.html', {root:'./client'});
});

//Config checks process.env, otherwise sets to 9000
var port = process.env.PORT || 9000;

module.exports.listen = function(){
  server.listen(port, function(){
    console.log('Server listening on port', port);
  });
};

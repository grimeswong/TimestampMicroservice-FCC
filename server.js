// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/* Timestamp */
// Format {"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}
app.get("/api/timestamp/", function (req, res) {
  const dateString = req.params.date_string;
    const date = new Date();  // get the current date/time
    res.json({unix: date.getTime(), utc: date.toUTCString()});  // checked: correct
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  // todo: regex for all digits or valid 2020-03-13 format
  // recognise those two format and change to correct UTC format accordingly
  const dateString = req.params.date_string;
  if(/\d{5,}/.test(dateString)) {
    console.log(dateString);
    convertedData = new Date(parseInt(dateString)); // convert string to Integer
    res.json({unix: convertedData.getTime(), utc: convertedData.toUTCString()});
  } else { // condition: this is string of date 2020-03-13
      const date = new Date (dateString);
      console.log(date.toUTCString());
      date.toUTCString() ==='Invalid Date' ? res.json({error: date.toUTCString()})
      : res.json({unix: date.getTime(), utc: date.toUTCString()});
  }

})

// listen for requests :)
var listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

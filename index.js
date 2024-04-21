var express = require('express')
var hbs = require('hbs')
var fs = require('fs');
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

//Imports first and second page comps
// var FirstPage = require('static_files/js/firstpage.js')
// var SecondPage = require('static_files/js/secondpage.js')
app.set('view engine','hbs')

// routes
// const home = require('./routes/home.js')
// app.use(home);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('static_files'))

app.use(express.static(path.resolve(__dirname, '../client/build'))

app.get('/', function (req, res) {
  res.send('pecunia')
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const dir = './data';
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
      cb(null, dir);
  },
  filename: function (req, file, cb) {
      cb(null, 'output.wav');
  }
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', upload.single('audioData'), (req, res) => {
    res.send('File uploaded successfully.');
});

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 2309, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});

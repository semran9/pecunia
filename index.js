var express = require('express')
var hbs = require('hbs')
var fs = require('fs');
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var options = {
  headers: {
      'User-Agent': 'request'
  }
}

//Imports first and second page comps
app.set('view engine','hbs')

// routes
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('static_files'))

app.get('/home', function (req, res) {
  res.render('index')
})

app.post('/results', function(req,res ) {
  console.log('loading results');
  const { spawn } = require('child_process');
  const pyProg = spawn('python', ['./../run.py']);
  pyProg.stdout.on('data', function(data) {
      console.log(data.toString());
      res.write(data);
      res.end('end');
  });

  fs.readFile('/data/transcript.txt', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  })
  
  res.render('results', )
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

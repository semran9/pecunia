var express = require('express')
var hbs = require('hbs')
var fs = require('fs');
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');
const { spawn } = require('child_process');
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

// app.post('/results', function(req,res ) {
//   console.log('loading results');
//   const { spawn } = require('child_process');
//   const pyProg = spawn('python', ['./../run.py']);
//   pyProg.stdout.on('data', function(data) {
//       console.log(data.toString());
//       res.write(data);
//       // res.end('end');
//   });

//   fs.readFile('data/transcript.txt', 'utf-8', (err, transcript) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
    
//     res.locals.transcript = transcript;
//     console.log(transcript);
//   })
  
//   fs.readFile('data/response.txt', 'utf-8', (err, response) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     res.locals.response = response;
//     console.log(response);
//   });
//   console.log('1')


//   console.log('2')

//   var texts = {
//     'transcript': res.locals.transcript,
//     'results' : res.locals.response
//   }
//   console.log('Response: ')
//   console.log(res.locals.response)
//   res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
// });
app.get('/results', function(req, res) {
  console.log('Entering /results route');
  const pyProg = spawn('python', ['scripts/run.py']);
  let outputData = [];
  pyProg.stdout.on('data', function(data) {
      console.log('Data from Python:', data.toString());
      outputData.push(data);
  });

  pyProg.on('close', () => {
      const finalOutput = Buffer.concat(outputData).toString();
      console.log('Final Python Output:', finalOutput);

      fs.readFile('data/transcript.txt', 'utf-8', (err, transcript) => {
          if (err) {
              console.error('Error reading transcript:', err);
              return res.status(500).send('Failed to read transcript file');
          }

          fs.readFile('data/response.txt', 'utf-8', (err, response) => {
              if (err) {
                  console.error('Error reading response:', err);
                  return res.status(500).send('Failed to read response file');
              }

              console.log('Rendering with:', { transcript, response, finalOutput });
              res.render('results', {
                  transcript: transcript,
                  response: response
              });
              spawn('python', ['scripts/speak.py']);
              console.log('wtest')
          });
      });
  });

  pyProg.on('error', (error) => {
      console.error('Python script error:', error);
      res.status(500).send('Error executing Python script');
  });
});
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

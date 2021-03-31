const express = require('express');
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

var crypto = require('crypto');
var routes = require('./routes');




const fileUpload = require('express-fileupload')
const AWS = require('aws-sdk')
var fs = require('fs'); 
const path = require('path');
const cors = require('cors');


const MongoStore = require("connect-mongo");



AWS.config.update({accessKeyId: 'AKIAXD24L7NBPTOCG4NJ' })
AWS.config.update({secretAccessKey: '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' })
AWS.config.update({region: 'us-east-2'});

var s3 = new AWS.S3();

const bucket = 'idpayy' // the bucketname without 's3://'
const client = new AWS.Rekognition();



const app = express();
const pathToDir = path.join(__dirname, "uploads")



app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(fileUpload());

require('dotenv').config()

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));




const mongoStore = MongoStore.create({
  mongoUrl: process.env.DB_STRING,
  collectionName: "sessions",
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //cookie valid for 24 hours
  })
);


require('./config/passport')

app.use(passport.initialize());
app.use(passport.session());

app.use(routes)


app.get('/blabla', (req, res, next) => {
  res.send(req.user)
})

const connection = require('./config/database');
const User = connection.models.User;


app.get('/compare', (req,res) => {

  User.find({})
  .then((data) => {
    
    let emailArray =[]
    data.forEach((user)=> emailArray.push(user.username))
    
    var array = []
    var q = 0
    emailArray.forEach((name)=> {
    const params = {
        
      SourceImage: {
        S3Object: {
          Bucket: bucket,
          Name: `users/${name}.jpg`
          },
            
      },
      TargetImage: {
        S3Object: {
        Bucket: bucket,
        Name: `requests/request.jpg`,
        },
      },
      
      SimilarityThreshold: 90  
    }
    client.compareFaces(params, (err, response)=>{
        x = response.FaceMatches[0]
        q++
        if (q === emailArray.length) {
          if (x != undefined) {
            response.FaceMatches.forEach((data)=> {
            
              let similarity = data.Similarity
              //console.log(similarity)
              array.push([{name: `${name}`, sim: `${similarity}`}])
              res.send(array)
            })
          } else {
            res.send(array)
          }
        } else if (x != undefined){
          //console.log(name)
          response.FaceMatches.forEach((data)=> {
            
            let similarity = data.Similarity
            //console.log(similarity)
            array.push([{name: `${name}`, sim: `${similarity}`}])
            //res.send(array)
            
          })
        }
    
      
    })

    })

  console.log('success')

  })

  

});




app.post('/charge', (req,res) => {
  console.log(req.body.username)
  User.find({"username": req.body.username})
  .then (response => {
  User.updateOne(
    {"username" : req.body.username},
    {$set: {"money": response[0].money - req.body.money}}
  )
  .then(response => res.sendStatus(200))
  })
})




const removeDir = function(path) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)

    if (files.length > 0) {
      files.forEach(function(filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename)
        } else {
          fs.unlinkSync(path + "/" + filename)
        }
      })
    } else {
      console.log("No files found in the directory.")
    }
  } else {
    console.log("Directory path not found.")
  }
}

const addUser = (name) => {
  fs.readFile(`C:/users/ruzarek-win/eyedpay/uploads/request.jpg`, function (err, data) {
      if (err) { throw err; }
      params = {Bucket: bucket, Key: `users/${name}.jpg`, Body: data };
      s3.putObject(params, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log(`Successfully uploaded ${name} to ${bucket}`);
        }
      });
    });
}

app.post('/addUser', (req, res) => {
  addUser(req.body.username)
  removeDir('uploads')
})

const addRequest = (file) => {
  fs.readFile(`C:/users/ruzarek-win/eyedpay/uploads/${file}.jpg`, function (err, data) {
    if (err) { throw err; }
      params = {Bucket: bucket, Key: `requests/${file}.jpg`, Body: data };
      s3.putObject(params, function(err, data) {
        if (err) {
          console.log(err)
        } else {
          console.log(`Successfully uploaded ${file} to ${bucket}`);
          }
        });
    });
}


app.get('/remove', (req,res) => {
  removeDir('uploads')
  res.sendStatus(200)
})

app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/uploads/request.jpg`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    //addRequest('request.jpg')
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}`});
  });
});

app.post('/uploadRequest', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/uploads/request.jpg`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    

  fs.readFile(`C:/users/ruzarek-win/eyedpay/uploads/request.jpg`, function (err, data) {
    if (err) { throw err; }
      params = {Bucket: bucket, Key: `requests/request.jpg`, Body: data };
      s3.putObject(params, function(err, data) {
        if (err) {
          console.log(err)
        } else {
          console.log(`Successfully uploaded file to ${bucket}`);
          res.send('proceed')
          }
          });
      });


  
  });
  
});



app.listen(5000, () => console.log('Server Started...'));


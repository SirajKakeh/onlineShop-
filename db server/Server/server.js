const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('../database/index').User;
const Product = require('../database/index').Product;

const app = express();
const port = 3000;



// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});


app.get('/', (req, res) => {
  var products = [
    new Product({
      imagePath: 'http://bestanimations.com/Food/waffles-animated-gif.gif',
      title: 'waffles',
      description: 'amazing swite !!!!',
      price:10
    }),
    new Product({
      imagePath: 'http://bestanimations.com/Food/food-animated-gif-18.gif',
      title: 'salad',
      description: 'amazing salad !!!!',
      price:20
    }),
    new Product({
      imagePath:'http://bestanimations.com/Food/food-animated-gif-16.gif',
      title: 'ice creem',
      description: 'amazing ice creem !!!!',
      price:30
    })
  ];
  for (var i=0; i< products.length ; i++) {
    products[i].save((err, result) => {
    });
  }
  res.end();
});

// Get Clients - GET
app.post('/users', (req, res, next) => {
  var Siraj = new User ({  
    email: 'ss@22.com',
    username: 'Siraj',
    password: '1234333',
    products: []
  });
  Siraj.save( function(err,result) {
    if(err){
      console.log(err);
    }else{
      console.log(result);
    }
   });
   res.end();
});

app.get('/users', function(req, res) {
  User.find((err, result) => {
    if(err) {
      res.send('fetch err =======>' + err);
    }
    res.send(result);
  });
});

app.options('/cart/*', (req, res) => {
  res.end();
});

app.options('/cart', (req, res) => {
  // console.log(req.body);
  res.end();
});


app.post('/cart', (req, res) => {
  var username = 'Siraj';
  // console.log(req.body);
  User.find({username: username}, (err, user) => {
    if(err) {
      throw new Error(err);
    }
    console.log(user[0]);
    user[0].products.push(req.body._id);
    User.findOneAndUpdate({username: username}, { products: user[0].products }, (err, user) => {
      if(err) {
        throw new Error(err);
      }
    });
  });
  res.end();
});

app.delete('/cart/*', (req, res) =>{
  var id = req.url.split('?')[1];
  User.find({username: 'Siraj'}, (err, user) => {
    if(err) {
      console.log('error in cart delete user find ==================> ' + err);
    }
    // console.log(user[0].products.indexOf(id));
    if(user[0].products.indexOf(id)>-1) {
      user[0].products.splice(user[0].products.indexOf(id), 1);
    } else {
      console.log('err, product not found in user\'s database');
    }
    User.findOneAndUpdate({username: 'Siraj'}, {products: user[0].products}, (err, newUser) => {
      if(err) {
        console.log('err in update ============> ' + err);
      }
    });    
  });
  res.end();
});

// Add CLient - POST
app.post('/products', (req, res, next) => {
});

app.get('/products', (req, res) => {
  Product.find((err, data) => {
    if(err) {
      res.send('fetch err =======>' + err);
    }
    res.send(data);
  });
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
});

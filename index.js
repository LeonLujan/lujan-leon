const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/app_profes');

const app = express();

const UserSchema = new mongoose.Schema({
  name: String,
  subjects: String,
  email: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.post('/register', (req, res) => {
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    subjects: req.body.subjects,
    email: req.body.email,
    password: req.body.password
  });
  user.save((err, user) => {
    res.redirect('/');
  });
});
app.post('/login', (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }).exec((err, user) => {
    console.log('User encontrado: ', user);
    if (user && user.password == req.body.password) {
      console.log('success');
      res.render('dashboard', { user: user })
    }
    else {
      console.log('unauthorized');
      res.redirect('/');
    }
  })
  // res.send('hola');
});

app.get('/', (req, res) => {
  res.sendFile('./public/index.html');
});

app.listen(3000, () => {
  console.log('Server andando');
});

const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.port || 3030;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/courses');
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});


app.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});
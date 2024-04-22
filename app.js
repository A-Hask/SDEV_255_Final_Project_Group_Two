const express = require('express');
const morgan = require('morgan');
const app = express();
const courseRoutes = require('./routes/courseRoutes');
const PORT = process.env.port || 3030;

app.set('view engine', 'ejs');

// port
app.listen(PORT, 'localhost', () => {
  console.log('listening for requests on port 3030');
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//use courseRoutes
app.use('/courses', courseRoutes);

// routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', courses });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});


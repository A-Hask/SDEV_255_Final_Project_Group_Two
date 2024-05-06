const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');
const PORT = process.env.port || 3030;

app.set('view engine', 'ejs');

// port
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//connect to mongodb
db_URI = 'mongodb+srv://ccornwall2:SDEV255GROUP2@courses.zjt5law.mongodb.net/FinalProject?retryWrites=true&w=majority&appName=Courses'
mongoose.connect(db_URI)
    .then((result) => {
        console.log('Connected to db')})
    .catch((err) => console.log(err));

//use courseRoutes
app.use('/courses', courseRoutes);

app.get('/', (req, res) => {
  res.redirect('/courses');
});
app.use(authRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});






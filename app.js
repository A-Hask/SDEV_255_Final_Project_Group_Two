const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const courseRoutes = require('./routes/courseRoutes');
const PORT = process.env.port || 3030;
const Course = require('./models/course');

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

//connect to mongodb
db_URI = 'mongodb+srv://ccornwall2:SDEV255GROUP2@courses.zjt5law.mongodb.net/FinalProject?retryWrites=true&w=majority&appName=Courses'
mongoose.connect(db_URI)
    .then((result) => {
        console.log('Connected to db')})
    .catch((err) => console.log(err));

//use courseRoutes
app.use('/courses', courseRoutes);

// routes
app.get('/', (req, res) => {
  Course.find()
    .then((result) => {
      res.render('index', { title: 'Home', courses: result});
    })
    .catch((err) => {
      console.log(err);
    })
});

app.get('/add-course', (req, res) => {
  const course = new Course({
      name: 'SDEV255',
      subject: 'Computer Science',
      description: 'Students will learn how to create websites.',
      credits: 3
  });

  course.save()
      .then((result) => {
          res.send(result)
      })
      .catch((err) => {
          console.log(err);
      });
})

app.get('/courses/create', (req, res) => {
  res.render('create', {title: 'Create A Course'});
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});





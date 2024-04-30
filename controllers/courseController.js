const Course = require('../models/course');

const course_index = (req, res) => {
  Course.find()
  .then(result => {
    res.render('index', { title: 'Courses', courses: result });
    })
  .catch(err => {
    console.log(err);
  })
}

const course_create_get = (req, res) => {
  res.render('create', { title: 'Create a new course' });
}

const course_description = (req, res) => {
  const id = req.params.id;
  Course.findById(id)
  .then(result => {
    res.render('description', { title: 'Course Description', course: result });
  })
  .catch(err => {
    console.log(err);
    res.status(404).render('404', { title: 'Course not found' });
  });
}

const course_create_post = (req, res) => {
  const course = new Course(req.body);
  course.save()
  .then(result => {
    res.redirect('/courses');
  })
  .catch(err => {
    console.log(err);
  });
}

const course_delete = (req, res) => {
  const id = req.params.id;
  Course.findByIdAndDelete(id)
  .then(result => {
    res.json({redirect: '/courses'});
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports = {
  course_index, 
  course_description, 
  course_create_get, 
  course_create_post, 
  course_delete
}
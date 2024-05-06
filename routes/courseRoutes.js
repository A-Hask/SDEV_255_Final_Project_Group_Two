const express = require('express');
const courseController = require('../controllers/courseController');
const courseRouter = express.Router();

courseRouter.get('/', courseController.course_index);
courseRouter.get('/create', courseController.course_create_get);
courseRouter.post('/', courseController.course_create_post);
courseRouter.get('/:id', courseController.course_description);
courseRouter.delete('/:id', courseController.course_delete);

module.exports = courseRouter;

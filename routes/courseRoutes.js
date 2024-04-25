const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.get('/', courseController.course_index);
router.get('/courses/create', courseController.course_create_get);
router.post('/', courseController.course_create_post);

module.exports = router;
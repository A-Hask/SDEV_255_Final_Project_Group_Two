const express = require('express');
const courseController = require('../controllers/courseController');
const router = express.Router();

router.get('/', courseController.course_index);
router.get('/create', courseController.course_create_get);
router.post('/', courseController.course_create_post);
router.get('/:id', courseController.course_description);
router.delete('/:id', courseController.course_delete);

module.exports = router;
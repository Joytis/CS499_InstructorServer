var express = require('express');
var router = express.Router();
var model = require('../models/index');
 
/* GET todo listing. */
router.get('/', function(req, res, next) {
  mode.Todo.findAll({})
    .then(todos => res.json({
      error: false,
      data: todos
    }))
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));
});
 
 
/* POST todo. */
router.post('/', function(req, res, next) {
 
});
 
 
/* update todo. */
router.put('/:id', function(req, res, next) {
 
});
 
 
/* GET todo listing. */
router.delete('/:id', function(req, res, next) {
 
});
 
module.exports = router;
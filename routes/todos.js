// NOTE: THIS IS JUST A TEST REST API! Doesn't even use async await. :c
const express = require('express');
const model = require('../models/index');

const router = express.Router();

/* GET todo listing. */
router.get('/', (req, res) => {
  model.todo.findAll()
    .then(todos => res.json({
      error: false,
      data: todos,
    }))
    .catch(error => res.json({
      error: true,
      message: error,
    }));
});


/* POST todo. */
router.post('/', (req, res) => {
  const { title, description } = req.body;

  model.todo.create({ title, description })
    .then(todo => res.status(201).json({
      error: false,
      data: todo,
      message: 'New todo has been created.',
    }))
    .catch(error => res.json({
      error: true,
      message: error,
    }));
});


/* update todo. */
router.put('/:id', (req, res) => {
  // OBject destructing
  const { id } = req.params;
  const { title, description } = req.body;

  model.todo.update({ title, description }, { where: { id } })
    .then(() => res.status(201).json({
      error: false,
      message: 'todo has been updated.',
    }))
    .catch(error => res.json({
      error: true,
      message: error,
    }));
});


/* GET todo listing. */
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  model.todo.destroy({ where: { id } })
    .then(() => res.status(201).json({
      error: false,
      message: 'todo has been delete.',
    }))
    .catch(error => res.json({
      error: true,
      message: error,
    }));
});

module.exports = router;

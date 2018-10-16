const express = require('express');
// const sessionChecker = require('../sessionChecker');
const query = require('../query');

module.exports = class SimpleRouterFactory {
  constructor(model) {
    this.model = model;
  }

  async basicGet(req, res, next) {
    return query.findAllEntries(res, next, {
      model: this.model,
    });
  }

  async targetedGet(req, res, next) {
    return query.findOneEntry(res, next, {
      model: this.model,
      where: { id: req.params.id },
    });
  }

  async basicPost(req, res, next) {
    return query.createOneEntry(res, next, {
      model: this.model,
      values: req.body,
    });
  }

  async basicUpdate(req, res, next) {
    return query.updateOneEntry(res, next, {
      model: this.model,
      where: { id: req.params.id },
      values: req.body.data,
    });
  }

  async basicDelete(req, res, next) {
    return query.deleteOneEntry(res, next, {
      model: this.model,
      where: { id: req.params.id },
    });
  }

  createRouter() {
    const router = express.Router();
    router.get('/', this.basicGet);
    router.get('/:id', this.targetedGet);
    router.post('/', this.basicPost);
    router.put('/:id', this.basicUpdate);
    router.delete('/:id', this.basicDelete);
    return router;
  }
};

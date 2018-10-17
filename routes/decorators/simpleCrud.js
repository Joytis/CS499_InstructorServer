const query = require('../query');

module.exports.decorate = (router, model) => {
  // The same as term just about! This is fairly deliberate.
  router.get('/', async (req, res, next) => query.findAllEntries(res, next, { model }));

  router.get('/:id', async (req, res, next) => query.findOneEntry(res, next, {
    model,
    where: { id: req.params.id },
  }));

  router.post('/', async (req, res, next) => query.createOneEntry(res, next, {
    model,
    values: req.body,
  }));

  router.put('/:id', async (req, res, next) => query.updateOneEntry(res, next, {
    model,
    where: { id: req.params.id },
    values: req.body.data,
  }));

  router.delete('/:id', async (req, res, next) => query.deleteOneEntry(res, next, {
    model,
    where: { id: req.params.id },
  }));
};

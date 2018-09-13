const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const db = require('../../models');

chai.use(chaiAsPromised);

const { expect } = chai;

// Crete database
// Attempt to authenticate database before adding routes to app.
describe('Assignment', () => {
  before(async () => {
    await db.sequelize.authenticate().catch((err) => { throw err; });
    await db.sequelize.sync().catch((err) => { throw err; });
  });

  beforeEach(async () => {
    await db.assignment.destroy({ where: {}, truncate: true });
    await db.assignmentCategory.destroy({ where: {}, truncate: true });
  });

  describe('#createWithoutLink()', () => {
    it.only('should be rejected without link', () => {
      return expect(db.assignment.create({ name: 'testAss' })).to.be.rejected;
    });
  });

  describe('#create()', () => {
    it.only('should be created when linked', async () => {
      const category = await db.assignmentCategory.create({ name: 'testCat' });
      expect(category).to.not.equal(undefined);
      expect(category.id).to.not.equal(null);
      const assignment = await db.assignment.create({ name: 'testAss', assignmentCategoryId: category.id });
      expect(assignment).to.not.equal(undefined);
      expect(assignment.name).to.equal('testAss');
    });
  });
});

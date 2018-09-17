const db = require('../../models');

let course;
let term;
let section;
let category;

// Crete database
// Attempt to authenticate database before adding routes to app.
beforeAll(async () => {
  await db.sequelize.authenticate().catch((err) => { throw err; });
  await db.sequelize.sync().catch((err) => { throw err; });
});

beforeEach(async () => {
  // Clear tables
  await db.assignment.destroy({ where: {}, truncate: true });
  await db.assignmentCategory.destroy({ where: {}, truncate: true });
  // Create basic entries.
  course = await db.course.create({ name: 'testCourse' });
  term = await db.term.create({ name: 'testTerm' });
  section = await course.createSection({
    sectionNumber: 0,
    termId: term.id,
    courseId: course.id,
  });
  category = await db.assignmentCategory.create({
    name: 'testAssCat',
    sectionId: section.id,
  });
});

it('should be rejected without link', async () => {
  await expect(db.assignment.create({ name: 'testAss' })).reject;
});

it('should be created when linked correctly', async () => {
  const assignment = await db.assignment.create({ name: 'testAss', assignmentCategoryId: category.id });
  expect(assignment).not.toBe(undefined);
  expect(assignment.name).toBe('testAss');
});

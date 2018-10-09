const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const { logger } = require('./config');

const app = express();

// Attempt to authenticate database before adding routes to app.
db.sequelize.authenticate()
  .then(async () => {
    logger.info('Connection has been established. Attempting sync');
    await db.sequelize.sync().catch(err => logger.error('Unable to connnect: ', err));
  })
  .catch(err => logger.error('Unable to connect to database: ', err));


// Initialize express to forward to winston with morgan.
app.use(morgan('combined', { stream: logger.stream }));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.json());

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'instructor_sid',
  secret: 'CHANGEME',
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: db.sequelize,
  }),
  cookie: {
    expires: 600000,
  },
}));

app.use(express.json());

// This middleare intercepts requests for favicon and tells them to bugger off.
app.use((req, res, next) => {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({ nope: true });
  }
  next();
});

// Checks if cookie is still active but the database session isn't.
app.use((req, res, next) => {
  if (req.cookies.instructor_sid && !req.session.instructor) {
    res.clearCookie('instructor_sid');
  }
  next();
});

// Add routes to app.
app.use('/', require('./routes/index'));
app.use('/instructor', require('./routes/instructor'));
app.use('/terms', require('./routes/terms'));

// Error handling middleware.
// NOTE: we NEED next for this error handler.
app.use((err, req, res, next) => { // eslint-disable-line
  logger.error(err);

  // // Remove Error's `stack` property. We don't want
  // // users to see this at the production env
  // if (process.env.NODE_ENV !== 'development') {
  //   // Deliberately ignoring pure progrmaming here. We're the last middleware in the chain.
  //   // NOTE: we're the last function here, so just delete the error stack.
  //   // delete err.stack; // eslint-disable-line
  // }

  // Finaly respond to the request */
  res.status(err.statusCode || 500).json(err);
});

module.exports = app;

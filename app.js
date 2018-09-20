const createError = require('http-errors');
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const { logger } = require('./config');

// Initialize sequelize with session store

// Grab all the routes. NOTE: should probably iterate over folder.
const index = require('./routes/index');
const todos = require('./routes/todos');
const login = require('./routes/login');
const signup = require('./routes/signup');

const app = express();

// Attempt to authenticate database before adding routes to app.
db.sequelize.authenticate()
  .then(async () => {
    logger.info('Connection has been established. Attempting sync');
    await db.sequelize.sync().catch(err => logger.error('Unable to connnect: ', err));
  })
  .catch(err => logger.error('Unable to connect to database: ', err));

// Create express application

// Initialize express to forward to winston with morgan.
app.use(morgan('combined', { stream: logger.stream }));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.json());

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
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
// app.use(express.urlencoded({ extended: false }));

// This middleare intercepts requests for favicon and tells them to bugger off.
app.use((req, res, next) => {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({ nope: true });
  }
  next();
});

// This middleware will check if user's cookie is still saved in browser and user is not set
//  then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still
//  remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

// This session middleware logs the session information. REMOVE FOR PRODUCTION.
app.use((req, res, next) => {
  logger.info('req.session', req.session);
  next();
});

// Add routes to app.
app.use('/', index);
app.use('/todos', todos);
app.use('/login', login);
app.use('/signup', signup);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // Change Status
  res.status(err.status || 500);

  // SEnd status back as error.
  res.json({
    error: req.app.get('env') === 'development' ? err : {},
    message: err.message,
  });
});

module.exports = app;

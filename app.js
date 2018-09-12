const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const db = require('./models');
const { logger } = require('./config');

const index = require('./routes/index');
const users = require('./routes/users');
const todos = require('./routes/todos');

const app = express();

// Attempt to authenticate database before adding routes to app.
db.sequelize.authenticate()
  .then(async () => {
    logger.info('Connection has been established. Attempting sync');
    await db.sequelize.sync().catch(err => logger.error('Unable to connnect: ', err));
  })
  .catch(err => logger.error('Unable to connect to database: ', err));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/todos', todos);

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

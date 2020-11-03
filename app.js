// Require dotenv .env file
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Require dependencies
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// Dependencies for sessions
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Dependencies for messages
const flash = require('connect-flash');

// For passport.js dependency
const User = require('./models/user');
const passport = require('passport');

// Require routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var dmRouter = require('./routes/dm')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Setup mongoose connection
const connectMongo = async () => {
  await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
  });
}
connectMongo();
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true); // Because of deprecation of ensureIndex

// DB Connection Error Detection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to DB');
});

// Middleware
// Set up helmet middleware
app.use(helmet());

// Set up compress responses middleware
app.use(compression());

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up session middleware
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Configure Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash messages
app.use(flash());

// Custom Middleware
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.url = req.path;
  res.locals.flash = req.flash();
  res.locals.siteName = 'SideQuest DnD';
  res.locals.siteAlias = 'SideQuest';
  res.locals.cloudinaryFolder = 'sideQuest';
  next();
});

// Routes middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/dm', dmRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

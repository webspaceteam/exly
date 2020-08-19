var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');

const PRODUCTION = process.env.NODE_ENV === 'production' ? true : false;

var app = express();

const devServerEnabled = true;
if (!PRODUCTION) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack.config.js');

  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);

  //Enable "webpack-dev-middleware"
  app.use(webpackDevMiddleware(compiler, {
  }));

  //Enable "webpack-hot-middleware"
  app.use(webpackHotMiddleware(compiler));
}

// view engine setup
const exphbs = require('express-handlebars');
app.engine('hbs', exphbs({
  defaultLayout: 'layout', 
  extname: '.hbs',
  helpers: require('./config/handlebars-helpers') 
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join('./public')));

app.use('/', indexRouter);

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

const PORT = process.env.PORT ? process.env.PORT : 3000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});


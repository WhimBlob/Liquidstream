var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var formatMessage = require('./utils/messages');
var router = express.Router();
var FileStore = require('session-file-store') (session);


var http = require('http');
var socketio = require('socket.io');

// Connect to mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://WhimBlob:LiquidC@k3@liquidstream.0fw8v.mongodb.net/liquidtb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
const { constants } = require('fs');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// When client connects
io.on('connection', socket => {

  socket.emit('message', formatMessage('Chatbot', 'Just connected to LiquidStream'));

  socket.broadcast.emit('message', formatMessage('Chatbot', 'A user has joined the chat'));

  socket.on('disconnect', () => {
    io.emit('message', formatMessage('Chatbot', 'A user has left the cahat'));
  })

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    // if (sess.user != null) {
    // io.emit('message', formatMessage(sess.user, msg));
    // }
    // else {
      io.emit('message', formatMessage('Guest', msg));
    // }
  });
});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log());

// Gérer la session
app.use(session({
  store: new FileStore({
    path: './server/sessions'
  }),
  secret: 'user_secret',
  resave: false,
  saveUninitialized: false,
  maxAge: Date().now + (60 * 1000 * 30)
}));

// The routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
// Pour le login/logout
app.use('/login', loginRouter);
app.use('/logout', loginRouter)

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

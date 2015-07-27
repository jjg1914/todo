var gulp = require('gulp');
var connect = require('connect');
var livereload = require('livereload');
var morgan = require('morgan');
var connectLivereload = require('connect-livereload');
var serveStatic = require('serve-static');

var http = require('http');

gulp.task('server', function(done) {
  var server = connect();
  livereload.createServer().watch(__dirname + "/public");

  server.use(morgan('dev'));
  server.use(connectLivereload());
  server.use('/bower_components', serveStatic('bower_components'));
  server.use(serveStatic('public'));

  http.createServer(server).listen(8000);
  
  process.on('SIGINT', function() {
    done();
    process.exit();
  });
});

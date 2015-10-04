var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var jsValidate    = require('gulp-jsvalidate');
var scsslint      = require('gulp-scss-lint');

var path = {
  css   : 'css',
  js    : 'scripts'
}

/*
 * Sass
 *  - Generate CSS
 *  - Add autoprefix
 *  - Add sourcemaps
 */
gulp.task('sass', function(){
  gulp.src(path.css+'/**/*.scss')    
    .pipe($.sass({
      style: 'compact',
    }).on('error', $.notify.onError(function (error) {
      return "Problem file : " + error.message;
    })))
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.css))
    .pipe($.notify("Sass Task finished !"));
});

/*
 * Check JS 
 */
gulp.task('check-js', function() {
  return gulp.src(path.js + '/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

/*
 * Default & Watch tasks
 */
gulp.task('default', function(){
  gulp.watch(path.css + '/**/*.scss', ['sass']);
  gulp.watch([path.js+'**/*.js'], ['check-js']);
});

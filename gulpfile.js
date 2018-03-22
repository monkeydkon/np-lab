const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

//Compile Sass & Inject Into Browser
gulp.task('sass', function() {
  return gulp.src(['assets/scss/**/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
});


// Watch Sass & Server
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "../NPLAB",
    tunnel: true,
    tunnel: "mobile"
  });

  gulp.watch(['assets/scss/**/*.scss'], ['sass']);
  gulp.watch("*.html").on('change', browserSync.reload);
  gulp.watch(['assets/js/*.js']).on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
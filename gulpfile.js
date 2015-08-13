var gulp = require('gulp'),
    minifyHTML = require('gulp-minify-html'),
    changed = require('gulp-changed'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');


// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = '*.html',
      htmlDst = 'build';

  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});


gulp.task('styles', function() {
  return sass('src/css/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('build/src/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('build/src/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/src/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/src/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('src/img/img'))
    .pipe(notify({ message: 'Images task complete' }));
});


gulp.task('clean', function(cb) {
    del(['build/src/css', 'build/src/js', 'build/assets/img'], cb)
});


gulp.task('default', ['clean'], function() {
    gulp.start('htmlpage', 'styles', 'scripts', 'images');
});



gulp.task('watch', function() {

  gulp.watch('src/*.html', ['htmlpage']);

  // Watch .scss files
  gulp.watch('src/css/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/js/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/img/*', ['images']);


    // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['build/**']).on('change', livereload.changed);

});
var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rimraf = require('gulp-rimraf'),
  rename = require('gulp-rename'),
  browserify = require('gulp-browserify'),
  SRC = './lib/string.js',
  TEST_SRC = './test/string.test.js',
  DEST = 'dist',
  mocha = require('gulp-mocha'),
  SRC_COMPILED = 'string.js',
  MIN_FILE = 'string.min.js';

gulp.task('browserify', function() {
  return gulp.src(SRC)
    .pipe(browserify({
      detectGlobals: true,
      standalone: 'S'
    }))
    .pipe(gulp.dest(DEST));
});

gulp.task('test', ['browserify'], function () {
  return gulp.src(TEST_SRC, {read: false})
    .pipe(mocha({reporter: 'spec', growl: 1}));
});

gulp.task('clean', function() {
  return gulp.src(DEST)
    .pipe(rimraf());
});

gulp.task('build', ['test', 'clean'], function() {
  gulp.src(DEST + '/' + SRC_COMPILED)
    .pipe(uglify())
    .pipe(rename(MIN_FILE))
    .pipe(gulp.dest(DEST));
});
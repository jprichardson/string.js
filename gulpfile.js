var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rimraf = require('gulp-rimraf'),
  rename = require('gulp-rename'),
  bro = require('gulp-bro'),
  SRC = './lib/string.js',
  TEST_SRC = './test/string.test.js',
  mochify = require('mochify'),
  DEST = 'dist',
  mocha = require('gulp-mocha'),
  SRC_COMPILED = 'string.js',
  MIN_FILE = 'string.min.js';

gulp.task('bro', function() {
  return gulp.src(SRC)
    .pipe(bro({
      detectGlobals: true,
      standalone: 'S'
    }))
    .pipe(gulp.dest(DEST));
});

gulp.task('browserTest', function (done) {
  return mochify( { wd: true } )
    .on('error', function(err){ if(err) done(err); else done(); })
    .bundle();
});

gulp.task('test', gulp.series('bro', function () {
  return gulp.src(TEST_SRC, {read: false})
    .pipe(mocha(Object.assign({reporter: 'spec', growl: 1})));
}));


gulp.task('clean', function() {
  return gulp.src(DEST)
    .pipe(rimraf());
});

gulp.task('build', gulp.series(['test', 'clean'], function() {
  gulp.src(DEST + '/' + SRC_COMPILED)
    .pipe(uglify())
    .pipe(rename(MIN_FILE))
    .pipe(gulp.dest(DEST));
}));

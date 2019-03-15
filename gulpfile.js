const gulp = require('gulp'),
  babelify = require('babelify'),
  browserify = require('browserify'),
  versionify = require('package-json-versionify'),
  gzip = require('gulp-gzip'),
  uglify = require('gulp-uglify'),
  rimraf = require('gulp-rimraf'),
  rename = require('gulp-rename'),
  mocha = require('gulp-mocha'),
  SRC = './index.js',
  TEST_SRC = ['./**/*test.js', '!node_modules/**'],
  DEST = 'dist',
  SRC_COMPILED = 'string.js',
  MIN_FILE = 'string.min.js';

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');


gulp.task('browserify', () => {
  const bundleStream = browserify({
    entries: SRC,
    debug: true,
    detectGlobals: true,
    standalone: 'S',
  })
    .transform(babelify)
    .transform(versionify)
    .bundle();


  return bundleStream
    .pipe(source(SRC))
    .pipe(buffer())
    .pipe(rename(SRC_COMPILED))
    .pipe(gulp.dest(DEST));
});

gulp.task('test', gulp.series('browserify', () => {
  return gulp.src(TEST_SRC, {read: false})
    .pipe(mocha({
      reporter: 'list',
    }));
}));


gulp.task('clean', () => {
  return gulp.src(DEST, { allowEmpty: true })
    .pipe(rimraf());
});

gulp.task('build', gulp.series('clean', 'test', () => {
  return gulp.src(`${DEST}/${SRC_COMPILED}`)
    .pipe(uglify())
    .pipe(rename(MIN_FILE))
    .pipe(gulp.dest(DEST))
    .pipe(gzip({
      extension: 'gz',
      gzipOptions: { level: 9 }
    }))
    .pipe(gulp.dest(DEST));
}));

gulp.task('default', gulp.series('build'));

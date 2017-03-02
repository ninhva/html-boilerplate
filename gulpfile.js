var gulp = require('gulp');
var connect = require('gulp-connect');
var fileinclude = require('gulp-file-include');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var prettify = require('gulp-jsbeautifier');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');
var htmlhint = require("gulp-htmlhint");

gulp.sources = {
  src:  './src',
  dist: './dist'
};

// Start server dev
gulp.task('connect:dev', () => {
  connect.server({
    root: [gulp.sources.src, '.tmp', './'],
    livereload: true,
    port: 9000,
    host: '0.0.0.0',
    fallback: gulp.sources.src + '/index.html'
  });
});

// Start server product
gulp.task('connect:prod', () => {
  connect.server({
    root: [gulp.sources.dist],
    livereload: true,
    port: 9090,
    host: '0.0.0.0',
    fallback: gulp.sources.dist + '/index.html'
  });
});

// Watch
gulp.task('stream', () => {
  gulp.watch(gulp.sources.src + '/views/**/*.html', ['fileinclude']);
  gulp.watch(gulp.sources.src + '/styles/**/*.scss', ['sass']);
});

// Include HTML
gulp.task('fileinclude', ['clean'], () => {
  return gulp.src([gulp.sources.src + '/views/pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(gulp.sources.src))
    .pipe(connect.reload());
});

// Minify CSS, JS
gulp.task('minify', () => {
  return gulp.src(gulp.sources.src + '/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss({
      keepSpecialComments : 0
    })))
    .pipe(gulp.dest(gulp.sources.dist));
});

// Sass
gulp.task('sass', ['htmlhint'], () => {
  return gulp.src(gulp.sources.src + '/styles/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(connect.reload());
});

// Minify images
gulp.task('imagemin', () => {
  return gulp.src(gulp.sources.src + '/images/**/*')
    .pipe(imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(gulp.sources.dist + '/images'))
});

// Copy fonts
gulp.task('htmlhint', ['fileinclude'], () => {
  return gulp.src(gulp.sources.src + '/*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.failReporter())
});

// Copy fonts
gulp.task('copy:fonts', () => {
  return gulp.src(gulp.sources.src + '/fonts/**/*')
    .pipe(gulp.dest(gulp.sources.dist + '/fonts'))
});

// HTML beautify
gulp.task('prettify', ['copy:fonts'], () => {
  return gulp.src([gulp.sources.dist + '/*.html'])
    .pipe(prettify({
      indent_char: ' ',
      indent_size: 2
    }))
    .pipe(gulp.dest(gulp.sources.dist));
});

// Remove dist, tmp
gulp.task('clean', () => {
  return del(['.tmp', gulp.sources.dist])
});

// Build source
gulp.task('build', () => {
  runSequence('clean', 'fileinclude', 'htmlhint', 'sass', 'minify', 'imagemin', 'copy:fonts', 'prettify', (e) => {
    if (!e) {
      console.log('Success!');
    }
  });
});

// Start development server
gulp.task('run:dev', () => {
  runSequence('clean', 'connect:dev', 'fileinclude', 'sass', 'stream', () => {
    console.log('Development version is running...');
  });
});

// Start product server
gulp.task('run:prod', () => {
  runSequence('build', 'connect:prod', () => {
    console.log('Production version is running...');
  });
});
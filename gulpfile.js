/* eslint-env node */ // Tell eslint that this is a node file (so it accepts require())

// Import modules
const gulp = require('gulp'); // To export tasks
const sass = require('gulp-sass'); // To compile sass into css
const autoprefixer = require('gulp-autoprefixer'); // To add vendor prefixes to css
const browserSync = require('browser-sync').create(); // To edit live
const eslint = require('gulp-eslint'); // To lint JavaScript
const concat = require('gulp-concat'); // To concat JS
const uglify = require('gulp-uglify'); // To minify JS

// Initialize variables
const paths = {
  styles: {
    src: 'sass/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'js/**/*.js',
    dest: 'dist/js/'
  },
  html: {
    src: './index.html',
    dest: 'dist/'
  }
};

// Export tasks
gulp.task('default', gulp.series(copyHtml, compile, serve));
gulp.task('compile', compile);
gulp.task('lint', lint);
gulp.task('copy-html', copyHtml);
gulp.task('scripts', scripts);
gulp.task('scripts-dist', scriptsDist);
// Build production-ready version of website
gulp.task('dist', gulp.series(copyHtml, compile, scriptsDist));

// Declare Tasks

/* Initialize server and watch for changes */
function serve (done) {
  // Initialize browserSync server
  browserSync.init({
    server: './dist' // Define directory to serve (should contain index.html)
  });
  gulp.watch(paths.styles.src, compile); // Watch for sass changes and compile
  gulp.watch(paths.scripts.src, lint); // Watch for JavaScript changes and lint
  // Watch for html changes and reload
  // Different from other tasks because browserSync isn't a gulp plugin
  gulp.watch(paths.html.dest).on('change', browserSync.reload);
  gulp.watch(paths.html.src, copyHtml); // Watch html and copy it to dist on change
  done(); // Signal completion of the execution of the function
}

/* Compile sass into css */
function compile (done) {
  gulp.src(paths.styles.src) // Get sass files from sass directory
    .pipe(sass().on('error', sass.logError)) // Compile them into css and log any errors
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    })) // Autoprefixe them with browser vendor prefixes
    .pipe(gulp.dest(paths.styles.dest)) // Save them in css directory
    .pipe(browserSync.stream()); // Stream to browser (ie upload it)
  done(); // Signal completion of the execution of the function
}

/* Lint JavaScript and output to terminal */
function lint (done) {
  gulp.src(paths.scripts.src) // Get JavaScript files to lint
    .pipe(eslint()) // Lint files
    .pipe(eslint.format()) // Output errors to terminal
    .pipe(eslint.failAfterError()); // Exit with error code
  done();
}

/* Copy html to dist directory */
function copyHtml (done) {
  gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
  done();
}

/* Copy concatenated JavaScript to dist */
function scripts (done) {
  gulp.src(paths.scripts.src)
    .pipe(concat('all.js')) // Concat all JS files into one all.js
    .pipe(gulp.dest(paths.scripts.dest));
  done();
}

/* Copy concatenated and minified JavaScript to dist */
function scriptsDist (done) {
  gulp.src(paths.scripts.src)
    .pipe(concat('all.js')) // Concat all JS files into one all.js
    .pipe(uglify()) // Minify JS (time-intensive, so only for dist)
    .pipe(gulp.dest(paths.scripts.dest));
  done();
}

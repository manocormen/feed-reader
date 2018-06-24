// Import modules
const gulp = require('gulp'); // To export tasks
const sass = require('gulp-sass'); // To compile sass into css
const autoprefixer = require('gulp-autoprefixer'); // To add vendor prefixes to css
const browserSync = require('browser-sync').create(); // To edit live

// Initialize variables
const paths = {
  styles: {
    src: 'sass/**/*.scss',
    dest: 'css/'
  }
};

// Export tasks
gulp.task('default', serve);
gulp.task('compile', compile);

// Declare Tasks

/* Initialize server and watch for changes */
function serve (done) {
  // Initialize browserSync server
  browserSync.init({
    server: "./" // Define directory to serve (should contain index.html)
  });
  gulp.watch(paths.styles.src, compile); // Watch for sass changes and compile
  gulp.watch("./*html").on('change', browserSync.reload); // Watch for html changes and reload
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

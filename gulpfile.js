// Import modules
const gulp = require('gulp'); // To export tasks
const sass = require('gulp-sass'); // To compile sass into css
const autoprefixer = require('gulp-autoprefixer'); // To add vendor prefixes to css

// Initialize variables
const paths = {
  styles: {
    src: 'sass/**/*.scss',
    dest: 'css/'
  }
};

// Export tasks
gulp.task('default', defaultTask)
gulp.task('compileStyles', compileStyles)

// Declare Tasks

/* Executes default tasks */
function defaultTask (done) {
  console.log('The defaultTask works!');
  done(); // Signal completion of the execution of the function
}

/* Compile sass into css */
function compileStyles (done) {
  gulp.src(paths.styles.src) // Get sass files from sass directory
      .pipe(sass().on('error', sass.logError)) // Compile them into css and log any errors
      .pipe(autoprefixer({
        browsers: ['last 2 versions']
      })) // Autoprefixe them with browser vendor prefixes
      .pipe(gulp.dest(paths.styles.dest)); // Save them in css directory
  done(); // Signal completion of the execution of the function
}

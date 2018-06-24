// Import modules
const gulp = require('gulp');

// Export tasks
gulp.task('default', defaultTask)

// Declare Tasks
function defaultTask (done) {
  console.log('The defaultTask works!');
  done(); // Signal completion of the execution of the function
}

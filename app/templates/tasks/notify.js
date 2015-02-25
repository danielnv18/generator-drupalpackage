module.exports = function(grunt) {

  /**
   * Define "notify" tasks.
   */
  grunt.loadTasks(__dirname + '/../node_modules/grunt-notify/tasks');
  grunt.config('notify', {
    css_compile: {
      options: {
        title: 'Compass',  // optional
        message: 'Compile was successful' //required
      }
    },
    app_change: {
      options: {
        title: 'Javascript',  // optional
        message: 'Concatenated and minified successfully' //required
      }
    }
  });
};

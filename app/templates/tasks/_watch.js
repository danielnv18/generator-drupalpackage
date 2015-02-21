module.exports = function(grunt) {

  /**
   * Define "watch" tasks.
   *
   * Add a watch task that automatically runs the test suite when a file in
   * the Drupal docroot changes (except for files in sites/.../files) or when
   * a file in the testing features directory changes.
   */
  grunt.loadTasks(__dirname + '/../node_modules/grunt-contrib-watch/tasks');
  grunt.config('watch', {
    css: {
      files: ['build/html/sites/all/themes/<%= config.project.name %>/css/*.css'],
      tasks: ['notify:css_compile'],
      options: {
        livereload: true
      }
    },
    sass: {
      files: ['src/sass/**/*.scss'],
      tasks: ['sass_change']
    },
    js: {
      files: [
        '<%= concat.app.src %>',
        '<%= concat.plugins.src %>',
        '<%= concat.base.src %>',
        '<%= concat.main.src %>',
        '<%= concat.setup.src %>',
        '<%= concat.main_setup.src %>'
      ],
      tasks: ['notify:app_change', 'app_change'],
      options: {
        livereload: true
      }
    }
  });
};

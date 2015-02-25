module.exports = function(grunt) {

  /**
   * Define "drush" tasks.
   *
   * grunt drush:make
   *   Builds the Drush make file to the build/html directory.
   */
  grunt.loadTasks(__dirname + '/../node_modules/grunt-drush/tasks');
  grunt.config('drush', {
    make: {
      args: ['make', '<%= config.srcPaths.make %>', '--no-cache', '--concurrency=16'],
      dest: '<%= config.buildPaths.html %>'
    },
    updb: {
      args: ['updb', '--yes'],
      dest: '--root=' + __dirname + '/../<%= config.buildPaths.html %>'
    },
    fra: {
      args: ['fra', '--yes'],
      dest: '--root=' + __dirname + '/../<%= config.buildPaths.html %>'
    }
  });
};

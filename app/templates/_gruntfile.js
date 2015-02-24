module.exports = function(grunt) {

  // Initialize global configuration variables.
  var config = grunt.file.readJSON('Gruntconfig.json');
  grunt.initConfig({
    config: config
  });

  // Load all included tasks.
  grunt.loadTasks(__dirname + '/tasks');

  // Define the default task to fully build and configure the project.
  var tasksDefault = [
    'clean:default',
    'mkdir:init',
    'drush:make',
    'symlink:profiles',
    'symlink:modules',
    'symlink:features',
    'symlink:theme',
    'clean:sites',
    'symlink:sites',
    'copy:static'
  ];

  // Symlink or create public files.
  if (!grunt.file.exists(config.buildPaths.html + '/sites/default/files')) {
    if (grunt.file.exists('/s3bucket/files')) {
      tasksDefault.push('symlink:s3files');
    } else {
      tasksDefault.push('mkdir:files');
    }
  }

  // Symlink or create private files.
  if (!grunt.file.exists(config.buildPaths.html + '/sites/default/private_files')) {
    if (grunt.file.exists('/s3bucket/private_files')) {
      tasksDefault.push('symlink:s3files_private');
    } else {
      tasksDefault.push('mkdir:files_private');
    }
  }

  grunt.registerTask('default', tasksDefault);
  grunt.registerTask('update', ['drush:updb', 'drush:fra', 'clean:css', 'compass', 'bless']);
  grunt.registerTask('dev', ['clean:css', 'compass:develop', 'watch']);
  grunt.registerTask('develop', ['clean:css', 'compass:develop', 'watch']);
  grunt.registerTask('dev_ie', ['clean:css', 'compass', 'bless', 'watch']);
  grunt.registerTask('sass_change', ['compass']);
};

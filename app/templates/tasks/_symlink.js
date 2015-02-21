module.exports = function(grunt) {

  /**
   * Define "symlink" tasks.
   *
   * grunt symlink:modules
   *   Makes a symbolic link to src/modules from sites/all/modules/custom in
   *   the build/html directory.
   *
   * grunt symlink:profiles
   *   Makes symbolic links in the profiles directory in build/html for each
   *   directory in src/profiles.
   *
   * grunt symlink:sites
   *   Makes symbolic links in the sites directory in build/html for all files
   *   and directories in src/sites (except for src/sites/all since the all
   *   directory needs to be preserved).
   *
   * grunt symlink:themes
   *   Makes a symbolic link to src/themes from sites/all/themes/custom in the
   *   build/html directory.
   */
  grunt.loadTasks(__dirname + '/../node_modules/grunt-contrib-symlink/tasks');
  grunt.config('symlink', {
    modules: {
      src: 'src/modules',
      dest: '<%= config.buildPaths.html %>/sites/all/modules/custom'
    },
    features: {
      src: 'src/features',
      dest: '<%= config.buildPaths.html %>/sites/all/modules/features'
    },
    profiles: {
      expand: true,
      cwd: 'src/profiles',
      src: ['*'],
      dest: '<%= config.buildPaths.html %>/profiles',
      filter: 'isDirectory'
    },
    sites: {
      expand: true,
      cwd: 'src/sites',
      src: ['*'],
      dest: '<%= config.buildPaths.html %>/sites',
      filter: function (path) {
        return (path !== 'src/sites/all');
      }
    },
    s3files: {
      src: '/s3bucket/files',
      dest: '<%= config.buildPaths.html %>/sites/default/files'
    },
    s3files_private: {
      src: '/s3bucket/private_files',
      dest: '<%= config.buildPaths.html %>/sites/default/private_files'
    },
    theme: {
      src: 'src/themes/i4c',
      dest: '<%= config.buildPaths.html %>/sites/all/themes/<%= projectName %>'
    }
  });

};

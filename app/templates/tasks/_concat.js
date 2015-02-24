module.exports = function (grunt) {

  /**
   * Define "concat" tasks.
   */
  grunt.loadTasks(__dirname + '/../node_modules/grunt-contrib-concat/tasks');
  grunt.config('concat', {
    app: {
      src: [
        'src/scripts/_src/*.js'
      ],
      dest: 'build/html/sites/all/themes/<%= config.project.name %>/js/app.js'
    },
    main: {
      src: [
        'src/scripts/main.js'
      ],
      dest: 'build/html/sites/all/themes/<%= config.project.name %>/js/main.js'
    },
    base: {
      src: [
        'src/scripts/base.js',
        'src/scripts/_utils/**/*.js',
        'src/scripts/_config/base.config.*.js'
      ],
      dest: 'build/html/sites/all/themes/<%= config.project.name %>/js/base.js'
    },
    setup: {
      src: [
        'src/scripts/_src/shared/{,*/}*.js',
        'src/scripts/_src/setup/components/*.js',
        'src/scripts/_src/setup/pages/*.js'
      ],
      dest: 'build/html/sites/all/themes/<%= config.project.name %>/js/app.setup.concat.js'
    },
    main_setup: {
      src: [
        'src/scripts/main.setup.js'
      ],
      dest: 'build/html/sites/all/themes/<%= config.project.name %>/js/main.setup.js'
    }
  });
};

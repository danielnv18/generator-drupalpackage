module.exports = function (grunt) {

  /**
   * Define "concat" tasks.
   */
  grunt.loadTasks(__dirname + '/../node_modules/grunt-contrib-concat/tasks');
  grunt.config('concat', {
    plugins: {
      src: [
        'src/scripts/_lib/**/jquery.browser.patch.js',
        'src/scripts/_lib/**/globalize.min.js',
        'src/scripts/_lib/**/*.js',
        'src/scripts/_lib/moment.js'
      ],
      dest: 'build/html/sites/all/themes/<%= projectName %>/js/plugins.js'
    },
    app: {
      src: [
        'src/scripts/_src/*.js'
      ],
      dest: 'build/html/sites/all/themes/<%= projectName %>/js/app.js'
    },
    main: {
      src: [
        'src/scripts/main.js'
      ],
      dest: 'build/html/sites/all/themes/<%= projectName %>/js/main.js'
    },
    base: {
      src: [
        'src/scripts/base.js',
        'src/scripts/_utils/**/*.js',
        'src/scripts/_config/base.config.*.js'
      ],
      dest: 'build/html/sites/all/themes/<%= projectName %>/js/base.js'
    },
    setup: {
      src: [
        'src/scripts/_src/shared/{,*/}*.js',
        'src/scripts/_src/setup/components/*.js',
        'src/scripts/_src/setup/pages/*.js'
      ],
      dest: 'build/html/sites/all/themes/<%= projectName %>/js/app.setup.concat.js'
    },
    main_setup: {
      src: [
        'src/scripts/main.setup.js'
      ],
      dest: 'build/html/sites/all/themes/<%= projectName %>/js/main.setup.js'
    }
  });
};

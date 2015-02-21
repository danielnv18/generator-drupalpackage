module.exports = function (grunt) {
  var config = grunt.config.get('config');
  grunt.loadTasks(__dirname + '/../node_modules/grunt-bless/tasks');
  grunt.config(['bless'], {
    files: {
      src: ['build/html/sites/all/themes/<%= projectName %>/css/screen.css'],
      dest: 'build/html/sites/all/themes/<%= projectName %>/css/screen.css',
      filter: 'isFile'
    },
    options: { }
  });
};

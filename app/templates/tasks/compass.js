module.exports = function (grunt) {

    /**
     * Define "compass" tasks.
     *
     * Dynamically adds Compass compile tasks based on configuration sets in the
     * package.json file.
     *
     * Example:
     *   "compassConfig": {
     *     "project": {
     *       "basePath": "<%= config.buildPaths.html %>/sites/all/themes/custom/project"
     *     }
     *   }
     */
    grunt.loadTasks(__dirname + '/../node_modules/grunt-contrib-compass/tasks');
    grunt.config('compass', {
        drupal: {
            options: {
                sassDir: 'src/sass',
                cssDir: 'build/html/sites/all/themes/<%= config.project.name %>/css/',
                environment: 'production'
            }
        },
        develop: {
            options:{
                sassDir: 'src/sass',
                cssDir: 'build/html/sites/all/themes/<%= config.project.name %>/css/',
                environment: 'development'
            }
        }
    });
};

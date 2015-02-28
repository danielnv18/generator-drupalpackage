'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ace ' + chalk.red('Drupal Package') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name?',
        default : this._.camelize(this._.slugify(this._.humanize(this.appname))) // Default to current folder name
      }
    ];

    this.prompt(prompts, function (props) {
      var name = props.name.replace(/[^a-zA-Z0-9 ]/g, "");
      this.projectMachineName = name.toLowerCase().replace(/\s/g, '_');
      this.projectName = name;
      done();
    }.bind(this));
  },


  scaffoldFolders: function(){
    this.mkdir("test");
    this.mkdir("src");
    this.mkdir("src/modules");
    this.mkdir("src/features");
    this.mkdir("src/profiles");
    this.mkdir("src/sites");
    this.mkdir("src/sites/default");
    this.mkdir("src/static");
    this.mkdir("src/scripts");
    this.mkdir("src/patches");
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      this.fs.copyTpl(
        this.templatePath('_Gruntconfig.json'),
        this.destinationPath('Gruntconfig.json'),
        { projectName: this.projectMachineName }
      );
      this.fs.copy(
        this.templatePath('_gruntfile.js'),
        this.destinationPath('gruntfile.js')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('_project.make'),
        this.destinationPath('src/project.make')
      );
    },

    profile: function () {
      this.mkdir("src/profiles/" + this.projectMachineName);
      this.fs.copyTpl(
        this.templatePath('profile/info'),
        this.destinationPath('src/profiles/' + this.projectMachineName + '/' + this.projectMachineName + '.info'),
        { projectName: this.projectMachineName }
      );
      this.fs.copyTpl(
        this.templatePath('profile/install'),
        this.destinationPath('src/profiles/' + this.projectMachineName + '/' + this.projectMachineName + '.install'),
        { projectName: this.projectMachineName }
      );
      this.fs.copyTpl(
        this.templatePath('profile/profile'),
        this.destinationPath('src/profiles/' + this.projectMachineName + '/' + this.projectMachineName + '.profile'),
        { projectName: this.projectMachineName }
      );
    },

    tasks: function () {
      this.directory('tasks', 'tasks');
    },

    theme: function() {
      this.directory('sass/abstractions', 'src/sass/abstractions');
      this.directory('sass/base', 'src/sass/base');
      this.directory('sass/components', 'src/sass/components');
      this.directory('sass/variables', 'src/sass/variables');

      this.fs.copy(
        this.templatePath('sass/hacks.scss'),
        this.destinationPath('src/sass/' + this.projectMachineName + '.hacks.scss')
      );
      this.fs.copyTpl(
        this.templatePath('sass/no-query.scss'),
        this.destinationPath('src/sass/' + this.projectMachineName + '.no-query.scss'),
        { projectName: this.projectMachineName }
      );
      this.fs.copy(
        this.templatePath('sass/normalize.scss'),
        this.destinationPath('src/sass/' + this.projectMachineName + '.normalize.scss')
      );
      this.fs.copy(
        this.templatePath('sass/styles.scss'),
        this.destinationPath('src/sass/' + this.projectMachineName + '.styles.scss')
      );

      this.directory("theme", "src/themes/" + this.projectMachineName);

      this.fs.copyTpl(
        this.templatePath('theme_tpl/_page.preprocess.inc'),
        this.destinationPath('src/themes/' + this.projectMachineName + '/preprocess/page.preprocess.inc'),
        { projectName: this.projectMachineName }
      );

      this.fs.copyTpl(
        this.templatePath('theme_tpl/_page.process.inc'),
        this.destinationPath('src/themes/' + this.projectMachineName + '/process/page.process.inc'),
        { projectName: this.projectMachineName }
      );

      this.fs.copyTpl(
        this.templatePath('theme_tpl/info'),
        this.destinationPath('src/themes/' + this.projectMachineName + '/' + this.projectMachineName + '.info'),
        { projectName: this.projectMachineName }
      );
      this.fs.copyTpl(
        this.templatePath('theme_tpl/_template.php'),
        this.destinationPath('src/themes/' + this.projectMachineName + '/template.php'),
        { projectName: this.projectMachineName }
      );
      this.fs.copyTpl(
        this.templatePath('theme_tpl/_theme-settings.php'),
        this.destinationPath('src/themes/' + this.projectMachineName + '/theme-settings.php'),
        { projectName: this.projectMachineName }
      );
      this.fs.copyTpl(
        this.templatePath('_config.rb'),
        this.destinationPath('config.rb'),
        { projectName: this.projectMachineName }
      );
      this.fs.copy(
        this.templatePath('_Gemfile'),
        this.destinationPath('Gemfile')
      );
    }

  },

  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install']
    });
  }
});

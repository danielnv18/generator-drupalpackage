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
        default : this.appname // Default to current folder name
      }
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.name;
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
        { projectName: this.projectName }
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
      this.mkdir("src/profiles/" + this.projectName);
      this.fs.copyTpl(
        this.templatePath('profile/info'),
        this.destinationPath('src/profiles/' + this.projectName + '/' + this.projectName + '.info'),
        { projectName: this.projectName }
      );
      this.fs.copyTpl(
        this.templatePath('profile/install'),
        this.destinationPath('src/profiles/' + this.projectName + '/' + this.projectName + '.install'),
        { projectName: this.projectName }
      );
      this.fs.copyTpl(
        this.templatePath('profile/profile'),
        this.destinationPath('src/profiles/' + this.projectName + '/' + this.projectName + '.profile'),
        { projectName: this.projectName }
      );
    },

    tasks: function () {
      this.bulkDirectory('tasks', 'tasks');
    },

    theme: function() {
      this.bulkDirectory('sass/abstractions', 'src/sass/abstractions');
      this.bulkDirectory('sass/base', 'src/sass/base');
      this.bulkDirectory('sass/components', 'src/sass/components');
      this.bulkDirectory('sass/variables', 'src/sass/variables');

      this.fs.copy(
        this.templatePath('sass/hacks.scss'),
        this.destinationPath('src/sass/' + this.projectName + '.hacks.scss')
      );
      this.fs.copyTpl(
        this.templatePath('sass/no-query.scss'),
        this.destinationPath('src/sass/' + this.projectName + '.no-query.scss'),
        { projectName: this.projectName }
      );
      this.fs.copy(
        this.templatePath('sass/normalize.scss'),
        this.destinationPath('src/sass/' + this.projectName + '.normalize.scss')
      );
      this.fs.copy(
        this.templatePath('sass/styles.scss'),
        this.destinationPath('src/sass/' + this.projectName + '.styles.scss')
      );

      this.bulkDirectory("theme", "src/themes/" + this.projectName);

      this.fs.copyTpl(
        this.templatePath('theme_tpl/_page.preprocess.inc'),
        this.destinationPath('src/themes/' + this.projectName + '/preprocess/page.preprocess.inc'),
        { projectName: this.projectName }
      );

      this.fs.copyTpl(
        this.templatePath('theme_tpl/_page.process.inc'),
        this.destinationPath('src/themes/' + this.projectName + '/process/page.process.inc'),
        { projectName: this.projectName }
      );

      this.fs.copyTpl(
        this.templatePath('theme_tpl/info'),
        this.destinationPath('src/themes/' + this.projectName + '/' + this.projectName + '.info'),
        { projectName: this.projectName }
      );
      this.fs.copyTpl(
        this.templatePath('theme_tpl/_template.php'),
        this.destinationPath('src/themes/' + this.projectName + '/template.php'),
        { projectName: this.projectName }
      );
      this.fs.copyTpl(
        this.templatePath('theme_tpl/_theme-settings.php'),
        this.destinationPath('src/themes/' + this.projectName + '/theme-settings.php'),
        { projectName: this.projectName }
      );
      this.fs.copyTpl(
        this.templatePath('_config.rb'),
        this.destinationPath('config.rb'),
        { projectName: this.projectName }
      );
      this.fs.copy(
        this.templatePath('_Gemfile'),
        this.destinationPath('Gemfile')
      );
    }

  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});

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
    this.mkdir("src/profiles/" + this.projectName);
    this.mkdir("src/sites");
    this.mkdir("src/sites/default");
    this.mkdir("src/static");
    this.mkdir("src/sass");
    this.mkdir("src/sass/abstractions");
    this.mkdir("src/sass/base");
    this.mkdir("src/sass/components");
    this.mkdir("src/sass/variables");
    this.mkdir("src/themes");
    this.mkdir("src/themes/" + this.projectName);
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
        this.templatePath('_gruntfile.json'),
        this.destinationPath('gruntfile.json')
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


  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});

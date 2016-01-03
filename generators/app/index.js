'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var path = require('path');
var util = require('util');
var wiredep = require('wiredep');
var _ = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Drupal Package') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What\'s the project name?',
        default : _.camelize(_.slugify(_.humanize(this.appname))) // Default to current folder name
      },
      {
        type: 'confirm',
        name: 'full',
        message: 'Do you want to add recommended functionality?',
        default : true
      }
    ];

    this.prompt(prompts, function (props) {
      var name = props.name.replace(/[^a-zA-Z0-9 ]/g, "");
      this.projectMachineName = name.toLowerCase().replace(/\s/g, '_');
      this.projectName = name;
      this.full = props.full;
      done();
    }.bind(this));
  },


  scaffoldFolders: function(){
      this.directory('gdt', '');
  },

  //writing: {
  //
  //},

  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install']
    });
  }
});

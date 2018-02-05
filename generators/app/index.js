'use strict';
// Require dependencies
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }

  prompting() {
    this.log(
      yosay('Welcome to the stunning ' + chalk.red('jekyll-rocks') + ' generator!')
    );

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: '(1/6) What will be your project name? e.g. ProjectNameExample',
        required: 'true'
      },
      {
        type: 'input',
        name: 'projectUrl',
        message: '(2/6) Do you have already a project URL? e.g. http://example.com',
        required: 'false'
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: '(3/6) What is the project description?',
        required: 'false'
      },
      {
        type: 'input',
        name: 'authorName',
        message: '(4/6) What is your name?',
        required: 'false'
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: '(5/6) What is your email?',
        required: 'false'
      },
      {
        type: 'input',
        name: 'authorUrl',
        message: '(6/6) What is your website URL?',
        required: 'false'
      }
    ];

    return this.prompt(prompts).then(
      function(props) {
        this.projectName = props.projectName;
        this.projectUrl = props.projectUrl;
        this.projectDescription = props.projectDescription;
        this.authorName = props.authorName;
        this.authorEmail = props.authorEmail;
        this.authorUrl = props.authorUrl;
      }.bind(this)
    );
  }

  writing() {
    this.log('Scaffolding...');

    this.fs.copy(this.templatePath('_data'), this.destinationPath('_data'));

    this.fs.copy(this.templatePath('_includes'), this.destinationPath('_includes'));

    this.fs.copy(this.templatePath('_layouts'), this.destinationPath('_layouts'));

    this.fs.copy(this.templatePath('assets'), this.destinationPath('assets'));

    this.fs.copyTpl(
      this.templatePath('_config.yml'),
      this.destinationPath('_config.yml'),
      {
        projectName: this.projectName,
        projectUrl: this.projectUrl,
        projectDescription: this.projectDescription
      }
    );

    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));

    this.fs.copy(this.templatePath('.htaccess'), this.destinationPath('.htaccess'));

    this.fs.copy(this.templatePath('Gemfile'), this.destinationPath('Gemfile'));

    this.fs.copy(this.templatePath('gruntfile.js'), this.destinationPath('gruntfile.js'));

    this.fs.copyTpl(this.templatePath('humans.txt'), this.destinationPath('humans.txt'), {
      authorName: this.authorName,
      authorUrl: this.authorUrl,
      authorEmail: this.authorEmail
    });

    this.fs.copy(this.templatePath('index.html'), this.destinationPath('index.html'));

    this.fs.copyTpl(
      this.templatePath('manifest.json'),
      this.destinationPath('manifest.json'),
      { projectName: this.projectName }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        projectName: this.projectName,
        projectDescription: this.projectDescription,
        authorName: this.authorName,
        authorEmail: this.authorEmail,
        authorUrl: this.authorUrl
      }
    );

    this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'));

    this.fs.copy(this.templatePath('robots.txt'), this.destinationPath('robots.txt'));
  }

  install() {
    console.log(
      chalk
        .keyword('yellow')
        .bold('\n\t- Thank you for having used the jekyll-rocks generator')
    );

    this.npmInstall();
  }
};

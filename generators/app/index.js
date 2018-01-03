'use strict';
//Require dependencies
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
    this.log(yosay(
      'Welcome to the stunning ' + chalk.red('jekyll-rocks') + ' generator!'
    ));

    // return this.prompt([{
    //   type    : 'input',
    //   name    : 'name',
    //   message : 'Your project name',
    //   default : this.appname // Default to current folder name
    // }, {
    //   type    : 'confirm',
    //   name    : 'cool',
    //   message : 'Would you like to enable the Cool feature?'
    // }]).then((answers) => {
    //   this.log('app name', answers.name);
    //   this.log('cool feature', answers.cool);
    // });

    return this.prompt([{
      type: 'input',
      name: 'projectName',
      message: '(1/6) What will be your project name?',
      required: 'true'
    }, {
      type: 'input',
      name: 'githubUrl',
      message: '(2/6) What is the GitHub repository URL?',
      required: 'false'
    }, {
      type: 'input',
      name: 'projectDescription',
      message: '(3/6) What is your project description?',
      required: 'false'
    }, {
      type: 'input',
      name: 'authorName',
      message: '(4/6) What is your name?',
      required: 'false'
    }, {
      type: 'input',
      name: 'authorEmail',
      message: '(5/6) What is your email?',
      required: 'false'
    }, {
      type: 'input',
      name: 'authorUrl',
      message: '(6/6) What is your website URL?',
      required: 'false'
    }]).then((answers) => {
      this.log('app name', answers.projectName);
      this.log('app name', answers.projectDescription);
    });

    // return this.prompt(prompts)
    //   .then(r => {
    //     this.projectName = r.projectName ? r.projectName : this.projectNames;
    //   });
      // this.projectName = props.projectName
      // this.githubUrl = props.githubUrl
      // this.projectDescription = props.projectDescription
      // this.authorName = props.authorName
      // this.authorEmail = props.authorEmail
      // this.authorUrl = props.authorUrl

    // }.bind(this));
  }

  writing() {
    this.log('Scaffolding...');

    this.fs.copyTpl(
      this.templatePath('*.md'),
      this.destinationPath('/')
    );

    this.fs.copyTpl(
      this.templatePath('_data'),
      this.destinationPath('_data')
    );

    // this.fs.copyTpl(
    //   this.templatePath('/_includes'),
    //   this.destinationPath('/_includes')
    // );
    //
    // this.fs.copyTpl(
    //   this.templatePath('/_layouts'),
    //   this.destinationPath('/_layouts')
    // );
    //
    // this.fs.copyTpl(
    //   this.templatePath('/_news'),
    //   this.destinationPath('/_news')
    // );
    //
    // this.fs.copyTpl(
    //   this.templatePath('/_post'),
    //   this.destinationPath('/_post')
    // );
    //
    // this.fs.copyTpl(
    //   this.templatePath('/assets'),
    //   this.destinationPath('/assets')
    // );

    this.fs.copyTpl(
      this.templatePath('*.yml'),
      this.destinationPath('*.yml')
    );

    this.fs.copyTpl(
      this.templatePath('Gemfile'),
      this.destinationPath('/')
    );

    this.fs.copyTpl(
      this.templatePath('robots.txt'),
      this.destinationPath('/')
    );

    this.fs.copyTpl(
      this.templatePath('_config.yml'),
      this.destinationPath('/'), {
        projectName: this.projectName
        // githubUsername: this.githubUsername,
        // projectDescription: this.projectDescription,
        // includeGithub: this.includeGithub,
        // includeFirebase: this.includeFirebase
      });

    // this.fs.copyTpl(
    //   this.templatePath('.htaccess'),
    //   this.destinationPath('/')
    // );
    //
    // this.fs.copyTpl(
    //   this.templatePath('.*'),
    //   this.destinationRoot('/')
    // );
    //
    // this.fs.copyTpl(
    //   this.templatePath('.gitignore'),
    //   this.destinationPath('/'), {
    //   });
    //
    // this.fs.copyTpl(
    //   this.templatePath('README.md'),
    //   this.destinationPath('/'), {
    //     // projectName: this.projectName,
    //     // projectDescription: this.projectDescription
    //   });
    //
    // this.fs.copyTpl(
    //   this.templatePath('package.json'),
    //   this.destinationPath('/'), {
    //     projectName: this.projectName,
    //     authorName: this.authorName,
    //     authorEmail: this.authorEmail,
    //     authorUrl: this.authorUrl,
    //     githubUrl: this.githubUrl,
    //     projectDescription: this.projectDescriptions
    //   });
    //
    // this.fs.copyTpl(
    //   this.templatePath('manifest.json'),
    //   this.destinationPath('/'), {
    //     projectName: this.projectName
    //   });
    //
    // this.fs.copyTpl(
    //   this.templatePath('index.html'),
    //   this.destinationPath('/'), {
    //   });
    //
    // this.fs.copyTpl(
    //   this.templatePath('gruntfile.js'),
    //   this.destinationPath('/'), {
    //   });
    //
    // this.fs.copyTpl(
    //   this.templatePath('robots.txt'),
    //   this.destinationPath('/'), {
    //   });
    //
    // this.fs.copyTpl(
    //   this.templatePath('humans.txt'),
    //   this.destinationPath('/'), {
    //     authorName: this.authorName,
    //     authorUrl: this.authorUrl,
    //     authorEmail: this.authorEmail
    //   });
  }

  install() {
    console.log(chalk.keyword('red').bold('\n\t- Thank you for having used the Jekyll-Rocks generator'));

    this.npmInstall();
  }
};

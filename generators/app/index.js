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
        message: '(1/6) What will be your project name?',
        required: 'true',
        default: 'ProjectNameExample'
      },
      {
        type: 'input',
        name: 'projectUrl',
        message: '(2/6) Do you have already a project URL?',
        required: 'false',
        default: 'http://example.com'
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: '(3/6) What is the project description?',
        required: 'false'
      },
      {
        type: 'input',
        name: 'projectRepo',
        message: '(4/6) What is the project repository url?',
        required: 'false'
      },
      {
        type: 'input',
        name: 'authorName',
        message: '(5/6) What is your name?',
        required: 'false'
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: '(6/6) What is your email?',
        required: 'false'
      },
      {
        type: 'input',
        name: 'authorUrl',
        message: '(7/6) What is your website url?',
        required: 'false'
      },
      {
        type: 'list',
        name: 'css',
        message: '(8/10) What stylesheets do you want to use?',
        choices: [
          {
            name: 'CSS',
            value: 'stylesheets',
            checked: false
          },
          {
            name: 'SASS',
            value: 'sass',
            checked: false
          },
          {
            name: 'SCSS',
            value: 'scss',
            checked: false
          }
        ]
      },
      {
        type: 'list',
        name: 'license',
        message: '(9/10) What license do you want to use?',
        choices: [
          {
            name: 'Apache License 2.0',
            value: 'apache',
            checked: false
          },
          {
            name: 'GNU General Public License V3',
            value: 'gnu',
            checked: false
          },
          {
            name: 'MIT License',
            value: 'mit',
            checked: false
          }
        ]
      }
    ];

    return this.prompt(prompts).then(
      function(props) {
        this.projectName = props.projectName;
        this.projectUrl = props.projectUrl;
        this.projectDescription = props.projectDescription;
        this.projectRepo = props.projectRepo;
        this.authorName = props.authorName;
        this.authorEmail = props.authorEmail;
        this.authorUrl = props.authorUrl;

        function hasFeature(features, feat) {
          return features && features.indexOf(feat) !== -1;
        }

        this.includeCss = hasFeature(props.css, 'stylesheets');
        this.includeSass = hasFeature(props.css, 'sass');
        this.includeScss = hasFeature(props.css, 'scss');
        this.includeApache = hasFeature(props.license, 'apache');
        this.includeGnu = hasFeature(props.license, 'gnu');
        this.includeMit = hasFeature(props.license, 'mit');
      }.bind(this)
    );
  }

  writing() {
    this.log('Scaffolding...');

    this.fs.copy(this.templatePath('_data'), this.destinationPath('_data'));

    this.fs.copyTpl(this.templatePath('_includes'), this.destinationPath('_includes'), {
      authorName: this.authorName
    });

    this.fs.copy(this.templatePath('_layouts'), this.destinationPath('_layouts'));

    this.fs.copy(this.templatePath('assets'), this.destinationPath('assets'));

    if (this.includeCss) {
      this.fs.copy(this.templatePath('style/css'), this.destinationPath('assets/css'));
    }

    if (this.includeSass) {
      this.fs.copy(this.templatePath('style/sass'), this.destinationPath('assets/css'));
    }

    if (this.includeScss) {
      this.fs.copy(this.templatePath('style/scss'), this.destinationPath('assets/css'));
    }

    if (this.includeApache) {
      this.fs.copy(
        this.templatePath('license/Apache License 2.0'),
        this.destinationPath('LICENSE')
      );
    }

    if (this.includeGnu) {
      this.fs.copy(
        this.templatePath('license/GNU General Public License V3'),
        this.destinationPath('LICENSE')
      );
    }

    if (this.includeMit) {
      this.fs.copy(this.templatePath('license/MIT'), this.destinationPath('LICENSE'));
    }

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

    this.fs.copyTpl(
      this.templatePath('gruntfile.js'),
      this.destinationPath('gruntfile.js'),
      {
        includeSass: this.includeSass,
        includeScss: this.includeScss,
        includeCss: this.includeCss
      }
    );

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
        projectRepo: this.projectRepo,
        authorName: this.authorName,
        authorEmail: this.authorEmail,
        authorUrl: this.authorUrl,
        includeCss: this.includeCss,
        includeSass: this.includeSass,
        includeScss: this.includeScss,
        includeApache: this.includeApache,
        includeGnu: this.includeGnu,
        includeMit: this.includeMit
      }
    );

    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), {
      projectName: this.projectName,
      projectDescription: this.projectDescription
    });

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

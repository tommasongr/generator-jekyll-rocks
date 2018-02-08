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

    this.on('end', function() {
      console.log('Running the Grunt task now...');
      this.spawnCommand('grunt', ['setup']).on('close', function() {
        console.log('The Grunt task has completed');
      });
    });
  }

  prompting() {
    this.log(
      yosay('Welcome to the stunning ' + chalk.red('jekyll-rocks') + ' generator!')
    );

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: '(1/11) What will be your project name?',
        required: true,
        default: 'myAwesomeSite',
        validate: function(value) {
          var pass = value.match(' ');
          if (pass) {
            return 'Please enter a valid project name';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'projectUrl',
        message: '(2/11) Do you have already a project url?',
        required: false
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: '(3/11) What is the project description?',
        required: false
      },
      {
        type: 'input',
        name: 'authorName',
        message: '(4/11) What is your name?',
        required: false
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: '(5/11) What is your email?',
        required: false
      },
      {
        type: 'input',
        name: 'authorUrl',
        message: '(6/11) What is your website url?',
        required: false
      },
      {
        type: 'list',
        name: 'css',
        message: '(7/11) What stylesheets do you want to use?',
        choices: [
          {
            name: 'CSS',
            value: 'stylesheets',
            checked: false
          },
          {
            name: 'SASS',
            value: 'sass',
            selected: true
          },
          {
            name: 'SCSS',
            value: 'scss',
            checked: false
          }
        ]
      },
      {
        type: 'confirm',
        name: 'frameworks',
        message: '(8/11) Do you want to use a framework?',
        required: false
      },
      {
        type: 'list',
        name: 'chooseFramework',
        message: '(8.1/11) Choose your favourite framework',
        required: false,
        when: function(answers) {
          return answers.frameworks === true;
        },
        choices: [
          {
            name: 'Bootstrap 4',
            value: 'bootstrap4',
            checked: false
          },
          {
            name: 'Foundation',
            value: 'foundation',
            checked: false
          },
          {
            name: 'Semantic UI',
            value: 'semanticUi',
            checked: false
          },
          {
            name: 'Material Design Lite',
            value: 'materialDesignLite',
            checked: false
          },
          {
            name: 'Materialize',
            value: 'materialize',
            checked: false
          }
        ]
      },
      {
        type: 'confirm',
        name: 'buildControll',
        message: '(9/11) Do you want to use build controll for the Git repo?',
        required: false
      },
      {
        type: 'input',
        name: 'projectRepo',
        message: '(9.1/11) What is the project repository url?',
        required: false,
        when: function(answers) {
          return answers.buildControll === true;
        }
      },
      {
        type: 'checkbox',
        name: 'gitBranch',
        message: '(9.2/11) What Branch do you like to use?',
        required: false,
        when: function(answers) {
          return answers.buildControll === true;
        },
        choices: [
          {
            name: 'master',
            value: 'master',
            checked: false
          },
          {
            name: 'gh-pages',
            value: 'gh-pages',
            checked: false
          }
        ]
      },
      {
        type: 'confirm',
        name: 'ftpUpload',
        message: '(10/11) Do you want to use ftp upload on this project?',
        required: false
      },
      {
        type: 'input',
        name: 'ftpHost',
        message: '(10.1/11) What is your ftp host?',
        required: true,
        when: function(answers) {
          return answers.ftpUpload === true;
        }
      },
      {
        type: 'input',
        name: 'ftpPort',
        message: '(10.2/11) What is your ftp port?',
        required: true,
        default: 21,
        when: function(answers) {
          return answers.ftpUpload === true;
        }
      },
      {
        type: 'input',
        name: 'ftpDest',
        message: '(10.3/11) What is the destionation path?',
        required: true,
        default: '/public_html/',
        when: function(answers) {
          return answers.ftpUpload === true;
        }
      },
      {
        type: 'confirm',
        name: 'ftpKey',
        message:
          '(10.4/11) Do you want to store your ftp credentials inside the project? NOTICE: this could be dangerous if you use a public git repository, the storage file (.ftppass) will be available to everyone',
        required: false,
        when: function(answers) {
          return answers.ftpUpload === true;
        }
      },
      {
        type: 'input',
        name: 'ftpUsername',
        message: '(10.5/11) What is your ftp username?',
        required: false,
        when: function(answers) {
          return answers.ftpKey === true;
        }
      },
      {
        type: 'input',
        name: 'ftpPassword',
        message: '(10.6/11) What is your ftp password?',
        required: false,
        mask: '*',
        when: function(answers) {
          return answers.ftpKey === true;
        }
      },
      {
        type: 'list',
        name: 'license',
        message: '(11/11) What license do you want to use?',
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
        this.authorName = props.authorName;
        this.authorEmail = props.authorEmail;
        this.authorUrl = props.authorUrl;
        this.includeFramework = props.frameworks;
        this.includeBuildControll = props.buildControll;
        this.projectRepo = props.projectRepo;
        this.includeFtp = props.ftpUpload;
        this.ftpHost = props.ftpHost;
        this.ftpPort = props.ftpPort;
        this.ftpDest = props.ftpDest;
        this.ftpKey = props.ftpKey;
        this.ftpUsername = props.ftpUsername;
        this.ftpPassword = props.ftpPassword;

        this.appSource = 'app';
        this.appDist = 'dist';
        this.appBaseurl = '';

        function hasFeature(features, feat) {
          return features && features.indexOf(feat) !== -1;
        }

        this.includeCss = hasFeature(props.css, 'stylesheets');
        this.includeSass = hasFeature(props.css, 'sass');
        this.includeScss = hasFeature(props.css, 'scss');
        this.includeBootstrap = hasFeature(props.chooseFramework, 'bootstrap4');
        this.includeFoundation = hasFeature(props.chooseFramework, 'foundation');
        this.includeSemanticUi = hasFeature(props.chooseFramework, 'semanticUi');
        this.includeMaterialDesignLite = hasFeature(
          props.chooseFramework,
          'materialDesignLite'
        );
        this.includeMaterialize = hasFeature(props.chooseFramework, 'materialize');
        this.includeBranchMaster = hasFeature(props.gitBranch, 'master');
        this.includeBranchGhPages = hasFeature(props.gitBranch, 'gh-pages');
        this.includeApache = hasFeature(props.license, 'apache');
        this.includeGnu = hasFeature(props.license, 'gnu');
        this.includeMit = hasFeature(props.license, 'mit');
      }.bind(this)
    );
  }

  writing() {
    this.log('Scaffolding...');

    this.fs.copy(this.templatePath('app/_data'), this.destinationPath('app/_data'));

    this.fs.copyTpl(
      this.templatePath('app/_includes'),
      this.destinationPath('app/_includes'),
      {
        authorName: this.authorName,
        includeBootstrap: this.includeBootstrap,
        includeFoundation: this.includeFoundation,
        includeSemanticUi: this.includeSemanticUi,
        includeMaterialDesignLite: this.includeMaterialDesignLite,
        includeMaterialize: this.includeMaterialize
      }
    );

    this.fs.copyTpl(
      this.templatePath('app/_layouts'),
      this.destinationPath('app/_layouts'),
      {
        includeBootstrap: this.includeBootstrap,
        includeFoundation: this.includeFoundation,
        includeSemanticUi: this.includeSemanticUi,
        includeMaterialDesignLite: this.includeMaterialDesignLite,
        includeMaterialize: this.includeMaterialize
      }
    );

    this.fs.copy(this.templatePath('app/assets'), this.destinationPath('app/assets'));

    if (this.includeCss) {
      this.fs.copy(
        this.templatePath('app/_style/css'),
        this.destinationPath('app/assets/css')
      );
    }

    if (this.includeSass) {
      this.fs.copy(
        this.templatePath('app/_style/sass'),
        this.destinationPath('app/assets/css')
      );
    }

    if (this.includeScss) {
      this.fs.copy(
        this.templatePath('app/_style/scss'),
        this.destinationPath('app/assets/css')
      );
    }

    if (this.includeApache) {
      this.fs.copy(
        this.templatePath('app/_license/Apache License 2.0'),
        this.destinationPath('LICENSE')
      );
    }

    if (this.includeGnu) {
      this.fs.copy(
        this.templatePath('app/_license/GNU General Public License V3'),
        this.destinationPath('LICENSE')
      );
    }

    if (this.includeMit) {
      this.fs.copy(
        this.templatePath('app/_license/MIT'),
        this.destinationPath('LICENSE')
      );
    }

    this.fs.copyTpl(
      this.templatePath('_config.yml'),
      this.destinationPath('_config.yml'),
      {
        projectName: this.projectName,
        projectUrl: this.projectUrl,
        authorEmail: this.authorEmail
      }
    );

    if (this.ftpKey == true) {
      this.fs.copyTpl(this.templatePath('.ftppass'), this.destinationPath('.ftppass'), {
        ftpUsername: this.ftpUsername,
        ftpPassword: this.ftpPassword
      });
    }

    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));

    if (this.includeFramework == true) {
      this.fs.copyTpl(
        this.templatePath('bower.json'),
        this.destinationPath('bower.json'),
        {
          projectName: this.projectName,
          authorName: this.authorName,
          authorEmail: this.authorEmail,
          projectDescription: this.projectDescription,
          includeApache: this.includeApache,
          includeGnu: this.includeGnu,
          includeMit: this.includeMit,
          projectUrl: this.projectUrl,
          includeBootstrap: this.includeBootstrap,
          includeFoundation: this.includeFoundation,
          includeSemanticUi: this.includeSemanticUi,
          includeMaterialDesignLite: this.includeMaterialDesignLite,
          includeMaterialize: this.includeMaterialize
        }
      );
    }

    this.fs.copy(this.templatePath('.bowerrc'), this.destinationPath('.bowerrc'));

    this.fs.copy(
      this.templatePath('app/.htaccess'),
      this.destinationPath('app/.htaccess')
    );

    this.fs.copy(this.templatePath('Gemfile'), this.destinationPath('Gemfile'));

    this.fs.copyTpl(
      this.templatePath('gruntfile.js'),
      this.destinationPath('gruntfile.js'),
      {
        includeSass: this.includeSass,
        includeScss: this.includeScss,
        includeBuildControll: this.includeBuildControll,
        projectRepo: this.projectRepo,
        includeBranchMaster: this.includeBranchMaster,
        includeBranchGhPages: this.includeBranchGhPages,
        includeFtp: this.includeFtp,
        ftpHost: this.ftpHost,
        ftpPort: this.ftpPort,
        ftpDest: this.ftpDest,
        ftpKey: this.ftpKey,
        appSource: this.appSource,
        appDist: this.appDist,
        appBaseurl: this.appBaseurl
      }
    );

    this.fs.copyTpl(
      this.templatePath('app/humans.txt'),
      this.destinationPath('app/humans.txt'),
      {
        authorName: this.authorName,
        authorUrl: this.authorUrl,
        authorEmail: this.authorEmail
      }
    );

    this.fs.copy(
      this.templatePath('app/index.html'),
      this.destinationPath('app/index.html')
    );

    this.fs.copyTpl(
      this.templatePath('app/manifest.json'),
      this.destinationPath('app/manifest.json'),
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
        includeMit: this.includeMit,
        includeBuildControll: this.includeBuildControll,
        includeFtp: this.includeFtp
      }
    );

    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), {
      projectName: this.projectName,
      projectDescription: this.projectDescription
    });

    this.fs.copy(
      this.templatePath('app/robots.txt'),
      this.destinationPath('app/robots.txt')
    );
  }

  install() {
    console.log(
      chalk
        .keyword('yellow')
        .bold('\n\t- Thank you for having used the jekyll-rocks generator')
    );

    this.npmInstall();

    if (this.includeFramework == true) {
      this.bowerInstall();
    }
  }
};

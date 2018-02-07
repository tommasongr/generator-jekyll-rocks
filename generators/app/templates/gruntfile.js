'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        app: {
          source: 'app',
          dist: 'dist',
          baseurl: ''
        },

        shell: {
          jekyllClean: {
            command: 'jekyll clean'
          }
        },
        jekyll: {
          options: {
            config: '_config.yml',
            src: '<%= app.source %>'
          },
          dist: {
            options: {
                dest: '<%= app.dist %>/<%= app.baseurl %>',
            }
          },
          server: {
            options: {
                config: '_config.yml',
                dest: '.jekyll/<%= app.baseurl %>'
            }
          }
        },
        watch: {
          options: {
            livereload: '<%= connect.options.livereload %>'
          },
          files: [
            '<%= app.source %>/**/*'
          ],
          tasks: ['sass:server','uglify:dist','postcss:dist','jekyll:server']
        },
        connect: {
          options: {
            port: 9000,
            livereload: 9090,
            hostname: 'localhost' // set to '0.0.0.0' to access from outside
          },
          livereload: {
            options: {
              open: true,
              base: ['.jekyll']
            }
          }
        },
        clean: {
          server: [
            '.jekyll',
            '.tmp'
          ],
          clear: {
            files: [{
              src: [
                '.jekyll',
                '.tmp',
                '.sass-cache',
                'dist',
                '<%= app.source %>/assets/css/*.min.css',
                '<%= app.source %>/assets/css/*.css.map',
                '<%= app.source %>/assets/js/*.min.js'
              ]
            }]
          }
        },
        imagemin: {
          options: {
            progressive: true
          },
          dist: {
            files: [{
                expand: true,
                cwd: '<%= app.dist %>/assets/img',
                src: '**/*.{jpg,jpeg,png,gif}',
                dest: '<%= app.dist %>/assets/img'
            }]
          }
        },
        sass: {
          server: {
            files: [{
              expand: true,
              cwd: '<%= app.source %>/assets/css',
              src: '**/*.{scss,sass}',
              dest: '<%= app.source %>/assets/css',
              ext: '.css'
            }]
          },
          dist: {
            files: [{
              expand: true,
              cwd: '<%= app.source %>/assets/css',
              src: '**/*.{scss,sass}',
              dest: '<%= app.source %>/assets/css',
              ext: '.css'
            }]
          }
        },
        uglify: {
          options: {
            preserveComments: false
          },
          dist: {
            src: '<%= app.source %>/assets/js/*.js',
            dest: '<%= app.source %>/assets/js/functions.min.js'
          }
        },
        postcss: {
          options: {
            map: false,

            processors: [
              require('pixrem')(), // add fallbacks for rem units
              require('autoprefixer')({browsers: 'last 3 versions'}), // add vendor prefixes
              require('cssnano')() // minify the result
            ]
          },
          dist: {
            src: '<%= app.source %>/assets/css/*.css',
            dest: '<%= app.source %>/assets/css/main.min.css'
          }
        },
        svgmin: {
          dist: {
              files: [{
                  expand: true,
                  cwd: '<%= app.source %>/assets/img',
                  src: '**/*.svg',
                  dest: '<%= app.source %>/assets/img'
              }]
          }
        },
        buildcontrol: {
          dist: {
            options: {
              dir: './',
              remote: 'git@gitlab.com:tommaso.negri/provaaa.git',
              branch: 'master',
              commit: true,
              push: true,
              message: "Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%",
              connectCommits: false
            }
          }
        },
        'ftp_upload': {
          build: {
            auth: {
              host: 'atosa-italy.it',
              port: 21,
              authKey: 'key1'
            },
            src: '<%= app.dist %>/*',
            dest: '/public_html/provaftp'
          }
        }

    });

    grunt.registerTask('serve', [
      'clean:server',
      'sass:server',
      'uglify:dist',
      'postcss:dist',
      'jekyll:server',
      'connect',
      'watch'
    ]);

    grunt.registerTask('build', [
      'clean',
      'sass:dist',
      'uglify:dist',
      'postcss:dist',
      'imagemin:dist',
      'svgmin:dist',
      'jekyll:dist'
    ]);

    grunt.registerTask('deploy', [
      // 'buildcontrol:dist'
      'ftp_upload'
    ]);

    grunt.registerTask('clear', [
      'shell:jekyllClean',
      'clean:clear'
    ]);

    grunt.registerTask('default', 'serve');

};

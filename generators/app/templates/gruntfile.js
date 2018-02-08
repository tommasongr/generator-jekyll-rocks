'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        shell: {
          jekyllClean: {
            command: 'jekyll clean'
          }
        },
        jekyll: {
          options: {
            config: '_config.yml',
            src: '<%= appSource %>'
          },
          dist: {
            options: {
                dest: '<%= appDist %>/<%= appBaseurl %>'
            }
          },
          server: {
            options: {
                config: '_config.yml',
                dest: '.jekyll/<%= appBaseurl %>'
            }
          }
        },
        copy: {
          main: {
            files: [
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/bootstrap/dist/css/bootstrap.min.css'], dest: '<%= appSource %>/assets/bower_components/bootstrap-4/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/bootstrap/dist/js/bootstrap.min.js'], dest: '<%= appSource %>/assets/bower_components/bootstrap-4/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/bootstrap/dist/css/bootstrap.css'], dest: '<%= appSource %>/assets/bower_components/bootstrap-4/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/bootstrap/dist/js/bootstrap.js'], dest: '<%= appSource %>/assets/bower_components/bootstrap-4/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/bootstrap/dist/css/bootstrap.min.css.map'], dest: '<%= appSource %>/assets/bower_components/bootstrap-4/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/bootstrap/dist/js/bootstrap.min.js.map'], dest: '<%= appSource %>/assets/bower_components/bootstrap-4/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/foundation/css/foundation.min.css'], dest: '<%= appSource %>/assets/bower_components/foundation-6/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/foundation/js/foundation.min.js'], dest: '<%= appSource %>/assets/bower_components/foundation-6/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/foundation/css/foundation.css'], dest: '<%= appSource %>/assets/bower_components/foundation-6/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/foundation/js/foundation.js'], dest: '<%= appSource %>/assets/bower_components/foundation-6/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/semantic/dist/semantic.min.css'], dest: '<%= appSource %>/assets/bower_components/semantic-ui/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/semantic/dist/semantic.min.js'], dest: '<%= appSource %>/assets/bower_components/semantic-ui/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/semantic/dist/semantic.css'], dest: '<%= appSource %>/assets/bower_components/semantic-ui/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/semantic/dist/semantic.js'], dest: '<%= appSource %>/assets/bower_components/semantic-ui/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/material-design-lite/material.min.css'], dest: '<%= appSource %>/assets/bower_components/material-DL/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/material-design-lite/material.min.js'], dest: '<%= appSource %>/assets/bower_components/material-DL/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/material-design-lite/material.css'], dest: '<%= appSource %>/assets/bower_components/material-DL/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/material-design-lite/material.js'], dest: '<%= appSource %>/assets/bower_components/material-DL/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/material-design-lite/material.min.css.map'], dest: '<%= appSource %>/assets/bower_components/material-DL/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/material-design-lite/material.min.js.map'], dest: '<%= appSource %>/assets/bower_components/material-DL/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/materialize/dist/css/materialize.min.css'], dest: '<%= appSource %>/assets/bower_components/materialize-css/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/materialize/dist/js/materialize.min.js'], dest: '<%= appSource %>/assets/bower_components/materialize-css/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/materialize/dist/css/materialize.css'], dest: '<%= appSource %>/assets/bower_components/materialize-css/'},
              {expand: true, flatten: true, src: ['<%= appSource %>/assets/bower_components/materialize/dist/js/materialize.js'], dest: '<%= appSource %>/assets/bower_components/materialize-css/'}

            ]
          }
        },
        watch: {
          options: {
            livereload: 9090
          },
          files: [
            '<%= appSource %>/**/*'
          ],
          tasks: [<% if (includeSass || includeScss) { -%>'sass:server',<% } -%>'uglify:dist','postcss:dist','jekyll:server']
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
          setup: [
            '<%= appSource %>/assets/bower_components/bootstrap',
            '<%= appSource %>/assets/bower_components/fastclick',
            '<%= appSource %>/assets/bower_components/foundation',
            '<%= appSource %>/assets/bower_components/jquery',
            '<%= appSource %>/assets/bower_components/jquery-placeholder',
            '<%= appSource %>/assets/bower_components/jquery.cookie',
            '<%= appSource %>/assets/bower_components/material-design-lite',
            '<%= appSource %>/assets/bower_components/materialize',
            '<%= appSource %>/assets/bower_components/modernizr',
            '<%= appSource %>/assets/bower_components/semantic'
          ],
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
                '<%= appSource %>/assets/css/*.min.css',
                '<%= appSource %>/assets/css/*.css.map',
                '<%= appSource %>/assets/js/*.min.js'
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
                cwd: '<%= appDist %>/assets/img',
                src: '**/*.{jpg,jpeg,png,gif}',
                dest: '<%= appDist %>/assets/img'
            }]
          }
        },
<% if (includeSass || includeScss) { -%>
        sass: {
          server: {
            files: [{
              expand: true,
              cwd: '<%= appSource %>/assets/css',
              src: '**/*.{scss,sass}',
              dest: '<%= appSource %>/assets/css',
              ext: '.css'
            }]
          },
          dist: {
            files: [{
              expand: true,
              cwd: '<%= appSource %>/assets/css',
              src: '**/*.{scss,sass}',
              dest: '<%= appSource %>/assets/css',
              ext: '.css'
            }]
          }
        },
<% } -%>
        uglify: {
          options: {
            preserveComments: false
          },
          dist: {
            src: '<%= appSource %>/assets/js/*.js',
            dest: '<%= appSource %>/assets/js/functions.min.js'
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
            src: '<%= appSource %>/assets/css/main.css',
            dest: '<%= appSource %>/assets/css/main.min.css'
          }
        },
<% if (includeBuildControll) { -%>
        buildcontrol: {
<% if (includeBranchMaster) { -%>
          master: {
            options: {
              dir: './',
              remote: '<%= projectRepo %>',
              branch: 'master',
              commit: true,
              push: true,
              message: "Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%",
              connectCommits: false
            }
          }<% if (includeBranchGhPages) { -%>,<% } -%>
<% } -%>
<% if (includeBranchGhPages) { -%>
          ghpages: {
            options: {
              dir: 'dist/',
              remote: '<%= projectRepo %>',
              branch: 'gh-pages',
              commit: true,
              push: true,
              message: "Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%",
              connectCommits: false
            }
          }
<% } -%>
        },
        <% } -%>
<% if (includeFtp) { -%>
        'ftp_upload': {
          build: {
            auth: {
              host: '<%= ftpHost %>',
<% if (ftpKey == true) { -%>
              authKey: 'key1',
<% } -%>
              port: <%= ftpPort %>
            },
            src: '<%= appDist %>/*',
            dest: '<%= ftpDest %>'
          }
        },
<% } -%>
        svgmin: {
          dist: {
              files: [{
                  expand: true,
                  cwd: '<%= appSource %>/assets/img',
                  src: '**/*.svg',
                  dest: '<%= appSource %>/assets/img'
              }]
          }
        }

    });

    grunt.registerTask('serve', [
      'clean:server',
<% if (includeSass || includeScss) { -%>
      'sass:server',
<% } -%>
      'uglify:dist',
      'postcss:dist',
      'jekyll:server',
      'connect',
      'watch'
    ]);

    grunt.registerTask('build', [
      'clear',
<% if (includeSass || includeScss) { -%>
      'sass:dist',
<% } -%>
      'uglify:dist',
      'postcss:dist',
      'imagemin:dist',
      'svgmin:dist',
      'jekyll:dist'
    ]);

    grunt.registerTask('push', [
      'build',
<% if (includeBranchMaster) { -%>
      'buildcontrol:master'
<% } -%>
    ]);

    grunt.registerTask('deploy', [
      'build',
<% if (includeBranchGhPages) { -%>
      'buildcontrol:ghpages',
<% } -%>
<% if (includeFtp) { -%>
      'ftp_upload'
<% } -%>
    ]);

    grunt.registerTask('clear', [
      'shell:jekyllClean',
      'clean:clear'
    ]);

    grunt.registerTask('setup', [
      'copy:main',
      'clean:setup'
    ]);

    grunt.registerTask('default', 'serve');

};

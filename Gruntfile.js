'use strict';

var R = require('ramda'),

    vendorLibs = [
        'vendors/jquery/dist',
        'vendors/d3',
        'vendors/cal-heatmap',
        //  'vendors/angular',
        'vendors/localforge/dist',
        'vendors/material-design-lite'
    ],

    jsFileList = R.map(R.partialRight(R.concat, ['/*.min.js'])),
    cssFileList = R.compose(
        R.append('app/**/*.css'),
        R.map(R.partialRight(R.concat, ['/*.css']))
    );

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8080
                }
            }
        },

        bower: {
            install: {
                options: {
                    install: true,
                    verbose: true,
                    targetDir: './vendors'
                }
            }
        },

        html2js: {
            dist: {
                src: ['app/**/*.html'],
                dest: 'dist/templates.js'
            }
        },

        concat: {
            options: {
                separator: ';\n'
            },
            libs: {
                src: jsFileList(vendorLibs),
                dest: 'dist/libs.js'
            },
            styles: {
                src: cssFileList(vendorLibs),
                dest: 'dist/styles.css',
                options: {
                    separator: '\n'
                }
            },
            app: {
                src: ['app/**/*.js', 'app/*.js'],
                dest: 'dist/app.js'
            }
        },

        uglify: {
            dist: {
                options: {
                    mangle: false
                },
                files: {
                    'dist/app.min.js': ['dist/templates.js', 'dist/app.js']
                }
            }
        },

        watch: {
            options: {
                atBegin: true
            },
            dev: {
                files: ['Gruntfile.js', 'app/*.js', 'app/**/*.js', '*.html', '*.css'],
                tasks: ['build']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-html2js');

    grunt.registerTask('build', ['bower', 'concat', 'html2js', 'uglify:dist']);
    grunt.registerTask('dev', ['build', 'connect:server', 'watch:dev']);

    grunt.registerTask('default', ['dev']);
};

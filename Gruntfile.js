/*jslint node: true */
"use strict";

var R = require('ramda');

var jsLibs = [
    'vendors/jquery/dist',
    'vendors/d3',
    'vendors/cal-heatmap',
    'vendors/angular',
    'vendors/localforge/dist',
    'vendors/material-design-lite'
];
var allJsLibs = R.map(R.partialRight(R.concat, ['/*.min.js']));
var allCssLibs = R.compose(
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
                    copy: true,
                    install: true,
                    cleanup: !true,
                    verbose: true,
                    targetDir: './vendors'
                }
            }
        },

        uglify: {
            dist: {
                options: {
                    mangle: false
                },
                files: {
                    'dist/app.js': ['dist/libs.js', 'dist/app.js']
                }
            }
        },

        html2js: {
            dist: {
                src: ['app/templates/*.html'],
                dest: 'tmp/templates.js'
            }
        },

        clean: {
            temp: {
                src: ['tmp']
            }
        },

        concat: {
            options: {
                separator: ';\n'
            },
            libs: {
                src: allJsLibs(jsLibs),
                dest: 'dist/libs.js'
            },
            styles: {
                src: allCssLibs(jsLibs),
                dest: 'dist/styles.css',
                options: {
                    separator: '\n'
                }
            },
            dist: {
                src: ['app/*.js'],
                dest: 'dist/app.js'
            }
        },

        watch: {
            options: {
                atBegin: true
            },
            dev: {
                files: ['Gruntfile.js', 'app/*.js', '*.html', '*.css'],
                tasks: ['html2js:dist', 'concat', 'clean:temp']
            },
            min: {
                files: ['Gruntfile.js', 'app/*.js', '*.html'],
                tasks: ['html2js:dist', 'concat', 'clean:temp', 'uglify:dist']
            }
        },

        compress: {
            dist: {
                options: {
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [
                    {
                        src: ['index.html'],
                        dest: '/'
                    },
                    {
                        src: ['dist/**'],
                        dest: 'dist/'
                    },
                    {
                        src: ['assets/**'],
                        dest: 'assets/'
                    },
                    {
                        src: ['libs/**'],
                        dest: 'libs/'
                    }
                ]
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

    grunt.registerTask('build', ['bower', '']);

    grunt.registerTask('dev', ['build', 'connect:server', 'watch:dev']);
    grunt.registerTask('test', ['build']);

    grunt.registerTask('minified', ['bower', 'connect:server', 'watch:min']);
    grunt.registerTask('package', ['bower', 'html2js:dist', 'concat:dist', 'uglify:dist',
        'clean:temp', 'compress:dist']);
};

// Generated on 2013-03-14 using generator-webapp 0.1.5
'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            rework: {
                files: ['<%= yeoman.app %>/styles/app.css'],
                tasks: ['rework', 'concat:rework']
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,webp}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            options: {
                port: 8000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        rework: {
            '.tmp/styles/normalize.css': '<%= yeoman.app %>/components/normalize-css/normalize.css',
            '.tmp/styles/unsemantic-grid-responsive-tablet.css': '<%= yeoman.app %>/components/unsemantic/assets/stylesheets/unsemantic-grid-responsive-tablet.css',
            '.tmp/styles/app.css': '<%= yeoman.app %>/styles/app.css',
            '.tmp/styles/styles/mapbox.css': '<%= yeoman.app %>/styles/mapbox.css',
            options: {
                toString: {compress: true},
                use: [
                    ['rework.vars'],
                    ['rework.colors'],
                    ['rework.prefix', 'animation'],
                    ['rework.prefix', 'animation-delay'],
                    ['rework.prefix', 'transition'],
                    ['rework.media', {
                        mobile: 'screen and (max-width: 767px)',
                        tablet: 'screen and (min-width: 767px) and (max-width: 1025px)',
                        'at-least-tablet': 'screen and (min-width: 767px)',
                        'at-most-tablet': 'screen and (max-width: 1025px)',
                        desktop: 'screen and (min-width: 1025px)'
                    }]
                    // ['rework.at2x']
                ],
                vendors: ['-moz-', '-webkit-', '-o-']
            }
        },
        concat: {
            rework: {
                files: {
                    '.tmp/styles/main.css': [
                        '.tmp/styles/normalize.css',
                        '.tmp/styles/unsemantic-grid-responsive-tablet.css',
                        '.tmp/styles/app.css',
                        '.tmp/styles/mapbox.css'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,**/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': '.tmp/styles/main.css'
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        rev: {
          dist: {
            files: {
              src: [
                '<%= yeoman.dist %>/scripts/{,*/}*.js',
                '<%= yeoman.dist %>/styles/{,*/}*.css',
                '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
              ]
            }
          }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt,png}',
                        'index.html',
                        '.htaccess'
                    ]
                }]
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', [
        'clean:server',
        'rework',
        'concat:rework',
        'livereload-start',
        'connect:livereload',
        'open',
        'watch'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'rework',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'rework',
        'concat',
        'useminPrepare',
        'imagemin',
        'cssmin',
        //'htmlmin',
        'concat',
        'copy',
        'uglify',
        //'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};

module.exports = function(grunt) {
    'use strict';

    var timestamp = grunt.template.today('yymmddHHMMss');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/** <%= pkg.title || pkg.name %> v<%= pkg.version %> \n' +
            ' * Copyright <%= pkg.author.name %> Build: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n **/',
        timestamp: timestamp,
        cdn: '',
        dist: 'dist',

        // Task configuration.
        clean: ['tmp/', '<%= dist %>'],

        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['images/**'],
                    dest: '<%= dist %>'
                }, ]
            }
        },

        concat: {
            styles: {
                src: ['src/styles/normalize.css', 'src/styles/style.css'],
                dest: 'tmp/<%= pkg.name %>.css'
            },
            scripts: {
                src: ['src/scripts/core.js'],
                dest: 'tmp/<%= pkg.name %>.js'
            },
            mobile:  {
                src: ['src/scripts/core.js', 'src/scripts/mobile.js'],
                dest: 'mobile/ray-carousel.mobile.js'
            },
            oppo:  {
                src: ['src/scripts/core.js', 'src/scripts/oppo.js'],
                dest: 'mobile/ray-carousel.oppo.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            scripts: {
                files: {
                    '<%= dist %>/scripts/<%= pkg.name %>-<%= timestamp %>.min.js': 'tmp/<%= pkg.name %>.js'
                }
            },
            mobile: {
                files: {
                    'mobile/ray-carousel.mobile.min.js' : 'mobile/ray-carousel.mobile.js'
                }
            },
            oppo: {
                files: {
                    'oppo/ray-carousel.oppo.min.js' : 'mobile/ray-carousel.oppo.js'
                }
            }
        },

        cssmin: {
            options: {
                banner: '<%= banner %>',
                keepSpecialComments: 0
            },
            styles: {
                files: {
                    '<%= dist %>/styles/<%= pkg.name %>-<%= timestamp %>.min.css': 'tmp/<%= pkg.name %>.css'
                }
            },
            mobile: {
                files: {
                    'mobile/ray-carousel.mobile.min.css' : 'mobile/ray-carousel.mobile.css'
                }
            },
            oppo: {
                files: {
                    'oppo/ray-carousel.oppo.min.css' : 'oppo/ray-carousel.oppo.css'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['src/scripts/**/*.js']
            }
        },

        processhtml: {
            production: {
                options: {
                    process: true,
                    data: {
                        'script': '<%= cdn %>/scripts/<%= pkg.name %>-<%= timestamp %>.min.js',
                        'style': '<%= cdn %>/styles/<%= pkg.name %>-<%= timestamp %>.min.css'
                    }
                },
                files: {
                    '<%= dist %>/index.html': 'src/index.html'
                }
            },
            development: {
                options: {
                    process: true,
                    data: {
                        'script': 'scripts/<%= pkg.name %>-<%= timestamp %>.min.js',
                        'style': 'styles/<%= pkg.name %>-<%= timestamp %>.min.css'
                    }
                },
                files: {
                    '<%= dist %>/index.html': 'src/index.html'
                }
            }
        },

        watch: {
            // livereload: {
            //   options: {
            //     livereload: true
            //   },
            //   files: ['src/**/*.js', 'src/html/**/*.html', 'src/**/*.less'],
            //   tasks: ['less:development', 'includes', 'jshint']
            // },
            js: {
                files: 'src/scripts/**/*.js',
                tasks: 'jshint:src'
            },
            css: {
                files: 'src/styles/**/*.less',
                tasks: 'less:development'
            },
            html: {
                files: 'src/html/**/*.html',
                tasks: 'includes'
            }
        },

        connect: {
            server: {
                options: {
                    hostname: '*',
                    port: 1377,
                    debug: true,
                    livereload: true,
                    base: './src'
                }
            }
        },

        less: {
            development: {
                path: 'src/styles/',
                compress: false,
                files: {
                    'src/styles/style.css': 'src/styles/style.less',
                    'src/styles/mobile.css': 'src/styles/mobile.less',
                    'src/styles/oppo.css': 'src/styles/oppo.less'
                }
            },
            mobile: {
                path: 'src/styles',
                compress: false,
                files: {
                    'mobile/ray-carousel.mobile.css': 'src/styles/mobile.less'
                }
            },
            oppo: {
                path: 'src/styles',
                compress: false,
                files: {
                    'oppo/ray-carousel.oppo.css': 'src/styles/oppo.less'
                }
            }
        },

        imagemin: {
            images: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['images/**/*.{png,jpg,gif}'],
                    dest: '<%= dist %>'
                }]
            }
        },

        includes: {
            options: {
                includeRegexp: /^(\s*)<!--\sinclude\s+(\S+)\s-->\s*$/
            },
            files: {
                src: ['*.html'],
                dest: 'src',
                cwd: 'src/html'
            }
        },

        browserSync: {
            dev: {
                // bsFiles: {
                //   src: 'src/styles/*.css'
                // },
                options: {
                    server: {
                        baseDir: 'src'
                    },
                    files: ['src/styles/*.css', 'src/scripts/**/*.js', 'src/*.html'],
                    watchTask: true
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-browser-sync');

    // Default task.
    grunt.registerTask('default', ['jshint']);

    grunt.registerTask('dev', ['connect', 'watch']);
    grunt.registerTask('dev2', ['browserSync', 'watch']);

    grunt.registerTask('build', ['clean', 'less', 'concat', 'uglify', 'cssmin', 'imagemin', 'includes', 'processhtml']);
    grunt.registerTask('build-mobile', ['less:mobile', 'cssmin:mobile', 'concat:mobile', 'uglify:mobile']);
    grunt.registerTask('build-oppo', ['less:oppo', 'cssmin:oppo', 'concat:oppo', 'uglify:oppo']);
};
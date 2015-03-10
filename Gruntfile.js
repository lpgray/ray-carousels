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
            mobile:  {
                src: ['src/scripts/core.js', 'src/scripts/mobile.js'],
                dest: 'dist/mobile/mobile.js'
            },
            oppo:  {
                src: ['src/scripts/core.js', 'src/scripts/oppo.js'],
                dest: 'dist/oppo/oppo.js'
            },
            single:  {
                src: ['src/scripts/core.js', 'src/scripts/single.js'],
                dest: 'dist/oppo/single.js'
            },
            multiple:  {
                src: ['src/scripts/core.js', 'src/scripts/multiple.js'],
                dest: 'dist/oppo/multiple.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            mobile: {
                files: {
                    'dist/mobile/mobile.min.js' : 'dist/mobile/mobile.js'
                }
            },
            oppo: {
                files: {
                    'dist/oppo/oppo.min.js' : 'dist/oppo/oppo.js'
                }
            },
            single: {
                files: {
                    'dist/single/single.min.js' : 'dist/single/single.js'
                }
            },
            multiple: {
                files: {
                    'dist/multiple/multiple.min.js' : 'dist/multiple/multiple.js'
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
                    'dist/mobile/mobile.min.css' : 'dist/mobile/mobile.css'
                }
            },
            oppo: {
                files: {
                    'dist/oppo/oppo.min.css' : 'dist/oppo/oppo.css'
                }
            },
            single: {
                files: {
                    'dist/single/single.min.css' : 'dist/single/single.css'
                }
            },
            multiple: {
                files: {
                    'dist/multiple/multiple.min.css' : 'dist/multiple/multiple.css'
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
            js: {
                files: 'src/scripts/**/*.js',
                tasks: 'jshint:src'
            },
            css: {
                files: 'src/less/**/*.less',
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
                paths: 'src/less',
                files: {
                    'src/styles/oppo.css' : 'src/less/oppo.less',
                    'src/styles/style.css' : 'src/less/style.less',
                    'src/styles/single.css' : 'src/less/single.less',
                    'src/styles/mobile.css' : 'src/less/mobile.less',
                    'src/styles/multiple.css' : 'src/less/multiple.less'
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

    grunt.registerTask('dev2', ['browserSync', 'watch']);

    grunt.registerTask('build', ['clean', 'less', 'concat', 'uglify', 'cssmin', 'imagemin', 'includes', 'processhtml']);
    grunt.registerTask('build-mobile', ['less:mobile', 'cssmin:mobile', 'concat:mobile', 'uglify:mobile']);
    grunt.registerTask('build-oppo', ['less:oppo', 'cssmin:oppo', 'concat:oppo', 'uglify:oppo']);
    grunt.registerTask('build-single', ['less:single', 'cssmin:single', 'concat:single', 'uglify:single']);
    grunt.registerTask('build-multiple', ['less:multiple', 'cssmin:multiple', 'concat:multiple', 'uglify:multiple']);
};
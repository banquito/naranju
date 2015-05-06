/*
 * http://gruntjs.com/
 */

'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        server: {
            port: 3000,
            base: './dist'
        },
        stylus: {
            compile: {
                options: {
                    compress: true,
                    paths: ['stylus'],
                    urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
                    use: [
                        require('nib'),
                        require('jeet'),
                        require('rupture')
                    ]
                },
                import: [
                    'nib', 'jeet'
                ],
                files: [{
                    cwd: "app/assets/css",
                    src: "[^_]*.styl",
                    dest: "dist/assets/css",
                    expand: true,
                    ext: ".css"
                }]
            }
        },
        browserSync: {
            bsFiles: {
                src: [
                    'dist/**/*.html',
                    'dist/*.html',
                    'dist/assets/**/*.css',
                ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./dist"
                },
                reloadDelay: 300
            }
        },
        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true,
                    data: function(dest, src) {
                        var src = String(src)
                            .replace("app/views", "app/models")
                            .replace(".jade", ".yml");
                        var global = {};

                        global = grunt.file.readYAML("app/models/_global.yml");

                        if (grunt.file.exists(src)) {
                            var data = grunt.file.readYAML(src);
                            if(!data) data = {}; 
                            data.global = global;
                            return data;
                        }
                        return {
                            global: global
                        };
                    }
                },
                files: [{
                    cwd: "app/views",
                    src: ["**/*.jade", "!_layouts/**", "!**/_*.jade"],
                    dest: "dist",
                    expand: true,
                    ext: ".html"
                }]
            }
        },

        watch: {
            css: {
                files: ['app/assets/css/*.styl', 'app/assets/css/**/*.styl'],
                tasks: ['stylus'],
                options: {
                    debounceDelay: 250
                }
            },
            views: {
                files: ['app/views/*.jade', 'app/views/**/*.jade', 'app/models/**/*.yml', 'app/models/*.yml'],
                tasks: ['jade'],
                options: {
                    debounceDelay: 250
                }
            },
            js: {
                files: ['app/assets/js/*.js', 'app/assets/js/**/*.js'],
                tasks: ['uglify'],
                options: {
                    debounceDelay: 250
                }                
            },
            media: {
                files: ['app/assets/media/*', 'app/assets/media/**/*'],
                tasks: ['copy'],
                options: {
                    debounceDelay: 250
                }                
            }
        },

        clean: {
            dist: ["dist/assets/css/*.css", "dist/assets/js/*.js", "dist/assets/media"]
        },
        uglify: {
            dist: {
                files: {
                    'dist/assets/js/lib.min.js': [
                        'bower_components/components-modernizr/modernizr.js',
                        'bower_components/jquery/dist/jquery.js',
                        'app/assets/js/lib/*.js',
                        'app/assets/js/lib/**/*.js'
                    ],
                    'dist/assets/js/script.js': [
                        'app/assets/js/script.js'
                    ]
                }
            }
        },
        copy: {
          main: {
            expand: true,
            cwd: 'app/assets/media/',
            src: '**',
            dest: 'dist/assets/media',
          },
        },
    });

    // Load plugins here
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-contrib-jade");
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ["browserSync", "watch"]);

    grunt.registerTask('build', ['jade', 'clean', 'stylus', 'uglify', 'copy']);

};

/*
 * http://gruntjs.com/
 */

'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
  server: {
     port: 3000,
     base: './'
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
        'nib','jeet'
      ],
      files: [ {
        cwd: "app/assets/stylus",
        src: "*.styl",
        dest: "assets/css/",
        expand: true,
        ext: ".css"
      } ]
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
            .replace(".jade", ".json");
          var global = grunt.file.readJSON("app/models/_global.json")

          if(grunt.file.exists(src)) {
            console.log(src);
            var data = grunt.file.readJSON(src);
            data.global = global;
            return data; 
          }
          return { global: global };
        }
      },
      files: [ {
        cwd: "app/views",
        src: ["**/*.jade","!_layouts/**","!**/_*.jade"],
        dest: "./",
        expand: true,
        ext: ".html"
      } ]
    }
  },

  watch: {
    css: {
      files: ['app/assets/stylus/*.styl', 'app/assets/stylus/**/*.styl'],
      tasks: ['stylus'],
      options: {
        debounceDelay: 250
      }
    },
    views: {
      files: ['app/views/*.jade', 'app/views/**/*.jade', 'app/models/**/*.json', 'app/models/*.json'],
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
    }
  },

  clean: {
    dist: ["assets/css/*.css", "assets/js/*.js"]
  },
  uglify: {
    dist: {
      files: {
        'assets/js/bootstrap.min.js': [
            'app/assets/js/bootstrap/transition.js',
            'app/assets/js/bootstrap/alert.js',
            'app/assets/js/bootstrap/button.js',
            'app/assets/js/bootstrap/carousel.js',
            'app/assets/js/bootstrap/collapse.js',
            'app/assets/js/bootstrap/dropdown.js',
            'app/assets/js/bootstrap/modal.js',
            'app/assets/js/bootstrap/tooltip.js',
            'app/assets/js/bootstrap/popover.js',
            'app/assets/js/bootstrap/scrollspy.js',
            'app/assets/js/bootstrap/tab.js',
            'app/assets/js/bootstrap/affix.js'
        ],
        'assets/js/script.js': [
          'app/assets/js/script.js'
        ]
      }

    }
  },

  });

  // Load plugins here
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-jade");

  grunt.registerTask('build', ['jade','clean','stylus', 'uglify']);
  grunt.registerTask('server', 'Start a custom web server', function() {
      grunt.log.writeln('Started web server on port ' + grunt.config.get('server.port') );
      var base = grunt.config.get('server.base');
      var port = grunt.config.get('server.port')
      require('./app.js')
        .use("/", express.static(base))
        .listen(port);
  });
};

module.exports = function(grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Sass.
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/main.css': '_scss/main.scss'
        }
      }
    },

    sass_globbing: {
      dist: {
        files: {
          '_scss/_styles.scss': '_scss/styles/**/*.scss'
        },
        options: {
          useSingleQuotes: false,
          signature: '// This file was generated automatically by grunt.  Any changes will be overridden.'
        }
      }
    },

    // Watch
    watch: {
      scripts: {
        files: ['_scss/**/*.scss'],
        tasks: ['sass_globbing', 'sass', 'postcss:dist'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    }
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  //grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['sass_globbing', 'sass', 'postcss:dist']);
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    lint: {
      files: ['Gruntfile.js']
    },
    concat: {},
    less: {
      options: {
        paths: ['src/css/bootstrap']
      },

      bootstrap: {
        src: ['src/css/bootstrap/bootstrap.less'],
        dest: 'dist/bootstrap.css'
      },

      bootstrapr: {
        src: ['src/css/bootstrap/responsive.less'],
        dest: 'dist/bootstrap-responsive.css'
      }
    },
    connect: {
      server: {
        options: {
          base: 'dist'
        }
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', 'lint');
};

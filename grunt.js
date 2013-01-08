module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    lint: {
      files: ['grunt.js']
    },
    concat: {},
    less: {
      bootstrap: {
        options: {
          paths: ['src/css/bootstrap']
        },

        src: ['src/css/bootstrap/bootstrap.less'],
        dest: 'dist/bootstrap.css'
      }
    },
    server: {
      base: 'dist'
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', 'lint');
};

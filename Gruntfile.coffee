module.exports = (grunt) ->
  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    jshint:
      files: ['Gruntfile.js']

    #concat:
    copy:
      dist:
        #options:
          #cwd: 'src/'

        files:
          'dist/': ['src/font/**', 'src/img/**']

    less:
      bootstrap:
        options:
          paths: ['src/css/bootstrap']

        files:
          'dist/css/bootstrap.css': 'src/css/bootstrap/bootstrap.less'
          'dist/css/bootstrap-responsive.css': 'src/css/bootstrap/responsive.less'

      fontawesome:
        options:
          paths: ['src/css/font-awesome']

        files:
          'dist/css/font-awesome.css': 'src/css/font-awesome/font-awesome.less'

    connect:
      server:
        options:
          base: 'dist'

    watch:
      files: '<config:lint.files>'
      tasks: 'lint'

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'

  # Default task(s).
  grunt.registerTask 'default', 'jshint'

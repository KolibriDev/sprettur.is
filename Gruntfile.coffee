module.exports = (grunt) ->
  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    paths:
      assets: ['src/font/**', 'src/img/**']
      html: 'src/html/**'
      bootstrap: 'src/css/bootstrap'

    clean:
      dist: 'dist'

    copy:
      assets:
        files:
          'dist/': '<%= paths.assets %>'

      html:
        files:
          'dist/': '<%= paths.html %>'

    less:
      bootstrap:
        options:
          paths: ['<%= paths.bootstrap %>']

        files:
          'dist/css/bootstrap.css': '<%= paths.bootstrap %>/bootstrap.less'
          'dist/css/bootstrap-responsive.css': '<%= paths.bootstrap %>/responsive.less'

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
      less:
        files: '<%= paths.bootstrap %>/**'
        tasks: 'less'

      assets:
        files: '<%= paths.assets %>'
        tasks: 'copy:assets'

      html:
        files: '<%= paths.html %>'
        tasks: 'copy:html'

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-clean'

  grunt.registerTask 'dist', ['copy', 'less']
  grunt.registerTask 'dev', ['dist', 'connect', 'watch']

  # Default task(s).
  grunt.registerTask 'default', 'dist'

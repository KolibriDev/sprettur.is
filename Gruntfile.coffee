module.exports = (grunt) ->
  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    paths:
      assets: ['src/font/**', 'src/images/**', 'src/js/**']
      css: 'src/css/**'
      html: 'src/html/**'

    clean:
      dist: 'dist'

    copy:
      assets:
        files: [
          { expand: true, cwd: 'src', dest: 'dist/', src: ['font/**', 'images/**', 'js/**'] }
        ]

      css:
        files: [
          { expand: true, cwd: 'src', dest: 'dist/', src: ['css/**'] }
        ]

      html:
        files: [
          { expand: true, cwd: 'src/html', dest: 'dist/', src: ['**.html'] }
        ]

    connect:
      server:
        options:
          base: 'dist'

    watch:
      assets:
        files: '<%= paths.assets %>'
        tasks: 'copy:assets'

      html:
        files: '<%= paths.html %>'
        tasks: 'copy:html'

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-clean'

  grunt.registerTask 'dist', ['copy']
  grunt.registerTask 'dev', ['dist', 'connect', 'watch']

  # Default task(s).
  grunt.registerTask 'default', 'dist'

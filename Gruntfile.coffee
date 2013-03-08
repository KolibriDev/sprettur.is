module.exports = (grunt) ->
  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    paths:
      assets: ['src/font/**', 'src/images/**', 'src/js/**']
      vendorcss: 'src/vendorcss/**'
      html: 'src/html/**'

    clean:
      dist: 'dist'

    copy:
      assets:
        files: [
          { expand: true, cwd: 'src', dest: 'dist/', src: ['font/**', 'images/**', 'js/**'] }
        ]

      vendorcss:
        files: [
          { expand: true, cwd: 'src/vendorcss', dest: 'dist/css', src: ['**'] }
        ]

      html:
        files: [
          { expand: true, cwd: 'src/html', dest: 'dist/', src: ['**'] }
        ]

    rework:
      'dist/css/app.css': 'src/css/app.css'
      options:
        toString: {compress: true}

        use: [
          ['rework.vars'],
          ['rework.colors']
        ]

    connect:
      server:
        options:
          base: 'dist'
          hostname: '0.0.0.0'

    watch:
      assets:
        files: '<%= paths.assets %>'
        tasks: 'copy:assets'

      rework:
        files: 'src/css/app.css'
        tasks: 'rework'

      vendorcss:
        files: '<%= paths.css %>'
        tasks: 'copy:vendorcss'

      html:
        files: '<%= paths.html %>'
        tasks: 'copy:html'

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-clean'

  grunt.loadNpmTasks 'grunt-rework'

  grunt.registerTask 'dist', ['copy', 'rework']
  grunt.registerTask 'dev', ['dist', 'connect', 'watch']

  # Default task(s).
  grunt.registerTask 'default', 'dist'

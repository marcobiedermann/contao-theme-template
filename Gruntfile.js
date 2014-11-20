'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    config: {
      source: 'source/<%= pkg.name %>',
      build: 'files/<%= pkg.name %>'
    },

    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      files: {
        expand: true,
        cwd: '<%= config.build %>/css',
        dest: '<%= config.build %>/css',
        src: '**/*.css'
      }
    },

    clean: {
      folder: ['<%= config.build %>']
    },

    cmq: {
      files: {
        expand: true,
        cwd: '<%= config.source %>/css',
        dest: '<%= config.build %>/css',
        src: '**/*.css'
      }
    },

    concat: {
      options: {
      },
      files: {
        src: [
          '<%= config.source %>/js/jquery.placeholder-2.0.8.js',
          '<%= config.source %>/js/script.js'
        ],
        dest: '<%= config.source %>/js/main.js',
      }
    },

    copy: {
      favicons: {
        expand: true,
        cwd: '<%= config.source %>',
        dest: '<%= config.build %>',
        src: '*{ico,jpg,png}'
      },
      fonts: {
        expand: true,
        cwd: '<%= config.source %>/fonts',
        dest: '<%= config.build %>/fonts',
        src: '**/*'
      },
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      files: ['<%= config.source %>/css/**/*.css']
    },

    cssmin: {
      files: {
        expand: true,
        cwd: '<%= config.build %>/css',
        dest: '<%= config.build %>/css',
        src: '**/*.css'
      }
    },

    imagemin: {
      files: {
        files: [{
          expand: true,
          cwd: '<%= config.source %>/img',
          src: '**/*.{gif,jpeg,jpg,png}',
          dest: '<%= config.build %>/img'
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      files: ['<%= config.source %>/js/script.js']
    },

    uglify: {
      options: {
        beautify: true,
        compress: false,
        mangle: false,
        preserveComments: 'some'
      },
      files: {
        '<%= config.build %>/js/main.js': ['<%= config.source %>/js/main.js']
      }

    },

    sass: {
      options: {
        style: 'expanded'
      },
      files: {
        expand: true,
        cwd: '<%= config.source %>/scss',
        dest: '<%= config.source %>/css',
        src: ['**/*.scss'],
        ext: '.css'
      }
    },

    svgmin: {
      options: {

      },
      files: {
        expand: true,
        cwd: '<%= config.source %>/img',
        dest: '<%= config.build %>/img',
        ext: '.svg',
        src: ['**/*.svg']
      }
    },

    svgstore: {
      options: {
        prefix : 'icon-',
        svg: {
          viewBox : '0 0 100 100',
          xmlns: 'http://www.w3.org/2000/svg'
        }
      },
      default: {
        files: {
          '<%= config.build %>/img/icons.svg': ['<%= config.build %>/img/icons/*.svg'],
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },

      css: {
        files: ['<%= config.source %>/css/**/*.css'],
        tasks: []
      },

      gruntfile: {
        files: ['Gruntfile.js']
      },

      img: {
        files: ['<%= config.source %>/img/**/*.{gif,jpeg,jpg,png}'],
        tasks: []
      },

      js: {
        files: ['<%= config.source %>/js/**/*.js'],
        tasks: ['jshint']
      },

      sass: {
        files: ['<%= config.source %>/scss/**/*.scss'],
        tasks: ['sass']
      },

      svg: {
        files: ['<%= config.source %>/img/**/*.svg'],
        tasks: []
      },

      templates: {
        files: ['templates/**/*.html5'],
        tasks: []
      }

    }

  });

  grunt.registerTask('default', ['sass', 'watch']);
  grunt.registerTask('test', [
    'sass',
    'csslint',
    'jshint'
  ]);

  grunt.registerTask('build', [
    'clean',
    'sass',
    'cmq',
    'cssmin',
    'autoprefixer',
    'concat',
    'uglify',
    'svgmin',
    'imagemin'
  ]);

};

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['./bin/*.js', './routes/employees.js','app.js'],
        dest: 'concations.js'
      }
    },
    uglify: {
      options: {
        banner: 'This is Uglifed File for the project'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['./models/employee.js','gruntfile.js','./routes/*.js','app.js','./bin/www.js',],
      options: {
        // options here to override JSHint defaults
          "maxerr": 20,
          "maxparams": 15,
          "maxdepth": 20,
          "maxstatements": 100,
          "maxcomplexity": 20,
          reporter: require('jshint-html-reporter'),
          reporterOutput: './JSHintReport/jshint-report.html'
      }
    },
      
      coverage: {
        default: {
            options: {
            thresholds: {
              'statements': 10,
              'branches': 20,
              'lines': 10,
              'functions': 5
            },
        dir: 'coverage',
        root: '.'
      }
    }
  },
      
    run: {
    your_target: {
      cmd: 'node',
      args: [
        './bin/www.js'
      ]
    }
  }, 
      sonarRunner: {
        analysis: {
            options: {
                sonar: {
                    host: {
                        url: 'http://localhost:9000'
                    },
                    jdbc: {
                        url: 'jdbc:mysql://localhost:3306/sonar',
                        username: 'your-username-here',
                        password: 'your-password-here'
                    },
                    projectKey: 'your-unique-project-key-here',
                    projectName: 'Your Project Name Here',
                    projectVersion: '0.0.1',
                    sources: 'scripts',
                    tests: 'tests',
                    javascript: {
                        lcov: {
                            reportPath: "reports/lcov/lcov.info"
                        }
                    },
                    sourceEncoding: 'UTF-8'
                }
            }
        }
    }

  
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-istanbul-coverage');
  grunt.loadNpmTasks('grunt-contrib-concat'); 
  grunt.loadNpmTasks('grunt-sonar-runner');
  grunt.loadNpmTasks('grunt-run');
  
grunt.registerTask('default', ['concat','uglify','run','coverage']);
   // grunt.registerTask('default', ['coverage']);

};              
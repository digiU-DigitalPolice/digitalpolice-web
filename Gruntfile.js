module.exports = function(grunt) {

  grunt.initConfig({
    ngconstant: {
      // Options for all targets
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config',
      },
      // Environment targets
      development: {
        options: {
          dest: 'app/config.js'
        },
        constants: {
          ENV: {
            name: 'development',
            crimesUrl: 'http://localhost:8080/map'
          }
        }
      },
      production: {
        options: {
          dest: 'app/config.js'
        },
        constants: {
          ENV: {
            name: 'production',
            crimesUrl: 'http://162.211.230.155:8080/map'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-ng-constant');

  // A very basic default task.
  grunt.registerTask('default', ['ngconstant:production']);

  grunt.registerTask('config-local', ['ngconstant:development']);

};

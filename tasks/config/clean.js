/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function (grunt) {

  grunt.config.set('clean', {
    dev: ['.tmp/public/**', '!.tmp/public/fonts/**', 'assets/scripts/*/build'],
    prod:['.tmp/production/**'],
    build: ['www'],
    afterBuild: ['.tmp/public/concat']
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};

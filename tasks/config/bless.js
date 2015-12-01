/**
 * Bless CSS files.
 *
 * ---------------------------------------------------------------
 *
 * Minifies css files and places them into .tmp/public/min directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-cssmin
 */
module.exports = function(grunt) {

    grunt.config.set('bless', {
        css: {
            options: {
                force: true
            },
            files: {
                '.tmp/public/min/production.min.css': '.tmp/public/min/production.min.css'
            }
        },
        dev: {
            options: {
                force: true
            },
            files: {
                '.tmp/public/styles/main.css': '.tmp/public/styles/main.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-bless');

};
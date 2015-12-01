/**
 * grunt-cache-bust
 *
 * ---------------------------------------------------------------
 *
 * add version number to css/js
 *
 * For usage docs see:
 * 		https://github.com/hollandben/grunt-cache-bust
 *
 */
module.exports = function(grunt) {
    grunt.config.set('cacheBust', {
        options: {
            baseDir: '.tmp/public/',
            encoding: 'utf8',
            algorithm: 'md5',
            length: 16
        },
        assets: {
            files: [{
                src: ['views/layout*.ejs']
            }]
        }
    });

    grunt.loadNpmTasks('grunt-cache-bust');
};
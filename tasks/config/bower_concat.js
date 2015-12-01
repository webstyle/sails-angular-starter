/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 *        https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function (grunt) {
    grunt.config.set('bower_concat', {
        all: {
            bowerOptions: {
                relative: false
            },
            mainFiles: {
                placeholders: ['lib/utils.js', 'lib/main.js'],
                decouple: ['/dist/decouple.min.js'],
            },
            dependencies: {
                'bootstrap-sass': ['jquery']
            },
            dest: '.tmp/public/scripts/dependencies/_bower.js'
        }
    });
    grunt.loadNpmTasks('grunt-bower-concat');
};

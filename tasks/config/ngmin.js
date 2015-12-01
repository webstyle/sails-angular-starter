/**
 * pre-Minify angular files.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function(grunt) {

	grunt.config.set('ngmin', {
		dist: {
			src: ['.tmp/public/concat/production.js'],
			dest: '.tmp/public/concat/production.js'
		}
	});

	grunt.loadNpmTasks('grunt-ngmin');
};

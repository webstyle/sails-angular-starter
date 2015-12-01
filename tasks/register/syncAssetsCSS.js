module.exports = function (grunt) {
	grunt.registerTask('syncAssetsCSS', [
    'sass',
		'sync:dev',
	]);
};

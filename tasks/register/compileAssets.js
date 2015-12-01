module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
    'clean:dev',
    'bower_concat',
    'html2js',
    'sass',
    'copy:dev',
	]);
};

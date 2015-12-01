module.exports = function (grunt) {
	grunt.registerTask('production', [
    'compileAssets',
    'concat',
    'ngmin',
    'uglify',
    'cssmin',
    'bless',
    'sails-linker:prodJs',
    'sails-linker:prodStyles',
    //'cacheBust',
    'clean:afterBuild',
    'copy:copyJwPlayer'
	]);
};

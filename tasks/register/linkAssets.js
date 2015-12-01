module.exports = function (grunt) {
	grunt.registerTask('linkAssets', [
    'sails-linker:devJs',
    'sails-linker:adminJs',
    'sails-linker:devStyles',
    'sails-linker:adminStyles'
	]);
};

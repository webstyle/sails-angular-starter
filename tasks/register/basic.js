module.exports = function (grunt) {
    grunt.registerTask('basic', [
        'compileAssets',
        'bless:dev',
        'linkAssets',
        'symlink',
        //'watch'
    ]);
};

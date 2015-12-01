module.exports = function (grunt) {
    grunt.registerTask('syncAssetsJS', [
        'html2js',
        'sync:dev',
    ]);
};

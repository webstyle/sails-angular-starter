module.exports = function (grunt) {
    grunt.registerTask('syncAssets', [
        'html2js',
        'sass',
        'sync:dev',
    ]);
};

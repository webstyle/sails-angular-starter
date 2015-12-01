/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-watch
 *
 */
module.exports = function (grunt) {

    grunt.config.set('watch', {
        options: {
            livereload: true
        },
        api: {

            // API files to watch:
            files: ['api/**/*'],
            tasks: [

            ]

        },

        assetsHTML: {
            files: ['assets/**/*.html'],
            tasks: [
                'html2js'
            ]
        },

        assetsJS: {

            files: ['assets/**/*.js'],
            tasks: ['syncAssetsJS', 'linkAssets']

        },
        assetsCSS: {

            files: ['assets/**/*.scss'],
            tasks: ['syncAssetsCSS', 'linkAssets']

        },

        assetsDir: {

            files: ['tasks/pipeline.js'],
            tasks: ['syncAssets', 'linkAssets']
        }

    });

    // Get path to core grunt dependencies from Sails
    grunt.loadNpmTasks('grunt-contrib-watch');

};

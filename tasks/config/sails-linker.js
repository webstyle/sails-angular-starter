/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files.  Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see:
 *        https://github.com/Zolmeister/grunt-sails-linker
 *
 */
module.exports = function (grunt) {

    grunt.config.set('sails-linker', {
        devJs: {
            options: {
                startTag: '<!--SCRIPTS-->',
                endTag: '<!--SCRIPTS END-->',
                fileTmpl: '<script src="%s"></script>',
                appRoot: '.tmp/public'
            },
            files: {
                '.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
                'views/**/*.html': require('../pipeline').jsFilesToInject,
                'views/**/*.ejs': require('../pipeline').jsFilesToInject
            }
        },

        adminJs: {
            options: {
                startTag: '<!--SCRIPTS::admin-->',
                endTag: '<!--SCRIPTS END-->',
                fileTmpl: '<script src="%s"></script>',
                appRoot: '.tmp/public'
            },
            files: {
                '.tmp/public/**/*.html': require('../pipeline').adminJsFilesToInject,
                'views/**/*.html': require('../pipeline').adminJsFilesToInject,
                'views/**/*.ejs': require('../pipeline').adminJsFilesToInject
            }
        },

        prodJs: {
            options: {
                startTag: '<!--SCRIPTS-->',
                endTag: '<!--SCRIPTS END-->',
                fileTmpl: '<script src="%s"></script>',
                appRoot: '.tmp/public'
            },
            files: {
                '.tmp/public/**/*.html': ['.tmp/public/min/production.min.js'],
                'views/**/*.html': ['.tmp/public/min/production.min.js'],
                'views/**/*.ejs': ['.tmp/public/min/production.min.js']
            }
        },

        devStyles: {
            options: {
                startTag: '<!--STYLES-->',
                endTag: '<!--STYLES END-->',
                fileTmpl: '<link rel="stylesheet" href="%s">',
                appRoot: '.tmp/public'
            },

            files: {
                '.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
                'views/**/*.html': require('../pipeline').cssFilesToInject,
                'views/**/*.ejs': require('../pipeline').cssFilesToInject
            }
        },

        adminStyles: {
            options: {
                startTag: '<!--STYLES-->',
                endTag: '<!--STYLES END-->',
                fileTmpl: '<link rel="stylesheet" href="%s">',
                appRoot: '.tmp/public'
            },

            files: {
                '.tmp/public/**/*.html': require('../pipeline').adminCssFilesToInject,
                'views/**/*.html': require('../pipeline').adminCssFilesToInject,
                'views/**/*.ejs': require('../pipeline').adminCssFilesToInject
            }
        },

        prodStyles: {
            options: {
                startTag: '<!--STYLES-->',
                endTag: '<!--STYLES END-->',
                fileTmpl: '<link rel="stylesheet" href="%s">',
                appRoot: '.tmp/public'
            },
            files: {
                '.tmp/public/index.html': '.tmp/public/min/production.min.css',
                'views/**/*.html': '.tmp/public/min/production.min.css',
                'views/**/*.ejs': '.tmp/public/min/production.min.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-sails-linker');
};

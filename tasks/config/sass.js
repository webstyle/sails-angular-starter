/**
 * Compiles LESS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/importer.less` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-less
 */
module.exports = function (grunt) {

  grunt.config.set('sass', {
    options: {
      noCache: true
    },
    custom: {
      options: {
        loadPath: require('node-bourbon').includePaths,
        sourcemap: false, //set to true for debug
        quiet: true,
        style: 'expanded' //Set your prefered style for development here.
      },
      files: [
        {
          expand: true,
          cwd: 'assets/styles/',
          src: ['*.*.scss', '*.scss', '!bootstrap.scss'], // Feel free to remove a format if you do not use it.
          dest: '.tmp/public/styles/',
          ext: '.css'
        }
      ]
    }


  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};

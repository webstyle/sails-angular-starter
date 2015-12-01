module.exports = function (grunt) {

    grunt.config.set('html2js', {
        //frontend: {
        //    options: {
        //        base: 'assets/scripts/frontend'
        //    },
        //    src: ['assets/scripts/frontend/**/*.html'],
        //    dest: '.tmp/public/scripts/templates/frontend_templates.js'
        //},
        admin: {
            options: {
                base: 'assets/scripts/admin'
            },
            src: ['assets/scripts/admin/**/*.html'],
            dest: '.tmp/public/scripts/templates/admin_templates.js'
        }
    });

    grunt.loadNpmTasks('grunt-html2js');
};

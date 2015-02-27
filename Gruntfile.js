'use strict';

module.exports = function(grunt){

    grunt.initConfig({
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            target: ['nix-menu.js']
        },
        uglify: {
            'nix-menu': {
                files: {
                    'build/nix-menu.min.js': ['nix-menu.js','support.js']
                }
            }
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        }
    });

    // grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('default', ['jshint','uglify']);
    grunt.registerTask('bump', ['bump']);

};
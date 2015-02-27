'use strict';

module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            target: ['nix-menu.js']
        },
        uglify: {
            options: {
                compress: {
                    'drop_console': false
                }
            },
            'nix-menu': {
                files: {
                    'build/nix-menu.min.js': 'src/nix-menu.js',
                    'build/support.min.js': 'src/support.js'
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['build/support.min.js', 'build/nix-menu.min.js'],
                dest: 'dist/nix-menu-<%= pkg.version %>.min.js',
            },
            dev: {
                src: ['build/support.min.js', 'build/nix-menu.min.js'],
                dest: 'dist/nix-menu.min.js',
            },
            test: {
                src: ['build/support.min.js', 'build/nix-menu.min.js'],
                dest: 'tests/nix-menu.min.js',
            }
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: ['pkg'],
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
        },
        'aws_s3': {
            options: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                uploadConcurrency: 5,
                downloadConcurrency: 5
            },
            cdn: {
                options: {
                    bucket: 'nutritionix-enterprise',
                    differential: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: 'nix-menu-<%= pkg.version %>.min.js',
                    dest: 'lib/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-aws-s3');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('default', ['jshint', 'uglify', 'concat:dev', 'concat:test']);
    grunt.registerTask('bump-version', ['bump']);
    grunt.registerTask('publish', ['jshint', 'uglify', 'concat:dist', 'aws_s3']);

};
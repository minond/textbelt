var DEFAULT_CONFIG = 'vendor/minond/scaffold/config/build.yml',
    LOCAL_CONFIG = 'config/build.yml';

/**
 * no need to edit this file. configured by config/build.yml
 * https://github.com/minond/scaffold
 */
module.exports = function (grunt) {
    'use strict';

    var lodash = require('lodash'),
        glob = require('glob'),
        defaults = require('merge-defaults');

    var tasks = {}, config = defaults(
        grunt.file.exists(LOCAL_CONFIG) ? grunt.file.readYAML(LOCAL_CONFIG) : {},
        grunt.file.readYAML(DEFAULT_CONFIG)
    );

    // pre-built templates
    if (config.type) {
        config = defaults(grunt.file.readYAML(
            'vendor/minond/scaffold/config/types/build-' + config.type + '.yml'
        ), config);
    }

    tasks.config = config;
    tasks.pkg = grunt.file.readJSON('package.json');

    // options
    grunt.initConfig(tasks);
    lodash(config.options).each(function (path) {
        glob.sync('*.js', { cwd: path }).forEach(function (option) {
            var task = option.replace(/\.js$/,'');
            var definition = require(path + option);

            tasks[ task ] = lodash.isFunction(definition) ?
                definition(grunt, config) : definition;
        });
    });

    // tasks
    require('load-grunt-tasks')(grunt);
    lodash(config.aliases).forOwn(function (tasks, alias) {
        grunt.registerTask(alias, tasks);
    });
};

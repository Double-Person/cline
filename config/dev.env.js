'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // BASE_URL: '"http://192.168.0.120:8080/tasks"'
    BASE_URL:'"/API"'
})
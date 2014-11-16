'use strict';

var querystring = require('querystring'),
    options = {
        url: 'http://textbelt.com/text',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };

/**
 * @funtion validate
 * @param {String} number
 * @param {String} message
 * @param {Function} cb
 * @return {Boolean} true for valid
 */
function validate(number, message, cb) {
    var valid = true;

    if (!number) {
        valid = false;
        cb(new Error('a number is required'));
    } else if (number.length !== 10) {
        valid = false;
        cb(new Error('a valid number is required'));
    } else if (!message) {
        valid = false;
        cb(new Error('a message is required'));
    }

    return valid;
}

/**
 * @function textbelt
 * @param {String} number
 * @param {String} message
 * @param {Function} [cb]
 * @link http://textbelt.com/
 */
function textbelt(number, message, cb) {
    cb = cb || function () {};

    if (!validate(number, message, cb)) {
        return;
    }

    options.body = querystring.stringify({
        number: number,
        message: message
    });

    return module.exports.request.post(options, function (err, res, body) {
        body = err || JSON.parse(body);
        cb(err || !body.success && new Error(body.message), res);
    });
}

module.exports = textbelt;
module.exports.request = require('request');

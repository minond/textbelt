'use strict';

describe('#textbelt', function () {
    var expect = require('expect.js'),
        querystring = require('querystring'),
        textbelt = require('..'),
        body,
        options,
        handler;

    beforeEach(function () {
        body = null;
        options = null;
        handler = null;

        textbelt.request.post = function (_options, _handler) {
            options = _options;
            handler = _handler;
        };
    });

    it('can handle no arguments', function () {
        textbelt();
        expect(true).to.be(true);
    });

    it('expects a number', function (done) {
        textbelt(null, null, function (err) {
            expect(err).to.be.an(Error);
            expect(err.message).to.be('a number is required');
            done();
        });
    });

    it('expects a valid number', function (done) {
        textbelt('123123123', null, function (err) {
            expect(err).to.be.an(Error);
            expect(err.message).to.be('a valid number is required');
            done();
        });
    });

    it('expects a message', function (done) {
        textbelt('1231231234', null, function (err) {
            expect(err).to.be.an(Error);
            expect(err.message).to.be('a message is required');
            done();
        });
    });

    it('includes the message in the request body', function () {
        textbelt('1231231234', 'this is my message');
        body = querystring.parse(options.body);
        expect(body.message).to.be('this is my message');
    });

    it('includes the number in the request body', function () {
        textbelt('1231231234', 'hi');
        body = querystring.parse(options.body);
        expect(body.number).to.be('1231231234');
    });

    it('includes request errors in the callback', function (done) {
        textbelt.request.post = function (options, handler) {
            handler(new Error('this is a network error!'));
        };

        textbelt('1231231234', 'hi', function (err) {
            expect(err).to.be.an(Error);
            expect(err.message).to.be('this is a network error!');
            done();
        });
    });

    it('includes service errors in the callback', function (done) {
        textbelt.request.post = function (options, handler) {
            handler(null, null, JSON.stringify({ success: false, message: 'limit hit!' }));
        };

        textbelt('1231231234', 'hi', function (err) {
            expect(err).to.be.an(Error);
            expect(err.message).to.be('limit hit!');
            done();
        });
    });

    it('includes the response in the callback is everything goes well', function (done) {
        textbelt.request.post = function (options, handler) {
            handler(null, { hi: true }, JSON.stringify({ success: true }));
        };

        textbelt('1231231234', 'hi', function (err, res) {
            expect(err).to.not.be.an(Error);
            expect(res).to.be.an(Object);
            expect(res.hi).to.be(true);
            done();
        });
    });
});

'use strict';

const express = require('express');
const app = express();

const expressSession = require('express-session'); // By default, without adding some type of session storage such as session-file-store, session data will be held in memory and will be erased whenever server restarts. 
const sessionFileStore = require('session-file-store'); // disk-based storage. Could alternatively use MySQL, Redis, Mongo, or other storage medium.
const fileStore = sessionFileStore(expressSession);

app.use(expressSession({
    resave: false,
    saveUninitialized: true,
    secret: 'topsecret',
    store: new fileStore(),
    name: 'my.connect.sid', // optional property to provide a custom name for the session cookie (default value is 'connect.sid')
}));

app.get('/test', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    let sess = req.session;
    console.log(sess);
    if (!sess.visitCount && sess.visitCount != 0) {
        sess.visitCount = 0;
        res.send(`<html><body><h2>Hello. It looks like this is your first visit.</h2></body></html>`);
    } else {
        sess.visitCount++;
        res.send(`<html><body><h2>Hello. It looks like you have visited us ${req.session.visitCount} times.</h2></body></html>`);
    }
});

app.listen(3005);
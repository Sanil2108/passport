const express = require('express');

const passport = require('passport');
// All strategies
const localStrategy = require('passport-local')
const { BasicStrategy } = require('passport-http')


const app = express();
app.use(require('body-parser').json());
app.use(require('cookie-parser')());
app.use(passport.initialize());
app.use(passport.session());


passport.use(new BasicStrategy(
    (username, password, done) => {
        console.log(username, password, done);
        if (username !== 'sanil' || password !== 'root') {
            return done('You are not authorized to view this', false);
        }

        return done(null, { userName: 'sanil' })
    }
))



// const basicAuthenticationCallback = 
// const localAuthenticationCallback = 




app.get('/protected', passport.authenticate('basic', { session: false }), (req, res) => {
    console.log(req.user);

    res.end('You are authenticated and authorized to view this content')
})

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Hello world</h1>');
});

app.listen(3000, () => {
    console.log("Listening");
});

const router = require('express').Router();
const passport= require('passport');
const connection = require('../config/database');
const User = connection.models.User;
const genPassword = require('../lib/passwordUtils').genPassword;
const isAuth = require('./authMiddleware').isAuth;



router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: 'login-success' }));

router.post('/register', (req, res, next) => {
    const saltHash = genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        ccnumber: req.body.ccnumber,
        money: 4000,
        hash: hash,
        salt: salt,
    });

    newUser.save()
        .then((user) => {
            console.log(user);
        });

    res.send(`user ${req.body.username} created`);
 });


router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});



router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('You made it to the route.');
});

router.get('/getUserinfo', isAuth, (req, res, next) => {
    res.send(req.user);
});


router.get('/logout', (req, res, next) => {
    req.logout();
    res.send('logged out')
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

module.exports = router;
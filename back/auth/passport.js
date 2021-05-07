const passport = require('passport');
//     LocalStrategy = require('passport-local').Strategy,
//     User = require('../models/Schema').User,
//     nanoid = require('nanoid');
 
// passport.serializeUser( (user, cb) => {
//     cb(null, user);
// });
 
// passport.deserializeUser( (obj, cb) => {
//     cb(null, obj);
// });
 
// // Passport strategy for handling user registration
// passport.use('localRegister', new LocalStrategy({
//         usernameField: 'username',
//         passwordField: 'password',
//         passReqToCallback: true
//     },
//     (req, password, done) => {
//         User.findOne({$or: [{username: req.body.username}]},  (err, user) => {
//             if (err)
//                 return done(err);
//             if (user) {
//                 if (user.username === req.body.username) {
//                     req.flash('username', 'Username is already taken');
//                 }
 
//                 return done(null, false);
//             } else {
//                 let user = new User();
//                 user.password = user.generateHash(password);
//                 user.username = req.body.username;
//                 user.stream_key = nanoid.generate();
//                 user.save( (err) => {
//                     if (err)
//                         throw err;
//                     return done(null, user);
//                 });
//             }
//         });
//     }));
 
// // Passport strategy for authenticating users
// passport.use('localLogin', new LocalStrategy({
//         usernameField: 'username',
//         passwordField: 'password',
//         passReqToCallback: true
//     },
//     (req, username, password, done) => {
 
//         User.findOne({'username': username}, (err, user) => {
//             if (err)
//                 return done(err);
 
//             if (!user)
//                 return done(null, false, req.flash('username', 'Username doesn\'t exist.'));
 
//             if (!user.validPassword(password))
//                 return done(null, false, req.flash('password', 'Oops! Wrong password.'));
 
//             return done(null, user);
//         });
//     }));
 
 
module.exports = passport;
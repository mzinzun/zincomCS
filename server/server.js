// configure express
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const port = 8000;

// configure Express
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors(
    {origin: 'http://localhost:3000',
     credentials: true
}));

app.use(session({
    secret: "secret line",
    resave: false,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

// configure MySQL connection
const mysql = require('mysql2');
const db = require('./connection/sqlStartup');

// Configure Passport
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('executing LocalStrategy');
        db.query (
            "SELECT * FROM `employees` where `username` = ?",[username], function(err,users) {
                const user = users[0];
                if (!err) {
                    if (users.length === 0) {
                       const message= {message: 'no username exists'};
                        return done(null, false,message);
                    }
                    if (users.length > 0) {
                        const message= {message: 'no username exists'};
                        (user.password === password)?done(null, user):done(null,false,message);
                    }
                } else {
                    console.log('there was an error at LocalStrategy: ',err)
                };
        })
    }
));
passport.serializeUser(function(user,done){
    done(null,user.emp_id)
});
passport.deserializeUser(function(user,done){
    db.query (
        "SELECT * FROM `employees` where `emp_id` = ?",[user], function(err,users) {
            const user = users[0];
            done(null,user)
    });
});


app.get('/test', function(req,res) {
    res.send('test');
});
app.get('/failed', (req,res)=>{
    console.log('============== req info is  ==========================', req.user)
    res.json({noGood: true});
});
app.get('/logout', function(req,res){
    req.logout();
    res.json({goHome: true});
});
function isLoggedIn(req,res,done){
    if (req.user) {
        return done();
    } else {
        res.json({noUser: true})
    }
}
app.get('/profile', isLoggedIn, (req,res) =>{
    const user = {...req.user}
    // remove password for user info sent to the browser
    delete user.password;
    console.log('============================ req info is  ==========================', req.user);
    res.json(user);
});

app.post('/login',  passport.authenticate('local', {failureRedirect: `/failed`}), function(req,res) {
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++successful sign in');
    const user = {...req.user}
    // remove password for user info sent to the browser
    delete user.password;
    res.json(user)
// app.get('/portal/:username', function(req,res){

// })  ;



    // const password = "admin1";
    // db.query (
    //     "SELECT * FROM `employees` where `username` = ?",[req.body.username], function(err,user) {
    //         console.log('user: ',user)
    //         console.log('user length ',user.length)
    //         if (!err) {
    //             if (user.length == 0) {
    //                 res.json({ message: "User does not exist"});
    //             }
    //             if (user.length > 0) {
    //                 res.json(user[0]);
    //             }
    //         };
    // })
});




//  check for existing data for initial startUp-
// const startUpData = require('./data/startData')
// startUpData();

// configure endpoint Routes
const routes = require('./routes/routes');
routes(app);

// execute Server listener
app.listen(port, console.log(`Zincom Server now running on port ${port}`))

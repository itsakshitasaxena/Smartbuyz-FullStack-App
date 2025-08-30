const express=require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

//to show form of user
router.get('/register',(req,res)=>{
    res.render('auth/signup', { hideNavbar: true });
})

// to actualy want to register a user in my DB
router.post('/register',async (req,res)=>{
    try{
        let {email, password, username, role} = req.body;
        const user=new User({email,username,role});
        const newUser=await User.register(user, password );
        req.login(newUser, function(err){
            if(err){return next(err)}
            req.flash('success', 'Welcome, you are registered successfully!');
            return res.redirect('/products');
        })
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('/register');
        // res.status(500).render('error', {err:e.message});
    }
})

//to get login form
router.get('/login',(req,res)=>{
    res.render('auth/login', { hideNavbar: true });
})

//to actually login via the db
router.post('/login', 
    passport.authenticate('local',{ 
    failureRedirect:'/login',
    failureMessage:true
    }),
    (req,res)=>{
        //console.log('req.user', 'ak');
        let {email, password, username, role} = req.body;
        req.flash('success',`Welcome ${username}!`);
        res.redirect('/products');
})

//logout
router.get('/logout',(req,res)=>{
    ()=>{
        req.logout();
    }
    req.flash('success', 'Goodbye, See you again!')
    res.redirect('/login');
})

module.exports=router;
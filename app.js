if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}

const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const seedDB=require('./seed');
const ejsmate=require('ejs-mate');
const methodOverride=require('method-override');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/User');
const MongoStore = require('connect-mongo');

mongoose.set('strictQuery',true);

const dbURL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/Smartbuyz';
mongoose.connect(dbURL)
.then(()=>{
    console.log("DB connected successfully")
})
.catch((err)=>{
    // console.log("DB error"); 
    console.log("MongoDB connection error:", err)
})


app.engine('ejs', ejsmate); //to use ejsmate as our engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //views folder 
app.use(express.static(path.join(__dirname, 'public'))); //public folder
app.use(express.urlencoded({extended:true})); //to parse the body of the request
app.use(methodOverride('_method')); //to use put and delete methods


let secret=process.env.SECRET || 'weneedbettersecretkey';
let store=MongoStore.create({
    secret: secret,
    mongoUrl:dbURL,
    touchAfter:24*60*60
})


app.use(session({
    store:store,
    name:'Amazing',
    secret:secret,
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires: Date.now()+7*24*60*60*1000,
        maxAge:24*7*60*60*1000
    }
}))
app.use(flash());


// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//PASSPORT middleware
passport.use(new LocalStrategy(User.authenticate()));


app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})

//seeding the database
// seedDB();


//requiring routes
const productRoutes =require('./routes/product');
const reviewRoutes =require('./routes/review');
const authRoutes =require('./routes/auth');
const cartRoutes =require('./routes/cart');
const productApi = require('./routes/api/productapi');
const paymentRoutes = require('./routes/payment');

app.get('/', (req,res)=>{
    res.render('home');
})

app.use(productRoutes); //so that we can cehck path for every incoming request
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productApi);
app.use(paymentRoutes);
app.use((req, res, next) => {
    res.locals.hideNavbar = false;
    next();
});

const port = 8080;

app.listen(port, () => {
    console.log(`server running at port ${port}`);
});



const express=require('express');
const Product=require('../models/Product'); //to fetch data from products.js
const Review = require('../models/Review');
const router=express.Router(); //mini instance of app 
const {validateProduct, isLoggedIn, isSeller, isProductAuthor }=require('../middleware');


router.get('/', (req, res) => {
    res.render('home');  // views/home.ejs
});

//to show all products
router.get('/products',isLoggedIn,async(req,res)=>{
    try{
        let products=await Product.find({}); //find-mongoose method they return a promise-that takes time to resolve reject so we use async await in callback function
        res.render('products/index',{products});
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

//to show form for new product
router.get('/products/new',isLoggedIn,(req,res)=>{
    try{
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})
 
//to actually add product
router.post('/products', validateProduct, isLoggedIn, isSeller,async(req,res)=>{
    try{
        let {name, img, price, desc}=req.body;
        await Product.create({name, img, price, desc, author:req.user._id}); //promise is returned so await async
        req.flash('success','Product added successfully');
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

//to show  a particular product
router.get('/products/:id', isLoggedIn, async (req,res)=>{
    try{
        let {id} =req.params;
        let foundProduct=await Product.findById(id).populate('reviews');
        //populate method is used to get all reviews of a particular product using product id
        res.render('products/show', {foundProduct, msg:req.flash('msg')});
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

//to edit a particular product
router.get('/products/:id/edit', isLoggedIn, async(req,res)=>{
    try{
        let {id} =req.params;
        let foundProduct=await Product.findById(id); 
        res.render('products/edit', {foundProduct});
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

//to actually edit data in db
router.patch('/products/:id', validateProduct, isLoggedIn,async(req,res)=>{
    try{
        let {id}=req.params;
        let {name, img, price, desc}=req.body;
        await Product.findByIdAndUpdate(id, {name, img, price, desc} );
        req.flash('success','Product edited successfully');
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

//to delete a particular product
router.delete('/products/:id',isLoggedIn, isProductAuthor, async (req,res)=>{
    try{
        let {id}=req.params;
        const product=await Product.findById(id);
          await product.save();
        await Product.findByIdAndDelete(id);
        req.flash('success','Product deleted successfully');
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error', { err:e.message });
    }
})

module.exports=router;
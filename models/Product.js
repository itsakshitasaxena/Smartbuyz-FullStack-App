
const mongoose =require('mongoose');
const Review = require('./Review');
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        min:0,
        default:0,
        required:true //mandatory
    },
    desc:{
        type:String,
        trim:true
    },
    img:{
        type:String,
        trim:true,
        default:'/images/product.jpg'
    },
    avgRating: {
        type: Number,
        default:0 
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
})

//middleware that uses mongodb opeerations behind the sscene 
// has pre and post middleware inside it that are basically 
// used over the schema and before the model is js class


productSchema.post('findOneAndDelete', async function(product){
    if(product.reviews.length>0){
        await Review.deleteMany({_id:{$in:product.reviews}});
    }
})

let Product=mongoose.model('Product',productSchema);
module.exports=Product;



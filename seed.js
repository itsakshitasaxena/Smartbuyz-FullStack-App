
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products=[
   {
    name:'Iphone 14pro',
    price:80000,
    desc:'This is the latest model of Iphone',
    img:"https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGlwaG9uZTE0cHJvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
   },
   {
    name:'Iwatch',
    price:75000,
    desc:'This is the latest model of Iwatch',
    img:"https://media.istockphoto.com/id/1289219294/photo/black-smart-watch-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=-cH-ZNjtM6iQJCz3N75B2QPUNsV7OwpO9BV-F3tSKN8="
   },
   {
    name:'Mac2Book Pro',
    price:245800,
    desc:'This is the latest model of OnePlus',
    img:"https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fE1hYzJCb29rJTIwUHJvfGVufDB8fDB8fHww"
   },
   {
    name:'Google Pixel 7',
    price:237900,
    desc:'This is the latest model of Google Pixel',
    img:"https://images.unsplash.com/photo-1492557647460-3f7ba92706e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R29vZ2xlJTIwUGl4ZWwlMjA3JTIwcGhvbmV8ZW58MHx8MHx8fDA%3D"
   },
   {
    name:'OnePlus 11',
    price:450000,
    desc:'This is the latest model of OnePlus',
    img:"https://www.bing.com/th/id/OIP.EmIWR9UD0xYyng1TaXN1RwHaNK?w=160&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
   },
   {
    name:'Sony Xperia 1 IV',
    price:60000,
    desc:'This is the latest model of Sony Xperia',
    img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c29ueXxlbnwwfHwwfHx8MA%3D%3D"
   }
]


async function seedDB(){
    //await Product.deleteMany({}); //to delete all existing products
    await Product.insertMany(products); 
    console.log('DB seeded successfully');
    
}

module.exports=seedDB;


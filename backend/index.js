const express=require("express");
const port=4000;
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const cors=require("cors");
const Product = require("./models/productModel");
const User = require("./models/userModel");

app.use(express.json());
app.use(cors());


const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //   cb(null, 'upload/images'); 
    // },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    // if (!req.file) {
    //   return res.status(400).json({ success: 0, message: 'No file uploaded' });
    // }
  
    // console.log("File uploaded successfully:", req.file);
  
    res.json({
      success: 1,
      image_url: `http://localhost:${port}/images/${req.file.filename}`,
    });
});

app.post('/addproduct',async(req,res)=>{
    const products=await Product.find({})
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1)
        let last_product=last_product_array[0]
        id=last_product.id+1
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name: req.body.name,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        image:req.body.image
    });
    console.log(product)
    await product.save()
    console.log("product saved")
    res.json({
        success:true,
        name:req.body.name,
    })
})

app.post('/removeproduct',async(req,res)=>{
    const removedproduct = await Product.findOneAndDelete({ id: req.body.id });
    console.log(removedproduct.name)
    console.log("product removed successfully")
    res.json({success:true})
})

app.get('/allproducts',async(req,res)=>{
    const products=await Product.find({})
    console.log("all products fetched")
    res.send(products)
})

app.get('/newcollection',async(req,res)=>{
  const products=await Product.find({})
  const new_collection=products.slice(1).slice(-8)
  res.send(new_collection)
})

app.get('/popularwomen', async (req, res) => {
    const populars = await Product.find({ category: "women" });
    const popular_in_women = populars.slice(0, 4);
    res.send(popular_in_women);
});

// mongoose.connect("mongodb://localhost:27017/ecommerce")
//     .then(() => console.log("MongoDB connected"))
//     .catch((err) => console.log("Error connecting to MongoDB", err));
    
    


// //port connection 
// app.listen(port,(error)=>{
//     if(!error){
//    console.log("server is running on port"+port)
//     }
//     else{
//      console.log('error:'+error)
//     }
// })
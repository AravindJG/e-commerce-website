const express=require("express");
const port=4000;
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const dotenv = require("dotenv");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const cors=require("cors");
const Product = require("./models/productModel");
const User = require("./models/userModel");

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/images'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }
  
    console.log("File uploaded successfully:", req.file);
  
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

app.get('/newcollections',async(req,res)=>{
  const products=await Product.find({})
  const new_collection=products.slice(1).slice(-8)
  res.send(new_collection)
})

app.get('/popularwomen', async (req, res) => {
    const populars = await Product.find({ category: "women" });
    const popular_in_women = populars.slice(0, 4);
    res.send(popular_in_women);
});

//for register 
app.post('/signup',async(req,res)=>{
    const check= await User.findOne({email:req.body.email})
    if(check){
      return res.status(400).json({success:false,errors:"existing user found with same email address"})
    }
    let cart={}
    for (let i = 0; i < 300; i++) {
         cart[i]=0;
    }
    const user=new User({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
      cartData:cart
    })
       
    await user.save()
     //token
    const data={
        user:{
            id:user.id
        }
    }
     const token=jwt.sign(data,'secret_ecom')
     res.json({success:true,token})
})
  
  //login
app.post('/login',async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(user){
      const passCompare = req.body.password === user.password
      if(passCompare){
        const data={
          user:{
            id:user.id
          }
        }
        const token=jwt.sign(data,'secret_ecom')
        res.json({success:true,token})
      }
      else{
        res.json({success:false,error:"Wrong Password"})
      }
    }
    else{
      res.json({success:false,error:"Invalid User"})
    }
})
  
const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(401).send({ errors: "Please authenticate using a valid token." });
    }
  
    try {
      const data = jwt.verify(token, 'secret_ecom');
      req.user = data.user;
      next();
    } catch (error) {
      return res.status(401).send({ errors: "Invalid token, please authenticate again." });
    }
};
  
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
      const userData = await User.findOne({ _id: req.user.id }); 
  
      const itemId = req.body.itemId;
  
      userData.cartData[itemId] += 1;
      await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  
      // res.send("Item added to cart successfully.");
      res.json({ message: 'Item added to cart successfully.', cartData: userData.cartData });
    } catch (error) {
      console.error(error);
      res.status(500).send({ errors: 'Internal server error, try again later.' });
    }
});
  
  //remove item from a cart 
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
      const userData = await User.findOne({ _id: req.user.id }); 
  
      const itemId = req.body.itemId;
      if(userData.cartData[itemId] > 0)
        userData.cartData[itemId] -= 1;
      await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
      // res.send("Item removed from the cart successfully.")
      // Return success response with updated cart
      res.json({ message: 'Item removed from the cart successfully.', cartData: userData.cartData });
    } catch (error) {
      // Handle unexpected errors
      console.error(error);
      res.status(500).send({ errors: 'Internal server error, try again later.' });
    }
});
  
  
  //creating endpoint to get cartData
app.get('/getcart',fetchUser,async(req,res)=>{
    const userData=await User.findOne({_id:req.user.id})
    res.json(userData.cartData)
})

mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Error connecting to MongoDB", err));
    
    


// //port connection 
app.listen(port,(error)=>{
    if(!error){
   console.log("Server is running on port:"+port)
    }
    else{
     console.log('error:'+error)
    }
})
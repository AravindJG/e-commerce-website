import React, { createContext, useEffect, useState } from "react"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const ShopContext = createContext();

function ShopContextProvider(props) {
    const [products, setProducts] = useState([]);
    const [cartItems,setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setProducts(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'GET',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    },[])
    // useEffect(()=>{
    //     async function getProducts(){
    //         try{
    //             let response = await axios.get('http://localhost:5000/');
    //             response = response.data;
    //             setProducts(response);
    //             toast.success("Server connection successful");
    //         }catch(error){
    //             toast.error(error.message);
    //             console.log(error);
    //         }
    //     }
    //     getProducts();
    // },[]);

    // useEffect(()=>{
    //     setCartItems(getDefaultCart());
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[products]);

    function getDefaultCart(){
        let cart = {};
        for (let index = 0; index < 300+1; index++) {
            cart[index] = 0;
        }
        return cart;
    }

    function addToCart(itemId){
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    function removeFromCart(itemId){
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    function getTotalCartAmount() {
        let totalAmount = 0;
        for(const item in cartItems) {
            if(cartItems[item] > 0) {
                let itemInfo = products.find((product)=>product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount;
    }
    function getTotalCartItems() {
        let totalItems = 0;
        for(const item in cartItems) {
            if(cartItems[item] > 0){
                totalItems += cartItems[item]
            }
        }
        return totalItems;
    }
    const contextValue = {products,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
            <ToastContainer />
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
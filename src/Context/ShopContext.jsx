import React, { createContext, useEffect, useState } from "react"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const ShopContext = createContext();

function ShopContextProvider(props) {
    const [products, setProducts] = useState([]);
    const [cartItems,setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        async function getProducts(){
            try{
                let response = await axios.get('http://localhost:5000/');
                response = response.data;
                setProducts(response);
                toast.success("Server connection successful");
            }catch(error){
                toast.error(error.message);
                console.log(error);
            }
        }
        getProducts();
    },[]);

    useEffect(()=>{
        setCartItems(getDefaultCart());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[products]);

    function getDefaultCart(){
        let cart = {};
        for (let index = 0; index < products.length+1; index++) {
            cart[index] = 0;
        }
        return cart;
    }

    function addToCart(itemId){
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}));
    }

    function removeFromCart(itemId){
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}));
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
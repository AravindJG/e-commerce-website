import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'
import { toast } from 'react-toastify';
import axios from 'axios';


function Popular() {
  const [popularProducts,setPopularProducts] = useState([]);
  useEffect(()=>{
    fetch('http:localhost:4000/popularwomen')
    .then((reponse)=>reponse.json())
    .then((data)=>setPopularProducts(data))
  },[])
  // useEffect(()=>{
  //   async function getPopularProducts(){
  //     try{
  //       var response = await axios.get("http://localhost:5000/popular");
  //       response = response.data;
  //       setPopularProducts(response);
  //     }catch(error){
  //       toast.error(error.message);
  //       console.log(error);
  //     } 
  //   }
  //   getPopularProducts();
  // },[]);

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
            {popularProducts.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default Popular
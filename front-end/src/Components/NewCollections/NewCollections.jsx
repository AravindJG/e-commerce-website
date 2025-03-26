import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import { toast } from 'react-toastify';
import axios from 'axios';

function NewCollections() {
  const [collections, setCollections] = useState([]);

  useEffect(()=>{
    async function getCollections(){
      try{
        var response = await axios.get("http://localhost:5000/collections");
        response = response.data;
        setCollections(response);
      }catch(error){
        toast.error(error.message);
        console.log(error);
      }
    }
    getCollections();
  },[]);

  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {collections.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default NewCollections
import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

function AddProduct() {
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'women',
        new_price: '',
        old_price: '',
    });

    const [image, setImage] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    // Handle image file changes
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const addProduct = async () => {
        let responsedata;
        let product = productDetails;
        let formdata = new FormData();
        formdata.append('product', image);

        await fetch("http://localhost:4000/upload", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formdata
        }).then((response) => response.json()).then((data) => {
            responsedata = data;
            console.log(responsedata);
            if (responsedata.success) {
                product.image = responsedata.image_url;

                fetch("http://localhost:4000/addproduct", {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                }).then((response) => response.json()).then((data) => {
                    data.success ? alert("Product added successfully") : alert("Failed to add product")
                }).catch((error) => {
                    console.error("Error adding product:", error);
                });
            }
        }).catch((error) => {
            console.error("Error uploading image:", error);
        });
    };
    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input type="text" placeholder="type here" name="name" value={productDetails.name} onChange={handleChange} />
            </div>

            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input type="text" placeholder="type here" name="old_price" value={productDetails.old_price} onChange={handleChange} />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input type="text" placeholder="type here" name="new_price" value={productDetails.new_price} onChange={handleChange} />
                </div>
            </div>

            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select className="addproduct-selector" name="category" value={productDetails.category} onChange={handleChange} >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>

            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className="addproduct-thumnail-img" alt="Upload" />
                </label>
                <input onChange={imageHandler} type="file" id="file-input" hidden />
            </div>
            <button onClick={addProduct} className="addproduct-btn"> ADD </button>
        </div>
    )
}

export default AddProduct
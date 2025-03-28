import React from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

function ListProduct() {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })
    await fetchInfo();
  };
  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>category</p>
        <p>remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {allproducts.map((product, index) => {
          return (
            <>
              <div key={index} className='listproduct-format-main listproduct-format'>
                <img src={product.image} className='listproduct-product-icon' />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img src={cross_icon} onClick={() => removeProduct(product.id)} className='listproduct-remove-icon' alt="" />
              </div>
              <hr/>
            </>
          );
        })}
      </div>
    </div>
  )
}

export default ListProduct
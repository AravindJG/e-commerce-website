import React from 'react'
import './DescriptionBox.css'

function DescriptionBox() {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>An ecommerce website is your digital storefront on the 
                internet. It facilitates the transaction between a buyer 
                and seller. It is the virtual space where you showcase 
                products, and online customers make selections. Your website
                acts as the product shelves, sales staff, and cash register of 
                your online business channel.</p>
                <p>
                An ecommerce business is a company that generates revenue from 
                selling products or services online. For example, an ecommerce company 
                might sell software, apparel, housewares, or web design services. You 
                can run an ecommerce business from a single website or through multiple 
                online channels like social media and email.
                </p>
        </div>
    </div>
  )
}

export default DescriptionBox
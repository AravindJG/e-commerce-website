import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

function Navbar() {
  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} =  useContext(ShopContext);
  return (
    <div>
      <div className='navbar'>
        <div className='nav-logo'>
          <img src={logo} alt='app logo' />
          <p>SHOPPER</p>
        </div>
        <div className='nav-menu'>
          <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : null}</li>
          <li onClick={() => { setMenu("men") }}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/mens'>Men</Link> {menu === "men" ? <hr /> : null}</li>
          <li onClick={() => { setMenu("women") }}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/womens'>Women</Link> {menu === "women" ? <hr /> : null}</li>
          <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/kids'>Kid</Link> {menu === "kids" ? <hr /> : null}</li>
        </div>
        <div className='nav-login-cart'>
          <Link to='/login'><button>Login</button></Link>
          <Link to='/cart'><img src={cart_icon} alt='Cart icon' /></Link>
          <div className='nav-cart-count'>{getTotalCartItems()}</div>
        </div>
      </div>
      <div style={{ height: '97px'}}></div>
    </div>
  )
}

export default Navbar
import React, { useContext, useState, useRef } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import nav_dropdown from '../Assets/nav_dropdown.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

function Navbar() {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const dropRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    dropRef.current.classList.toggle('open');
  }
  return (
    <div className='navbar-fixed'>
      <div className='navbar'>
        <div className='nav-logo'>
          <img src={logo} alt='app logo' />
          <p>SHOPPER</p>
        </div>
        <img ref={dropRef} className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className='nav-menu'>
          <li onClick={() => { setMenu("shop"); dropdown_toggle();}}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : null}</li>
          <li onClick={() => { setMenu("men"); dropdown_toggle();}}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/mens'>Men</Link> {menu === "men" ? <hr /> : null}</li>
          <li onClick={() => { setMenu("women");dropdown_toggle(); }}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/womens'>Women</Link> {menu === "women" ? <hr /> : null}</li>
          <li onClick={() => { setMenu("kids"); dropdown_toggle();}}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/kids'>Kid</Link> {menu === "kids" ? <hr /> : null}</li>
        </ul>
        <div className='nav-login-cart'>
          <Link to='/login'><button >Login</button></Link>
          <Link to='/cart'><img src={cart_icon} alt='Cart icon' /></Link>
          <div className='nav-cart-count'>{getTotalCartItems()}</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
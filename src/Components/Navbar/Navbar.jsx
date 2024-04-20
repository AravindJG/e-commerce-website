import React, { useContext , useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

function Navbar() {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [mobileMenu, setMobileMenu] = useState(false);

  function toggleMenu(){
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
  }

  return (
    <div className='navbar-fixed'>
      <div className='navbar'>
        <div className='nav-logo'>
          <img src={logo} alt='app logo' /> 
          <p>SHOPPER</p>
        </div>
        <div className={mobileMenu ? "hamburgur-icon icon-move":"hamburgur-icon"} onClick={toggleMenu}>{mobileMenu ? <i className="fa-solid fa-arrow-left"></i> : <i className="fa-solid fa-bars"></i>}</div>
        <div className = {mobileMenu ?  'mobile-menu': 'mobile-menu hide-mobile-menu' }>
          <div className='nav-menu'>
            <li onClick={() => { setMenu("shop");setMobileMenu(false);}}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : null}</li>
            <li onClick={() => { setMenu("men");setMobileMenu(false); }}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/mens'>Men</Link> {menu === "men" ? <hr /> : null}</li>
            <li onClick={() => { setMenu("women");setMobileMenu(false); }}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/womens'>Women</Link> {menu === "women" ? <hr /> : null}</li>
            <li onClick={() => { setMenu("kids");setMobileMenu(false); }}><Link style={{ textDecoration: 'none', color: '#626262' }} to='/kids'>Kid</Link> {menu === "kids" ? <hr /> : null}</li>
          </div>
          <div className='nav-login-cart'>
            <Link to='/login'><button onClick={() => setMobileMenu(false)}>Login</button></Link>
            <Link to='/cart'><img onClick={() => setMobileMenu(false)} src={cart_icon} alt='Cart icon' /></Link>
            <div className='nav-cart-count'>{getTotalCartItems()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
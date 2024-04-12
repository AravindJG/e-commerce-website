import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginPage from './Pages/LoginPage';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory/>} catagory="men"/>
        <Route path='/womens' element={<ShopCategory/>} catagory="women"/>
        <Route path='/kids' element={<ShopCategory/>} catagory="kid"/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
      <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;

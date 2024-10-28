import React,{useState} from 'react'
import Header from './components/Header';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Homepage from './components/Homepage';

const App = () => {
  const [iscartOpen,setiscartOpen]=useState(false);
  const [cartItems,setCartItems]=useState([]);

  return (
    <div>
      <Header setiscartOpen={setiscartOpen} cartItemlength={cartItems?.length}/>
      <div className=' max-w-[1200px] mx-auto'>
      { iscartOpen ? <Cart cartItems={cartItems} setCartItems={setCartItems} />:<Homepage cartItems={cartItems} setCartItems={setCartItems}/>}
      </div>
    
      
      <Footer/>
      {/* <Homepage/> */}
    </div>
  )
}

export default App
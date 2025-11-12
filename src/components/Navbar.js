import {Link, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import "./Navbar.css";

function Navbar({ 
    searchValue, 
    setSearchValue,
    category,
    setCategory,
    categories =['All'],

  }) {
    const {cartItems} = useContext(CartContext)
    const {user, logout} = useContext(AuthContext)
    const navigate = useNavigate();


    const itemCount = cartItems.reduce((total, item ) => total + item.quantity, 0)

     console.log("Navbar props:", { searchValue, setSearchValue });
     console.log("Navbar rendered ✅");

    const handleLogout = () => {
        logout();
        navigate("/login");
    }


    return (
        <nav className='navbar'>
            <div className="nav-left">
              <h2 className="logo">ShopEase</h2>
            </div>

            <div className='nav-center'>
              <input 
                type='text'
                placeholder='search'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} // ✅ this must stay
              />
            </div>

            <select
              className="category-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
                {categories.map(cat => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <div className='nav-links'>
                <Link to="/" >Home</Link>
                <Link to="/cart" >Cart <span className='cart-count' > {itemCount} </span> </Link>
                {user ? (
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                   ) : (
                   <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
         
    );
   
}

export default Navbar
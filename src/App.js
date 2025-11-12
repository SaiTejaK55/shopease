import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import Checkout from './components/CheckOut';
import Login from './components/Login';
import { CartProvider } from './context/CartContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import './App.css';
import { useContext } from 'react';

function ProtectedRoute({children}) {
  const {user} = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  return (
    <AuthProvider>
     <CartProvider>
      <Router>
        <Navbar 
          searchValue={searchValue} 
          setSearchValue={setSearchValue} 
          category={category}
          setCategory={setCategory}
          categories={categories}
        />
        <Routes>
          <Route 
            path="/" 
            element={
              <ProductList 
                searchValue={searchValue} 
                category={category}
                setCategories={setCategories}
              />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<ProtectedRoute> <Cart /> </ProtectedRoute>} />
          <Route path="/checkout" element={  <ProtectedRoute> <Checkout /> </ProtectedRoute>} />
        </Routes>
      </Router>
     </CartProvider>
    </AuthProvider>
  );
}

export default App;

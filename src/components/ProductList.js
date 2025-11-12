import React, {useState, useEffect, useContext} from "react";
import { CartContext } from "../context/CartContext";
import './ProductList.css';

function ProductList({searchValue = '', category = 'All', setCategories}) {
    const {addToCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    
    
    useEffect(() => {
        let mounted = true
        fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then(data => {
        if (!mounted) return
        setProducts(data)
        // get unique categories from fetched data
        const uniqueCats = Array.from(new Set(data.map(p => p.category)))
        setCategories(['All', ...uniqueCats])
      })
      .catch(err => {
        console.error('fetch error', err)
        alert('Failed to fetch products')
      })
      .finally(() => mounted && setLoading(false))

       return () => {
       mounted = false
      }
    }, [setCategories]);

    const q = String(searchValue ?? '').toLowerCase().trim()

  const filteredProducts = products.filter(p => {
    const matchesCategory = category === 'All' || p.category === category
    const matchesSearch = p.title.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  if (loading) return <p style={{ padding: 20 }}>Loading products...</p>
  if (filteredProducts.length === 0) return <p style={{ padding: 20 }}>No products found</p>


    return (
        <div className="products-container">
            {filteredProducts.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="add-btn"
            >
              Add To Cart
            </button>
          </div>
        ))
      )}
        </div>
    )
}

export default ProductList
// ProductsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state
        const response = await axios.get('https://api.example.com/products');
        setProducts(response.data);
      } catch (error) {
        setError(error); // Set error state
      } finally {
        setIsLoading(false); // Set loading state
      }
    };

    fetchData();
  }, []); // Fetch data only once on mount

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {/* ... Display product information */}
        </li>
      ))}
    </ul>
  );
}

export default ProductsPage;

// ProductDetailsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import for useParams

function ProductDetailsPage() {
  const { productId } = useParams(); // Get product ID from URL parameter
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://api.example.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // Fetch when productId changes

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching product: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      {/* ... Display product details and image */}
    </div>
  );
}

export default ProductDetailsPage;
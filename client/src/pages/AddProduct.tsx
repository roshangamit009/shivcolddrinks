import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

interface Product {
  _id?: string;
  name: string;
  price: number;
  category: string;
}

const AddProduct = () => {
  const [form, setForm] = useState<Product>({ name: '', price: 0, category: '' });
  const [products, setProducts] = useState<Product[]>([]);

  const backendURL = 'http://localhost:5000/api/products';

  const fetchProducts = async () => {
    try {
      const res = await axios.get<Product[]>(backendURL);
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(backendURL, form);
      setForm({ name: '', price: 0, category: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '12px' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
          Add Product
        </button>
      </form>

      <h2 style={{ marginTop: '2rem' }}>📦 Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ₹{product.price} ({product.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddProduct;

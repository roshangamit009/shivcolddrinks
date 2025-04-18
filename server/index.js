import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Replace with your actual MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://22bca45:92827262@cluster0.xifci.mongodb.net/shivdb?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

app.use(cors());
app.use(express.json());

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String
});
const Product = mongoose.model('Product', productSchema);

// Add Product Route
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product saved', product });
  } catch (err) {
    res.status(500).json({ message: 'Error saving product', error: err });
  }
});

app.post('/api/products', async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json({ message: 'Product saved', product });
    } catch (err) {
      res.status(500).json({ message: 'Error saving product', error: err });
    }
  });
  

// Get All Products
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

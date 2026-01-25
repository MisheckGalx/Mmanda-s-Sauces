const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Mmanda\'s Sauces API is running!',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders'
    }
  });
});

// Database connection & sync
sequelize.sync({ alter: true })
  .then(() => console.log('✅ Connected to SQLite Database'))
  .catch(err => console.log('❌ Database error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

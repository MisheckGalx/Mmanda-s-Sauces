const { sequelize } = require('./config/database');
const Product = require('./models/Product');

const seedProducts = async () => {
  try {
    // Connect to database
    await sequelize.sync({ force: true }); // This will reset the database
    console.log('✅ Database synced');

    // Create products
    const products = await Product.bulkCreate([
      {
        name: 'Plain Hot',
        price: 35,
        description: 'Pure, unadulterated heat. Our signature sauce with authentic African peppers.',
        image: '🌶️',
        category: 'Classic',
        stock: 25,
        rating: 4.8,
        reviews: 124,
        ingredients: "African Bird's Eye Chili, Vinegar, Garlic, Salt, Natural Spices",
        heatLevel: 4,
        size: '250ml'
      },
      {
        name: 'Creamy Hot',
        price: 35,
        description: 'Smooth and creamy with a perfect kick. Perfect for dipping.',
        image: '🔥',
        category: 'Classic',
        stock: 18,
        rating: 4.9,
        reviews: 156,
        ingredients: 'Red Chili, Cream, Garlic, Onion, Vinegar, Natural Herbs',
        heatLevel: 3,
        size: '250ml'
      },
      {
        name: 'Garlic Infusion',
        price: 40,
        description: 'Bold garlic meets fiery heat. A flavor explosion in every drop.',
        image: '🧄',
        category: 'Premium',
        stock: 15,
        rating: 4.7,
        reviews: 89,
        ingredients: 'Fresh Garlic, Red Chili, Olive Oil, Vinegar, Sea Salt, Black Pepper',
        heatLevel: 4,
        size: '250ml'
      },
      {
        name: 'Sweet & Spicy',
        price: 38,
        description: 'Honey-sweetened with a spicy finish. The perfect balance.',
        image: '🍯',
        category: 'Premium',
        stock: 20,
        rating: 4.6,
        reviews: 98,
        ingredients: 'Wild Honey, Chili Peppers, Apple Cider Vinegar, Ginger, Cinnamon',
        heatLevel: 2,
        size: '250ml'
      }
    ]);

    console.log('✅ Created', products.length, 'products');
    console.log('\n📦 Products added:');
    products.forEach(p => {
      console.log(`   ${p.image} ${p.name} - R${p.price} (Stock: ${p.stock})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts();

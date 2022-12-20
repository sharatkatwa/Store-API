const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProducts = require('./products.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('db connection successful...');
    await Product.deleteMany();
    console.log('Deleted...');
    await Product.create(jsonProducts);
    console.log('products created successful...');
  } catch (err) {
    console.log(err);
  }
};
start();

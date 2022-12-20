const express = require('express');
const Error = require('express-async-errors');
const app = express();

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');
// error handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// middlewares
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('<h1>Store API </h1><a href="/api/v1/products">Products route</a>');
});

// Product routes
app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening to port: ${port}...`));
  } catch (err) {
    console.log(err);
  }
};
start();

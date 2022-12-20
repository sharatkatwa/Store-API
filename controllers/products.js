const getAllProductsStatic = async (req, res, next) => {
  throw Error('This is test error', 404);
  res.status(200).json({ status: 'success', msg: 'Products testing route' });
};
const getAllProducts = async (req, res, next) => {
  res.status(200).json({ status: 'success', msg: 'Products route' });
};
module.exports = {
  getAllProductsStatic,
  getAllProducts,
};

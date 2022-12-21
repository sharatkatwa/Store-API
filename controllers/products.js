const Product = require('../models/product');

const getAllProductsStatic = async (req, res, next) => {
  const search = 'dining';

  const products = await Product.find({
    name: { $regex: search, $options: 'i' },
  });

  res
    .status(200)
    .json({ status: 'success', result: products.length, products });
};
const getAllProducts = async (req, res, next) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = name;
  }

  if (numericFilters) {
    const opratorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|<=|>=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${opratorMap[match]}-`
    );
    console.log(filters);

    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, oprator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [oprator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);

  // sort
  if (sort) {
    sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  // fields
  if (fields) {
    fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  // pagination filter
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  products = await result;

  res
    .status(200)
    .json({ status: 'success', result: products.length, products });
};
module.exports = {
  getAllProductsStatic,
  getAllProducts,
};

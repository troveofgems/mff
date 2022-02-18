const {asyncHandler} = require("../../../../middleware/Helpers/async-handler.middleware");
const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");
const Product = require("../../../../db/models/Product");

// @desc  Get All Products
// @route GET /api/vX/l1rAdmin/products
// @access PRIVATE/ADMIN
const getAllProducts = asyncHandler(async (req, res) => {
  let response = buildAPIBodyResponse('/l1rAdmin/products');

  response.data = await Product.find();
  response.success = true;

  return res
    .status(200)
    .json(response);
});

// @desc  Get Product By Id
// @route GET /api/vX/l1rAdmin/products/:pid
// @access PRIVATE/ADMIN
const getProductById = asyncHandler(async (req, res) => {
  let response = buildAPIBodyResponse('/l1rAdmin/products/:pid');

  console.log("pid is: ", req.body, req.params);

  response.data = await Product.findById(req.params.id);
  console.log('Data is: ', response);
  response.success = true;

  return res
    .status(200)
    .json(response);
});

// @desc  Create A Product
// @route POST /api/vX/l1rAdmin/products
// @access PRIVATE/ADMIN
const createProduct = asyncHandler(async (req, res) => {
  let response = buildAPIBodyResponse('/l1rAdmin/products');

  let productData = {...req.body, user: req.user.id}

  const product = await Product.create(productData);

  response.data = product;
  response.success = true;

  return res
    .status(200)
    .json(response);
});

// @desc  Update A Product By Id
// @route PUT /api/vX/l1rAdmin/products/:pid
// @access PRIVATE/ADMIN
const updateProductById = asyncHandler(async (req, res) => {
  let response = buildAPIBodyResponse('/l1rAdmin/products/:id');

  response.data = await Product.findByIdAndUpdate(req.params.id, req.body);
  response.success = true;

  return res
    .status(200)
    .json(response);
});

// @desc  Delete A Product By Id
// @route PUT /api/vX/l1rAdmin/products/:pid
// @access PRIVATE/ADMIN
const deleteProductById = asyncHandler(async (req, res) => {
  let response = buildAPIBodyResponse('/l1rAdmin/products/:id');

  response.data = await Product.findByIdAndDelete(req.params.id);
  response.success = true;

  return res
    .status(200)
    .json(response);
});

module.exports.adminProductController = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById
};
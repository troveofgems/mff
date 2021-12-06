// Application Routes
import generalRoutes from "./routes/general.routes";
import productRoutes from "./routes/product.routes";

const mainRouter = [
  // GENERAL ROUTES
  generalRoutes.home,
  // PRODUCT ROUTES
  productRoutes.viewProductById,
];

export default mainRouter;
// Application Routes
import generalRoutes from "./routes/general.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import usrAuthRoutes from "./routes/usrAuth.routes";

const mainRouter = [
  // GENERAL ROUTES
  generalRoutes.home,
  // USR AUTH ROUTES
  usrAuthRoutes.authenticate,
  usrAuthRoutes.userProfile,
  usrAuthRoutes.forgotPassword,
  // CART ROUTES
  cartRoutes.home,
  cartRoutes.details,
  cartRoutes.shipping,
  // PRODUCT ROUTES
  productRoutes.viewProductById,
];

export default mainRouter;
// Application Routes
import generalRoutes from "./routes/general.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import usrAuthRoutes from "./routes/usrAuth.routes";
import adminRoutes from "./routes/admin.routes";

const mainRouter = [
  // ADMIN ROUTES
  adminRoutes.order,
  adminRoutes.product,
  adminRoutes.user,
  adminRoutes.settings,
  // GENERAL ROUTES
  generalRoutes.home,
  // USR AUTH ROUTES
  usrAuthRoutes.authenticate,
  usrAuthRoutes.userProfile,
  usrAuthRoutes.forgotPassword,
  usrAuthRoutes.userOrders,
  usrAuthRoutes.userOrderInvoice,
  // CART ROUTES
  cartRoutes.home,
  cartRoutes.details,
  cartRoutes.shipping,
  cartRoutes.payment,
  cartRoutes.placeOrder,
  // PRODUCT ROUTES
  productRoutes.viewProductById,
];

export default mainRouter;
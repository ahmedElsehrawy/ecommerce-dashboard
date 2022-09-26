import { lazy } from "react";

const SettingsPage = lazy(() => import("../pages/settings"));
const EditDiscountPage = lazy(() => import("../pages/discounts/edit"));
const EditCategoryPage = lazy(() => import("../pages/categories/edit"));
const AddDiscountPage = lazy(() => import("../pages/discounts/add"));
const AddCategoryPage = lazy(() => import("../pages/categories/add"));
const DiscountsPage = lazy(() => import("../pages/discounts"));
const CategoriesPage = lazy(() => import("../pages/categories"));
const OrdersPage = lazy(() => import("../pages/orders"));
const AddProduct = lazy(() => import("../pages/products/add"));
const EditProductPage = lazy(() => import("../pages/products/edit"));
const SignUpPage = lazy(() => import("../pages/signup"));
const LoginPage = lazy(() => import("../pages/login"));
const ProductsPage = lazy(() => import("../pages/products"));

export const registerationRoutes = [
  {
    path: "/signup",
    component: SignUpPage,
  },

  {
    path: "/login",
    component: LoginPage,
  },
];

export const authenticatedRoutes = [
  {
    path: "/products",
    component: ProductsPage,
  },
  {
    path: "/products/add",
    component: AddProduct,
  },
  {
    path: "/products/:id",
    component: EditProductPage,
  },
  {
    path: "/categories",
    component: CategoriesPage,
  },
  {
    path: "/categories/add",
    component: AddCategoryPage,
  },
  {
    path: "/categories/:id",
    component: EditCategoryPage,
  },
  {
    path: "/orders",
    component: OrdersPage,
  },
  {
    path: "/discounts",
    component: DiscountsPage,
  },
  {
    path: "/discounts/:id",
    component: EditDiscountPage,
  },
  {
    path: "/discounts/add",
    component: AddDiscountPage,
  },

  {
    path: "/settings",
    component: SettingsPage,
  },
];

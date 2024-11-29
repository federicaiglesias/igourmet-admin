import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/storeConfig.js";
import "./index.css";
import App from "./App.jsx";
import AdminDashboard from "./components/Dashboard.jsx";
import ProductList from "./components/product/ProductList.jsx";
import UserList from "./components/user/UserList.jsx";
import AdminList from "./components/admin/AdminList.jsx";
import CategoryList from "./components/category/CategoryList.jsx";
import Login from "./components/authentication/Login.jsx";
import OrderList from "./components/order/OrderList.jsx";
import NewCategory from "./components/category/NewCategory.jsx";
import NewAdmin from "./components/admin/NewAdmin.jsx";
import NewProduct from "./components/product/NewProduct.jsx";
import EditProduct from "./components/product/EditProduct.jsx";
import EditAdmin from "./components/admin/EditAdmin.jsx";
import EditCategory from "./components/category/EditCategory.jsx";
import EditOrder from "./components/order/EditOrder.jsx";
import { PersistGate } from "redux-persist/integration/react";
import PrivateRoutes from "./components/PrivateRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <PrivateRoutes />,
        children: [
          {
            path: "",
            element: <AdminDashboard />,
          },
          {
            path: "productos",
            element: <ProductList />,
          },
          {
            path: "editar-producto/:slug",
            element: <EditProduct />,
          },
          {
            path: "nuevo-producto",
            element: <NewProduct />,
          },
          {
            path: "usuarios",
            element: <UserList />,
          },
          {
            path: "administradores",
            element: <AdminList />,
          },
          {
            path: "nuevo-administrador",
            element: <NewAdmin />,
          },
          {
            path: "editar-administrador/:id",
            element: <EditAdmin />,
          },
          {
            path: "categorias",
            element: <CategoryList />,
          },
          {
            path: "nueva-categoria",
            element: <NewCategory />,
          },
          {
            path: "editar-categoria/:id",
            element: <EditCategory />,
          },
          {
            path: "ordenes",
            element: <OrderList />,
          },
          {
            path: "editar-orden/:id",
            element: <EditOrder />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);

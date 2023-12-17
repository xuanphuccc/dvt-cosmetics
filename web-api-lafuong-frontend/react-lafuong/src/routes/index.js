import AdminLayout from "@/components/Layout/AdminLayout";

import Dashboard from "@/pages/Admin/Dashboard";
import Products from "@/pages/Admin/Products";
import ProductEdit from "@/pages/Admin/ProductEdit";
import Orders from "@/pages/Admin/Orders";
import OrderEdit from "@/pages/Admin/OrderEdit";

const publicRoutes = [];

const privateRoutes = [
  { path: "/admin", component: Dashboard, layout: AdminLayout },
  { path: "/admin/products", component: Products, layout: AdminLayout },
  {
    path: "/admin/products/:action/:id",
    component: ProductEdit,
    layout: AdminLayout,
  },
  { path: "/admin/orders", component: Orders, layout: AdminLayout },
  {
    path: "/admin/orders/:action/:id",
    component: OrderEdit,
    layout: AdminLayout,
  },
];

export { publicRoutes, privateRoutes };

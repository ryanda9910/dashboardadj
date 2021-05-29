/*!

=========================================================
* * NextJS Material Dashboard v1.1.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Assignment from '@material-ui/icons/Assignment'
import Shop from '@material-ui/icons/Shop'


const dashboardRoutes = [
 {
    path: "/user",
    name: "User",
    icon: Person,
    layout: "/admin",
  },
  {
    path: "/product",
    name: "Product",
    icon: Assignment,
    layout: "/admin",
  },
  {
    path: "/order",
    name: "Order",
    icon: Shop,
    layout: "/admin",
  },
];

export default dashboardRoutes;

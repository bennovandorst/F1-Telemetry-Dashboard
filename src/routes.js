/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import CarTelemtery from "./views/examples/CarTelemtery";
import LapData from "./views/examples/LapData";
import Corrie from "./views/examples/Corrie";
import CarDamage from "./views/examples/CarDamage";
import CarSetup from "./views/examples/CarSetup";
import CustomDashboard from "./views/examples/CustomDashboard";

var routes = [
  {
    path: "/custom-dashboard",
    name: "Create Dashboard",
    icon: "fas fa-plus text-green",
    component: <CustomDashboard />,
    layout: "/admin",
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/car-telemetry",
    name: "Car Telemetry",
    icon: "fas fa-car text-blue",
    component: <CarTelemtery />,
    layout: "/admin",
  },
  {
    path: "/car-setup",
    name: "Car Setup",
    icon: "fas fa-wrench text-gray",
    component: <CarSetup />,
    layout: "/admin"
  },
  {
    path: "/car-damage",
    name: "Car Damage",
    icon: "fas fa-car-crash text-red",
    component: <CarDamage />,
    layout: "/admin",
  },
  {
    path: "/lap-data",
    name: "Lap Data",
    icon: "fas fa-flag-checkered text-black",
    component: <LapData />,
    layout: "/admin",
  },
  {
    path: "/corrie",
    name: "Corrie",
    icon: "fas fa-car text-blue",
    component: <Corrie />,
    layout: "/admin",
  },
  /*
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
    {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },*/
  {
    path: "/login",
    name: "Login",
    icon: "fas fa-sign-in-alt text-green",
    component: <Login />,
    layout: "/auth",
  },
];
export default routes;

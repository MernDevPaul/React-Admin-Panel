import React, { lazy } from "react";

const Dashboard = lazy(() => import("../Component/Dashboard/DashBoard"));
const NoPage = lazy(() => import("../Layouts/NoPage"));
const Crud = lazy(() => import("../Component/Crud/Crud"));

const RoutesDynamic = [
  {
    index: true,
    path: "/",
    exact: true,
    component: <Dashboard title="Dashboard" />,
  },
  {
    path: "*",
    exact: true,
    component: <NoPage title="404" />,
  },
  {
    path: "/crud",
    exact: true,
    component: <Crud title="Crud" />,
  }
];

export default RoutesDynamic;
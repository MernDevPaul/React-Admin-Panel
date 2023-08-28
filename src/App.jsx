import React, { useLayoutEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ConfigProvider, Spin } from "antd";
import { Custom } from "./Utils/ThemeCustomization";
import RoutesDynamic from "./Utils/RoutesDynamic";
const Login = lazy(() => import("./Component/Login/Login"));
const Layouts = lazy(() => import("./Layouts/Layouts"));
const ProtectedRoute = lazy(() => import("./Utils/ProtectedRoutes"));
const NoPage = lazy(() => import("./Layouts/NoPage"));
const App = () => {
  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(500, 0);
    }, [location.pathname]);
    return children;
  };
  return (
    <>
      <ConfigProvider
        theme={{
          token: Custom,
        }}
      >
        <Router>
          <Wrapper>
            <Suspense
              fallback={
                <div className="suspense_wrap">
                  <Spin tip="Loading" size="small" />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Layouts />}>
                  {RoutesDynamic?.map((item, index) => {
                    return (
                      <Route
                        key={index}
                        path={item.path}
                        element={
                          <ProtectedRoute>{item.component}</ProtectedRoute>
                        }
                      />
                    );
                  })}
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </Suspense>
          </Wrapper>
        </Router>
      </ConfigProvider>
    </>
  );
};

export default App;

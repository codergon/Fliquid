import store from "./store";
import { Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

import Homepage from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Loader from "./components/common/Loader";
import DefaultLayout from "./components/layout/DefaultLayout";
import { useMoralis } from "react-moralis";

export default function App() {
  const { isAuthenticated, isAuthenticating } = useMoralis();

  if (isAuthenticating) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <Router>
          <Routes>
            {isAuthenticated ? (
              <Route path="*" element={<DefaultLayout />}>
                <Route path="*" element={<Dashboard />}></Route>
              </Route>
            ) : (
              <Route path="*" element={<Homepage />} />
            )}
          </Routes>
        </Router>
      </Provider>
    </Suspense>
  );
}

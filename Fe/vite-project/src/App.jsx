import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/Store";
import { roots } from "./route/Route";
import Layout from "./layout/Layout";
function App() {
  return (
    <>
      <Provider store={store}>
         <BrowserRouter>
      <Routes>
        {roots.map((route, i) => (
          <Route key={i} path={route.path} element={<Layout>{route.element}</Layout>} />
        ))}
      </Routes>
    </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

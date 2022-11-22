/** @format */

import { BrowserRouter } from "react-router-dom";

import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import { useEffect } from "react";
import webtracing from "./track";

function App() {
  const location = window.location;
  useEffect(() => {
    webtracing.init({
      requestUrl: "http://locathost:3010",
      appName: "testpage1",
      pv: true,
    });
  }, []);

  return (
    <BrowserRouter>
      <div className='App'>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div>
          <button
            onClick={() => {
              location.href = "/home";
            }}>
            home
          </button>
          <button
            onClick={() => {
              location.href = "/page1";
            }}>
            page1
          </button>
        </div>

        <Routes>
          <Route element={<Home />} path='/'></Route>
          <Route element={<Home />} path='/home'></Route>
          <Route element={<Page1 />} path='/page1'></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import * as React from 'react';
import './App.css';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Login from "./js/Login";
import SignUp from "./js/SignUp";
import Navbar from "./js/Navbar"
import Features from "./js/Features";
import {AddProduct} from "./js/AddProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar/>
          <Routes>
              <Route>
                  <Route path={"/"} element={<Login/>}/>
                  <Route path={"/login"} element={<Login/>}/>
                  <Route path={"/signup"} element={<SignUp/>}/>
                  <Route path={"/features"} element={<Features/>}/>
                  <Route path={"/features/add-product"} element={<AddProduct />} />
              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

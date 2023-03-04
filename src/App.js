import * as React from 'react';
import './App.css';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Login from "./js/Login";
import SignUp from "./js/SignUp";
import Navbar from "./js/Navbar"
import Features from "./js/Features";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar/>
          <Routes>
              <Route>
                  <Route path={"/"} element={<Login/>}></Route>
                  <Route path={"/login"} element={<Login/>}></Route>
                  <Route path={"/signup"} element={<SignUp/>}></Route>
                  <Route path={"/features"} element={<Features/>}></Route>
              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

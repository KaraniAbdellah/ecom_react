import About from "./Components/Layout/About";
import Card from "./Components/Layout/Card";
import Footer from "./Components/Layout/Footer";
import Hero from "./Components/Layout/Hero";
import Navbar from "./Components/Layout/Navbar";
import ProductShowcase from "./Components/Layout/ProductShowcase";
import Products from "./Components/Layout/Products";

import Login from "./Components/Login_Inscr/Login";
import Register from "./Components/Login_Inscr/Register";

import Profile from "./Components/Profile/Profile";

import { Routes, Route } from "react-router";

import Adminpageadd from "./Components/Admin_Dash/Adminpageadd";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Navbar></Navbar>
              <Hero></Hero>
              <About></About>
              <ProductShowcase></ProductShowcase>
              <Footer></Footer>
            </div>
          }
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/products" element={<Products></Products>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/cards" element={<Card></Card>}></Route>
        <Route path="/admin" element={<Adminpageadd></Adminpageadd>}></Route>
      </Routes>
    </div>
  );
}

export default App;

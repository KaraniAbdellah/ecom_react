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
import AOS from "aos";
import "aos/dist/aos.css";

import Adminpageadd from "./Components/Admin_Dash/Adminpageadd";
import { useEffect } from "react";
import ProductDetails from "./Components/Layout/ProductDetails";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="App absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
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
        <Route path="/details/:productId" element={<ProductDetails></ProductDetails>}></Route>
      </Routes>
    </div>
  );
}

export default App;

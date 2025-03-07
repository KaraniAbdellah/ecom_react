import About from "./Components/Layout/About";
import Footer from "./Components/Layout/Footer";
import Hero from "./Components/Layout/Hero";
import Navbar from "./Components/Layout/Navbar";
import ProductShowcase from "./Components/Layout/ProductShowcase";

import Login from "./Components/Login_Inscr/Login";
import Register from "./Components/Login_Inscr/Register";

import { Routes, Route } from "react-router";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
      </Routes>

    </div>
  );
}

export default App;


{/* <Navbar></Navbar>
<Hero></Hero>
<ProductShowcase></ProductShowcase>
<About></About>
<Footer></Footer> */}

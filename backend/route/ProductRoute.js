// Start Making Routes
import express from "express";
import Product from "../model/Product.js";
const ProductRoute = express.Router();



ProductRoute.get("/GetAllProduct", async (req, res)  => {
    console.log("Request Come From Axios for Getting Products");
    // Get The All Products From Database
    try {
        const products = await Product.find();
        res.status(201).json(products);
        console.log("✅ Success Get Products");
    } catch (error) {
        res.status(500).send({message: "❌ Failed Getting Products"});
        console.log("❌ Failed Getting Products" + error);
    }
});


ProductRoute.get("/GetAllProduct/:category", async (req, res)  => {
    console.log("Request Come From Axios for Getting Products [Category]");
    const category = req.params.category;
    // Get The All Products From Database
    try {
        const products = await Product.find({category: category});
        res.status(201).json(products);
        console.log(products);
        console.log("✅ Success Get Products");
    } catch (error) {
        res.status(500).send({message: "❌ Failed Getting Products"});
        console.log("❌ Failed Getting Products" + error);
    }
});

ProductRoute.delete("/deleteProduct/:id", async (req, res) => {
    console.log("Request Come From Axios for Deleting Products");
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            console.log("Unfound Product");
            return res.status(200).send({message: "❌ Unfound Product"});
        }
        else {
            console.log("✅ Success Delete Product");
            return res.status(200).send({message: "✅ Success Delete Product"});
        }
    } catch (error) {
        res.status(500).send({message: "❌ Failed Deleting Product"});
        console.log("❌ Failed Deleting Product" + error);
    }
});

ProductRoute.post("/addProduct", async (req, res) => {
    console.log("Request Come From Axios for Adding Products");
    // Start Add Product To DataBase
    try {
        const product = new Product(req.body);
        console.log(product);
        await product.save();
        res.status(201).json(product);
        console.log("✅ Success Adding Product");
    } catch (error) {
        res.status(500).send({message: "❌ Failed Adding Product"});
        console.log("❌ Failed Adding Product" + error);
    }
});


ProductRoute.put("/updateProduct/:id", async(req, res) => {
    console.log("🕵️‍♀️ Request From Postman [PUT Method]");
    const id = req.params.id;
    const newProduct = req.body;
    try {
        const UpdatedData = await Product.findByIdAndUpdate(id, newProduct);
        res.status(200).send({message: "✅ Data Updated Succefully"});
        console.log("✅ Data Updated Succefully");
    } catch (error) {
        console.log("❌ Failed Updating Data" + error);
        res.status(500).send({message: "❌ Failed Updating Data"});
    }
});


// Get Product By Id
ProductRoute.get("/GetById/:productId", async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send({message: "Can Not Find This Product"});
        }
    } catch (error) {
        res.status(500).send({message: "Error"});
    }
});





export default ProductRoute;
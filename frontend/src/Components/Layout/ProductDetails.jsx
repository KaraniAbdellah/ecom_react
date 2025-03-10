import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`http://127.0.0.1:5000/product/GetById/${productId}`)
        .then((res) => {
          console.log(res.data);
          setProduct(res.data);
        });
    }
    fetchData();

    // Get The Similaire Product
    
    console.log(product);
  }, []);

  return (
    <div className="flex justify-center items-start flex-row bg-gray-200 p-2">
      <div className="productDetails">
        <div>
            <div className="info">
                <p className="title">{product.title}</p>
                <p className="description">{product.description}</p>
                <p className="quantity">{product.quantity}</p>
            </div>
            <div className="btns">
                <button className="add_card bg-orange-400 p-2 rounded-l-sm">Add To Card</button>
                <button className="price bg-orange-400 p-2 rounded-r-sm">{product.price}$</button>
            </div>
        </div>
        <div className="image bg-slate-300">
            <img className="w-[400px] rounded-md" src={product.image} alt="" />
        </div>
      </div>
      <div className="similaire_product">

      </div>
    </div>
  );
};

export default ProductDetails;

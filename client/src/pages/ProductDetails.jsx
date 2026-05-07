import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {

      const response = await axios.get(
        ``https://freelanceproject1.onrender.com/api/products/${id}``
      );

      setProduct(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);


  const addToCart = () => {

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    existingCart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert("Added to cart");
  };


  if (!product) {
    return (
      <h1 className="text-white p-10">
        Loading...
      </h1>
    );
  }

  return (
    <div className="
      min-h-screen
      bg-black
      text-white
      p-10
    ">

      <div className="
        grid
        md:grid-cols-2
        gap-10
        items-center
      ">

        <img
          src={product.image}
          alt={product.name}
          className="
            w-full
            rounded-2xl
            shadow-lg
          "
        />

        <div>

          <h1 className="
            text-5xl
            font-bold
          ">
            {product.name}
          </h1>

          <p className="
            text-cyan-400
            text-3xl
            mt-5
          ">
            ₹{product.price}
          </p>

          <p className="
            text-gray-400
            mt-5
            text-lg
          ">
            {product.description}
          </p>

          <button
            onClick={addToCart}
            className="
              mt-8
              bg-cyan-500
              px-8
              py-4
              rounded-xl
              text-xl
              hover:bg-cyan-600
            "
          >
            Add To Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;
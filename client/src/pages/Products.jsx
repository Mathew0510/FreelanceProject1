import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchProducts = async () => {
    try {

      const response = await axios.get(
        "https://freelanceproject1.onrender.com/api/products"
      );

      setProducts(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const addToCart = (product) => {

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    existingCart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert("Added to cart");
  };


  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.name.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });


  return (
    <div className="
      min-h-screen
      bg-gradient-to-br
      from-black
      via-gray-900
      to-black
      text-white
    ">

      {/* Hero Section */}
      <div className="
        text-center
        py-16
        px-5
      ">

        <h2 className="
          text-5xl
          font-bold
          leading-tight
        ">
          Upgrade Your Style
        </h2>

        <p className="
          text-gray-400
          mt-5
          text-lg
        ">
          Premium fashion, shoes and electronics.
        </p>

      </div>


      {/* Search + Filter */}
      <div className="
        flex
        flex-col
        md:flex-row
        gap-4
        px-10
        mb-10
      ">

        <input
          type="text"
          placeholder="Search products..."
          className="
            flex-1
            p-4
            rounded-xl
            bg-gray-800
            border
            border-gray-700
            outline-none
          "
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="
            p-4
            rounded-xl
            bg-gray-800
            border
            border-gray-700
          "
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option>All</option>
          <option>Shoes</option>
          <option>Electronics</option>
          <option>Fashion</option>
        </select>

      </div>


      {/* Product Grid */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
        px-10
        pb-16
      ">

        {filteredProducts.map((product) => (

          <div
            key={product._id}
            className="
              bg-gray-900
              rounded-2xl
              overflow-hidden
              shadow-lg
              hover:scale-105
              hover:shadow-cyan-500/20
              transition
              duration-300
            "
          >

            <Link to={`/product/${product._id}`}>

              <img
                src={product.image}
                alt={product.name}
                className="
                  w-full
                  h-64
                  object-cover
                "
              />

              <div className="p-5">

                <h2 className="
                  text-2xl
                  font-bold
                ">
                  {product.name}
                </h2>

                <p className="
                  text-cyan-400
                  text-xl
                  mt-2
                  font-semibold
                ">
                  ₹{product.price}
                </p>

                <p className="
                  text-gray-400
                  mt-3
                ">
                  {product.description}
                </p>

              </div>

            </Link>

            <div className="p-5 pt-0">

              <button
                onClick={() =>
                  addToCart(product)
                }
                className="
                  mt-2
                  w-full
                  bg-cyan-500
                  hover:bg-cyan-600
                  py-3
                  rounded-xl
                  font-bold
                  transition
                "
              >
                Add To Cart
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Products;
import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: ""
  });

  const [products, setProducts] = useState([]);


  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(response.data);

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/products/add",
        form
      );

      alert("Product Added");

      fetchProducts();

      setForm({
        name: "",
        price: "",
        image: "",
        description: "",
        category: ""
      });

    } catch (error) {
      console.log(error);
    }
  };


  const deleteProduct = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      alert("Product Deleted");

      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="
      min-h-screen
      bg-black
      text-white
      p-10
    ">

      <h1 className="
        text-4xl
        font-bold
        mb-10
      ">
        Admin Dashboard
      </h1>


      {/* Add Product Form */}
      <form
        onSubmit={handleSubmit}
        className="
          max-w-2xl
          mx-auto
          bg-gray-900
          p-8
          rounded-2xl
          space-y-5
          mb-16
        "
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="
            w-full
            p-4
            rounded-xl
            bg-gray-800
          "
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="
            w-full
            p-4
            rounded-xl
            bg-gray-800
          "
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="
            w-full
            p-4
            rounded-xl
            bg-gray-800
          "
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="
            w-full
            p-4
            rounded-xl
            bg-gray-800
          "
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="
            w-full
            p-4
            rounded-xl
            bg-gray-800
            h-32
          "
        />

        <button
          type="submit"
          className="
            w-full
            bg-cyan-500
            hover:bg-cyan-600
            py-4
            rounded-xl
            font-bold
          "
        >
          Add Product
        </button>

      </form>


      {/* Product List */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
      ">

        {products.map((product) => (

          <div
            key={product._id}
            className="
              bg-gray-900
              rounded-2xl
              overflow-hidden
            "
          >

            <img
              src={product.image}
              alt={product.name}
              className="
                w-full
                h-56
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
                mt-2
              ">
                ₹{product.price}
              </p>

              <button
                onClick={() =>
                  deleteProduct(product._id)
                }
                className="
                  mt-5
                  w-full
                  bg-red-500
                  hover:bg-red-600
                  py-3
                  rounded-xl
                  font-bold
                "
              >
                Delete Product
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Admin;
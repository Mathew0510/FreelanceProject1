import { useEffect, useState } from "react";

function Cart() {

  const [cart, setCart] = useState([]);

  useEffect(() => {

    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);

  }, []);


  const removeItem = (index) => {

    const updatedCart = [...cart];

    updatedCart.splice(index, 1);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };


  const totalPrice = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <div className="p-10">

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        My Cart
      </h1>

      <div className="
        grid
        gap-6
      ">

        {cart.map((item, index) => (

          <div
            key={index}
            className="
              bg-gray-900
              p-5
              rounded-2xl
              flex
              justify-between
              items-center
            "
          >

            <div>
              <h2 className="
                text-2xl
                font-bold
              ">
                {item.name}
              </h2>

              <p className="
                text-cyan-400
                mt-2
              ">
                ₹{item.price}
              </p>
            </div>

            <button
              onClick={() =>
                removeItem(index)
              }
              className="
                bg-red-500
                px-4
                py-2
                rounded-xl
                hover:bg-red-600
              "
            >
              Remove
            </button>

          </div>
        ))}

      </div>

      <h2 className="
        text-3xl
        font-bold
        mt-10
      ">
        Total: ₹{totalPrice}
      </h2>

    </div>
  );
}

export default Cart;
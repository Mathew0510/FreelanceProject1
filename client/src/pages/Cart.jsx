import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const cartWithQuantity = savedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1
    }));

    setCart(cartWithQuantity);
    localStorage.setItem("cart", JSON.stringify(cartWithQuantity));
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    updateCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];

    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }

    updateCart(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">My Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-gray-900 p-10 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-5">Your cart is empty</h2>

          <Link
            to="/"
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-bold"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-gray-900 p-5 rounded-2xl flex flex-col md:flex-row justify-between gap-5"
              >
                <div className="flex gap-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-xl"
                  />

                  <div>
                    <h2 className="text-2xl font-bold">{item.name}</h2>

                    <p className="text-cyan-400 mt-2">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={() => decreaseQuantity(index)}
                        className="bg-gray-700 px-4 py-2 rounded-lg"
                      >
                        -
                      </button>

                      <span className="text-xl">{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(index)}
                        className="bg-gray-700 px-4 py-2 rounded-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-start md:items-end">
                  <p className="text-xl font-bold">
                    ₹{item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeItem(index)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl mt-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl mt-10 flex flex-col md:flex-row justify-between items-center gap-5">
            <h2 className="text-3xl font-bold">
              Total: ₹{totalPrice}
            </h2>

            <Link
              to="/checkout"
              className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-bold"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
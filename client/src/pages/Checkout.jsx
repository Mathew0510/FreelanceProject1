import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://freelanceproject1.onrender.com";

function Checkout() {
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      const paymentOrderResponse = await axios.post(
        `${API_URL}/api/payment/create-order`,
        {
          amount: totalAmount
        }
      );

      const razorpayOrder = paymentOrderResponse.data.order;

      const options = {
        key: "rzp_test_SmPmH1eoIBfXZn",
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Maran Store",
        description: "E-commerce Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          const orderData = {
            customerName: form.customerName,
            email: form.email,
            phone: form.phone,
            address: form.address,
            items: cart.map((item) => ({
              productId: item._id,
              name: item.name,
              price: item.price,
              image: item.image,
              quantity: item.quantity
            })),
            totalAmount,
            paymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            paymentStatus: "Paid",
            orderStatus: "Processing"
          };

          await axios.post(`${API_URL}/api/orders/create`, orderData);

          localStorage.removeItem("cart");

          navigate("/order-success");
        },

        prefill: {
          name: form.customerName,
          email: form.email,
          contact: form.phone
        },

        theme: {
          color: "#06b6d4"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
      alert("Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        <form
          onSubmit={handlePayment}
          className="bg-gray-900 p-8 rounded-2xl space-y-5"
        >
          <input
            type="text"
            name="customerName"
            placeholder="Full Name"
            value={form.customerName}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 outline-none"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 outline-none"
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-gray-800 h-32 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-4 rounded-xl font-bold"
          >
            Pay ₹{totalAmount}
          </button>
        </form>

        <div className="bg-gray-900 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-5">Order Summary</h2>

          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-700 py-3"
            >
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-gray-400">Qty: {item.quantity}</p>
              </div>

              <p className="text-cyan-400">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <h2 className="text-3xl font-bold mt-8">
            Total: ₹{totalAmount}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
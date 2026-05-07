import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-10">
      <div className="bg-gray-900 p-10 rounded-3xl text-center max-w-xl">
        <h1 className="text-5xl font-bold text-cyan-400 mb-5">
          Order Successful!
        </h1>

        <p className="text-gray-300 text-lg mb-8">
          Thank you for shopping with Maran Store. Your order has been placed successfully.
        </p>

        <Link
          to="/"
          className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-bold"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
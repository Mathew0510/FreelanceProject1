import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://freelanceproject1.onrender.com";

function AdminOrders() {

  const [orders, setOrders] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const token = user?.token;


  const fetchOrders =
    async () => {

    try {

      const response =
        await axios.get(
          `${API_URL}/api/orders`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setOrders(response.data);

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);


  const updateStatus =
    async (id, status) => {

    try {

      await axios.put(
        `${API_URL}/api/orders/${id}/status`,
        {
          orderStatus: status
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      fetchOrders();

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
        Admin Orders
      </h1>

      <div className="grid gap-8">

        {orders.map((order) => (

          <div
            key={order._id}
            className="
              bg-gray-900
              p-6
              rounded-2xl
            "
          >

            <div className="
              flex
              flex-col
              md:flex-row
              justify-between
              gap-5
            ">

              <div>

                <h2 className="
                  text-2xl
                  font-bold
                ">
                  {order.customerName}
                </h2>

                <p className="
                  text-gray-400
                  mt-2
                ">
                  {order.email}
                </p>

                <p className="
                  text-gray-400
                ">
                  {order.phone}
                </p>

                <p className="
                  text-gray-400
                  mt-3
                ">
                  {order.address}
                </p>

              </div>

              <div>

                <p className="
                  text-cyan-400
                  text-2xl
                  font-bold
                ">
                  ₹{order.totalAmount}
                </p>

                <p className="mt-3">
                  Payment:
                  <span className="
                    text-green-400
                    ml-2
                  ">
                    {order.paymentStatus}
                  </span>
                </p>

                <p className="mt-2">
                  Status:
                  <span className="
                    text-yellow-400
                    ml-2
                  ">
                    {order.orderStatus}
                  </span>
                </p>

              </div>

            </div>


            <div className="mt-6">

              <h3 className="
                text-xl
                font-bold
                mb-3
              ">
                Ordered Items
              </h3>

              <div className="
                grid
                gap-3
              ">

                {order.items.map(
                  (item, index) => (

                  <div
                    key={index}
                    className="
                      flex
                      justify-between
                      border-b
                      border-gray-700
                      pb-2
                    "
                  >

                    <p>
                      {item.name}
                      × {item.quantity}
                    </p>

                    <p>
                      ₹{
                        item.price *
                        item.quantity
                      }
                    </p>

                  </div>
                ))}

              </div>

            </div>


            <div className="
              flex
              flex-wrap
              gap-4
              mt-8
            ">

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Processing"
                  )
                }
                className="
                  bg-yellow-500
                  px-5
                  py-2
                  rounded-xl
                "
              >
                Processing
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Shipped"
                  )
                }
                className="
                  bg-blue-500
                  px-5
                  py-2
                  rounded-xl
                "
              >
                Shipped
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Delivered"
                  )
                }
                className="
                  bg-green-500
                  px-5
                  py-2
                  rounded-xl
                "
              >
                Delivered
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Cancelled"
                  )
                }
                className="
                  bg-red-500
                  px-5
                  py-2
                  rounded-xl
                "
              >
                Cancelled
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminOrders;
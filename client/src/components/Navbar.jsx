import { Link } from "react-router-dom";

function Navbar() {

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <nav className="
      sticky
      top-0
      z-50
      bg-black/80
      backdrop-blur-lg
      border-b
      border-gray-800
      px-10
      py-5
      flex
      justify-between
      items-center
    ">

      <h1 className="
        text-3xl
        font-extrabold
        text-cyan-400
      ">
        Maran Store
      </h1>

      <div className="
        flex
        gap-8
        text-lg
        items-center
      ">

        <Link
          to="/"
          className="hover:text-cyan-400"
        >
          Home
        </Link>

        <Link
          to="/cart"
          className="
            bg-cyan-500
            px-4
            py-2
            rounded-xl
            hover:bg-cyan-600
          "
        >
          Cart ({cart.length})
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;
import {
  Link,
  useNavigate
} from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );


  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login");
  };


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

      <Link to="/">
        <h1 className="
          text-3xl
          font-extrabold
          text-cyan-400
        ">
          Maran Store
        </h1>
      </Link>


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

        {user && (
          <>
            <Link
              to="/admin"
              className="hover:text-cyan-400"
            >
              Admin
            </Link>

            <Link
              to="/admin/orders"
              className="hover:text-cyan-400"
            >
              Orders
            </Link>
          </>
        )}

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

        {user ? (

          <button
            onClick={handleLogout}
            className="
              bg-red-500
              hover:bg-red-600
              px-4
              py-2
              rounded-xl
            "
          >
            Logout
          </button>

        ) : (

          <Link
            to="/login"
            className="
              bg-cyan-500
              hover:bg-cyan-600
              px-4
              py-2
              rounded-xl
            "
          >
            Login
          </Link>

        )}

      </div>

    </nav>
  );
}

export default Navbar;
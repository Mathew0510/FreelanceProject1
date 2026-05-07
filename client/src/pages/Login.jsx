import {
  useContext,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import {
  AuthContext
} from "../context/AuthContext";

const API_URL =
  "https://freelanceproject1.onrender.com";

function Login() {

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [form, setForm] =
    useState({
      email: "",
      password: ""
    });


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };


  const handleSubmit =
    async (e) => {

    e.preventDefault();

    try {

      const response =
        await axios.post(
          `${API_URL}/api/auth/login`,
          form
        );

      login({
        token:
          response.data.token,
        email:
          form.email
      });

      alert("Login Successful");

      navigate("/admin");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };


  return (
    <div className="
      min-h-screen
      bg-gradient-to-br
      from-black
      via-gray-900
      to-black
      text-white
      flex
      items-center
      justify-center
      p-5
    ">

      <form
        onSubmit={handleSubmit}
        className="
          bg-gray-900
          p-10
          rounded-3xl
          w-full
          max-w-md
          space-y-5
          shadow-2xl
        "
      >

        <h1 className="
          text-4xl
          font-bold
          text-center
          text-cyan-400
        ">
          Admin Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="
            w-full
            p-4
            rounded-xl
            bg-gray-800
            outline-none
            border
            border-gray-700
          "
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="
            w-full
            p-4
            rounded-xl
            bg-gray-800
            outline-none
            border
            border-gray-700
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
            transition
          "
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;
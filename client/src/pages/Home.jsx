import Products from "./Products";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen text-white">
      <section className="px-10 py-20 text-center bg-gradient-to-br from-black via-gray-900 to-cyan-950">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          Shop Smart. Look Sharp.
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Discover premium products with a modern shopping experience.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="#products"
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-bold"
          >
            Shop Now
          </a>

          <Link
            to="/admin"
            className="border border-cyan-400 px-8 py-4 rounded-xl font-bold hover:bg-cyan-400 hover:text-black"
          >
            Admin Panel
          </Link>
        </div>
      </section>

      <section className="px-10 py-12 bg-black">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-900 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-cyan-400">Fast Delivery</h2>
            <p className="text-gray-400 mt-2">Quick and reliable shipping.</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-cyan-400">Best Quality</h2>
            <p className="text-gray-400 mt-2">Premium products only.</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-cyan-400">Secure Shopping</h2>
            <p className="text-gray-400 mt-2">Safe and simple experience.</p>
          </div>
        </div>
      </section>

      <section id="products">
        <Products />
      </section>

      <footer className="bg-black border-t border-gray-800 text-center py-8 text-gray-400">
        <p>© 2026 Maran Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 pt-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-emerald-600 mb-4">Cartopia</h2>
          <p className="text-gray-500 text-sm">
            Your ultimate destination for premium products and effortless shopping experience.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="font-semibold mb-4 text-emerald-600">Shop</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <Link href="/products" className="hover:text-emerald-600 transition">All Products</Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-emerald-600 transition">Categories</Link>
            </li>
            <li>
              <Link href="/offers" className="hover:text-emerald-600 transition">Special Offers</Link>
            </li>
            <li>
              <Link href="/new-arrivals" className="hover:text-emerald-600 transition">New Arrivals</Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-4 text-emerald-600">Company</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <Link href="/about" className="hover:text-emerald-600 transition">About Us</Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-emerald-600 transition">Careers</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-emerald-600 transition">Contact</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-emerald-600 transition">Blog</Link>
            </li>
          </ul>
        </div>

        {/* Social / Support */}
        <div>
          <h3 className="font-semibold mb-4 text-emerald-600">Connect</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <a href="mailto:support@cartopia.com" className="hover:text-emerald-600 transition">
                support@cartopia.com
              </a>
            </li>
            <li>
              <a href="tel:+1234567890" className="hover:text-emerald-600 transition">+1 234 567 890</a>
            </li>
            <li className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-emerald-600 transition">Facebook</a>
              <a href="#" className="hover:text-emerald-600 transition">Instagram</a>
              <a href="#" className="hover:text-emerald-600 transition">Twitter</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 mt-12 py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Cartopia. All rights reserved.
      </div>
    </footer>
  );
}

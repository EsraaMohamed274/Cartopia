"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X, LogOut, Heart, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { CartContext } from "@/context/cartContext";

export default function Navbar() {
  const { numberOfItems } = useContext(CartContext)!;
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const baseLinks = [
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Brands", href: "/brands" },
  ];

  const navLinks = session 
    ? [...baseLinks, { name: "All Orders", href: "/allorders" }] 
    : baseLinks;

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-emerald-900 text-white flex items-center justify-center rounded-xl font-bold shadow-lg group-hover:rotate-12 transition-transform">
            CT
          </div>
          <span className="text-xl font-black tracking-tighter text-emerald-900 uppercase">
            Cartopia
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-tight transition-all duration-300 relative pb-1 ${
                isActive(link.href)
                  ? "text-emerald-700 after:w-full"
                  : "text-gray-500 hover:text-emerald-900 after:w-0"
              } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-emerald-600 after:transition-all`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-5">
          {session && (
            <div className="hidden md:flex items-center gap-5 border-r pr-5 border-gray-200">
              <Link href="/wishList" className="text-gray-600 hover:text-red-500 transition-colors">
                <Heart size={20} />
              </Link>
              <Link href="/shoppingCart" className="relative text-gray-600 hover:text-emerald-700 transition-colors">
                <ShoppingCart size={20} />
                <motion.span 
                  key={numberOfItems}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 size-5 flex justify-center items-center rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow-sm"
                >
                  {numberOfItems}
                </motion.span>
              </Link>
            </div>
          )}

          {/* User Profile / Login */}
          {status !== "loading" && (
            <div className="relative">
              {session ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 pl-2 py-1 rounded-full hover:bg-gray-50 transition"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-900">
                      <User size={18} />
                    </div>
                    <span className="hidden lg:block text-xs font-bold text-gray-700 max-w-20 truncate">
                      {session.user?.name}
                    </span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logged in as</p>
                           <p className="text-xs font-bold text-emerald-900 truncate">{session.user?.email}</p>
                        </div>
                        <Link href="/allorders" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition">
                          <Package size={16} /> My Orders
                        </Link>
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition font-medium"
                        >
                          <LogOut size={16} /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-6 py-2 bg-emerald-900 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-900/20 hover:bg-emerald-800 hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  LOGIN
                </Link>
              )}
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-emerald-900"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-50 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 space-y-4 font-bold text-gray-600 uppercase text-xs tracking-widest">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2 transition ${isActive(link.href) ? "text-emerald-600 pl-2 border-l-4 border-emerald-600" : ""}`}
                >
                  {link.name}
                </Link>
              ))}
              
              {session && (
                <div className="pt-4 border-t border-gray-100 flex gap-6">
                  <Link href="/shoppingCart" className="relative text-emerald-900">
                    <ShoppingCart size={22} />
                    <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1.5 rounded-full">{numberOfItems}</span>
                  </Link>
                  <Link href="/wishList" className="text-red-500">
                    <Heart size={22} />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
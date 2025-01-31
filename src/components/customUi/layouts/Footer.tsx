
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 px-5 py-10 md:py-16">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mb-10">
        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">About Us</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Discover the latest in fashion with The Collection. We bring you curated styles
            that blend tradition with contemporary trends.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="hover:text-orange-600 text-sm text-gray-700 dark:text-gray-300 dark:hover:text-orange-400"
              >
                New Arrivals
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-orange-600 text-sm text-gray-700 dark:text-gray-300 dark:hover:text-orange-400"
              >
                Best Sellers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-orange-600 text-sm text-gray-700 dark:text-gray-300 dark:hover:text-orange-400"
              >
                Our Story
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-orange-600 text-sm text-gray-700 dark:text-gray-300 dark:hover:text-orange-400"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Connect With Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Connect With Us</h3>
          <div className="flex space-x-4 text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-orange-600 dark:hover:text-orange-400">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-orange-600 dark:hover:text-orange-400">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-orange-600 dark:hover:text-orange-400">
              <Twitter size={24} />
            </a>
          </div>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Newsletter</h3>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:ring-orange-400"
            />
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition-colors dark:hover:bg-orange-500"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-300 pt-4 text-center dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; 2025 The Collection. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

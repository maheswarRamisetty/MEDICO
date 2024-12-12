import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col sm:grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_1fr] gap-14 my-10">
          <div>
            <img className="mb-5 w-40" src={assets.logo_main} alt="Med Logo" />
            <p className="text-sm leading-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="material-icons-outlined mr-2">phone</span>
                27938403043
              </li>
              <li className="flex items-center">
                <span className="material-icons-outlined mr-2">email</span>
                hjdjkvggj@gmail.com
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 transition-all"
                title="Facebook"
              >
                <span className="material-icons-outlined text-white">facebook</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 transition-all"
                title="Twitter"
              >
                <span className="material-icons-outlined text-white">twitter</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-400 hover:bg-pink-500 transition-all"
                title="Instagram"
              >
                <span className="material-icons-outlined text-white">instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm">
          <p className="text-gray-500">
            Copyright © 2024 - All Rights Reserved | Designed by <span className="text-blue-400">Pavan Vamsi  IT Solutions</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

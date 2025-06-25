import React from "react";
import logo from '../../assets/images/logo.png'
const Footer = () => {
  return (
    <footer className="bg-base-100">
      <div className="max-w-7xl md:mx-[10vw]">
        <div className="pt-12 md:pt-20 pb-16 md:pb-24">
          {/* Footer Content */}
          <div className="relative flex flex-col md:flex-row items-center gap-10 md:gap-20 text-center md:text-left">
            {/* Logo and Description */}
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                {/* Logo */}
                <img src={logo} alt='logo'  />
               
              </div>
              <p className="mt-4 text-lg text-gray-600">
              Create memorable children's stories effortlessly and fast.
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Copyright © {new Date().getFullYear()} - All rights reserved
              </p>
            </div>

            {/* Links Section */}
            <div className="flex-1 grid grid-cols-2 gap-6 md:gap-8">
              <ul className="space-y-4">
                <h4 className="text-lg font-bold text-gray-600 uppercase">
                  Links
                </h4>
                <li>
                  <a
                    href="/signin"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
              <ul className="space-y-4">
                <h4 className="text-lg font-bold text-gray-600 uppercase">
                  Legal
                </h4>
                <li>
                  <a
                    href="#terms"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    Terms of services
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    Privacy policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

    
      </div>
    </footer>
  );
};

export default Footer;

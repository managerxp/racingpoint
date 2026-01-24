"use client";

import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <Image
                src="/assets/logo/racing_logo.png"
                alt="RacingPoint Logo"
                width={200}
                height={60}
                className="h-16 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <p className="text-sm text-gray-400">
              Experience the ultimate F1 simulator racing platform
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-red-600 transition">Home</a></li>
              <li><a href="/booking" className="hover:text-red-600 transition">Book Now</a></li>
              <li><a href="/cars" className="hover:text-red-600 transition">Cars</a></li>
              <li><a href="/tracks" className="hover:text-red-600 transition">Tracks</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/foodmenu" className="hover:text-red-600 transition">Food Menu</a></li>
              <li><a href="/contact" className="hover:text-red-600 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-red-600 transition">About Us</a></li>
              <li><a href="#" className="hover:text-red-600 transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: <a href="mailto:info@racingpoint.com" className="hover:text-red-600 transition">info@racingpoint.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-red-600 transition">+1 (234) 567-890</a></li>
              <li>Address: Banglaguda Suncity Hyderabad</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} RacingPoint Esports. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-red-600 transition">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5c-.563-.074-1.396-.146-2.779-.146-2.704 0-4.642 1.645-4.642 4.668v2.478z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-red-600 transition">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-red-600 transition">
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

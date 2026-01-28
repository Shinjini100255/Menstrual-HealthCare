
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-pink-100 py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white">
          <i className="fas fa-heart-pulse"></i>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800 leading-none">Menstrual Aid</h1>
          <p className="text-xs text-pink-500 font-medium">Rural Women's Health Series</p>
        </div>
      </div>
      <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
        <a href="#" className="hover:text-pink-500 transition-colors">Home</a>
        <a href="#" className="text-pink-600 font-semibold border-b-2 border-pink-500 pb-1">Education</a>
        <a href="#" className="hover:text-pink-500 transition-colors">Support</a>
        <a href="#" className="hover:text-pink-500 transition-colors">Contact</a>
      </nav>
      <button className="md:hidden text-gray-600">
        <i className="fas fa-bars text-xl"></i>
      </button>
    </header>
  );
};

export default Header;

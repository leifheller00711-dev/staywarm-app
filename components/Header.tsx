'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoginMenuOpen, setIsLoginMenuOpen] = React.useState(false);

  return (
    <header className="bg-gray-900 shadow-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl text-blue-600">❤️</span>
            <span className="text-xl font-bold text-white">StayWarm</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#map" 
              className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors"
            >
              <span>📍</span>
              <span>Karte & Organisationen</span>
            </a>
            
            {/* Login Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLoginMenuOpen(!isLoginMenuOpen)}
                className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <span>👤</span>
                <span>Login</span>
                <span className={`transition-transform ${isLoginMenuOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {isLoginMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                  <Link 
                    href="/admin/login"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors rounded-t-lg"
                    onClick={() => setIsLoginMenuOpen(false)}
                  >
                    <span className="mr-2">⚙️</span>
                    Administrator
                  </Link>
                  <Link 
                    href="/organization/login"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors rounded-b-lg"
                    onClick={() => setIsLoginMenuOpen(false)}
                  >
                    <span className="mr-2">🏢</span>
                    Organisation
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#map">
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-gray-700 text-white hover:bg-gray-600 hover:text-blue-200 transition-all duration-200"
              >
                Organisationen finden
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <span className="text-xl text-gray-300">✕</span>
            ) : (
              <span className="text-xl text-gray-300">☰</span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              <a 
                href="#map" 
                className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>📍</span>
                <span>Karte & Organisationen</span>
              </a>
              
              {/* Mobile Login Section */}
              <div className="border-t border-gray-700 pt-4">
                <p className="text-sm text-gray-400 mb-2">Login:</p>
                <Link 
                  href="/admin/login" 
                  className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors mb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>⚙️</span>
                  <span>Administrator</span>
                </Link>
                <Link 
                  href="/organization/login" 
                  className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>🏢</span>
                  <span>Organisation</span>
                </Link>
              </div>
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                <a href="#map" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full bg-gray-700 text-white hover:bg-gray-600 hover:text-blue-200 transition-all duration-200"
                  >
                    Organisationen finden
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
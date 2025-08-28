import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl text-blue-400">🔥</span>
              <span className="text-xl font-bold">StayWarm</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Wir verbinden Spender mit Organisationen für Obdachlose und schaffen 
              eine transparente Plattform für effektive Hilfe.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:info@staywarm.de" className="text-gray-300 hover:text-white transition-colors">
                <span className="text-lg">📧</span>
              </a>
              <a href="tel:+49123456789" className="text-gray-300 hover:text-white transition-colors">
                <span className="text-lg">📞</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Schnellzugriff</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Karte
                </Link>
              </li>
              <li>
                <Link href="/organizations" className="text-gray-300 hover:text-white transition-colors">
                  Organisationen
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-300 hover:text-white transition-colors">
                  Spenden
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  Über uns
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                  Hilfe
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 StayWarm. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
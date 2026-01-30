'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/wallets') {
      return pathname === '/' || pathname === '/wallets';
    }
    return pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img
            src="/images/BitcoinerReview.png"
            alt="Bitcoiner Reviews"
            className="h-24 w-auto -mr-7 -mt-2"
          />
          <div>
            <h1 className="font-bold text-xl leading-none tracking-tight text-gray-900">Bitcoiner<span className="text-gray-500 font-normal">Reviews</span></h1>
            <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Bitcoin Only. No Shitcoins.</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/wallets"
            className={`text-sm font-medium py-7 transition-colors ${
              isActive('/wallets')
                ? 'text-gray-900 border-b-2 border-[#F7931A]'
                : 'text-gray-500 hover:text-[#F7931A]'
            }`}
          >
            Wallets
          </Link>
          <Link
            href="/compare"
            className={`text-sm font-medium py-7 transition-colors ${
              isActive('/compare')
                ? 'text-gray-900 border-b-2 border-[#F7931A]'
                : 'text-gray-500 hover:text-[#F7931A]'
            }`}
          >
            Compare
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium py-7 transition-colors ${
              isActive('/about')
                ? 'text-gray-900 border-b-2 border-[#F7931A]'
                : 'text-gray-500 hover:text-[#F7931A]'
            }`}
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search wallets..."
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#F7931A] w-48 text-gray-900"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <i className="ph ph-x text-lg"></i>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <i className="ph ph-magnifying-glass text-lg"></i>
              <span className="hidden lg:inline">Search</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

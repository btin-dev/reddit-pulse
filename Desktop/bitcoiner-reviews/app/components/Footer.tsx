'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribing:', email);
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="/images/BitcoinerReview.png"
                alt="Bitcoiner Reviews"
                className="h-16 w-auto -mr-4"
              />
              <div>
                <span className="font-bold text-lg text-gray-900">Bitcoiner<span className="text-gray-500 font-normal">Reviews</span></span>
                <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Bitcoin Only. No Shitcoins.</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Independent reviews of Bitcoin hardware wallets. No altcoins. No sponsored content. No apologies.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-[#F7931A]"><i className="ph-fill ph-twitter-logo text-xl"></i></Link>
              <Link href="#" className="text-gray-400 hover:text-[#F7931A]"><i className="ph-fill ph-github-logo text-xl"></i></Link>
              <Link href="#" className="text-gray-400 hover:text-[#F7931A]"><i className="ph-bold ph-lightning text-xl"></i></Link>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-gray-900 mb-4">Reviews</h5>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/wallets" className="hover:text-[#F7931A]">Wallet Rankings</Link></li>
              <li><Link href="/compare" className="hover:text-[#F7931A]">Compare Wallets</Link></li>
              <li><Link href="#" className="hover:text-[#F7931A]">Bitcoin-Only Wallets</Link></li>
              <li><Link href="#" className="hover:text-[#F7931A]">Budget Options</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-gray-900 mb-4">Resources</h5>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-[#F7931A]">Why Bitcoin-Only?</Link></li>
              <li><Link href="#" className="hover:text-[#F7931A]">Our Methodology</Link></li>
              <li><Link href="/about" className="hover:text-[#F7931A]">About Us</Link></li>
              <li><Link href="#" className="hover:text-[#F7931A]">Support via Lightning</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-gray-900 mb-4">Stay Based</h5>
            <p className="text-sm text-gray-500 mb-4">Get notified when we roast new wallets.</p>
            <form className="flex flex-col gap-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="satoshi@bitcoin.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#F7931A] text-gray-900"
              />
              <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 Bitcoiner Reviews. All rights reserved. Bitcoin is the only money.</p>
          <p>Not financial advice. DYOR. Stack sats.</p>
        </div>
      </div>
    </footer>
  );
}

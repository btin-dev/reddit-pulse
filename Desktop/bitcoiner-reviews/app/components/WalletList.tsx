'use client';

import { useState } from 'react';
import Link from 'next/link';
import { wallets } from '../../lib/walletData';

const WalletCard = ({ wallet }: { wallet: typeof wallets[0] }) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 9.0) return 'bg-green-50 text-green-700';
    if (rating >= 7.5) return 'bg-yellow-50 text-yellow-700';
    return 'bg-red-50 text-red-700';
  };

  return (
    <article className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl hover:shadow-orange-500/5 hover:border-orange-200 transition-all duration-300 group flex flex-col h-full">
      <div className="p-6 pb-0 flex items-start justify-between">
        <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 overflow-hidden">
          <img src={wallet.image} alt={wallet.name} className="w-full h-full object-contain p-1" />
        </div>
        <div className="flex items-center gap-2">
          {wallet.bitcoinOnly ? (
            <span className="px-2 py-0.5 bg-orange-50 text-[#F7931A] text-xs font-semibold rounded">Bitcoin-Only</span>
          ) : (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-semibold rounded">Multi-coin</span>
          )}
          <div className={`flex items-center gap-1 px-2 py-1 rounded ${getRatingColor(wallet.rating)}`}>
            <span className="text-sm font-bold">{wallet.rating}</span>
            <i className="ph-fill ph-star text-xs"></i>
          </div>
        </div>
      </div>

      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F7931A] transition-colors">{wallet.name}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{wallet.pros[0]}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {wallet.tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-3 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Price</span>
            <span className="font-medium text-gray-900">${wallet.price}</span>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <a
          href={wallet.storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2.5 rounded-lg border border-gray-200 font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          View Product
        </a>
      </div>
    </article>
  );
};

export default function WalletList() {
  const [activeFilter, setActiveFilter] = useState('All Wallets');

  const filters = ['All Wallets', 'Bitcoin-Only', 'Air-Gapped', 'Budget', 'Premium'];

  // Sort wallets by rating
  const sortedWallets = [...wallets].sort((a, b) => b.rating - a.rating);

  // Filter wallets based on active filter
  const filteredWallets = sortedWallets.filter(wallet => {
    switch (activeFilter) {
      case 'Bitcoin-Only':
        return wallet.bitcoinOnly;
      case 'Air-Gapped':
        return wallet.tags.some(tag => tag.toLowerCase().includes('air-gapped') || tag.toLowerCase().includes('air gapped'));
      case 'Budget':
        return wallet.price < 100;
      case 'Premium':
        return wallet.price >= 200;
      default:
        return true;
    }
  });

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">All Hardware Wallet Reviews</h3>
            <p className="text-gray-500 mt-2">Every wallet rated. Bitcoin-only gets bonus points. Altcoin support? That&apos;s a red flag.</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWallets.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/wallets"
            className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-[#F7931A] hover:text-[#F7931A] transition-all inline-block"
          >
            View Full Rankings
          </Link>
        </div>
      </div>
    </section>
  );
}

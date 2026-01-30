import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { wallets } from '../../lib/walletData';

export default function WalletsPage() {
  // Sort wallets by rating (highest first)
  const sortedWallets = [...wallets].sort((a, b) => b.rating - a.rating);

  const getRatingColor = (rating: number) => {
    if (rating >= 9.0) return 'bg-green-500';
    if (rating >= 8.0) return 'bg-green-400';
    if (rating >= 7.0) return 'bg-yellow-500';
    return 'bg-red-400';
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 9.5) return { text: 'Elite', color: 'bg-green-100 text-green-800' };
    if (rating >= 9.0) return { text: 'Excellent', color: 'bg-green-50 text-green-700' };
    if (rating >= 8.0) return { text: 'Great', color: 'bg-blue-50 text-blue-700' };
    if (rating >= 7.0) return { text: 'Good', color: 'bg-yellow-50 text-yellow-700' };
    return { text: 'Meh', color: 'bg-gray-100 text-gray-600' };
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hardware Wallet Rankings
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Our definitive ranking of Bitcoin hardware wallets. Bitcoin-only wallets get priority.
              Altcoin support is a liability, not a feature.
            </p>
          </div>
        </section>

        {/* Rankings List */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="space-y-4">
            {sortedWallets.map((wallet, index) => {
              const badge = getRatingBadge(wallet.rating);
              const rank = index + 1;

              return (
                <article
                  key={wallet.id}
                  className={`bg-white rounded-2xl border ${
                    rank === 1 ? 'border-[#F7931A] ring-2 ring-[#F7931A]/20' : 'border-gray-200'
                  } hover:shadow-lg hover:border-[#F7931A]/50 transition-all duration-300`}
                >
                  <div className="p-6 flex flex-col md:flex-row md:items-center gap-6">
                    {/* Rank Badge */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-2xl ${
                          rank === 1
                            ? 'bg-[#F7931A] text-white'
                            : rank <= 3
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        #{rank}
                      </div>
                    </div>

                    {/* Wallet Image */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 overflow-hidden">
                        <img
                          src={wallet.image}
                          alt={wallet.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                    </div>

                    {/* Wallet Info */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-gray-900">{wallet.name}</h2>
                        {wallet.bitcoinOnly && (
                          <span className="px-2 py-0.5 bg-orange-50 text-[#F7931A] text-xs font-semibold rounded">
                            Bitcoin-Only
                          </span>
                        )}
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded ${badge.color}`}>
                          {badge.text}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {wallet.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-gray-500 line-clamp-1">
                        {wallet.pros[0]}
                      </p>
                    </div>

                    {/* Rating & Price */}
                    <div className="flex-shrink-0 flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-400 mb-1">Price</div>
                        <div className="text-lg font-bold text-gray-900">${wallet.price}</div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm text-gray-400 mb-1">Rating</div>
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-3 h-3 rounded-full ${getRatingColor(wallet.rating)}`}
                          ></div>
                          <span className="text-lg font-bold text-gray-900">{wallet.rating}</span>
                        </div>
                      </div>

                      <Link
                        href={`/wallets/${wallet.id}`}
                        className="px-5 py-2.5 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors text-sm whitespace-nowrap"
                      >
                        Read Review
                      </Link>
                    </div>
                  </div>

                  {/* Top Pick Highlight */}
                  {rank === 1 && (
                    <div className="px-6 pb-6 pt-0">
                      <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                        <div className="flex items-center gap-2 text-[#F7931A] font-semibold mb-2">
                          <i className="ph-fill ph-crown text-xl"></i>
                          Our Top Pick
                        </div>
                        <p className="text-sm text-gray-700">
                          The {wallet.name} combines everything we look for: air-gapped security,
                          open-source transparency, and a Bitcoin-only focus. No compromises.
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Not Sure Which to Pick?
              </h3>
              <p className="text-gray-500 mb-6 max-w-lg mx-auto">
                Use our comparison tool to see how wallets stack up against each other.
                Spoiler: Bitcoin-only always wins.
              </p>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F7931A] text-white font-bold hover:bg-[#E8820B] transition-colors"
              >
                <i className="ph-bold ph-git-diff"></i>
                Compare Wallets
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

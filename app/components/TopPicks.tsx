import Link from 'next/link';
import { wallets } from '../../lib/walletData';

const TopPickCard = ({ rank, wallet }: { rank: number; wallet: typeof wallets[0] }) => {
  const isFirst = rank === 1;

  return (
    <article className={`bg-white rounded-2xl border ${isFirst ? 'border-[#F7931A] ring-2 ring-[#F7931A]/20' : 'border-gray-200'} hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group flex flex-col h-full relative overflow-hidden`}>
      {isFirst && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F7931A] to-orange-500"></div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isFirst ? 'bg-[#F7931A] text-white' : 'bg-gray-100 text-gray-700'}`}>
              #{rank}
            </span>
            {isFirst && (
              <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-semibold rounded">Editor&apos;s Choice</span>
            )}
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded">{wallet.rating}/10</span>
          </div>
          {wallet.bitcoinOnly && (
            <span className="px-2 py-0.5 bg-orange-50 text-[#F7931A] text-xs font-semibold rounded">Bitcoin-Only</span>
          )}
        </div>

        <div className="aspect-[4/3] bg-gray-50 rounded-xl mb-4 flex items-center justify-center border border-gray-100 overflow-hidden">
          <img src={wallet.image} alt={wallet.name} className="w-full h-full object-contain p-4" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#F7931A] transition-colors">{wallet.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{wallet.pros[0]}</p>

        <ul className="space-y-2 mb-4">
          {wallet.pros.slice(1, 4).map((pro, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
              <i className="ph-fill ph-check-circle text-green-500"></i>
              {pro}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <span className="text-lg font-bold text-gray-900">${wallet.price}</span>
          <a
            href={wallet.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isFirst ? 'bg-[#F7931A] text-white hover:bg-[#E8820B]' : 'border border-gray-200 text-gray-700 hover:border-[#F7931A] hover:text-[#F7931A]'}`}
          >
            Buy Now
          </a>
        </div>
      </div>
    </article>
  );
};

export default function TopPicks() {
  // Get top 3 wallets by rating
  const topWallets = [...wallets]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <section className="bg-gray-50 py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F7931A] animate-pulse"></span>
              <span className="text-xs font-semibold text-[#F7931A] uppercase tracking-wide">Updated for 2026</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Our Favorite Hardware Wallets</h2>
            <p className="text-gray-500 mt-2 max-w-xl">After extensive testing, these are the Bitcoin hardware wallets we recommend. All Bitcoin-only. All based.</p>
          </div>
          <Link href="/wallets" className="text-[#F7931A] font-medium hover:text-[#E8820B] flex items-center gap-2 whitespace-nowrap">
            View All Rankings <i className="ph-bold ph-arrow-right"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topWallets.map((wallet, index) => (
            <TopPickCard key={wallet.id} rank={index + 1} wallet={wallet} />
          ))}
        </div>
      </div>
    </section>
  );
}

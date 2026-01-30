'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import WalletBattle from '../components/WalletBattle';
import { wallets } from '../../lib/walletData';

interface WalletFeatures {
  id: string;
  name: string;
  price: number;
  bitcoinOnly: boolean;
  openSource: boolean;
  airGapped: boolean;
  secureElement: boolean;
  qrCodes: boolean;
  multisig: boolean;
  passphrase: boolean;
  screenVerification: boolean;
  diyOption: boolean;
}

const walletFeatures: WalletFeatures[] = [
  {
    id: 'jade-plus',
    name: 'Blockstream Jade Plus',
    price: 149,
    bitcoinOnly: true,
    openSource: true,
    airGapped: true,
    secureElement: true,
    qrCodes: true,
    multisig: true,
    passphrase: true,
    screenVerification: true,
    diyOption: false,
  },
  {
    id: 'coldcard-mk4',
    name: 'Coldcard Mk4',
    price: 157,
    bitcoinOnly: true,
    openSource: true,
    airGapped: true,
    secureElement: true,
    qrCodes: false,
    multisig: true,
    passphrase: true,
    screenVerification: true,
    diyOption: false,
  },
  {
    id: 'bitbox02',
    name: 'BitBox02 Bitcoin-Only',
    price: 149,
    bitcoinOnly: true,
    openSource: true,
    airGapped: false,
    secureElement: true,
    qrCodes: false,
    multisig: true,
    passphrase: true,
    screenVerification: true,
    diyOption: false,
  },
  {
    id: 'foundation-passport',
    name: 'Foundation Passport',
    price: 299,
    bitcoinOnly: true,
    openSource: true,
    airGapped: true,
    secureElement: true,
    qrCodes: true,
    multisig: true,
    passphrase: true,
    screenVerification: true,
    diyOption: false,
  },
  {
    id: 'seedsigner',
    name: 'SeedSigner',
    price: 50,
    bitcoinOnly: true,
    openSource: true,
    airGapped: true,
    secureElement: false,
    qrCodes: true,
    multisig: true,
    passphrase: true,
    screenVerification: true,
    diyOption: true,
  },
  {
    id: 'bitkey',
    name: 'Bitkey',
    price: 150,
    bitcoinOnly: true,
    openSource: false,
    airGapped: false,
    secureElement: true,
    qrCodes: false,
    multisig: true,
    passphrase: false,
    screenVerification: false,
    diyOption: false,
  },
  {
    id: 'ngrave-zero',
    name: 'NGRAVE ZERO',
    price: 398,
    bitcoinOnly: false,
    openSource: false,
    airGapped: true,
    secureElement: true,
    qrCodes: true,
    multisig: true,
    passphrase: true,
    screenVerification: true,
    diyOption: false,
  },
  {
    id: 'trezor-safe-3',
    name: 'Trezor Safe 3',
    price: 79,
    bitcoinOnly: false,
    openSource: true,
    airGapped: false,
    secureElement: true,
    qrCodes: false,
    multisig: true,
    passphrase: true,
    screenVerification: true,
    diyOption: false,
  },
  {
    id: 'keystone-3-pro',
    name: 'Keystone 3 Pro',
    price: 169,
    bitcoinOnly: false,
    openSource: false,
    airGapped: true,
    secureElement: true,
    qrCodes: true,
    multisig: true,
    passphrase: true,
    screenVerification: true,
    diyOption: false,
  },
  {
    id: 'tangem',
    name: 'Tangem',
    price: 69,
    bitcoinOnly: false,
    openSource: false,
    airGapped: false,
    secureElement: true,
    qrCodes: false,
    multisig: false,
    passphrase: false,
    screenVerification: false,
    diyOption: false,
  },
  {
    id: 'ledger-nano-x',
    name: 'Ledger Nano X',
    price: 149,
    bitcoinOnly: false,
    openSource: false,
    airGapped: false,
    secureElement: true,
    qrCodes: false,
    multisig: true,
    passphrase: true,
    screenVerification: true,
    diyOption: false,
  },
  {
    id: 'secux-v20',
    name: 'SecuX V20',
    price: 139,
    bitcoinOnly: false,
    openSource: false,
    airGapped: false,
    secureElement: true,
    qrCodes: false,
    multisig: false,
    passphrase: true,
    screenVerification: true,
    diyOption: false,
  },
];

// Get ratings and prices from walletData and merge with features
const walletsWithRatings = walletFeatures.map(wallet => {
  const walletData = wallets.find(w => w.id === wallet.id);
  return {
    ...wallet,
    rating: walletData?.rating || 0,
    price: walletData?.price || wallet.price,
  };
});
const sortedWallets = [...walletsWithRatings].sort((a, b) => b.rating - a.rating);

const Check = () => (
  <div className="flex items-center justify-center">
    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
      <i className="ph-bold ph-check text-green-600 text-sm"></i>
    </div>
  </div>
);

const X = () => (
  <div className="flex items-center justify-center">
    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
      <i className="ph-bold ph-x text-red-500 text-sm"></i>
    </div>
  </div>
);

export default function ComparePage() {
  const columns = [
    { key: 'bitcoinOnly', label: 'Bitcoin-Only', tooltip: 'No altcoin support means smaller attack surface' },
    { key: 'openSource', label: 'Open Source', tooltip: 'Firmware and hardware can be verified' },
    { key: 'airGapped', label: 'Air-Gapped', tooltip: 'No USB or Bluetooth required for signing' },
    { key: 'secureElement', label: 'Secure Element', tooltip: 'Hardware chip to protect private keys' },
    { key: 'qrCodes', label: 'QR Codes', tooltip: 'Communicate via camera instead of USB' },
    { key: 'multisig', label: 'Multisig', tooltip: 'Support for multi-signature setups' },
    { key: 'passphrase', label: 'Passphrase', tooltip: '25th word support for extra security' },
    { key: 'screenVerification', label: 'Screen', tooltip: 'Built-in screen to verify transactions' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hardware Wallet Comparison
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              The complete feature breakdown. Green means good. Red means bad.
              Find the wallet that meets your security needs.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-900 w-[180px]">
                    Wallet
                  </th>
                  <th className="py-4 px-3 font-bold text-gray-900 text-center w-[70px]">
                    Price
                  </th>
                  <th className="py-4 px-3 font-bold text-gray-900 text-center w-[70px] relative group">
                    <span className="inline-flex items-center gap-1 cursor-help">
                      Rating
                      <i className="ph ph-info text-gray-400 text-sm"></i>
                    </span>
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 p-3 bg-gray-900 text-white text-xs font-normal text-center rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <p>Vibes based ranking. My decision making is centralized. Bitcoin is not. Deal with it.</p>
                      <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-900"></div>
                    </div>
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="py-4 px-2 font-bold text-gray-900 text-center text-sm"
                      title={col.tooltip}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedWallets.map((wallet) => {
                  const isTopPick = wallet.id === 'jade-plus';
                  const isBitcoinOnly = wallet.bitcoinOnly;

                  return (
                    <tr
                      key={wallet.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        isTopPick ? 'bg-orange-50/50' : ''
                      }`}
                    >
                      <td className={`py-4 px-4 ${isTopPick ? 'bg-orange-50/50' : 'bg-white'}`}>
                        <a
                          href={wallets.find(w => w.id === wallet.id)?.storeUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 group/link"
                        >
                          <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img
                              src={wallets.find(w => w.id === wallet.id)?.image || '/wallets/placeholder.png'}
                              alt={wallet.name}
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-gray-900 text-sm group-hover/link:text-[#F7931A] transition-colors">{wallet.name}</span>
                              <i className="ph ph-arrow-square-out text-gray-400 text-xs group-hover/link:text-[#F7931A] transition-colors"></i>
                              {isTopPick && (
                                <span className="px-1.5 py-0.5 bg-[#F7931A] text-white text-[10px] font-bold rounded whitespace-nowrap">
                                  TOP PICK
                                </span>
                              )}
                            </div>
                            {isBitcoinOnly && (
                              <span className="text-[10px] text-[#F7931A] font-medium">Bitcoin-Only</span>
                            )}
                          </div>
                        </a>
                      </td>
                      <td className="py-4 px-3 text-center">
                        <span className="font-semibold text-gray-900">${wallet.price}</span>
                      </td>
                      <td className="py-4 px-3 text-center">
                        <span
                          className={`font-bold ${
                            wallet.rating >= 9.0
                              ? 'text-green-600'
                              : wallet.rating >= 7.5
                              ? 'text-yellow-600'
                              : 'text-red-500'
                          }`}
                        >
                          {wallet.rating}
                        </span>
                      </td>
                      <td className="py-4 px-2">{wallet.bitcoinOnly ? <Check /> : <X />}</td>
                      <td className="py-4 px-2">{wallet.openSource ? <Check /> : <X />}</td>
                      <td className="py-4 px-2">{wallet.airGapped ? <Check /> : <X />}</td>
                      <td className="py-4 px-2">{wallet.secureElement ? <Check /> : <X />}</td>
                      <td className="py-4 px-2">{wallet.qrCodes ? <Check /> : <X />}</td>
                      <td className="py-4 px-2">{wallet.multisig ? <Check /> : <X />}</td>
                      <td className="py-4 px-2">{wallet.passphrase ? <Check /> : <X />}</td>
                      <td className="py-4 px-2">{wallet.screenVerification ? <Check /> : <X />}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Feature Explanations */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Do These Features Mean?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ph-bold ph-currency-btc text-[#F7931A] text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Bitcoin-Only</h3>
                <p className="text-sm text-gray-500">
                  No altcoin support means a smaller codebase, fewer bugs, and less attack surface. Focus is a feature.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ph-bold ph-code text-[#F7931A] text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Open Source</h3>
                <p className="text-sm text-gray-500">
                  Anyone can audit the code. No trust required. If you cannot verify it, do not use it for serious money.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ph-bold ph-wifi-slash text-[#F7931A] text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Air-Gapped</h3>
                <p className="text-sm text-gray-500">
                  Never connects directly to a computer. Transactions happen via QR codes or SD card. Maximum isolation.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ph-bold ph-shield-check text-[#F7931A] text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Secure Element</h3>
                <p className="text-sm text-gray-500">
                  Dedicated chip that protects your keys from physical extraction. Essential for hardware security.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ph-bold ph-qr-code text-[#F7931A] text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">QR Codes</h3>
                <p className="text-sm text-gray-500">
                  Communicate transaction data via camera instead of USB cables. Enables true air-gapped operation.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ph-bold ph-users-three text-[#F7931A] text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Multisig</h3>
                <p className="text-sm text-gray-500">
                  Support for multi-signature setups requiring multiple keys to sign. Essential for serious security.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ph-bold ph-password text-[#F7931A] text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Passphrase</h3>
                <p className="text-sm text-gray-500">
                  Support for a 25th word that creates hidden wallets. Adds plausible deniability and extra security.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ph-bold ph-monitor text-[#F7931A] text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Screen</h3>
                <p className="text-sm text-gray-500">
                  Built-in display to verify transaction details before signing. Never trust your computer, verify on device.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Wallet Battle Section */}
        <WalletBattle />
      </main>
      <Footer />
    </>
  );
}

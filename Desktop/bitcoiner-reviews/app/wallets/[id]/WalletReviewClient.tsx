'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { wallets, getWalletById } from '../../../lib/walletData';
import { walletDetails } from '../../../lib/walletDetails';

interface WalletReviewClientProps {
  walletId: string;
}

export default function WalletReviewClient({ walletId }: WalletReviewClientProps) {
  const [compareWalletId, setCompareWalletId] = useState<string>('');

  const wallet = getWalletById(walletId)!;
  const details = walletDetails[walletId];

  // Get wallet rank
  const sortedWallets = [...wallets].sort((a, b) => b.rating - a.rating);
  const rank = sortedWallets.findIndex(w => w.id === wallet.id) + 1;

  // Get other wallets for comparison dropdown
  const otherWallets = wallets.filter(w => w.id !== wallet.id);

  // Get comparison data
  const selectedComparison = compareWalletId && details?.vsComparisons?.[compareWalletId];
  const comparedWallet = compareWalletId ? getWalletById(compareWalletId) : null;

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'major':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      default:
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'ph-fill ph-warning-octagon';
      case 'major':
        return 'ph-fill ph-warning';
      default:
        return 'ph-fill ph-info';
    }
  };

  // Check if wallet has duress PIN
  const hasDuressPin = wallet.tags.includes('Duress PIN') || walletId === 'coldcard-mk4';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <article className="max-w-3xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-[#F7931A]">Home</Link>
            <span>/</span>
            <Link href="/wallets" className="hover:text-[#F7931A]">Wallets</Link>
            <span>/</span>
            <span className="text-gray-600">{wallet.name}</span>
          </div>

          {/* Header Section */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {wallet.bitcoinOnly ? (
                <span className="text-xs uppercase tracking-wide text-[#F7931A] font-medium">Bitcoin-Only</span>
              ) : (
                <span className="text-xs uppercase tracking-wide text-gray-400 font-medium">Multi-Coin</span>
              )}
              <span className="text-gray-300">·</span>
              <span className="text-xs uppercase tracking-wide text-gray-400 font-medium">Hardware Wallet Review</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {wallet.name} Review
            </h1>

            <p className="text-xl text-gray-500 mb-6 leading-relaxed">
              {details?.tagline || (wallet.bitcoinOnly
                ? `A Bitcoin-only hardware wallet. Here's what you need to know.`
                : `A multi-coin hardware wallet. Here's my honest take.`
              )}
            </p>

            {/* Quick Stats Bar */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Rank:</span>
                <span className="font-semibold text-gray-900">#{rank} of {wallets.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Rating:</span>
                <span className={`font-semibold ${wallet.rating >= 7 ? 'text-gray-900' : 'text-red-600'}`}>{wallet.rating}/10</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Price:</span>
                <span className="font-semibold text-gray-900">${wallet.price}</span>
              </div>
            </div>
          </header>

          {/* Product Image */}
          <div className="mb-12">
            <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center">
              <img
                src={wallet.image}
                alt={wallet.name}
                className="max-h-64 object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">

            {/* Unique Intro */}
            <p className="text-gray-600 leading-relaxed">
              {details?.uniqueIntro || (
                `The ${wallet.name} is ${wallet.bitcoinOnly ? 'a Bitcoin-only' : 'a multi-coin'} hardware wallet priced at $${wallet.price}. ${wallet.tags.includes('Air-gapped') || wallet.tags.includes('Air-Gapped')
                  ? 'It supports air-gapped operation, which means it can sign transactions without ever connecting to a computer directly.'
                  : 'It requires a USB or Bluetooth connection to sign transactions.'
                }`
              )}
            </p>

            {wallet.bitcoinOnly ? (
              <p className="text-gray-600 leading-relaxed">
                {details?.bitcoinOnlyPhilosophy || 'Being Bitcoin-only is a feature, not a limitation. Less code means fewer bugs and a smaller attack surface. The developers can focus on doing one thing well instead of spreading themselves thin across thousands of tokens.'}
              </p>
            ) : (
              <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <i className="ph-fill ph-warning text-red-500 text-xl mt-0.5"></i>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Multi-Coin Warning</h4>
                    <p className="text-red-700 text-sm leading-relaxed">
                      Supporting multiple cryptocurrencies means more code, more complexity, and more potential vulnerabilities.
                      Most altcoins are scams anyway. The wallet makers who support them are prioritizing sales over your security.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Company Background */}
            {details && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">About {details.company}</h2>

                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                    <div>
                      <span className="text-gray-400 block mb-1">Company</span>
                      <span className="text-gray-900 font-medium">{details.company}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">Founded</span>
                      <span className="text-gray-900 font-medium">{details.founded}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">Headquarters</span>
                      <span className="text-gray-900 font-medium">{details.headquarters}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">Firmware</span>
                      <span className="text-gray-900 font-medium">
                        {details.firmwareType.includes('open-source') ? 'Open Source' : 'Closed Source'}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Security Architecture */}
            {details && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Security Architecture</h2>

                <p className="text-gray-600 leading-relaxed">
                  {details.securityModel}
                </p>

                <div className="bg-gray-50 rounded-xl overflow-hidden mt-6">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-gray-500 font-medium">Secure Element</td>
                        <td className="px-6 py-4 text-gray-900">{details.secureElement}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-gray-500 font-medium">Connection Methods</td>
                        <td className="px-6 py-4 text-gray-900">{details.connectionMethods.join(', ')}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-gray-500 font-medium">Display</td>
                        <td className="px-6 py-4 text-gray-900">{details.displaySize}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-gray-500 font-medium">Passphrase Support</td>
                        <td className="px-6 py-4 text-gray-900">{details.supportsPassphrase ? 'Yes' : 'No'}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 text-gray-500 font-medium">Multisig Support</td>
                        <td className="px-6 py-4 text-gray-900">{details.supportsMultisig ? 'Yes' : 'No'}</td>
                      </tr>
                      {hasDuressPin && (
                        <tr>
                          <td className="px-6 py-4 text-gray-500 font-medium">Duress PIN</td>
                          <td className="px-6 py-4 text-gray-900">Yes</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* Security Incidents & Controversies */}
            {details && details.incidents && details.incidents.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
                  <i className="ph-fill ph-warning-octagon text-red-500"></i>
                  Security Incidents & Controversies
                </h2>

                <p className="text-gray-600">
                  Every company makes mistakes. What matters is how severe they are and what they reveal about priorities. Here&apos;s {details.company}&apos;s track record:
                </p>

                <div className="space-y-4 mt-6">
                  {details.incidents.map((incident, i) => (
                    <div key={i} className={`border rounded-xl p-6 ${getSeverityStyles(incident.severity)}`}>
                      <div className="flex items-start gap-3">
                        <i className={`${getSeverityIcon(incident.severity)} text-xl mt-0.5`}></i>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold">{incident.title}</span>
                            <span className="text-xs uppercase tracking-wide opacity-70">{incident.date}</span>
                            <span className="text-xs uppercase font-semibold px-2 py-0.5 rounded bg-white/50">
                              {incident.severity}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed opacity-90">
                            {incident.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Trust Factors */}
            {details && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Trust Assessment</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Positive Factors */}
                  <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                    <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                      <i className="ph-fill ph-check-circle"></i>
                      Reasons to Trust
                    </h3>
                    <ul className="space-y-3">
                      {details.trustFactors.positive.map((factor, i) => (
                        <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                          <i className="ph-bold ph-check text-green-500 mt-0.5 flex-shrink-0"></i>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Negative Factors */}
                  <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                    <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                      <i className="ph-fill ph-x-circle"></i>
                      Concerns
                    </h3>
                    <ul className="space-y-3">
                      {details.trustFactors.negative.map((factor, i) => (
                        <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                          <i className="ph-bold ph-x text-red-500 mt-0.5 flex-shrink-0"></i>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}

            {/* Detailed Pros */}
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">What&apos;s Good</h2>

            {details?.detailedPros ? (
              <div className="space-y-6">
                {details.detailedPros.map((pro, i) => (
                  <div key={i} className="border-l-4 border-green-400 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">{pro.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{pro.explanation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {wallet.pros.map((pro, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">
                    <strong className="text-gray-900">{pro.split(' ').slice(0, 3).join(' ')}</strong> — {pro}
                  </p>
                ))}
              </div>
            )}

            {/* Detailed Cons - Skip for Jade Plus */}
            {walletId !== 'jade-plus' && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">What Could Be Better</h2>

                {details?.detailedCons && details.detailedCons.length > 0 ? (
                  <div className="space-y-6">
                    {details.detailedCons.map((con, i) => (
                      <div key={i} className="border-l-4 border-red-400 pl-6">
                        <h4 className="font-semibold text-gray-900 mb-2">{con.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{con.explanation}</p>
                      </div>
                    ))}
                  </div>
                ) : wallet.cons.length > 0 ? (
                  <div className="space-y-4">
                    {wallet.cons.map((con, i) => (
                      <p key={i} className="text-gray-600 leading-relaxed">{con}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    Honestly? Not much to complain about here. This wallet does what it&apos;s supposed to do
                    and does it well. No major red flags.
                  </p>
                )}
              </>
            )}

            {/* Best For */}
            {details?.bestFor && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Best For</h2>

                <div className="bg-gray-50 rounded-xl p-6">
                  <ul className="space-y-3">
                    {details.bestFor.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <i className="ph-fill ph-user text-[#F7931A] mt-0.5"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* FAQ Section */}
            {details?.faq && details.faq.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Frequently Asked Questions</h2>

                <div className="space-y-4">
                  {details.faq.map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Specs Overview - Moved above Verdict */}
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Specs Overview</h2>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-gray-400 block mb-1">Price</span>
                  <p className="text-gray-900 font-medium">${wallet.price}</p>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Rating</span>
                  <p className="text-gray-900 font-medium">{wallet.rating}/10</p>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Type</span>
                  <p className="text-gray-900 font-medium">{wallet.bitcoinOnly ? 'Bitcoin-Only' : 'Multi-Coin'}</p>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Features</span>
                  <p className="text-gray-900 font-medium">{wallet.tags.join(', ')}</p>
                </div>
                {details && (
                  <>
                    <div>
                      <span className="text-gray-400 block mb-1">Display</span>
                      <p className="text-gray-900 font-medium">{details.displaySize}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">Connection</span>
                      <p className="text-gray-900 font-medium">{details.connectionMethods.join(', ')}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Verdict */}
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">The Verdict</h2>

            {wallet.bitcoinOnly ? (
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {details?.editorialVerdict || `The ${wallet.name} is a solid choice for anyone serious about securing their bitcoin. At $${wallet.price}, you're getting ${wallet.rating >= 9 ? 'one of the best options on the market' : wallet.rating >= 8 ? 'a very capable device' : 'a decent entry point'}.`}
                </p>

                {wallet.rating >= 9 && (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-6 mt-6">
                    <div className="flex items-start gap-3">
                      <i className="ph-fill ph-seal-check text-green-500 text-xl mt-0.5"></i>
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">Recommended</h4>
                        <p className="text-green-700 text-sm leading-relaxed">
                          This is one of my top recommendations. If you&apos;re looking for a Bitcoin hardware wallet,
                          you can&apos;t go wrong here.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Buy Button for Bitcoin-only wallets */}
                <div className="mt-8">
                  <a
                    href={wallet.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors bg-[#F7931A] text-white hover:bg-[#E8820B]"
                  >
                    Buy {wallet.name}
                    <span className="opacity-60">→</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Look, the {wallet.name} isn&apos;t a bad device from a pure hardware perspective.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  It has {wallet.tags.slice(0, 2).join(' and ').toLowerCase()}. Some people will like that.
                </p>

                <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <i className="ph-fill ph-warning text-red-500 text-xl mt-0.5"></i>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">Not Recommended</h4>
                      <p className="text-red-700 text-sm leading-relaxed">
                        I don&apos;t recommend multi-coin wallets. The attack surface is larger,
                        the codebase is more complex, and most altcoins are scams. At ${wallet.price}, there are Bitcoin-only alternatives that will serve you better.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bitcoin-only message instead of Buy button */}
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mt-6">
                  <div className="flex items-start gap-3">
                    <i className="ph-fill ph-lightbulb text-[#F7931A] text-xl mt-0.5"></i>
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">Bitcoin-only, dummy.</h4>
                      <p className="text-orange-700 text-sm leading-relaxed">
                        I&apos;m not going to help you buy a multi-coin wallet. Check out my{' '}
                        <Link href="/bitcoin-only" className="text-[#F7931A] font-semibold hover:underline">
                          Bitcoin-only recommendations
                        </Link>{' '}
                        instead.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* How It Compares - Interactive */}
            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">How It Compares</h2>

            <div className="bg-gray-50 rounded-xl p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Compare {wallet.name} to:
              </label>
              <select
                value={compareWalletId}
                onChange={(e) => setCompareWalletId(e.target.value)}
                className="w-full md:w-auto px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#F7931A] focus:border-transparent"
              >
                <option value="">Select a wallet...</option>
                {otherWallets.map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>

              {/* Comparison Result */}
              {compareWalletId && comparedWallet && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 text-center">
                      <div className="w-16 h-16 bg-white rounded-xl mx-auto mb-2 flex items-center justify-center border border-gray-100 overflow-hidden">
                        <img src={wallet.image} alt={wallet.name} className="w-12 h-12 object-contain" />
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{wallet.name}</p>
                      <p className={`text-lg font-bold ${wallet.rating >= 7 ? 'text-green-600' : 'text-red-600'}`}>
                        {wallet.rating}/10
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-gray-400">vs</div>
                    <div className="flex-1 text-center">
                      <div className="w-16 h-16 bg-white rounded-xl mx-auto mb-2 flex items-center justify-center border border-gray-100 overflow-hidden">
                        <img src={comparedWallet.image} alt={comparedWallet.name} className="w-12 h-12 object-contain" />
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{comparedWallet.name}</p>
                      <p className={`text-lg font-bold ${comparedWallet.rating >= 7 ? 'text-green-600' : 'text-red-600'}`}>
                        {comparedWallet.rating}/10
                      </p>
                    </div>
                  </div>

                  {/* Quick Breakdown */}
                  <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <span className="text-gray-400 block mb-1">Price</span>
                      <div className="flex justify-between">
                        <span className="font-medium">${wallet.price}</span>
                        <span className="font-medium">${comparedWallet.price}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <span className="text-gray-400 block mb-1">Type</span>
                      <div className="flex justify-between">
                        <span className={`font-medium ${wallet.bitcoinOnly ? 'text-[#F7931A]' : 'text-gray-500'}`}>
                          {wallet.bitcoinOnly ? 'BTC Only' : 'Multi'}
                        </span>
                        <span className={`font-medium ${comparedWallet.bitcoinOnly ? 'text-[#F7931A]' : 'text-gray-500'}`}>
                          {comparedWallet.bitcoinOnly ? 'BTC Only' : 'Multi'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedComparison ? (
                    <>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-xs uppercase tracking-wide text-green-600 font-semibold mb-2 block">
                            {wallet.name} Advantages
                          </span>
                          <ul className="space-y-1">
                            {selectedComparison.advantages.slice(0, 3).map((adv, i) => (
                              <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                <i className="ph-bold ph-plus text-green-500 mt-0.5 flex-shrink-0"></i>
                                <span>{adv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-xs uppercase tracking-wide text-red-600 font-semibold mb-2 block">
                            {wallet.name} Disadvantages
                          </span>
                          <ul className="space-y-1">
                            {selectedComparison.disadvantages.slice(0, 3).map((dis, i) => (
                              <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                <i className="ph-bold ph-minus text-red-500 mt-0.5 flex-shrink-0"></i>
                                <span>{dis}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 italic border-t border-gray-200 pt-4 mb-4">
                        {selectedComparison.verdict}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 mb-4">
                      Detailed comparison data not available for this pairing.
                    </p>
                  )}

                  <Link
                    href={`/compare?wallet1=${wallet.id}&wallet2=${compareWalletId}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
                  >
                    Get the Full Breakdown
                    <i className="ph-bold ph-arrow-right"></i>
                  </Link>
                </div>
              )}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 font-medium rounded-lg hover:border-gray-300 transition-colors"
                >
                  Compare All Wallets
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

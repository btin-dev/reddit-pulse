'use client';

import { useState } from 'react';
import Image from 'next/image';

const Button = ({ children, variant = 'primary', className = '', ...props }: {
  children: React.ReactNode;
  variant?: 'primary' | 'orange' | 'outlined';
  className?: string;
  [key: string]: unknown;
}) => {
  const baseClasses = 'px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2';
  const variants = {
    primary: 'bg-gray-900 hover:bg-gray-800 text-white',
    orange: 'bg-[#F7931A] hover:bg-[#E8820B] text-white shadow-lg shadow-orange-200',
    outlined: 'bg-white border border-gray-200 hover:border-gray-300 text-gray-700'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Bitcoin-Only Explanation Modal
const BitcoinOnlyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F7931A] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">₿</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why Bitcoin-Only?</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <i className="ph-bold ph-x text-gray-600"></i>
            </button>
          </div>

          {/* Content */}
          <div className="px-8 py-6 space-y-6">
            <div className="bg-orange-50 border-l-4 border-[#F7931A] p-4 rounded-r-lg">
              <p className="text-[#F7931A] font-semibold">
                The short answer: Every altcoin on your hardware wallet is an attack vector waiting to be exploited.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">The Security Argument</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Hardware wallets are supposed to do one thing: protect your private keys. Every additional cryptocurrency supported means additional code, additional complexity, and additional ways for things to go wrong.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Bitcoin-only firmware is dramatically smaller. Less code means fewer bugs, fewer vulnerabilities, and a smaller attack surface. When your life savings are on the line, simplicity is a feature.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">The Track Record</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Multi-coin wallets have a history of security issues stemming from their altcoin implementations. The Ledger Monero app vulnerability. The various EVM chain exploits. All complexity problems that Bitcoin-only devices simply don&apos;t have.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Bitcoin-only devices have maintained spotless security records. Coincidence? We think not.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">The Firmware Trust Issue</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                When a hardware wallet supports thousands of tokens, you&apos;re trusting that the developers properly implemented and audited every single one. You&apos;re trusting that some obscure altcoin&apos;s signing logic won&apos;t somehow compromise your Bitcoin keys.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With Bitcoin-only firmware, the entire codebase can be audited by Bitcoin developers who actually understand what they&apos;re looking at. The code is focused, purposeful, and verifiable.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">The Philosophical Reality</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Let&apos;s be real: altcoins are either outright scams, science experiments, or solutions looking for problems. They&apos;re certainly not something you should be storing long-term alongside the world&apos;s greatest form of money.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Bitcoin solved the money problem. It has the network effect, the security budget, the decentralization, and the 15-year track record. Everything else is noise designed to separate you from your sats.
              </p>
              <p className="text-gray-600 leading-relaxed">
                A Bitcoin-only hardware wallet is a statement that you understand what actually matters.
              </p>
            </div>

            <div className="bg-gray-900 text-white p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <i className="ph-fill ph-shield-check text-[#F7931A]"></i>
                The Bottom Line
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Your hardware wallet guards your financial sovereignty. Why would you compromise that security to store tokens that will be worthless in five years? Bitcoin-only means focus on what actually works.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Hero() {
  const [showBitcoinOnlyModal, setShowBitcoinOnlyModal] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100">
      <BitcoinOnlyModal isOpen={showBitcoinOnlyModal} onClose={() => setShowBitcoinOnlyModal(false)} />
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 max-w-2xl">
            <h2 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
              Secure the best. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931A] to-orange-600">Forget the rest.</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              We&apos;re on the hunt to find the best Bitcoin hardware.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button variant="orange" className="px-8 py-3.5 rounded-xl">
                Find Your Wallet
                <i className="ph-bold ph-caret-right"></i>
              </Button>
              <Button variant="outlined" className="px-8 py-3.5 rounded-xl" onClick={() => setShowBitcoinOnlyModal(true)}>
                Why Bitcoin-Only?
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-gray-100 pt-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-gray-900">15+</span>
                <span className="text-sm text-gray-500 font-medium">Wallets Tested</span>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-gray-900">0</span>
                <span className="text-sm text-gray-500 font-medium">Shitcoins Supported</span>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-[#F7931A]">₿</span>
                <span className="text-sm text-gray-500 font-medium">Blood Type</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full relative hidden lg:block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-50 rounded-full blur-3xl -z-10 opacity-60"></div>

            <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-100">
                    <Image
                      src="/images/jade-plus.png"
                      alt="Blockstream Jade Plus"
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Blockstream Jade Plus</h3>
                    <p className="text-sm text-gray-500">Hardware Wallet</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold text-[#F7931A]">10/10</span>
                  <div className="flex text-[#F7931A] text-xs">
                    {[...Array(5)].map((_, i) => <i key={i} className="ph-fill ph-star"></i>)}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between text-sm border-b border-gray-50 pb-3">
                  <span className="text-gray-600 flex items-center gap-2"><i className="ph ph-lock-key"></i> Security</span>
                  <span className="font-semibold text-gray-900">Air-gapped + Blind Oracle</span>
                </div>
                <div className="flex items-center justify-between text-sm border-b border-gray-50 pb-3">
                  <span className="text-gray-600 flex items-center gap-2"><i className="ph ph-code"></i> Code</span>
                  <span className="font-semibold text-gray-900">Fully Open Source</span>
                </div>
                <div className="flex items-center justify-between text-sm border-b border-gray-50 pb-3">
                  <span className="text-gray-600 flex items-center gap-2"><i className="ph ph-prohibit"></i> Shitcoins</span>
                  <span className="font-semibold text-green-600">None. Ever.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-green-50 text-green-700 text-xs font-semibold">Top Pick</span>
                <span className="px-3 py-1 rounded-md bg-orange-50 text-[#F7931A] text-xs font-semibold">Bitcoin-Only</span>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-4 bg-gray-900 text-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
              <i className="ph-fill ph-check-circle text-[#F7931A] text-xl"></i>
              <div className="text-xs">
                <div className="font-bold">Editor&apos;s Choice</div>
                <div className="text-gray-400">January 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

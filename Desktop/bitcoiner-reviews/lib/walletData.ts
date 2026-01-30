export interface Wallet {
  id: string;
  name: string;
  rating: number;
  bitcoinOnly: boolean;
  price: number;
  tags: string[];
  pros: string[];
  cons: string[];
  storeUrl: string;
  image: string;
}

export const wallets: Wallet[] = [
  {
    id: 'jade-plus',
    name: 'Blockstream Jade Plus',
    rating: 10.0,
    bitcoinOnly: true,
    price: 149,
    tags: ['Air-gapped', 'QR Codes', 'Open Source'],
    pros: [
      'Air-gapped via QR codes',
      'Virtual secure element with no backdoors',
      'Fully open-source firmware',
      'Bitcoin-only focus',
      'Excellent build quality',
    ],
    cons: [],
    storeUrl: 'https://store.blockstream.com/products/jade-plus',
    image: '/wallets/jade-plus.jpg',
  },
  {
    id: 'coldcard-mk4',
    name: 'Coldcard Mk4',
    rating: 9.5,
    bitcoinOnly: true,
    price: 178,
    tags: ['Air-gapped', 'MicroSD', 'Duress PIN'],
    pros: [
      'Fully air-gapped operation',
      'MicroSD for PSBT signing',
      'Duress PIN and brick features',
      'Bitcoin-only by design',
      'Paranoid-level security',
    ],
    cons: [
      'Industrial aesthetic',
      'Steeper learning curve',
    ],
    storeUrl: 'https://store.coinkite.com/store/coldcard',
    image: '/wallets/coldcard-mk4.png',
  },
  {
    id: 'seedsigner',
    name: 'SeedSigner',
    rating: 9.2,
    bitcoinOnly: true,
    price: 50,
    tags: ['DIY', 'Open Source', 'Stateless'],
    pros: [
      '100% open-source hardware and software',
      'Stateless: no keys stored on device',
      'Build it yourself for maximum trust',
      'Air-gapped via QR codes',
      'Extremely affordable',
    ],
    cons: [
      'Requires DIY assembly',
      'No commercial support',
    ],
    storeUrl: 'https://seedsigner.com/hardware/',
    image: '/wallets/seedsigner.png',
  },
  {
    id: 'bitbox02',
    name: 'BitBox02 Bitcoin-Only',
    rating: 9.5,
    bitcoinOnly: true,
    price: 150,
    tags: ['USB-C', 'Open Source', 'Multisig'],
    pros: [
      'Swiss-made quality',
      'Fully open-source',
      'Bitcoin-only edition available',
      'Excellent multisig support',
      'Simple and secure',
    ],
    cons: [
      'Requires USB connection',
      'No air-gap option',
    ],
    storeUrl: 'https://shop.bitbox.swiss/en/products/bitbox02-bitcoin-only-4/',
    image: '/wallets/bitbox02.png',
  },
  {
    id: 'foundation-passport',
    name: 'Foundation Passport',
    rating: 9.7,
    bitcoinOnly: true,
    price: 199,
    tags: ['Air-gapped', 'Open Source', 'Camera'],
    pros: [
      'Beautiful design and build',
      'Fully open-source',
      'Air-gapped via camera',
      'Premium materials',
      'Bitcoin-only focus',
    ],
    cons: [
      'Higher price point',
      'Larger form factor',
    ],
    storeUrl: 'https://foundation.xyz/passport-core/',
    image: '/wallets/foundation-passport.webp',
  },
  {
    id: 'bitkey',
    name: 'Bitkey',
    rating: 8.5,
    bitcoinOnly: true,
    price: 150,
    tags: ['Multisig', 'Mobile', 'Easy Recovery'],
    pros: [
      'Simple 2-of-3 multisig',
      'Easy recovery process',
      'Mobile-first design',
      'Good for beginners',
      'Bitcoin-only',
    ],
    cons: [
      'Relies on Block infrastructure',
      'Less sovereignty than others',
    ],
    storeUrl: 'https://bitkey.world/en-US/products/bitkey',
    image: '/wallets/bitkey.webp',
  },
  {
    id: 'trezor-safe-3',
    name: 'Trezor Safe 3',
    rating: 2.8,
    bitcoinOnly: false,
    price: 79,
    tags: ['Secure Element', 'Open Source', 'Touchscreen'],
    pros: [
      'Finally added a secure element',
      'Open-source firmware',
      'Affordable price point',
      'Good beginner device',
    ],
    cons: [
      'Supports altcoins (attack surface)',
      'No air-gap option',
      'Past security incidents',
    ],
    storeUrl: 'https://trezor.io/trezor-safe-3',
    image: '/wallets/trezor-safe-3.png',
  },
  {
    id: 'ledger-nano-x',
    name: 'Ledger Nano X',
    rating: 1.5,
    bitcoinOnly: false,
    price: 149,
    tags: ['Bluetooth', 'Closed Source', 'Multi-coin'],
    pros: [
      'Bluetooth connectivity',
      'Large coin support',
      'Mobile app integration',
    ],
    cons: [
      'Closed-source secure element',
      'Multi-coin bloat',
      'Firmware trust issues',
      'Recovery service controversy',
    ],
    storeUrl: 'https://shop.ledger.com/products/ledger-nano-x',
    image: '/wallets/ledger-nano-x.png',
  },
  {
    id: 'keystone-3-pro',
    name: 'Keystone 3 Pro',
    rating: 2.5,
    bitcoinOnly: false,
    price: 149,
    tags: ['Air-gapped', 'Fingerprint', 'QR Codes'],
    pros: [
      'Air-gapped operation',
      'Nice touchscreen',
      'Fingerprint sensor',
      'QR code signing',
    ],
    cons: [
      'Multi-coin support (larger attack surface)',
      'Closed-source components',
      'Less community trust',
    ],
    storeUrl: 'https://keyst.one/shop/keystone-3-pro',
    image: '/wallets/keystone-3-pro.jpg',
  },
  {
    id: 'tangem',
    name: 'Tangem',
    rating: 1.8,
    bitcoinOnly: false,
    price: 70,
    tags: ['NFC', 'Card Format', 'Simple'],
    pros: [
      'Credit card form factor',
      'NFC convenience',
      'Simple to use',
      'Affordable',
    ],
    cons: [
      'Multi-coin support',
      'Limited security features',
      'No screen for verification',
      'Closed-source',
    ],
    storeUrl: 'https://tangem.com/en/pricing/',
    image: '/wallets/tangem.png',
  },
  {
    id: 'ngrave-zero',
    name: 'NGRAVE ZERO',
    rating: 2.9,
    bitcoinOnly: false,
    price: 398,
    tags: ['Biometric', 'Air-gapped', 'Premium'],
    pros: [
      'Premium build quality',
      'Biometric security',
      'Air-gapped operation',
      'Beautiful design',
    ],
    cons: [
      'Very expensive',
      'Multi-coin support',
      'Overkill for most users',
    ],
    storeUrl: 'https://www.ngrave.io/en/products/zero',
    image: '/wallets/ngrave-zero.jpg',
  },
  {
    id: 'secux-v20',
    name: 'SecuX V20',
    rating: 1.2,
    bitcoinOnly: false,
    price: 139,
    tags: ['Touchscreen', 'Bluetooth', 'Multi-coin'],
    pros: [
      'Large touchscreen',
      'Bluetooth capable',
      'Decent build',
    ],
    cons: [
      'Multi-coin bloat',
      'Less community trust',
      'Nothing special',
      'Closed-source elements',
    ],
    storeUrl: 'https://secuxtech.com/products/secux-v20',
    image: '/wallets/secux-v20.jpg',
  },
];

export function getWalletById(id: string): Wallet | undefined {
  return wallets.find(w => w.id === id);
}

export function getBitcoinOnlyWallets(): Wallet[] {
  return wallets.filter(w => w.bitcoinOnly);
}

export function getMultiCoinWallets(): Wallet[] {
  return wallets.filter(w => !w.bitcoinOnly);
}

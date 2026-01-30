// Comprehensive wallet details for generating unique comparison content

export interface WalletDetails {
  id: string;
  name: string;
  company: string;
  founded: string;
  headquarters: string;
  tagline: string;

  // Security architecture
  securityModel: string;
  secureElement: string;
  firmwareType: string;
  connectionMethods: string[];

  // Detailed features
  displaySize: string;
  batteryLife: string;
  supportsPassphrase: boolean;
  supportsMultisig: boolean;

  // Incidents & controversies
  incidents: {
    date: string;
    title: string;
    description: string;
    severity: 'critical' | 'major' | 'minor';
  }[];

  // Trust factors
  trustFactors: {
    positive: string[];
    negative: string[];
  };

  // Detailed pros/cons with explanations
  detailedPros: {
    title: string;
    explanation: string;
  }[];

  detailedCons: {
    title: string;
    explanation: string;
  }[];

  // Who it's best for
  bestFor: string[];

  // Unique comparison points vs other wallets
  vsComparisons: {
    [walletId: string]: {
      advantages: string[];
      disadvantages: string[];
      verdict: string;
    };
  };
}

export const walletDetails: Record<string, WalletDetails> = {
  'jade-plus': {
    id: 'jade-plus',
    name: 'Blockstream Jade Plus',
    company: 'Blockstream',
    founded: '2014',
    headquarters: 'Victoria, Canada',
    tagline: 'Air-gapped, open-source, Bitcoin-only security',

    securityModel: 'Virtual Secure Element with blind oracle PIN verification. Your seed is never stored in extractable form. Uses a unique architecture where the PIN, device data, and Blockstream oracle combine to reconstruct the key only during signing.',
    secureElement: 'Virtual Secure Element (no hardware SE, but cryptographically equivalent security without the black-box trust issues)',
    firmwareType: '100% open-source firmware and hardware schematics. Anyone can audit, compile, and verify.',
    connectionMethods: ['QR codes (fully air-gapped)', 'Bluetooth', 'USB-C'],

    displaySize: '1.9" IPS LCD (largest in class)',
    batteryLife: '8+ hours continuous use',
    supportsPassphrase: true,
    supportsMultisig: true,

    incidents: [],

    trustFactors: {
      positive: [
        'Blockstream is led by Adam Back, inventor of Hashcash (cited in Bitcoin whitepaper)',
        'Major Bitcoin Core contributors on staff',
        'Long track record of Bitcoin-only focus since 2014',
        'Fully open-source with no hidden code',
        'No history of security breaches or data leaks',
        'No controversial "recovery" services that could extract seeds',
      ],
      negative: [
        'Relatively newer hardware wallet product (though company is established)',
        'Blind oracle requires trust in Blockstream servers (though self-hosting is possible)',
      ],
    },

    detailedPros: [
      {
        title: 'True Air-Gapped Operation',
        explanation: 'Unlike wallets that claim air-gap but require USB for setup, Jade Plus can operate entirely via QR codes from day one. Your private keys never touch a networked device.',
      },
      {
        title: 'Virtual Secure Element Architecture',
        explanation: 'Traditional secure elements are black boxes you cannot audit. Jade\'s virtual secure element provides equivalent security through cryptographic means, all verifiable in open-source code.',
      },
      {
        title: 'No Seed Extraction Possible',
        explanation: 'The architecture physically prevents seed extraction. There is no "Jade Recover" because the design makes it impossible. Your keys cannot be exfiltrated even with physical access.',
      },
      {
        title: 'Largest Display in Class',
        explanation: 'The 1.9" screen lets you verify full addresses without scrolling. This matters because address substitution attacks rely on users only checking first/last characters.',
      },
      {
        title: 'Bitcoin-Only Focus',
        explanation: 'No altcoin code means smaller attack surface, faster updates, and development resources focused entirely on Bitcoin security.',
      },
    ],

    detailedCons: [
      {
        title: 'Blind Oracle Dependency',
        explanation: 'Default setup uses Blockstream\'s PIN server. While you can self-host, most users won\'t. If Blockstream disappeared, you\'d need your seed backup (which you should have anyway).',
      },
      {
        title: 'Newer Product',
        explanation: 'Jade Plus launched more recently than Coldcard or Trezor. Some prefer battle-tested devices with longer track records.',
      },
    ],

    bestFor: [
      'Security-focused Bitcoiners who want verifiable, auditable security',
      'Users who value air-gapped operation without compromise',
      'Those concerned about closed-source secure elements',
      'Bitcoin maximalists who don\'t need altcoin support',
    ],

    vsComparisons: {
      'ledger-nano-x': {
        advantages: [
          '100% open-source vs Ledger\'s closed-source secure element',
          'No seed extraction capability vs Ledger Recover architecture',
          'True air-gap via QR vs Ledger\'s required USB/Bluetooth',
          'No data breach history vs Ledger\'s 2020 customer data leak',
          'Bitcoin-only focus vs multi-coin bloat',
        ],
        disadvantages: [
          'Smaller company than Ledger',
          'Less retail availability',
        ],
        verdict: 'Jade Plus is the clear choice for security-conscious users. After the Ledger Recover revelation showed their firmware can extract seeds, and the 2020 data breach exposed customer information, Jade\'s verifiable security model is far more trustworthy.',
      },
      'trezor-safe-3': {
        advantages: [
          'Air-gapped operation via QR codes vs Trezor\'s required USB',
          'Virtual secure element vs Trezor\'s newer (less proven) secure element',
          'No physical seed extraction vulnerability',
          'Larger display for address verification',
          'Bitcoin-only vs multi-coin',
        ],
        disadvantages: [
          'Trezor has longer track record in market',
          'Trezor Model T has touchscreen (Jade uses buttons)',
        ],
        verdict: 'Jade Plus offers superior security architecture. While Trezor pioneered open-source hardware wallets, Jade\'s air-gapped capability and seed protection architecture represent the next evolution in hardware wallet security.',
      },
      'coldcard-mk4': {
        advantages: [
          'More user-friendly interface',
          'Bluetooth option for convenience',
          'Color display vs Coldcard\'s monochrome',
          'Lower price point',
          'Virtual SE avoids hardware secure element debates',
        ],
        disadvantages: [
          'Coldcard has longer Bitcoin-only track record',
          'Coldcard offers more paranoid-level features (duress PIN, brick me)',
          'Some prefer Coldcard\'s industrial aesthetic',
        ],
        verdict: 'Both are excellent Bitcoin-only choices. Jade Plus is more accessible and user-friendly with equivalent security. Coldcard appeals to more technically paranoid users who want maximum control.',
      },
      'bitbox02': {
        advantages: [
          'Air-gapped operation vs BitBox\'s required USB',
          'Larger display',
          'Bluetooth option',
          'Virtual SE architecture',
        ],
        disadvantages: [
          'BitBox has Swiss manufacturing reputation',
          'BitBox02 has very clean, minimal design',
        ],
        verdict: 'Jade Plus wins on security features with air-gapped capability. BitBox02 is a solid alternative but lacks the air-gap that serious security requires.',
      },
      'foundation-passport': {
        advantages: [
          'Lower price ($149 vs $299)',
          'Bluetooth connectivity option for convenience',
          'More compact and portable form factor',
          'Rechargeable battery vs disposable AAAs',
        ],
        disadvantages: [
          'Higher price point at nearly 2x the cost',
          'Requires AAA batteries that need replacing',
          'Larger device less pocket-friendly',
          'Newer company with shorter track record',
        ],
        verdict: 'Both are excellent air-gapped, open-source, Bitcoin-only options. Jade Plus offers better value and portability. Passport justifies its premium with build quality.',
      },
    },
  },

  'ledger-nano-x': {
    id: 'ledger-nano-x',
    name: 'Ledger Nano X',
    company: 'Ledger',
    founded: '2014',
    headquarters: 'Paris, France',
    tagline: 'The original hardware wallet, now with Bluetooth',

    securityModel: 'Closed-source secure element (ST33J2M0). Firmware is proprietary and cannot be independently audited.',
    secureElement: 'ST33J2M0 (closed-source, same family used in passports and banking)',
    firmwareType: 'Closed-source. Ledger claims security through obscurity. Cannot compile and verify yourself.',
    connectionMethods: ['USB-C', 'Bluetooth'],

    displaySize: '0.5" OLED (small, hard to verify addresses)',
    batteryLife: '8 hours',
    supportsPassphrase: true,
    supportsMultisig: true,

    incidents: [
      {
        date: 'July 2020',
        title: 'Customer Database Breach',
        description: 'Hackers stole personal data of 272,000 customers including names, addresses, and phone numbers. This led to targeted phishing attacks and even physical threats against customers.',
        severity: 'critical',
      },
      {
        date: 'May 2023',
        title: 'Ledger Recover Controversy',
        description: 'Ledger announced a seed recovery service that revealed their firmware has always had the capability to extract seed phrases. This contradicted years of marketing claiming seeds never leave the device.',
        severity: 'critical',
      },
      {
        date: 'December 2023',
        title: 'Connect Kit Supply Chain Attack',
        description: 'Ledger\'s JavaScript library was compromised, draining approximately $600K from users who interacted with affected dApps.',
        severity: 'major',
      },
    ],

    trustFactors: {
      positive: [
        'Largest hardware wallet company by market share',
        'Wide retail availability',
        'Established brand recognition',
        'Supports many cryptocurrencies',
      ],
      negative: [
        'Closed-source secure element cannot be audited',
        'Ledger Recover proves firmware can extract seeds',
        'Major customer data breach in 2020',
        'Supply chain attack in 2023',
        'Company has shown willingness to add seed extraction features',
        'Marketing has been misleading about security model',
      ],
    },

    detailedPros: [
      {
        title: 'Market Leader',
        explanation: 'Ledger has the most users and widest ecosystem support. Most apps and services test with Ledger first.',
      },
      {
        title: 'Bluetooth Convenience',
        explanation: 'Easy mobile use without cables. Good for quick transactions on the go.',
      },
      {
        title: 'Multi-Coin Support',
        explanation: 'Supports thousands of cryptocurrencies. Good if you hold multiple assets.',
      },
    ],

    detailedCons: [
      {
        title: 'Closed-Source Security',
        explanation: 'You cannot verify what the secure element firmware does. You must trust Ledger\'s claims about security.',
      },
      {
        title: 'Seed Extraction Capability',
        explanation: 'The Ledger Recover feature proved that Ledger\'s firmware can extract and transmit your seed phrase. Even if you don\'t use Recover, the capability exists in firmware.',
      },
      {
        title: 'Data Breach History',
        explanation: 'The 2020 breach exposed customer data leading to phishing, SIM swaps, and physical threats. Ledger stored data they didn\'t need.',
      },
      {
        title: 'Tiny Display',
        explanation: 'The 0.5" screen makes it nearly impossible to verify full addresses, increasing address substitution attack risk.',
      },
      {
        title: 'Supply Chain Vulnerabilities',
        explanation: 'The 2023 Connect Kit attack showed Ledger\'s infrastructure can be compromised to attack users.',
      },
    ],

    bestFor: [
      'Users who prioritize convenience over maximum security',
      'Multi-coin holders who need broad asset support',
      'Those who value ecosystem compatibility',
      'Users comfortable trusting closed-source security',
    ],

    vsComparisons: {
      'jade-plus': {
        advantages: [
          'Larger ecosystem and app support',
          'More retail availability',
          'Supports more cryptocurrencies',
        ],
        disadvantages: [
          'Closed-source vs fully auditable code',
          'Seed extraction capability exists',
          'Customer data breach history',
          'No air-gapped option',
          'Tiny screen vs Jade\'s 1.9" display',
        ],
        verdict: 'For Bitcoin-focused users prioritizing security, Jade Plus is superior. Ledger\'s closed-source model and Recover capability are fundamental trust issues.',
      },
    },
  },

  'trezor-safe-3': {
    id: 'trezor-safe-3',
    name: 'Trezor Safe 3',
    company: 'SatoshiLabs',
    founded: '2013',
    headquarters: 'Prague, Czech Republic',
    tagline: 'The original hardware wallet, now with secure element',

    securityModel: 'Open-source firmware with new secure element. Trezor pioneered open-source hardware wallets but Safe 3 adds a secure element for the first time.',
    secureElement: 'Optiga Trust M (first Trezor with SE, partially open)',
    firmwareType: 'Open-source firmware. Hardware schematics available.',
    connectionMethods: ['USB-C'],

    displaySize: '0.96" OLED',
    batteryLife: 'N/A (no battery, USB powered)',
    supportsPassphrase: true,
    supportsMultisig: true,

    incidents: [
      {
        date: '2020',
        title: 'Physical Seed Extraction Vulnerability',
        description: 'Security researchers demonstrated seeds could be extracted from Trezor devices with physical access using voltage glitching. Trezor\'s response was to recommend passphrases.',
        severity: 'major',
      },
      {
        date: 'January 2024',
        title: 'Support Portal Breach',
        description: 'Third-party support system breach exposed contact information of 66,000 users. Less severe than Ledger breach but still a data security concern.',
        severity: 'minor',
      },
    ],

    trustFactors: {
      positive: [
        'Pioneered open-source hardware wallets',
        'Long track record since 2013',
        'Open-source firmware',
        'Czech company with cypherpunk roots',
        'Safe 3 addresses previous physical attack vectors',
      ],
      negative: [
        'Historical physical extraction vulnerability',
        'New secure element is less battle-tested',
        'Still supports altcoins (not Bitcoin-only)',
        'No air-gapped option',
      ],
    },

    detailedPros: [
      {
        title: 'Open-Source Pioneer',
        explanation: 'Trezor invented the hardware wallet category and has championed open-source from day one.',
      },
      {
        title: 'New Secure Element',
        explanation: 'Safe 3 finally adds a secure element, addressing the physical extraction vulnerabilities of previous models.',
      },
      {
        title: 'Affordable Price',
        explanation: 'At $79, it\'s one of the most affordable secure hardware wallets with a secure element.',
      },
      {
        title: 'Ecosystem Compatibility',
        explanation: 'Widely supported across wallets and services. Good documentation and community.',
      },
    ],

    detailedCons: [
      {
        title: 'No Air-Gap',
        explanation: 'Requires USB connection for all operations. No QR code signing option.',
      },
      {
        title: 'Multi-Coin Bloat',
        explanation: 'Supports thousands of altcoins, increasing codebase complexity and attack surface.',
      },
      {
        title: 'New Secure Element Unproven',
        explanation: 'The Optiga Trust M is new to Trezor. Its security track record in this implementation is limited.',
      },
      {
        title: 'Past Physical Vulnerabilities',
        explanation: 'Previous Trezor models were vulnerable to physical seed extraction. Safe 3 aims to fix this, but the history remains.',
      },
    ],

    bestFor: [
      'Users who value open-source but want a secure element',
      'Budget-conscious buyers',
      'Those who prefer established brands',
      'Multi-coin holders who want some transparency',
    ],

    vsComparisons: {
      'jade-plus': {
        advantages: [
          'Longer market track record',
          'Lower price ($79 vs $149)',
          'Traditional secure element',
        ],
        disadvantages: [
          'No air-gapped capability',
          'Multi-coin vs Bitcoin-only',
          'Smaller display',
          'Past physical extraction vulnerabilities',
        ],
        verdict: 'Jade Plus offers superior security with air-gap capability and Bitcoin-only focus. Trezor Safe 3 is a good budget option but lacks the security features serious Bitcoiners want.',
      },
    },
  },

  'coldcard-mk4': {
    id: 'coldcard-mk4',
    name: 'Coldcard Mk4',
    company: 'Coinkite',
    founded: '2017',
    headquarters: 'Toronto, Canada',
    tagline: 'The paranoid\'s choice for Bitcoin security',

    securityModel: 'Dual secure elements with extensive anti-tampering. Designed for maximum paranoia with duress features.',
    secureElement: 'Dual ATECC608A secure elements (belt and suspenders approach)',
    firmwareType: 'Open-source firmware. Aggressive security features.',
    connectionMethods: ['MicroSD (air-gapped)', 'USB-C', 'NFC'],

    displaySize: '1.3" OLED monochrome',
    batteryLife: 'N/A (USB powered, but can operate briefly for air-gap)',
    supportsPassphrase: true,
    supportsMultisig: true,

    incidents: [],

    trustFactors: {
      positive: [
        'Bitcoin-only from the start',
        'No security breaches or controversies',
        'Open-source with paranoid security features',
        'Canadian company with good reputation',
        'Designed by experienced Bitcoiners',
        'Duress PIN and brick features for hostile situations',
      ],
      negative: [
        'Steep learning curve',
        'Industrial design not for everyone',
        'Expensive compared to alternatives',
      ],
    },

    detailedPros: [
      {
        title: 'Paranoid-Level Security',
        explanation: 'Features like duress PINs, brick-me PINs, and countdown login are designed for worst-case scenarios most wallets don\'t consider.',
      },
      {
        title: 'Air-Gapped via MicroSD',
        explanation: 'True air-gapped PSBT signing without any wireless connections. The MicroSD workflow is battle-tested.',
      },
      {
        title: 'Dual Secure Elements',
        explanation: 'Two separate secure elements provide redundancy. Even if one is compromised, security is maintained.',
      },
      {
        title: 'Bitcoin-Only Forever',
        explanation: 'Coinkite has publicly committed to never adding altcoins. The codebase stays focused.',
      },
    ],

    detailedCons: [
      {
        title: 'Steep Learning Curve',
        explanation: 'The most complex hardware wallet to use. Designed for technical users who understand what they\'re doing.',
      },
      {
        title: 'Industrial Aesthetic',
        explanation: 'The design prioritizes function over form. Some find it ugly or intimidating.',
      },
      {
        title: 'MicroSD Air-Gap Workflow',
        explanation: 'QR codes are more convenient than swapping SD cards. Jade Plus offers easier air-gapped experience.',
      },
    ],

    bestFor: [
      'Security-paranoid Bitcoiners',
      'Users who might face physical coercion',
      'Technical users comfortable with complex devices',
      'Large holders who want maximum protection',
    ],

    vsComparisons: {
      'jade-plus': {
        advantages: [
          'Dual secure elements vs virtual SE',
          'More paranoid features (duress PIN, brick)',
          'Longer Bitcoin-only track record',
          'No server dependency for PIN verification',
        ],
        disadvantages: [
          'More expensive',
          'Steeper learning curve',
          'MicroSD less convenient than QR codes',
          'Smaller, monochrome display',
        ],
        verdict: 'Both are excellent Bitcoin-only choices. Coldcard is for maximum paranoia users. Jade Plus offers comparable security with better usability and lower price.',
      },
    },
  },

  'bitbox02': {
    id: 'bitbox02',
    name: 'BitBox02 Bitcoin-Only',
    company: 'Shift Crypto',
    founded: '2015',
    headquarters: 'Zurich, Switzerland',
    tagline: 'Swiss-made minimalist security',

    securityModel: 'Secure element with open-source firmware. Swiss engineering approach.',
    secureElement: 'ATECC608A (same as Coldcard)',
    firmwareType: '100% open-source firmware and hardware.',
    connectionMethods: ['USB-C'],

    displaySize: '1.1" OLED',
    batteryLife: 'N/A (USB powered)',
    supportsPassphrase: true,
    supportsMultisig: true,

    incidents: [],

    trustFactors: {
      positive: [
        'Swiss manufacturing and company',
        '100% open-source',
        'Bitcoin-only edition available',
        'Clean, minimal design',
        'Good reputation for quality',
        'No controversies or breaches',
      ],
      negative: [
        'Requires USB connection',
        'No air-gapped option',
        'Smaller company than competitors',
      ],
    },

    detailedPros: [
      {
        title: 'Swiss Quality',
        explanation: 'Designed and manufactured in Switzerland with attention to build quality and reliability.',
      },
      {
        title: 'Open-Source',
        explanation: 'Fully auditable firmware and hardware. The Bitcoin-only edition removes all altcoin code.',
      },
      {
        title: 'Clean Design',
        explanation: 'Minimalist, elegant design that doesn\'t scream "crypto wallet."',
      },
      {
        title: 'Easy Backup',
        explanation: 'Optional microSD backup makes seed management straightforward.',
      },
    ],

    detailedCons: [
      {
        title: 'No Air-Gap',
        explanation: 'Requires USB-C connection for all operations. Cannot sign transactions completely offline.',
      },
      {
        title: 'USB-Only',
        explanation: 'No Bluetooth option for mobile use. Must have cable.',
      },
    ],

    bestFor: [
      'Users who value Swiss quality and design',
      'Those who want open-source with proven secure element',
      'Minimalists who prefer clean interfaces',
      'USB-only workflows',
    ],

    vsComparisons: {
      'jade-plus': {
        advantages: [
          'Swiss manufacturing reputation',
          'Smaller, more discreet form factor',
          'Traditional secure element',
        ],
        disadvantages: [
          'No air-gapped capability',
          'No Bluetooth option',
          'Smaller display',
        ],
        verdict: 'Jade Plus wins on security features. BitBox02 is excellent for USB-only workflows but lacks air-gap capability that serious security requires.',
      },
    },
  },

  'foundation-passport': {
    id: 'foundation-passport',
    name: 'Foundation Passport',
    company: 'Foundation Devices',
    founded: '2020',
    headquarters: 'Boston, USA',
    tagline: 'Premium air-gapped Bitcoin security',

    securityModel: 'Open-source with secure element. Premium build quality.',
    secureElement: 'ATECC608A',
    firmwareType: '100% open-source firmware. Hardware partially open.',
    connectionMethods: ['QR codes (air-gapped)', 'MicroSD'],

    displaySize: '1.8" IPS color',
    batteryLife: 'AAA batteries (user replaceable)',
    supportsPassphrase: true,
    supportsMultisig: true,

    incidents: [],

    trustFactors: {
      positive: [
        'Fully open-source',
        'Air-gapped by default',
        'Bitcoin-only',
        'Premium build quality',
        'User-replaceable batteries',
        'American company with transparent leadership',
      ],
      negative: [
        'Newer company',
        'Higher price point',
        'Larger form factor',
      ],
    },

    detailedPros: [
      {
        title: 'Premium Build Quality',
        explanation: 'CNC machined metal housing. Feels like a premium device, not cheap electronics.',
      },
      {
        title: 'Air-Gapped via Camera',
        explanation: 'Built-in camera for QR code signing. True air-gap without USB.',
      },
      {
        title: 'Replaceable Batteries',
        explanation: 'Standard AAA batteries mean no charging, no degradation, works indefinitely.',
      },
      {
        title: 'Open-Source',
        explanation: 'Fully auditable. Strong commitment to transparency.',
      },
    ],

    detailedCons: [
      {
        title: 'High Price',
        explanation: 'At $299, it\'s one of the most expensive hardware wallets. Premium build costs premium price.',
      },
      {
        title: 'Large Form Factor',
        explanation: 'Bigger than most hardware wallets. Not as portable.',
      },
      {
        title: 'Newer Company',
        explanation: 'Founded in 2020. Less track record than established competitors.',
      },
    ],

    bestFor: [
      'Users who want premium build quality',
      'Those who value air-gapped + open-source combination',
      'Bitcoin-only maximalists with budget for premium device',
      'Users who prefer physical controls over touchscreens',
    ],

    vsComparisons: {
      'jade-plus': {
        advantages: [
          'Premium machined metal build',
          'Replaceable batteries',
          'Larger physical buttons',
        ],
        disadvantages: [
          'Much more expensive ($299 vs $149)',
          'Larger, less portable',
          'No Bluetooth option',
          'Newer company track record',
        ],
        verdict: 'Both excellent Bitcoin-only, air-gapped, open-source options. Jade Plus offers better value. Passport for those who want premium build and don\'t mind the price.',
      },
    },
  },

  'bitkey': {
    id: 'bitkey',
    name: 'Bitkey',
    company: 'Block (formerly Square)',
    founded: '2023',
    headquarters: 'San Francisco, USA',
    tagline: 'Simple 2-of-3 multisig for everyone',

    securityModel: '2-of-3 multisig with keys split between hardware device, mobile app, and Block server. Designed for recovery simplicity.',
    secureElement: 'Yes (details limited)',
    firmwareType: 'Partially open-source',
    connectionMethods: ['NFC', 'Bluetooth'],

    displaySize: 'Minimal (fingerprint reader + LEDs)',
    batteryLife: 'Wireless charging, specs not published',
    supportsPassphrase: false,
    supportsMultisig: true,

    incidents: [],

    trustFactors: {
      positive: [
        'Backed by Block/Jack Dorsey',
        'Designed for mainstream adoption',
        'Simple recovery process',
        'Bitcoin-only',
        '2-of-3 provides redundancy',
      ],
      negative: [
        'Relies on Block infrastructure',
        'Less sovereignty than single-key devices',
        'Newer product with limited track record',
        'Block holds one of three keys',
        'Cannot use without mobile app',
      ],
    },

    detailedPros: [
      {
        title: 'Beginner Friendly',
        explanation: 'Designed for people new to self-custody. Simple setup and recovery.',
      },
      {
        title: 'Built-in Multisig',
        explanation: '2-of-3 means losing the device or phone isn\'t catastrophic. Recovery is possible.',
      },
      {
        title: 'Bitcoin-Only',
        explanation: 'No altcoin distractions. Focused Bitcoin experience.',
      },
    ],

    detailedCons: [
      {
        title: 'Block Dependency',
        explanation: 'Block holds one key and runs the infrastructure. This is not fully sovereign self-custody.',
      },
      {
        title: 'No Advanced Features',
        explanation: 'No passphrase support, no coin control, limited for power users.',
      },
      {
        title: 'Requires Mobile App',
        explanation: 'Cannot use the hardware device without Block\'s mobile app.',
      },
      {
        title: 'Limited Display',
        explanation: 'No screen to verify addresses on device. Must trust phone display.',
      },
    ],

    bestFor: [
      'Bitcoin beginners entering self-custody',
      'Users who prioritize recovery simplicity',
      'Those who want multisig without complexity',
      'People who don\'t need full sovereignty',
    ],

    vsComparisons: {
      'jade-plus': {
        advantages: [
          'Simpler for beginners',
          'Built-in recovery mechanism',
          'Multisig without complexity',
        ],
        disadvantages: [
          'Relies on Block infrastructure',
          'No full sovereignty',
          'No display for verification',
          'Cannot operate independently',
          'Limited advanced features',
        ],
        verdict: 'Jade Plus for anyone serious about Bitcoin security. Bitkey is training wheels for self-custody beginners who might otherwise stay on exchanges.',
      },
    },
  },

  'keystone-3-pro': {
    id: 'keystone-3-pro',
    name: 'Keystone 3 Pro',
    company: 'Keystone',
    founded: '2018',
    headquarters: 'Hong Kong',
    tagline: 'Air-gapped with fingerprint security',

    securityModel: 'Air-gapped with secure element. Biometric verification option.',
    secureElement: 'Yes (3 secure elements claimed)',
    firmwareType: 'Partially open-source',
    connectionMethods: ['QR codes (air-gapped)', 'USB-C'],

    displaySize: '4" touchscreen',
    batteryLife: '21 days standby',
    supportsPassphrase: true,
    supportsMultisig: true,

    incidents: [],

    trustFactors: {
      positive: [
        'Air-gapped operation',
        'Large touchscreen',
        'Fingerprint option',
        'Multiple secure elements',
      ],
      negative: [
        'Hong Kong company (jurisdiction concerns)',
        'Multi-coin support',
        'Not fully open-source',
        'Less community trust than competitors',
        'Complex feature set',
      ],
    },

    detailedPros: [
      {
        title: 'Large Touchscreen',
        explanation: 'The 4" screen is the largest in class. Easy to verify addresses and navigate.',
      },
      {
        title: 'Air-Gapped',
        explanation: 'QR code signing means keys never touch a networked device.',
      },
      {
        title: 'Fingerprint Unlock',
        explanation: 'Biometric option for convenient but secure access.',
      },
    ],

    detailedCons: [
      {
        title: 'Multi-Coin Bloat',
        explanation: 'Supports many cryptocurrencies. Larger attack surface than Bitcoin-only devices.',
      },
      {
        title: 'Jurisdiction',
        explanation: 'Hong Kong-based company. Some users have concerns about Chinese influence.',
      },
      {
        title: 'Not Fully Open-Source',
        explanation: 'Cannot fully audit the security implementation.',
      },
      {
        title: 'Less Community Trust',
        explanation: 'Smaller community than Trezor, Ledger, or Bitcoin-focused competitors.',
      },
    ],

    bestFor: [
      'Users who want large touchscreen',
      'Multi-coin holders who want air-gap',
      'Those who value biometric convenience',
    ],

    vsComparisons: {
      'jade-plus': {
        advantages: [
          'Larger touchscreen',
          'Fingerprint option',
          'Multi-coin support (if needed)',
        ],
        disadvantages: [
          'Not Bitcoin-only',
          'Not fully open-source',
          'Jurisdiction concerns',
          'Less community trust',
          'More expensive',
        ],
        verdict: 'Jade Plus wins for Bitcoin users. Keystone offers more features but at cost of focus and trust.',
      },
    },
  },

  'tangem': {
    id: 'tangem',
    name: 'Tangem',
    company: 'Tangem',
    founded: '2017',
    headquarters: 'Switzerland',
    tagline: 'Crypto security in credit card form',

    securityModel: 'NFC smart card with secure element. Simple but limited.',
    secureElement: 'Samsung S3D350A',
    firmwareType: 'Closed-source',
    connectionMethods: ['NFC only'],

    displaySize: 'None (card format)',
    batteryLife: 'No battery needed (NFC powered)',
    supportsPassphrase: false,
    supportsMultisig: false,

    incidents: [],

    trustFactors: {
      positive: [
        'Simple and affordable',
        'Credit card form factor',
        'No battery to charge',
        'Swiss company',
      ],
      negative: [
        'Closed-source',
        'No display to verify addresses',
        'Multi-coin (not Bitcoin-only)',
        'NFC only (potential attack vector)',
        'Limited features',
        'Must trust phone display completely',
      ],
    },

    detailedPros: [
      {
        title: 'Portable',
        explanation: 'Credit card size fits in any wallet. Most portable option.',
      },
      {
        title: 'Simple',
        explanation: 'Tap to sign. No complex menus or buttons.',
      },
      {
        title: 'Affordable',
        explanation: 'One of the cheapest hardware wallet options.',
      },
    ],

    detailedCons: [
      {
        title: 'No Display',
        explanation: 'Cannot verify addresses on device. Must trust phone completely.',
      },
      {
        title: 'Closed-Source',
        explanation: 'Cannot audit security. Trust the manufacturer.',
      },
      {
        title: 'NFC Attack Surface',
        explanation: 'NFC has known vulnerabilities. Not suitable for high-value storage.',
      },
      {
        title: 'Limited Features',
        explanation: 'No passphrase, no multisig, no advanced features.',
      },
    ],

    bestFor: [
      'Small amounts of crypto',
      'Users who prioritize portability above all',
      'Beginners who want simple experience',
      'NOT for significant Bitcoin holdings',
    ],

    vsComparisons: {
      'jade-plus': {
        advantages: [
          'More portable',
          'Cheaper',
          'No charging needed',
          'Simpler to use',
        ],
        disadvantages: [
          'No display (critical security flaw)',
          'Closed-source',
          'NFC-only (attack vector)',
          'Not Bitcoin-only',
          'Cannot verify addresses',
          'Not suitable for serious holdings',
        ],
        verdict: 'Jade Plus is in a completely different security league. Tangem is a toy for small amounts. Do not use for serious Bitcoin storage.',
      },
    },
  },

  'ngrave-zero': {
    id: 'ngrave-zero',
    name: 'NGRAVE ZERO',
    company: 'NGRAVE',
    founded: '2018',
    headquarters: 'Belgium',
    tagline: 'The coldest wallet in the world',

    securityModel: 'Air-gapped with biometric and secure element. Premium security features.',
    secureElement: 'EAL7 certified (highest level)',
    firmwareType: 'Not open-source',
    connectionMethods: ['QR codes only (no ports at all)'],

    displaySize: '4" touchscreen',
    batteryLife: 'Not published',
    supportsPassphrase: true,
    supportsMultisig: true,

    incidents: [],

    trustFactors: {
      positive: [
        'No ports whatsoever (most air-gapped)',
        'EAL7 secure element (highest certification)',
        'Biometric security',
        'Premium build quality',
        'Belgian company',
      ],
      negative: [
        'Not open-source',
        'Very expensive ($398)',
        'Multi-coin support',
        'Complex for beginners',
        'Small company',
      ],
    },

    detailedPros: [
      {
        title: 'Maximum Air-Gap',
        explanation: 'No USB, no Bluetooth, no NFC. Only QR codes. The most air-gapped device available.',
      },
      {
        title: 'EAL7 Secure Element',
        explanation: 'Highest certification level available. Military-grade security rating.',
      },
      {
        title: 'Premium Build',
        explanation: 'High-quality materials and construction. Feels like a premium device.',
      },
      {
        title: 'Biometric',
        explanation: 'Fingerprint verification adds convenience without compromising security.',
      },
    ],

    detailedCons: [
      {
        title: 'Extremely Expensive',
        explanation: 'At $398, it\'s nearly 3x the price of Jade Plus for features most users don\'t need.',
      },
      {
        title: 'Not Open-Source',
        explanation: 'Despite premium price, you cannot audit the security implementation.',
      },
      {
        title: 'Multi-Coin',
        explanation: 'Supports altcoins, increasing attack surface.',
      },
      {
        title: 'Overkill',
        explanation: 'Most features are overkill for typical users. Complexity without proportional benefit.',
      },
    ],

    bestFor: [
      'Users with very high-value holdings',
      'Those who want maximum air-gap regardless of cost',
      'Security maximalists who don\'t mind closed-source',
    ],

    vsComparisons: {
      'jade-plus': {
        advantages: [
          'Maximum air-gap (no ports)',
          'EAL7 secure element',
          'Biometric built-in',
        ],
        disadvantages: [
          'Nearly 3x the price',
          'Not open-source',
          'Multi-coin bloat',
          'Overkill for most users',
        ],
        verdict: 'Jade Plus offers comparable security at 1/3 the price with full open-source transparency. NGRAVE is overkill unless you have very specific requirements.',
      },
    },
  },

  'secux-v20': {
    id: 'secux-v20',
    name: 'SecuX V20',
    company: 'SecuX',
    founded: '2018',
    headquarters: 'Taiwan',
    tagline: 'Large screen crypto security',

    securityModel: 'Infineon secure element with touchscreen interface.',
    secureElement: 'Infineon SLE97',
    firmwareType: 'Not open-source',
    connectionMethods: ['USB', 'Bluetooth'],

    displaySize: '2.8" color touchscreen',
    batteryLife: '7 hours',
    supportsPassphrase: true,
    supportsMultisig: false,

    incidents: [],

    trustFactors: {
      positive: [
        'Large touchscreen',
        'Infineon secure element',
        'Bluetooth option',
      ],
      negative: [
        'Not open-source',
        'Multi-coin (not Bitcoin-only)',
        'No air-gap option',
        'Smaller community',
        'Less trusted brand',
      ],
    },

    detailedPros: [
      {
        title: 'Large Screen',
        explanation: 'The 2.8" touchscreen makes navigation and verification easier.',
      },
      {
        title: 'Bluetooth',
        explanation: 'Wireless option for mobile use.',
      },
    ],

    detailedCons: [
      {
        title: 'Not Open-Source',
        explanation: 'Cannot verify security claims.',
      },
      {
        title: 'No Air-Gap',
        explanation: 'Requires USB or Bluetooth. No offline signing.',
      },
      {
        title: 'Multi-Coin',
        explanation: 'Altcoin support increases complexity.',
      },
      {
        title: 'Nothing Special',
        explanation: 'Does nothing that competitors don\'t do better.',
      },
    ],

    bestFor: [
      'Users who prioritize large touchscreen',
      'Those already in SecuX ecosystem',
    ],

    vsComparisons: {
      'jade-plus': {
        advantages: [
          'Slightly larger screen',
        ],
        disadvantages: [
          'Not open-source',
          'No air-gap',
          'Not Bitcoin-only',
          'Less trusted',
          'No advantages that matter',
        ],
        verdict: 'Jade Plus is superior in every meaningful way. SecuX offers nothing compelling over better alternatives.',
      },
    },
  },

  'seedsigner': {
    id: 'seedsigner',
    name: 'SeedSigner',
    company: 'Community Project',
    founded: '2021',
    headquarters: 'Decentralized',
    tagline: 'Build your own air-gapped signing device',

    securityModel: 'DIY Raspberry Pi-based signing device. Stateless - generates keys from seed each time.',
    secureElement: 'None (software security only)',
    firmwareType: '100% open-source hardware and software',
    connectionMethods: ['QR codes only (air-gapped)'],

    displaySize: '1.3" LCD',
    batteryLife: 'Depends on build',
    supportsPassphrase: true,
    supportsMultisig: true,

    incidents: [],

    trustFactors: {
      positive: [
        '100% open-source and DIY',
        'Stateless design (no stored keys)',
        'Air-gapped via QR',
        'Bitcoin-only',
        'Community-driven development',
        'Build it yourself for maximum trust',
        'Very affordable (~$50 in parts)',
      ],
      negative: [
        'No secure element',
        'Requires DIY assembly',
        'No commercial support',
        'Not for non-technical users',
        'Build quality depends on user',
      ],
    },

    detailedPros: [
      {
        title: 'Ultimate Transparency',
        explanation: 'You build it yourself from commodity hardware. You can verify every component and every line of code.',
      },
      {
        title: 'Stateless Design',
        explanation: 'Keys are never stored on device. Generated fresh from your seed each session. Nothing to extract.',
      },
      {
        title: 'Air-Gapped',
        explanation: 'QR-only operation. No USB, no Bluetooth, no wireless anything.',
      },
      {
        title: 'Cheap',
        explanation: 'About $50 in parts. The most affordable secure signing device.',
      },
    ],

    detailedCons: [
      {
        title: 'DIY Required',
        explanation: 'Must source parts and assemble yourself. Not plug-and-play.',
      },
      {
        title: 'No Secure Element',
        explanation: 'Relies on software security. Physical attacks possible on Raspberry Pi.',
      },
      {
        title: 'No Support',
        explanation: 'Community project with no commercial support. You\'re on your own.',
      },
      {
        title: 'Technical Users Only',
        explanation: 'Not appropriate for beginners or non-technical users.',
      },
    ],

    bestFor: [
      'Technical users who want maximum transparency',
      'DIY enthusiasts',
      'Budget-conscious Bitcoiners',
      'Those who trust no company',
      'Education and learning',
    ],

    vsComparisons: {
      'jade-plus': {
        advantages: [
          'DIY for maximum trust',
          'Cheaper (~$50 vs $149)',
          'Stateless (nothing stored)',
          'No company to trust',
        ],
        disadvantages: [
          'Requires DIY assembly',
          'No secure element',
          'No commercial support',
          'Smaller display',
          'Less polished experience',
        ],
        verdict: 'SeedSigner for technical users who want to build their own. Jade Plus for those who want polished, ready-to-use security with similar trust model.',
      },
    },
  },
};

// Helper function to get comparison content
export function getComparisonContent(winnerId: string, loserId: string) {
  const winner = walletDetails[winnerId];
  const loser = walletDetails[loserId];

  if (!winner || !loser) return null;

  return {
    winner,
    loser,
    comparison: winner.vsComparisons[loserId] || generateGenericComparison(winner, loser),
  };
}

function generateGenericComparison(winner: WalletDetails, loser: WalletDetails) {
  const advantages: string[] = [];
  const disadvantages: string[] = [];

  if (winner.firmwareType.includes('open-source') && !loser.firmwareType.includes('open-source')) {
    advantages.push('Open-source firmware allows security verification');
  }
  if (winner.connectionMethods.some(c => c.includes('air-gapped') || c.includes('QR')) &&
      !loser.connectionMethods.some(c => c.includes('air-gapped') || c.includes('QR'))) {
    advantages.push('Air-gapped capability for maximum security');
  }

  return {
    advantages,
    disadvantages,
    verdict: `${winner.name} provides better security characteristics in this comparison.`,
  };
}

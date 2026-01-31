import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bitcoinerreviews.com'),
  title: {
    default: 'BitcoinerReviews - Bitcoin Hardware Wallet Reviews',
    template: '%s | BitcoinerReviews',
  },
  description: 'Independent reviews of Bitcoin hardware wallets. No altcoins. No sponsored content. No apologies.',
  keywords: ['Bitcoin', 'hardware wallet', 'security', 'reviews', 'ColdCard', 'BitBox', 'Jade Plus', 'Blockstream Jade', 'Bitcoin wallet', 'self-custody'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BitcoinerReviews',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/@phosphor-icons/web" defer></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

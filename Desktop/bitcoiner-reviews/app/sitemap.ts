import { MetadataRoute } from 'next';
import { wallets } from '../lib/walletData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bitcoinerreviews.com';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/wallets`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/why-bitcoin-only`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Dynamic wallet review pages
  const walletPages = wallets.map((wallet) => ({
    url: `${baseUrl}/wallets/${wallet.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Comparison pages for top wallets
  const bitcoinOnlyWallets = wallets.filter(w => w.bitcoinOnly);
  const comparisonPages: MetadataRoute.Sitemap = [];

  // Generate comparison URLs for Bitcoin-only wallets
  for (let i = 0; i < bitcoinOnlyWallets.length; i++) {
    for (let j = i + 1; j < bitcoinOnlyWallets.length; j++) {
      comparisonPages.push({
        url: `${baseUrl}/compare?wallet1=${bitcoinOnlyWallets[i].id}&wallet2=${bitcoinOnlyWallets[j].id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    }
  }

  return [...staticPages, ...walletPages, ...comparisonPages];
}

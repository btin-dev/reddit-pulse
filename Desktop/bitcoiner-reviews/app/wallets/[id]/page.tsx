import { wallets } from '../../../lib/walletData';
import { walletDetails } from '../../../lib/walletDetails';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import WalletReviewClient from './WalletReviewClient';

export function generateStaticParams() {
  return wallets.map((wallet) => ({
    id: wallet.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const wallet = wallets.find(w => w.id === id);
  const details = walletDetails[id];

  if (!wallet) {
    return {
      title: 'Wallet Not Found | BitcoinerReviews',
    };
  }

  const title = details?.metaTitle || `${wallet.name} Review 2026 | BitcoinerReviews`;
  const description = details?.metaDescription ||
    `Honest ${wallet.name} review. ${wallet.bitcoinOnly ? 'Bitcoin-only' : 'Multi-coin'} hardware wallet rated ${wallet.rating}/10. Price: $${wallet.price}. Pros, cons, and security analysis.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: [wallet.image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://bitcoinerreviews.com/wallets/${id}`,
    },
  };
}

function generateJsonLd(wallet: typeof wallets[0], details: typeof walletDetails[string] | undefined) {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: wallet.name,
    description: details?.metaDescription || `${wallet.name} hardware wallet`,
    image: `https://bitcoinerreviews.com${wallet.image}`,
    brand: {
      '@type': 'Brand',
      name: details?.company || wallet.name.split(' ')[0],
    },
    offers: {
      '@type': 'Offer',
      price: wallet.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: wallet.storeUrl,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: wallet.rating,
      bestRating: 10,
      worstRating: 1,
      ratingCount: 1,
    },
    review: {
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: 'BitcoinerReviews',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: wallet.rating,
        bestRating: 10,
        worstRating: 1,
      },
      reviewBody: details?.editorialVerdict || `Honest review of the ${wallet.name} hardware wallet.`,
    },
  };

  const faqSchema = details?.faq && details.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: details.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  return [productSchema, faqSchema].filter(Boolean);
}

export default async function WalletReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const wallet = wallets.find(w => w.id === id);
  if (!wallet) {
    notFound();
  }

  const details = walletDetails[id];
  const jsonLdData = generateJsonLd(wallet, details);

  return (
    <>
      {jsonLdData.map((schema, index) => (
        <Script
          key={index}
          id={`json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <WalletReviewClient walletId={id} />
    </>
  );
}

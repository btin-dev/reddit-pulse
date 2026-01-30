import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <div className="w-20 h-20 bg-[#F7931A] rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ph-bold ph-user text-white text-3xl"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The Story Behind This Site
            </h1>
            <p className="text-xl text-gray-500">
              A tale of pride, greed, degeneracy, redemption, and finally: conviction.
            </p>
          </div>
        </section>

        {/* Story Content */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <article className="prose prose-lg max-w-none">
            {/* Chapter 1 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ph-bold ph-lightbulb text-green-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Chapter 1: The Awakening</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                I discovered Bitcoin in 2017. Like many, I stumbled into it during the bull run,
                drawn by the promise of gains. But unlike the opportunists chasing lambos,
                something clicked for me early on. I read the whitepaper. I understood the
                21 million cap. I grasped what sound money meant.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Bitcoin was not just an investment. It was a revolution. Separation of money
                and state. Financial sovereignty. The most important invention since the
                printing press, except this time it could not be corrupted.
              </p>
              <p className="text-gray-600 leading-relaxed mb-0">
                I knew, deep in my bones, that Bitcoin was the one. The only one that mattered.
              </p>
            </div>

            {/* Chapter 2 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <i className="ph-bold ph-flame text-red-500 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Chapter 2: The Fall</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                But knowing and doing are different things. Pride told me I was smarter than
                the market. Greed whispered that I could 10x my stack with these shiny new
                altcoins. &ldquo;Smart contracts!&rdquo; they said. &ldquo;DeFi yield!&rdquo; they promised.
                &ldquo;NFTs are the future!&rdquo; they screamed.
              </p>
              <p className="text-gray-600 leading-relaxed">
                I knew Bitcoin was the answer, but I wanted more, faster. So I dove headfirst
                into the casino. I traded shitcoins. I farmed yield. I aped into jpegs.
                I convinced myself I was &ldquo;playing the game&rdquo; while staying &ldquo;Bitcoin-pilled.&rdquo;
              </p>
              <p className="text-gray-600 leading-relaxed mb-0">
                Spoiler alert: I was not playing the game. The game was playing me.
              </p>
            </div>

            {/* Chapter 3 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <i className="ph-bold ph-skull text-gray-600 text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Chapter 3: The Reckoning</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Then the bear market came. Not the gentle pullback kind. The kind that makes
                you question your existence. Projects I believed in went to zero. Protocols
                I trusted got hacked. &ldquo;Leaders&rdquo; I followed turned out to be frauds.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Luna. Celsius. FTX. Each collapse was a gut punch. Not because I lost money
                in them specifically, but because I had been part of the same ecosystem.
                I had been a willing participant in the degeneracy. I had forgotten the
                fundamental lesson: not your keys, not your coins.
              </p>
              <p className="text-gray-600 leading-relaxed mb-0">
                The scars from that era run deep. They taught me lessons that no bull market
                gains ever could.
              </p>
            </div>

            {/* Chapter 4 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#F7931A]/20 rounded-full flex items-center justify-center">
                  <i className="ph-bold ph-lightning text-[#F7931A] text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Chapter 4: The Return</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                I emerged from the wreckage hardened. Battle-scarred. And absolutely,
                unshakably convicted. No more distractions. No more shiny objects.
                No more &ldquo;diversification&rdquo; into worthless tokens.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Bitcoin only. Self-custody only. Open-source only. Air-gapped when possible.
                Multisig when practical. Stack sats. Verify everything. Trust no one.
              </p>
              <p className="text-gray-600 leading-relaxed mb-0">
                I went from being a &ldquo;crypto enthusiast&rdquo; to being a militant Bitcoin
                maximalist. And I have never felt more at peace with my financial future.
              </p>
            </div>

            {/* Chapter 5 */}
            <div className="bg-white rounded-2xl border border-[#F7931A] p-8 ring-2 ring-[#F7931A]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#F7931A] rounded-full flex items-center justify-center">
                  <i className="ph-bold ph-target text-white text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Chapter 5: The Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                This website exists because I wish it had existed when I started. A clear,
                no-nonsense guide to self-custody. A resource that does not shill shitcoins
                or take payments from hardware wallet companies. Just honest reviews from
                someone who has been through the fire.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Self-custody is not just a feature. It is the entire point of Bitcoin.
                Without self-custody, you are just using a slower, more expensive PayPal.
                You are trusting the same institutions Bitcoin was designed to replace.
              </p>
              <p className="text-gray-600 leading-relaxed">
                I champion self-custody because it is the pinnacle of what makes Bitcoin
                special. It is the difference between owning money and being allowed to
                use money. It is sovereignty. It is freedom.
              </p>
              <p className="text-gray-600 leading-relaxed mb-0">
                This site is my contribution to the cause. A one-stop shop for anyone
                ready to take their Bitcoin into their own hands. No shitcoins.
                No sponsored content. No apologies.
              </p>
            </div>
          </article>

          {/* Signature */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 border border-gray-200">
              <div className="w-8 h-8 bg-[#F7931A] rounded-full flex items-center justify-center text-white">
                <i className="ph-bold ph-currency-btc text-lg"></i>
              </div>
              <span className="text-gray-600">
                Stay humble. Stack sats. Hold your own keys.
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-gray-900 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to Take Control?
            </h3>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Browse our rankings and find the hardware wallet that fits your needs.
              Your keys, your coins, your future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/wallets"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F7931A] text-white font-bold hover:bg-[#E8820B] transition-colors"
              >
                <i className="ph-bold ph-wallet"></i>
                View Wallet Rankings
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
              >
                <i className="ph-bold ph-git-diff"></i>
                Compare Features
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

'use client';

import { BattleResult } from '../../lib/battleLogic';
import { walletDetails, getComparisonContent } from '../../lib/walletDetails';

interface BattleBreakdownProps {
  result: BattleResult;
  onClose: () => void;
}

export default function BattleBreakdown({ result, onClose }: BattleBreakdownProps) {
  const { winner, loser } = result;

  // Get detailed wallet info
  const winnerDetails = walletDetails[winner.id];
  const loserDetails = walletDetails[loser.id];
  const comparison = getComparisonContent(winner.id, loser.id);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // If we don't have detailed data, fall back to basic comparison
  if (!winnerDetails || !loserDetails) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <button onClick={onClose} className="mb-4 text-gray-600">← Back</button>
          <h1 className="text-2xl font-bold">Comparison data not available</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-50">
      {/* Sticky Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">Bitcoiner Reviews</span>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="ph-bold ph-x"></i>
            Close
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Article Meta */}
        <div className="border-b border-gray-200 pb-8 mb-10">
          <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs uppercase tracking-wider font-semibold mb-4">
            Security Comparison
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {winner.name} vs {loser.name}: Which Hardware Wallet Actually Protects Your Bitcoin?
          </h1>
          <p className="text-xl text-gray-500 mb-6">
            {winnerDetails.tagline} vs {loserDetails.tagline}. We break down the security architecture, company track record, and real-world differences.
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="w-10 h-10 bg-[#F7931A] rounded-full flex items-center justify-center text-white font-bold">
              BR
            </div>
            <div>
              <div className="font-semibold text-gray-700">Bitcoiner Reviews</div>
              <div>Updated {getCurrentDate()} · 12 min read</div>
            </div>
          </div>
        </div>

        {/* Quick Verdict Box */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <i className="ph-fill ph-trophy text-yellow-500 text-2xl"></i>
            <span className="font-bold text-green-800 text-lg">Quick Verdict</span>
          </div>
          <p className="text-green-800 leading-relaxed">
            {comparison?.comparison.verdict || `${winner.name} wins this comparison with superior security architecture and features.`}
          </p>
        </div>

        {/* Intro Section */}
        <section className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Choosing between {winner.name} and {loser.name} comes down to what you prioritize: {winner.bitcoinOnly ? 'Bitcoin-only focus and ' : ''}{winnerDetails.connectionMethods.some(c => c.includes('air-gapped') || c.includes('QR')) ? 'air-gapped security' : 'established ecosystem'} or {loserDetails.connectionMethods.some(c => c.includes('air-gapped') || c.includes('QR')) ? 'air-gapped operation' : 'convenience and broader support'}.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>{winnerDetails.company}</strong> (founded {winnerDetails.founded}, {winnerDetails.headquarters}) built {winner.name} with a clear philosophy: {winnerDetails.tagline.toLowerCase()}. Meanwhile, <strong>{loserDetails.company}</strong> ({loserDetails.headquarters}) takes a {loser.bitcoinOnly ? 'similarly focused' : 'broader'} approach with {loser.name}.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Let&apos;s break down exactly why {winner.name} comes out ahead and whether {loser.name} might still be right for certain users.
          </p>
        </section>

        {/* Company & Trust Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Background & Trust</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Winner Company */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ph-fill ph-check text-green-600"></i>
                </div>
                {winnerDetails.company}
              </h3>
              <p className="text-sm text-gray-500 mb-4">Founded {winnerDetails.founded} · {winnerDetails.headquarters}</p>
              <ul className="space-y-2">
                {winnerDetails.trustFactors.positive.slice(0, 4).map((factor, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <i className="ph-fill ph-check-circle text-green-500 mt-0.5 flex-shrink-0"></i>
                    <span className="text-gray-700">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Loser Company */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <i className="ph ph-buildings text-gray-600"></i>
                </div>
                {loserDetails.company}
              </h3>
              <p className="text-sm text-gray-500 mb-4">Founded {loserDetails.founded} · {loserDetails.headquarters}</p>
              <ul className="space-y-2">
                {loserDetails.trustFactors.positive.slice(0, 2).map((factor, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <i className="ph-fill ph-check-circle text-green-500 mt-0.5 flex-shrink-0"></i>
                    <span className="text-gray-700">{factor}</span>
                  </li>
                ))}
                {loserDetails.trustFactors.negative.slice(0, 2).map((factor, i) => (
                  <li key={`neg-${i}`} className="flex items-start gap-2 text-sm">
                    <i className="ph-fill ph-warning-circle text-amber-500 mt-0.5 flex-shrink-0"></i>
                    <span className="text-gray-600">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Incidents Section (if loser has any) */}
        {loserDetails.incidents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Incidents & Controversies</h2>

            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6 mb-6">
              <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                <i className="ph-fill ph-warning text-red-600"></i>
                {loserDetails.company} Incident History
              </h3>
              <div className="space-y-4">
                {loserDetails.incidents.map((incident, i) => (
                  <div key={i} className="border-b border-red-200 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        incident.severity === 'critical' ? 'bg-red-600 text-white' :
                        incident.severity === 'major' ? 'bg-orange-500 text-white' :
                        'bg-yellow-500 text-white'
                      }`}>
                        {incident.severity.toUpperCase()}
                      </span>
                      <span className="text-sm text-red-700 font-medium">{incident.date}</span>
                    </div>
                    <h4 className="font-semibold text-red-900 mb-1">{incident.title}</h4>
                    <p className="text-sm text-red-800">{incident.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {winnerDetails.incidents.length === 0 && (
              <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
                <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <i className="ph-fill ph-shield-check text-green-600"></i>
                  {winnerDetails.company}: Clean Record
                </h3>
                <p className="text-green-700">
                  {winner.name} has no history of security breaches, data leaks, or major controversies. {winnerDetails.firmwareType.includes('open-source') ? 'The fully open-source codebase has been audited by the community without finding concerning issues.' : ''}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Security Architecture Deep Dive */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Architecture: Under the Hood</h2>

          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm mb-6">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Specification</th>
                  <th className="px-6 py-4 text-center font-semibold">{winner.name}</th>
                  <th className="px-6 py-4 text-center font-semibold">{loser.name}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Secure Element</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">{winnerDetails.secureElement}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">{loserDetails.secureElement}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Firmware</td>
                  <td className={`px-6 py-4 text-center text-sm ${winnerDetails.firmwareType.includes('open-source') ? 'text-green-700 font-medium' : 'text-gray-700'}`}>
                    {winnerDetails.firmwareType.includes('open-source') ? '✓ ' : ''}{winnerDetails.firmwareType.split('.')[0]}
                  </td>
                  <td className={`px-6 py-4 text-center text-sm ${loserDetails.firmwareType.includes('open-source') ? 'text-green-700 font-medium' : 'text-gray-700'}`}>
                    {loserDetails.firmwareType.includes('open-source') ? '✓ ' : ''}{loserDetails.firmwareType.split('.')[0]}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Connection Methods</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">{winnerDetails.connectionMethods.join(', ')}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">{loserDetails.connectionMethods.join(', ')}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Display</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">{winnerDetails.displaySize}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">{loserDetails.displaySize}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Bitcoin-Only</td>
                  <td className={`px-6 py-4 text-center ${winner.bitcoinOnly ? 'bg-green-50' : ''}`}>
                    {winner.bitcoinOnly ? <span className="text-green-600 font-semibold">✓ Yes</span> : <span className="text-gray-500">No</span>}
                  </td>
                  <td className={`px-6 py-4 text-center ${loser.bitcoinOnly ? 'bg-green-50' : ''}`}>
                    {loser.bitcoinOnly ? <span className="text-green-600 font-semibold">✓ Yes</span> : <span className="text-gray-500">No</span>}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Multisig Support</td>
                  <td className="px-6 py-4 text-center">
                    {winnerDetails.supportsMultisig ? <span className="text-green-600">✓</span> : <span className="text-gray-400">✗</span>}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {loserDetails.supportsMultisig ? <span className="text-green-600">✓</span> : <span className="text-gray-400">✗</span>}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Price</td>
                  <td className={`px-6 py-4 text-center font-bold ${winner.price <= loser.price ? 'text-green-600' : 'text-gray-900'}`}>
                    ${winner.price}
                  </td>
                  <td className={`px-6 py-4 text-center font-bold ${loser.price < winner.price ? 'text-green-600' : 'text-gray-900'}`}>
                    ${loser.price}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Security Model Explanation */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h4 className="font-bold text-green-800 mb-3">{winner.name} Security Model</h4>
              <p className="text-sm text-green-700 leading-relaxed">{winnerDetails.securityModel}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-bold text-gray-700 mb-3">{loser.name} Security Model</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{loserDetails.securityModel}</p>
            </div>
          </div>
        </section>

        {/* Head-to-Head Advantages */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Head-to-Head: {winner.name} vs {loser.name}</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-500">
              <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                <i className="ph-fill ph-trophy text-yellow-500"></i>
                Why {winner.name} Wins
              </h3>
              <ul className="space-y-3">
                {/* Use comparison advantages if available, otherwise use battle reasons */}
                {(comparison?.comparison.advantages.length ?? 0) > 0 ? (
                  comparison?.comparison.advantages.map((adv, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="ph-fill ph-check-circle text-green-600 mt-0.5 flex-shrink-0"></i>
                      <span className="text-sm text-green-800">{adv}</span>
                    </li>
                  ))
                ) : (
                  result.reasons.filter(r => r.isWinnerAdvantage).map((reason, i) => (
                    <li key={`reason-${i}`} className="flex items-start gap-2">
                      <i className="ph-fill ph-check-circle text-green-600 mt-0.5 flex-shrink-0"></i>
                      <span className="text-sm text-green-800">{reason.text}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-300">
              <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                <i className="ph-fill ph-x-circle text-red-500"></i>
                Where {loser.name} Falls Short
              </h3>
              <ul className="space-y-3">
                {/* Use comparison disadvantages if available, otherwise use battle reasons */}
                {(comparison?.comparison.disadvantages.length ?? 0) > 0 ? (
                  comparison?.comparison.disadvantages.map((dis, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="ph-fill ph-x-circle text-red-500 mt-0.5 flex-shrink-0"></i>
                      <span className="text-sm text-red-700">{dis}</span>
                    </li>
                  ))
                ) : (
                  result.reasons.filter(r => !r.isWinnerAdvantage).map((reason, i) => (
                    <li key={`reason-${i}`} className="flex items-start gap-2">
                      <i className="ph-fill ph-x-circle text-red-500 mt-0.5 flex-shrink-0"></i>
                      <span className="text-sm text-red-700">{reason.text}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Pros/Cons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Analysis</h2>

          {/* Winner Detailed Pros */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{winner.name}: Key Strengths</h3>
            <div className="space-y-4">
              {winnerDetails.detailedPros.map((pro, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <i className="ph-fill ph-check-circle text-green-500"></i>
                    {pro.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{pro.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Loser Detailed Cons */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{loser.name}: Key Weaknesses</h3>
            <div className="space-y-4">
              {loserDetails.detailedCons.map((con, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <i className="ph-fill ph-x-circle text-red-500"></i>
                    {con.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{con.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Should Buy What */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Who Should Buy Which?</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-bold text-green-800 mb-4">{winner.name} is Best For:</h3>
              <ul className="space-y-2">
                {winnerDetails.bestFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                    <i className="ph-fill ph-user-check text-green-600 mt-0.5"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-700 mb-4">{loser.name} Might Work For:</h3>
              <ul className="space-y-2">
                {loserDetails.bestFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <i className="ph ph-user text-gray-400 mt-0.5"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Final Verdict */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Final Verdict</h2>
          <div className="bg-gray-900 text-white rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <i className="ph-fill ph-trophy text-yellow-500 text-4xl"></i>
              <div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Winner</div>
                <div className="text-3xl font-bold">{winner.name}</div>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
              {comparison?.comparison.verdict}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-900/30 rounded-xl p-5 text-center">
                <div className="text-green-400 font-semibold mb-1">{winner.name}</div>
                <div className="text-4xl font-bold text-white mb-1">{winner.rating}/10</div>
                <div className="text-green-400 text-sm font-medium">RECOMMENDED</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-5 text-center">
                <div className="text-gray-400 font-semibold mb-1">{loser.name}</div>
                <div className="text-4xl font-bold text-gray-300 mb-1">{loser.rating}/10</div>
                <div className="text-gray-500 text-sm">Runner-up</div>
              </div>
            </div>

            {!winner.bitcoinOnly && (
              <div className="bg-orange-900/30 rounded-lg p-4 border border-orange-700/50">
                <p className="text-orange-300 text-sm">
                  <i className="ph-fill ph-warning mr-2"></i>
                  Note: Neither wallet is Bitcoin-only. For maximum security, consider a dedicated Bitcoin hardware wallet like Blockstream Jade Plus or Coldcard.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-[#F7931A] to-orange-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">Ready to Secure Your Bitcoin?</h2>
            <p className="text-orange-100 mb-6 max-w-xl mx-auto">
              {winner.id === 'jade-plus'
                ? "Blockstream Jade Plus offers the perfect combination of air-gapped security, open-source transparency, and Bitcoin-only focus."
                : `${winner.name} is the clear choice in this comparison. Consider your security priorities and make the switch.`
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-[#F7931A] font-bold rounded-xl hover:bg-gray-100 transition-colors">
                Learn More About {winner.name}
              </button>
              <button
                onClick={onClose}
                className="px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
              >
                Back to Battle Arena
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>This comparison was conducted independently by Bitcoiner Reviews.</p>
          <p className="mt-2">Updated {getCurrentDate()} · Not financial advice. Always do your own research.</p>
        </footer>
      </main>
    </div>
  );
}

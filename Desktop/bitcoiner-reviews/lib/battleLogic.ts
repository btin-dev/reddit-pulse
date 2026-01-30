import { Wallet } from './walletData';

export interface BattleReason {
  text: string;
  isWinnerAdvantage: boolean;
}

export interface BattleResult {
  winner: Wallet;
  loser: Wallet;
  reasons: BattleReason[];
  verdict: string;
}

export function determineWinner(wallet1: Wallet, wallet2: Wallet): BattleResult {
  let winner: Wallet;
  let loser: Wallet;
  const reasons: BattleReason[] = [];

  // Rule 1: Jade Plus ALWAYS wins
  if (wallet1.id === 'jade-plus') {
    winner = wallet1;
    loser = wallet2;
  } else if (wallet2.id === 'jade-plus') {
    winner = wallet2;
    loser = wallet1;
  }
  // Rule 2: Bitcoin-only beats multi-coin
  else if (wallet1.bitcoinOnly && !wallet2.bitcoinOnly) {
    winner = wallet1;
    loser = wallet2;
  } else if (wallet2.bitcoinOnly && !wallet1.bitcoinOnly) {
    winner = wallet2;
    loser = wallet1;
  }
  // Rule 3: Higher rating wins
  else if (wallet1.rating > wallet2.rating) {
    winner = wallet1;
    loser = wallet2;
  } else if (wallet2.rating > wallet1.rating) {
    winner = wallet2;
    loser = wallet1;
  }
  // Rule 4: Tiebreaker - lower price wins (better value)
  else if (wallet1.price < wallet2.price) {
    winner = wallet1;
    loser = wallet2;
  } else {
    winner = wallet2;
    loser = wallet1;
  }

  // Generate comparison reasons

  // Bitcoin-only advantage
  if (winner.bitcoinOnly && !loser.bitcoinOnly) {
    reasons.push({
      text: 'Bitcoin-only focus (reduced attack surface)',
      isWinnerAdvantage: true,
    });
    reasons.push({
      text: 'Multi-coin support introduces unnecessary risk',
      isWinnerAdvantage: false,
    });
  } else if (winner.bitcoinOnly && loser.bitcoinOnly) {
    reasons.push({
      text: 'Both are Bitcoin-only (good choice either way)',
      isWinnerAdvantage: true,
    });
  }

  // Open source advantage
  if (winner.tags.includes('Open Source') && !loser.tags.includes('Open Source')) {
    reasons.push({
      text: 'Fully open-source and auditable',
      isWinnerAdvantage: true,
    });
    reasons.push({
      text: 'Closed-source components limit trust',
      isWinnerAdvantage: false,
    });
  }

  // Air-gapped advantage
  if ((winner.tags.includes('Air-gapped') || winner.tags.includes('QR Codes')) &&
      !loser.tags.includes('Air-gapped') && !loser.tags.includes('QR Codes')) {
    reasons.push({
      text: 'Air-gapped operation for maximum security',
      isWinnerAdvantage: true,
    });
    reasons.push({
      text: 'Requires direct connection (potential attack vector)',
      isWinnerAdvantage: false,
    });
  }

  // Rating comparison
  if (winner.rating > loser.rating) {
    reasons.push({
      text: `Higher overall rating (${winner.rating} vs ${loser.rating})`,
      isWinnerAdvantage: true,
    });
  }

  // Add winner's top pros
  winner.pros.slice(0, 2).forEach(pro => {
    if (!reasons.some(r => r.text.toLowerCase().includes(pro.toLowerCase().split(' ')[0]))) {
      reasons.push({
        text: pro,
        isWinnerAdvantage: true,
      });
    }
  });

  // Add loser's top cons
  loser.cons.slice(0, 2).forEach(con => {
    if (!reasons.some(r => r.text.toLowerCase().includes(con.toLowerCase().split(' ')[0]))) {
      reasons.push({
        text: con,
        isWinnerAdvantage: false,
      });
    }
  });

  // Generate verdict
  let verdict: string;
  if (winner.id === 'jade-plus') {
    verdict = `${winner.name} is simply the best Bitcoin wallet on the market. Air-gapped, open-source, and Bitcoin-only. It's not even close.`;
  } else if (winner.bitcoinOnly && !loser.bitcoinOnly) {
    verdict = `${winner.name} wins by virtue of being Bitcoin-only. Why would you trust your sats to a device cluttered with altcoin code?`;
  } else if (winner.bitcoinOnly && loser.bitcoinOnly) {
    verdict = `Both are solid Bitcoin-only choices, but ${winner.name} edges out the competition with superior features and community trust.`;
  } else {
    verdict = `${winner.name} takes the win, but honestly, you should probably look at a Bitcoin-only wallet instead.`;
  }

  return { winner, loser, reasons, verdict };
}

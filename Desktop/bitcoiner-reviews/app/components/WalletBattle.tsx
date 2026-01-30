'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { wallets, Wallet } from '../../lib/walletData';
import { determineWinner, BattleResult } from '../../lib/battleLogic';
import BattleBreakdown from './BattleBreakdown';

type BattleState = 'idle' | 'fighting' | 'complete';

// Particle class for canvas animation
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;

  constructor(x: number, y: number, targetX: number, targetY: number) {
    this.x = x;
    this.y = y;
    const angle = Math.atan2(targetY - y, targetX - x) + (Math.random() - 0.5) * 1.5;
    const speed = 3 + Math.random() * 5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1;
    this.maxLife = 30 + Math.random() * 30;
    this.color = Math.random() > 0.5 ? '#F7931A' : '#FFD700';
    this.size = 2 + Math.random() * 4;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1; // gravity
    this.life++;
    return this.life < this.maxLife;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const alpha = 1 - this.life / this.maxLife;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * alpha, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

const WalletSelector = ({
  selectedWallet,
  onSelect,
  otherWallet,
  position,
  battleState,
  isWinner,
  isLoser,
}: {
  selectedWallet: Wallet | null;
  onSelect: (wallet: Wallet) => void;
  otherWallet: Wallet | null;
  position: 'left' | 'right';
  battleState: BattleState;
  isWinner: boolean;
  isLoser: boolean;
}) => {
  const getBorderClasses = () => {
    if (battleState === 'complete') {
      if (isWinner) return 'ring-4 ring-green-500 border-green-500 shadow-lg shadow-green-500/30';
      if (isLoser) return 'border-red-400 opacity-60';
    }
    if (battleState === 'fighting') return 'border-[#F7931A] shadow-lg shadow-orange-500/50';
    return 'border-gray-200 hover:border-[#F7931A]/50';
  };

  const getAnimationClass = () => {
    if (battleState === 'fighting') {
      return position === 'left' ? 'animate-clash-left' : 'animate-clash-right';
    }
    return '';
  };

  return (
    <div className={`flex-1 ${position === 'right' ? 'md:order-2' : ''}`}>
      <div className={`bg-white rounded-2xl border-2 p-6 transition-all duration-300 ${getBorderClasses()} ${getAnimationClass()}`}>
        {/* Dropdown */}
        <select
          value={selectedWallet?.id || ''}
          onChange={(e) => {
            const wallet = wallets.find(w => w.id === e.target.value);
            if (wallet) onSelect(wallet);
          }}
          disabled={battleState === 'fighting'}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 font-medium focus:outline-none focus:border-[#F7931A] disabled:opacity-50 mb-4"
        >
          <option value="">Select a wallet...</option>
          {wallets.map((wallet) => (
            <option
              key={wallet.id}
              value={wallet.id}
              disabled={wallet.id === otherWallet?.id}
            >
              {wallet.name} {wallet.bitcoinOnly ? '(Bitcoin-Only)' : ''}
            </option>
          ))}
        </select>

        {/* Wallet Preview Card */}
        {selectedWallet ? (
          <div className="relative">
            {/* Winner/Loser Badge */}
            {battleState === 'complete' && isWinner && (
              <div className="absolute -top-3 -right-3 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                WINNER!
              </div>
            )}
            {battleState === 'complete' && isLoser && (
              <div className="absolute -top-3 -right-3 z-10 bg-red-400 text-white px-3 py-1 rounded-full text-sm font-bold">
                DEFEATED
              </div>
            )}

            {/* Wallet Image */}
            <div className="aspect-square bg-gray-50 rounded-xl mb-4 flex items-center justify-center border border-gray-100 overflow-hidden">
              <img
                src={selectedWallet.image}
                alt={selectedWallet.name}
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* Wallet Info */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">{selectedWallet.name}</h3>

            <div className="flex flex-wrap gap-2 mb-3">
              {selectedWallet.bitcoinOnly && (
                <span className="px-2 py-0.5 bg-orange-50 text-[#F7931A] text-xs font-semibold rounded">Bitcoin-Only</span>
              )}
              {selectedWallet.tags.slice(0, 2).map((tag, i) => (
                <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">{tag}</span>
              ))}
            </div>

            <p className="text-lg font-bold text-gray-900">${selectedWallet.price}</p>
          </div>
        ) : (
          <div className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-300">
            <div className="text-center text-gray-400">
              <i className="ph ph-lightning text-4xl mb-2"></i>
              <p className="text-sm">Choose your fighter</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Battle Overlay Component - Just the FIGHT text and impact rings
const BattleOverlay = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 animate-flash" />

      {/* FIGHT! Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-fight-text text-7xl md:text-9xl font-black text-[#F7931A] drop-shadow-[0_0_30px_rgba(247,147,26,0.8)]">
          FIGHT!
        </div>
      </div>
    </div>
  );
};

// Background Lightning Component - Draws animated lightning across the arena
const BackgroundLightning = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;

  // Generate multiple lightning bolt paths
  const lightningBolts = [
    // Top edge bolts
    { id: 1, path: "M10,0 L15,25 L8,28 L20,60 L12,63 L25,100", delay: 0 },
    { id: 2, path: "M30,0 L25,20 L35,23 L22,55 L32,58 L18,100", delay: 0.15 },
    { id: 3, path: "M55,0 L60,30 L52,33 L65,70 L55,73 L70,100", delay: 0.08 },
    { id: 4, path: "M75,0 L70,22 L80,25 L68,60 L78,63 L65,100", delay: 0.22 },
    { id: 5, path: "M92,0 L88,28 L95,31 L85,65 L93,68 L82,100", delay: 0.12 },
    // Left edge bolts
    { id: 6, path: "M0,15 L30,20 L28,12 L65,25 L62,18 L100,30", delay: 0.05 },
    { id: 7, path: "M0,45 L25,50 L22,42 L60,55 L57,48 L100,60", delay: 0.18 },
    { id: 8, path: "M0,75 L35,70 L32,78 L70,72 L67,80 L100,75", delay: 0.25 },
    // Right edge bolts
    { id: 9, path: "M100,20 L70,25 L73,18 L40,30 L43,22 L0,35", delay: 0.1 },
    { id: 10, path: "M100,55 L65,50 L68,58 L35,52 L38,60 L0,55", delay: 0.2 },
    { id: 11, path: "M100,85 L72,80 L75,88 L45,82 L48,90 L0,85", delay: 0.28 },
    // Diagonal bolts
    { id: 12, path: "M0,0 L25,30 L18,35 L50,60 L42,65 L80,100", delay: 0.03 },
    { id: 13, path: "M100,0 L75,28 L82,33 L55,58 L62,63 L30,100", delay: 0.13 },
    { id: 14, path: "M50,0 L45,15 L55,18 L40,40 L52,43 L35,70 L48,73 L30,100", delay: 0.07 },
    // Bottom edge bolts
    { id: 15, path: "M15,100 L20,70 L12,67 L25,35 L17,32 L30,0", delay: 0.16 },
    { id: 16, path: "M85,100 L80,72 L88,69 L75,38 L83,35 L70,0", delay: 0.23 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {lightningBolts.map((bolt) => (
          <path
            key={bolt.id}
            d={bolt.path}
            stroke="#F7931A"
            strokeWidth="0.15"
            fill="none"
            className="lightning-bolt"
            style={{
              animationDelay: `${bolt.delay}s`,
              opacity: 0.6
            }}
          />
        ))}
        {/* Secondary layer with different color for depth */}
        {lightningBolts.slice(0, 8).map((bolt) => (
          <path
            key={`secondary-${bolt.id}`}
            d={bolt.path}
            stroke="#FFD700"
            strokeWidth="0.1"
            fill="none"
            className="lightning-bolt-secondary"
            style={{
              animationDelay: `${bolt.delay + 0.05}s`,
              opacity: 0.4
            }}
          />
        ))}
        {/* Thin white accent bolts */}
        {lightningBolts.slice(8, 12).map((bolt) => (
          <path
            key={`accent-${bolt.id}`}
            d={bolt.path}
            stroke="#FFFFFF"
            strokeWidth="0.08"
            fill="none"
            className="lightning-bolt-accent"
            style={{
              animationDelay: `${bolt.delay + 0.1}s`,
              opacity: 0.3
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default function WalletBattle() {
  const [wallet1, setWallet1] = useState<Wallet | null>(null);
  const [wallet2, setWallet2] = useState<Wallet | null>(null);
  const [battleState, setBattleState] = useState<BattleState>('idle');
  const [result, setResult] = useState<BattleResult | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(undefined);
  const arenaRef = useRef<HTMLDivElement>(null);

  const canFight = wallet1 && wallet2 && wallet1.id !== wallet2.id && battleState !== 'fighting';

  // Particle animation
  const animateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      const alive = particle.update();
      if (alive) particle.draw(ctx);
      return alive;
    });

    // Add new particles from both sides
    if (battleState === 'fighting' && Math.random() > 0.3) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Particles from left
      particlesRef.current.push(
        new Particle(50, centerY + (Math.random() - 0.5) * 100, centerX, centerY)
      );
      // Particles from right
      particlesRef.current.push(
        new Particle(canvas.width - 50, centerY + (Math.random() - 0.5) * 100, centerX, centerY)
      );
    }

    if (battleState === 'fighting' || particlesRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(animateParticles);
    }
  }, [battleState]);

  // Setup canvas and start animation when fighting
  useEffect(() => {
    if (battleState === 'fighting') {
      const canvas = canvasRef.current;
      const arena = arenaRef.current;
      if (canvas && arena) {
        const rect = arena.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
      particlesRef.current = [];
      animateParticles();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [battleState, animateParticles]);

  const handleFight = () => {
    if (!wallet1 || !wallet2) return;

    setBattleState('fighting');
    setResult(null);
    setShowOverlay(true);

    // Hide overlay after initial impact
    setTimeout(() => {
      setShowOverlay(false);
    }, 1500);

    // Show results
    setTimeout(() => {
      const battleResult = determineWinner(wallet1, wallet2);
      setResult(battleResult);
      setBattleState('complete');
    }, 2500);
  };

  const handleReset = () => {
    setBattleState('idle');
    setResult(null);
    particlesRef.current = [];
  };

  return (
    <section className="bg-gray-50 py-20 border-t border-gray-100 relative overflow-hidden">
      {/* Battle Overlay */}
      <BattleOverlay isActive={showOverlay} />

      {/* Screen shake wrapper */}
      <div className={battleState === 'fighting' ? 'animate-screen-shake' : ''}>
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <i className="ph-fill ph-lightning text-[#F7931A]"></i>
              Wallet Battle Arena
              <i className="ph-fill ph-lightning text-[#F7931A] transform scale-x-[-1]"></i>
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Compare wallets head-to-head. Find out which is better.<br />
              <span className="text-[#F7931A] font-semibold">Spoiler alert: Bitcoin-only always wins.</span>
            </p>
          </div>

          {/* Battle Arena */}
          <div ref={arenaRef} className="relative">
            {/* Background Lightning - behind wallet cards */}
            <BackgroundLightning isActive={battleState === 'fighting'} />

            {/* Particle Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none z-10"
            />

            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 relative z-10">
              <WalletSelector
                selectedWallet={wallet1}
                onSelect={setWallet1}
                otherWallet={wallet2}
                position="left"
                battleState={battleState}
                isWinner={result?.winner.id === wallet1?.id}
                isLoser={result?.loser.id === wallet1?.id}
              />

              {/* VS Badge */}
              <div className={`flex-shrink-0 w-20 h-20 rounded-full bg-gray-900 border-4 border-[#F7931A] flex items-center justify-center shadow-lg z-20 ${battleState === 'fighting' ? 'animate-vs-pulse' : ''}`}>
                <span className="text-2xl font-black text-[#F7931A]">VS</span>
              </div>

              <WalletSelector
                selectedWallet={wallet2}
                onSelect={setWallet2}
                otherWallet={wallet1}
                position="right"
                battleState={battleState}
                isWinner={result?.winner.id === wallet2?.id}
                isLoser={result?.loser.id === wallet2?.id}
              />
            </div>
          </div>

          {/* Fight Button */}
          <div className="text-center mb-8">
            {battleState === 'complete' ? (
              <button
                onClick={handleReset}
                className="px-8 py-4 rounded-xl font-bold text-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                <i className="ph-bold ph-arrows-clockwise mr-2"></i>
                Battle Again
              </button>
            ) : (
              <button
                onClick={handleFight}
                disabled={!canFight}
                className={`px-12 py-4 rounded-xl font-bold text-xl transition-all ${
                  canFight
                    ? 'bg-[#F7931A] text-white hover:bg-[#E8820B] hover:scale-105 shadow-lg shadow-orange-500/30'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } ${battleState === 'fighting' ? 'opacity-50' : ''}`}
              >
                {battleState === 'fighting' ? (
                  <>
                    <i className="ph-bold ph-lightning mr-2 animate-spin"></i>
                    FIGHTING...
                  </>
                ) : (
                  <>
                    <i className="ph-bold ph-lightning mr-2"></i>
                    FIGHT!
                  </>
                )}
              </button>
            )}
          </div>

          {/* Battle Results - Two Column Layout */}
          {battleState === 'complete' && result && (
            <div className="bg-white rounded-2xl p-8 animate-winner-reveal border border-gray-200 shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <i className="ph-fill ph-trophy text-3xl text-yellow-500"></i>
                <h3 className="text-2xl font-bold text-gray-900">
                  {result.winner.name} Wins!
                </h3>
              </div>

              {/* Two Column Comparison - Aligned with wallet positions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Left Column - Wallet 1 */}
                {wallet1 && (
                  result.winner.id === wallet1.id ? (
                    <div className="bg-green-50 rounded-xl p-6 border-2 border-green-500">
                      <div className="flex items-center gap-2 mb-4">
                        <i className="ph-fill ph-crown text-green-600 text-xl"></i>
                        <h4 className="font-bold text-green-800">{result.winner.name}</h4>
                      </div>
                      <div className="space-y-3 mb-4">
                        {result.reasons.filter(r => r.isWinnerAdvantage).map((reason, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <i className="ph-fill ph-check-circle text-green-600 text-lg flex-shrink-0 mt-0.5"></i>
                            <span className="text-sm text-green-800">{reason.text}</span>
                          </div>
                        ))}
                      </div>
                      {result.winner.bitcoinOnly ? (
                        <a
                          href={result.winner.storeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full py-3 rounded-lg bg-green-600 text-white font-bold text-center hover:bg-green-700 transition-colors"
                        >
                          <i className="ph-bold ph-shopping-cart mr-2"></i>
                          Buy Now
                        </a>
                      ) : (
                        <div className="w-full py-3 rounded-lg bg-gray-200 text-gray-600 font-medium text-center italic">
                          Bitcoin only, dummy.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-red-50 rounded-xl p-6 border-2 border-red-300">
                      <div className="flex items-center gap-2 mb-4">
                        <i className="ph-fill ph-skull text-red-500 text-xl"></i>
                        <h4 className="font-bold text-red-700">{result.loser.name}</h4>
                      </div>
                      <div className="space-y-3">
                        {/* Combine reasons and cons, deduplicated */}
                        {(() => {
                          const loserReasons = result.reasons.filter(r => !r.isWinnerAdvantage).map(r => r.text);
                          const additionalCons = result.loser.cons.filter(con =>
                            !loserReasons.some(reason => reason.toLowerCase().includes(con.toLowerCase()) || con.toLowerCase().includes(reason.toLowerCase()))
                          );
                          const allItems = [...loserReasons, ...additionalCons.slice(0, 3 - loserReasons.length)];
                          return allItems.slice(0, 4).map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <i className="ph-fill ph-x-circle text-red-500 text-lg flex-shrink-0 mt-0.5"></i>
                              <span className="text-sm text-red-700">{item}</span>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                  )
                )}

                {/* Right Column - Wallet 2 */}
                {wallet2 && (
                  result.winner.id === wallet2.id ? (
                    <div className="bg-green-50 rounded-xl p-6 border-2 border-green-500">
                      <div className="flex items-center gap-2 mb-4">
                        <i className="ph-fill ph-crown text-green-600 text-xl"></i>
                        <h4 className="font-bold text-green-800">{result.winner.name}</h4>
                      </div>
                      <div className="space-y-3 mb-4">
                        {result.reasons.filter(r => r.isWinnerAdvantage).map((reason, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <i className="ph-fill ph-check-circle text-green-600 text-lg flex-shrink-0 mt-0.5"></i>
                            <span className="text-sm text-green-800">{reason.text}</span>
                          </div>
                        ))}
                      </div>
                      {result.winner.bitcoinOnly ? (
                        <a
                          href={result.winner.storeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full py-3 rounded-lg bg-green-600 text-white font-bold text-center hover:bg-green-700 transition-colors"
                        >
                          <i className="ph-bold ph-shopping-cart mr-2"></i>
                          Buy Now
                        </a>
                      ) : (
                        <div className="w-full py-3 rounded-lg bg-gray-200 text-gray-600 font-medium text-center italic">
                          Bitcoin only, dummy.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-red-50 rounded-xl p-6 border-2 border-red-300">
                      <div className="flex items-center gap-2 mb-4">
                        <i className="ph-fill ph-skull text-red-500 text-xl"></i>
                        <h4 className="font-bold text-red-700">{result.loser.name}</h4>
                      </div>
                      <div className="space-y-3">
                        {/* Combine reasons and cons, deduplicated */}
                        {(() => {
                          const loserReasons = result.reasons.filter(r => !r.isWinnerAdvantage).map(r => r.text);
                          const additionalCons = result.loser.cons.filter(con =>
                            !loserReasons.some(reason => reason.toLowerCase().includes(con.toLowerCase()) || con.toLowerCase().includes(reason.toLowerCase()))
                          );
                          const allItems = [...loserReasons, ...additionalCons.slice(0, 3 - loserReasons.length)];
                          return allItems.slice(0, 4).map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <i className="ph-fill ph-x-circle text-red-500 text-lg flex-shrink-0 mt-0.5"></i>
                              <span className="text-sm text-red-700">{item}</span>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Verdict */}
              <p className="text-gray-600 italic mb-6 border-l-4 border-[#F7931A] pl-4 bg-orange-50 py-3 pr-4 rounded-r-lg">
                {result.verdict}
              </p>

              {/* CTA Button */}
              <button
                onClick={() => setShowBreakdown(true)}
                className="w-full py-4 rounded-xl bg-[#F7931A] text-white font-bold hover:bg-[#E8820B] transition-colors shadow-lg shadow-orange-500/20"
              >
                Get the Full Breakdown
                <i className="ph-bold ph-arrow-right ml-2"></i>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Breakdown Modal */}
      {showBreakdown && result && (
        <BattleBreakdown
          result={result}
          onClose={() => setShowBreakdown(false)}
        />
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes screen-shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-3px, -2px) rotate(-0.5deg); }
          20% { transform: translate(3px, 2px) rotate(0.5deg); }
          30% { transform: translate(-2px, 3px) rotate(-0.3deg); }
          40% { transform: translate(2px, -3px) rotate(0.3deg); }
          50% { transform: translate(-3px, 2px) rotate(-0.5deg); }
          60% { transform: translate(3px, -2px) rotate(0.5deg); }
          70% { transform: translate(-2px, -3px) rotate(-0.3deg); }
          80% { transform: translate(2px, 3px) rotate(0.3deg); }
          90% { transform: translate(-3px, -2px) rotate(-0.5deg); }
        }
        .animate-screen-shake {
          animation: screen-shake 0.4s ease-in-out infinite;
        }

        @keyframes clash-left {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(30px); }
        }
        .animate-clash-left {
          animation: clash-left 0.3s ease-in-out infinite;
        }

        @keyframes clash-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-30px); }
        }
        .animate-clash-right {
          animation: clash-right 0.3s ease-in-out infinite;
        }

        @keyframes vs-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(247, 147, 26, 0.7); }
          50% { transform: scale(1.2); box-shadow: 0 0 30px 10px rgba(247, 147, 26, 0.5); }
        }
        .animate-vs-pulse {
          animation: vs-pulse 0.3s ease-in-out infinite;
        }

        @keyframes fight-text {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          30% { transform: scale(1.3) rotate(5deg); opacity: 1; }
          50% { transform: scale(1) rotate(0deg); opacity: 1; }
          100% { transform: scale(2) rotate(0deg); opacity: 0; }
        }
        .animate-fight-text {
          animation: fight-text 1.5s ease-out forwards;
        }

        @keyframes flash {
          0%, 100% { opacity: 0.4; }
          10%, 30%, 50% { opacity: 0.7; }
          20%, 40% { opacity: 0.3; }
        }
        .animate-flash {
          animation: flash 1.5s ease-out forwards;
        }

        @keyframes lightning-draw {
          0% {
            stroke-dashoffset: 300;
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            stroke-dashoffset: 0;
            opacity: 0.6;
          }
          70% {
            opacity: 0.3;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        .lightning-bolt {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: lightning-draw 0.4s ease-out infinite;
          filter: drop-shadow(0 0 2px #F7931A);
        }

        .lightning-bolt-secondary {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: lightning-draw 0.5s ease-out infinite;
          filter: drop-shadow(0 0 1px #FFD700);
        }

        .lightning-bolt-accent {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: lightning-draw 0.35s ease-out infinite;
          filter: drop-shadow(0 0 1px #FFFFFF);
        }

        @keyframes impact-ring {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(8); opacity: 0; }
        }
        .animate-impact-ring-1 {
          animation: impact-ring 1s ease-out forwards;
        }
        .animate-impact-ring-2 {
          animation: impact-ring 1s ease-out forwards;
          animation-delay: 0.15s;
        }
        .animate-impact-ring-3 {
          animation: impact-ring 1s ease-out forwards;
          animation-delay: 0.3s;
        }

        @keyframes winner-reveal {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-winner-reveal {
          animation: winner-reveal 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

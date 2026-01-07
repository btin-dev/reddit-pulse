'use client';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [timeframe, setTimeframe] = useState('week');
  const [subreddit, setSubreddit] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [expanded, setExpanded] = useState({ benefits: true, painPoints: true, suggestions: true });

  const analyze = async () => {
    if (!query.trim()) { setError('Enter a search term'); return; }
    setLoading(true); setError(null); setResults(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, timeframe, subreddit: subreddit.trim() || undefined })
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResults(data);
    } catch (e) { setError(e.message); }
    setLoading(false);
  };

  const WordCloud = ({ words, title, color }) => {
    const max = Math.max(...words.map(w => w.count), 1);
    return (
      <div style={{ background: 'linear-gradient(145deg,#1a1a2e,#16213e)', borderRadius: 16, padding: 20, marginBottom: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
        <h3 style={{ fontFamily: 'monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: 2, color, marginBottom: 16, paddingBottom: 10, borderBottom: `2px solid ${color}33`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 10px ${color}` }} />{title}
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', minHeight: 100 }}>
          {words.length === 0 ? <span style={{ color: '#555', fontStyle: 'italic' }}>No keywords</span> :
            words.map((w, i) => {
              const size = 11 + (w.count / max) * 18;
              const opacity = 0.4 + (w.count / max) * 0.6;
              const isTop = w.count > max * 0.6;
              return <span key={i} style={{ fontSize: size, color, opacity, fontFamily: 'monospace', fontWeight: isTop ? 700 : 400, padding: '3px 8px', background: isTop ? `${color}18` : `${color}08`, borderRadius: 4, border: isTop ? `1px solid ${color}30` : 'none' }} title={`${w.text}: ${w.count}`}>{w.text}</span>;
            })}
        </div>
      </div>
    );
  };

  const Category = ({ title, items, color, icon, type }) => {
    const [showAll, setShowAll] = useState(false);
    const display = showAll ? items : items.slice(0, 5);
    return (
      <div style={{ marginBottom: 28 }}>
        <div onClick={() => setExpanded(p => ({ ...p, [type]: !p[type] }))} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, cursor: 'pointer' }}>
          <span style={{ fontSize: 18, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}15`, borderRadius: 6 }}>{icon}</span>
          <h3 style={{ fontFamily: 'monospace', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, color, margin: 0, flex: 1 }}>{title}</h3>
          <span style={{ background: `${color}20`, color, padding: '3px 10px', borderRadius: 12, fontSize: 11, fontFamily: 'monospace', fontWeight: 600 }}>{items.length}</span>
          <span style={{ color: '#666', fontSize: 14, transform: expanded[type] ? 'rotate(0)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}>▼</span>
        </div>
        <div style={{ maxHeight: expanded[type] ? 500 : 0, overflow: 'hidden', transition: 'max-height 0.3s' }}>
          {items.length === 0 ? <p style={{ color: '#555', fontStyle: 'italic', padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>No discussions found</p> :
            <>
              {display.map((item, i) => (
                <div key={i} onClick={() => window.open(item.url, '_blank')} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: '14px 16px', marginBottom: 10, borderLeft: `3px solid ${color}`, cursor: 'pointer' }}>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: '#d0d0d0' }}>{item.text}</p>
                  <div style={{ marginTop: 10, fontSize: 10, color: '#666', fontFamily: 'monospace', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <span style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 4 }}>r/{item.subreddit}</span>
                    <span style={{ color: '#4ecdc4' }}>▲ {item.score}</span>
                    <span>{item.comments} comments</span>
                    <span>{item.timeAgo}</span>
                  </div>
                </div>
              ))}
              {items.length > 5 && <button onClick={e => { e.stopPropagation(); setShowAll(!showAll); }} style={{ width: '100%', padding: 10, background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}30`, borderRadius: 6, color, fontSize: 11, fontFamily: 'monospace', cursor: 'pointer' }}>{showAll ? '↑ Show Less' : `↓ Show ${items.length - 5} More`}</button>}
            </>}
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a12', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      {/* Live Banner */}
      <div style={{ background: 'linear-gradient(90deg,#4ecdc422,#4ecdc411)', borderBottom: '1px solid rgba(78,205,196,0.2)', padding: '10px 48px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 8, height: 8, background: '#4ecdc4', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
        <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#4ecdc4' }}>LIVE — Real Reddit data</span>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
      </div>

      {/* Header */}
      <header style={{ padding: '28px 48px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: 10, background: 'linear-gradient(135deg,#ff6b6b,#ff8e53)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 4px 20px rgba(255,107,107,0.3)' }}>📡</div>
        <div>
          <h1 style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 700, margin: 0 }}>Reddit Pulse</h1>
          <p style={{ color: '#666', fontSize: 12, margin: 0, fontFamily: 'monospace' }}>Live sentiment analysis</p>
        </div>
      </header>

      {/* Controls */}
      <div style={{ padding: '28px 48px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: '#666', marginBottom: 8, fontFamily: 'monospace' }}>Search Topic</label>
            <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && analyze()} placeholder="e.g., Liquid Bitcoin" style={{ width: '100%', padding: '14px 18px', fontSize: 14, background: '#12121a', border: '2px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: '0 0 160px' }}>
            <label style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: '#666', marginBottom: 8, fontFamily: 'monospace' }}>Timeframe</label>
            <select value={timeframe} onChange={e => setTimeframe(e.target.value)} style={{ width: '100%', padding: '14px 18px', fontSize: 14, background: '#12121a', border: '2px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#fff', outline: 'none', boxSizing: 'border-box' }}>
              <option value="day">Past 24 Hours</option>
              <option value="week">Past 7 Days</option>
              <option value="month">Past Month</option>
              <option value="year">Past Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
          <div style={{ flex: '0 0 180px' }}>
            <label style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: '#666', marginBottom: 8, fontFamily: 'monospace' }}>Subreddit <span style={{ color: '#444' }}>(optional)</span></label>
            <input value={subreddit} onChange={e => setSubreddit(e.target.value)} onKeyDown={e => e.key === 'Enter' && analyze()} placeholder="e.g., Bitcoin" style={{ width: '100%', padding: '14px 18px', fontSize: 14, background: '#12121a', border: '2px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <button onClick={analyze} disabled={loading} style={{ padding: '14px 36px', fontSize: 13, fontWeight: 600, background: loading ? '#333' : 'linear-gradient(135deg,#ff6b6b,#ff8e53)', border: 'none', borderRadius: 10, color: '#fff', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: 1, boxShadow: loading ? 'none' : '0 4px 24px rgba(255,107,107,0.25)' }}>{loading ? '...' : 'Analyze'}</button>
        </div>
      </div>

      {/* Main */}
      <main style={{ padding: '36px 48px' }}>
        {error && <div style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.25)', borderRadius: 10, padding: '18px 22px', marginBottom: 28, color: '#ff8888', fontFamily: 'monospace', fontSize: 13 }}>⚠️ {error}</div>}

        {loading && (
          <div style={{ textAlign: 'center', padding: 80 }}>
            <div style={{ width: 50, height: 50, border: '3px solid #1a1a2e', borderTopColor: '#ff6b6b', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <p style={{ color: '#888', fontFamily: 'monospace' }}>Fetching live Reddit data...</p>
          </div>
        )}

        {results && !loading && (
          <>
            <div style={{ marginBottom: 32, padding: '20px 24px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h2 style={{ fontFamily: 'monospace', fontSize: 16, margin: 0 }}>Results for "{results.query}"</h2>
                <p style={{ fontSize: 12, color: '#666', margin: '6px 0 0', fontFamily: 'monospace' }}>{results.timeframe} • {results.subreddit}</p>
              </div>
              <div style={{ display: 'flex', gap: 20, fontFamily: 'monospace', fontSize: 12 }}>
                <span style={{ color: '#888' }}><strong>{results.stats.total}</strong> posts</span>
                <span style={{ color: '#4ecdc4' }}>✓ {results.stats.benefits}</span>
                <span style={{ color: '#ff6b6b' }}>✗ {results.stats.painPoints}</span>
                <span style={{ color: '#ffd93d' }}>💡 {results.stats.suggestions}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
              <div>
                <h2 style={{ fontFamily: 'monospace', fontSize: 13, marginBottom: 24, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#888', textTransform: 'uppercase', letterSpacing: 1.5 }}>📋 Discussion Breakdown</h2>
                <Category title="Benefits" items={results.benefits} color="#4ecdc4" icon="✓" type="benefits" />
                <Category title="Pain Points" items={results.painPoints} color="#ff6b6b" icon="✗" type="painPoints" />
                <Category title="Suggestions" items={results.suggestions} color="#ffd93d" icon="💡" type="suggestions" />
              </div>
              <div>
                <h2 style={{ fontFamily: 'monospace', fontSize: 13, marginBottom: 24, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#888', textTransform: 'uppercase', letterSpacing: 1.5 }}>☁️ Keyword Clouds</h2>
                <WordCloud words={results.clouds.benefits} title="Benefit Keywords" color="#4ecdc4" />
                <WordCloud words={results.clouds.painPoints} title="Pain Point Keywords" color="#ff6b6b" />
                <WordCloud words={results.clouds.suggestions} title="Suggestion Keywords" color="#ffd93d" />
              </div>
            </div>
          </>
        )}

        {!results && !loading && !error && (
          <div style={{ textAlign: 'center', padding: '100px 40px' }}>
            <div style={{ width: 80, height: 80, margin: '0 auto 28px', borderRadius: 20, background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>🔍</div>
            <h3 style={{ fontFamily: 'monospace', fontSize: 18, margin: '0 0 12px' }}>Discover Community Sentiment</h3>
            <p style={{ color: '#555', fontSize: 14, maxWidth: 400, margin: '0 auto' }}>Enter a topic to analyze Reddit discussions with live data.</p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Liquid Bitcoin', 'ChatGPT', 'Tesla FSD'].map(t => (
                <button key={t} onClick={() => setQuery(t)} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, color: '#888', fontSize: 12, fontFamily: 'monospace', cursor: 'pointer' }}>{t}</button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

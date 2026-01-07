export const runtime = 'edge';

const BENEFIT_WORDS = ['great','awesome','love','excellent','amazing','best','good','helpful','useful','works','easy','fast','reliable','recommend','fantastic','perfect','solid','secure','advantage','benefit','pro','positive','impressive','brilliant','wonderful','efficient','effective','innovative','convenient','valuable','worth','success','profit','gains','bullish','potential'];
const PAIN_WORDS = ['issue','problem','bad','hate','terrible','awful','worst','broken','slow','expensive','difficult','hard','confusing','frustrating','annoying','bug','error','fail','crash','risk','concern','worry','downside','con','negative','disappointing','useless','waste','scam','avoid','warning','danger','loss','bearish','volatile','unstable','complicated','risky'];
const SUGGESTION_WORDS = ['should','could','would','suggest','recommend','try','consider','instead','alternative','better','improve','wish','hope','idea','tip','advice','maybe','perhaps','option','strategy','approach','solution','fix','upgrade','switch','check'];
const STOP_WORDS = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','up','about','into','through','during','before','after','above','below','between','under','again','further','then','once','here','there','when','where','why','how','all','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','can','will','just','should','now','i','you','he','she','it','we','they','what','which','who','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','would','could','might','must','shall','as','if','because','until','while','my','your','his','her','its','our','their','me','him','us','them','get','got','like','even','also','much','many','really','actually','basically','probably','maybe','any','dont','doesnt','im','ive','its','thats','youre','were','theyre','wont','cant','didnt','isnt','arent','wasnt','werent','dont','doesnt','havent','hasnt','hadnt','wont','wouldnt','shouldnt','couldnt','cant','cannot','reddit','http','https','www','com','org','deleted','removed']);

function getTimeAgo(ts) {
  const s = Math.floor(Date.now()/1000 - ts);
  if (s >= 31536000) return Math.floor(s/31536000) + 'y ago';
  if (s >= 2592000) return Math.floor(s/2592000) + 'mo ago';
  if (s >= 86400) return Math.floor(s/86400) + 'd ago';
  if (s >= 3600) return Math.floor(s/3600) + 'h ago';
  if (s >= 60) return Math.floor(s/60) + 'm ago';
  return 'just now';
}

function categorize(text) {
  const t = text.toLowerCase();
  let b = 0, p = 0, s = 0;
  BENEFIT_WORDS.forEach(w => { if (t.includes(w)) b++; });
  PAIN_WORDS.forEach(w => { if (t.includes(w)) p++; });
  SUGGESTION_WORDS.forEach(w => { if (t.includes(w)) s++; });
  const max = Math.max(b, p, s);
  if (max === 0) return null;
  if (b === max && b > p) return 'benefits';
  if (p === max && p > b) return 'painPoints';
  if (s === max) return 'suggestions';
  return null;
}

function extractWords(texts, boost) {
  const all = texts.join(' ').toLowerCase();
  const words = (all.match(/\b[a-z]{3,}\b/g) || []).filter(w => !STOP_WORDS.has(w));
  const counts = {};
  words.forEach(w => counts[w] = (counts[w]||0) + 1);
  boost.forEach(w => { if (counts[w]) counts[w] = Math.round(counts[w]*1.5); });
  return Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0,25).map(([text,count]) => ({text,count}));
}

export async function POST(req) {
  try {
    const { query, timeframe = 'week', subreddit } = await req.json();
    if (!query) return Response.json({ error: 'Query required' }, { status: 400 });

    const sub = subreddit ? `r/${subreddit.replace(/^r\//,'')}/` : '';
    const url = `https://www.reddit.com/${sub}search.json?q=${encodeURIComponent(query)}&sort=relevance&t=${timeframe}&limit=100&raw_json=1`;
    
    const res = await fetch(url, { headers: { 'User-Agent': 'RedditPulse/1.0' } });
    if (!res.ok) return Response.json({ error: `Reddit error: ${res.status}` }, { status: res.status });
    
    const data = await res.json();
    const posts = data?.data?.children || [];
    if (!posts.length) return Response.json({ error: 'No results found' }, { status: 404 });

    const cat = { benefits: [], painPoints: [], suggestions: [] };
    const texts = { benefits: [], painPoints: [], suggestions: [] };

    posts.forEach(p => {
      const d = p.data;
      const full = `${d.title} ${d.selftext}`;
      const c = categorize(full);
      if (c) {
        cat[c].push({
          text: d.title.length > 180 ? d.title.slice(0,180)+'...' : d.title,
          subreddit: d.subreddit,
          score: d.score || 0,
          comments: d.num_comments || 0,
          timeAgo: getTimeAgo(d.created_utc || 0),
          url: `https://reddit.com${d.permalink}`
        });
        texts[c].push(full);
      }
    });

    Object.keys(cat).forEach(k => {
      cat[k].sort((a,b) => b.score - a.score);
      cat[k] = cat[k].slice(0, 20);
    });

    return Response.json({
      query,
      timeframe,
      subreddit: subreddit || 'All',
      stats: {
        total: posts.length,
        benefits: cat.benefits.length,
        painPoints: cat.painPoints.length,
        suggestions: cat.suggestions.length
      },
      benefits: cat.benefits,
      painPoints: cat.painPoints,
      suggestions: cat.suggestions,
      clouds: {
        benefits: extractWords(texts.benefits, BENEFIT_WORDS),
        painPoints: extractWords(texts.painPoints, PAIN_WORDS),
        suggestions: extractWords(texts.suggestions, SUGGESTION_WORDS)
      }
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

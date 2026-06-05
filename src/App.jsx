import React, { useState, useMemo } from 'react';
import { Plus, X, Heart, Search, MapPin, ArrowRight, Filter, Snowflake, Mail, Check } from 'lucide-react';

const SEED_LISTINGS = [
  { id: 1, title: "Bauer Vapor X3 Skates", category: "Skates", size: "Youth 4", condition: "Like New", price: 80, isFree: false, neighbourhood: "Bridgeland", description: "Used one season. Recently sharpened. My son grew out of them.", icon: "⛸" },
  { id: 2, title: "CCM Tacks Helmet + Cage", category: "Helmet", size: "Youth S", condition: "Good", price: 45, isFree: false, neighbourhood: "NW Calgary", description: "Includes cage. CSA certified, in-date. A few scuffs but solid.", icon: "🪖" },
  { id: 3, title: "Warrior Covert Gloves", category: "Gloves", size: "Junior M", condition: "Good", price: 0, isFree: true, neighbourhood: "Beltline", description: "Pay it forward. Free to a family who needs them.", icon: "🧤" },
  { id: 4, title: "Bauer Nexus Stick · 50 Flex", category: "Sticks", size: "Junior", condition: "Fair", price: 30, isFree: false, neighbourhood: "Crowfoot", description: "Solid practice stick. Tape wear but no cracks.", icon: "🏒" },
  { id: 5, title: "Sherwood Shoulder Pads", category: "Pads", size: "Bantam", condition: "Like New", price: 50, isFree: false, neighbourhood: "McKenzie Towne", description: "Worn a handful of times. Cleaned and ready.", icon: "🛡" },
  { id: 6, title: "Vaughn Goalie Pads · 28+1", category: "Goalie", size: "Pee Wee", condition: "Like New", price: 220, isFree: false, neighbourhood: "Tuscany", description: "Top condition. Switching to forward.", icon: "🥅" },
  { id: 7, title: "Full Starter Set · Mite", category: "Bundle", size: "Mite", condition: "Good", price: 0, isFree: true, neighbourhood: "Forest Lawn", description: "Helmet, gloves, pads, skates (sz 12), stick. Full set for a family in need.", icon: "📦" },
  { id: 8, title: "Hockey Bag w/ Wheels", category: "Bag", size: "Junior", condition: "Good", price: 20, isFree: false, neighbourhood: "Inglewood", description: "All zippers work. Cleaned out and ready.", icon: "🎒" },
];

const CATEGORIES = ["All", "Skates", "Helmet", "Gloves", "Sticks", "Pads", "Goalie", "Bundle", "Bag"];

export default function PassItOn() {
  const [listings, setListings] = useState(SEED_LISTINGS);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterFreeOnly, setFilterFreeOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [submittedPost, setSubmittedPost] = useState(false);
  const [submittedApply, setSubmittedApply] = useState(false);

  const [postForm, setPostForm] = useState({
    title: '', category: 'Skates', size: '', condition: 'Good', price: '', neighbourhood: '', description: '', isFree: false
  });
  const [applyForm, setApplyForm] = useState({
    parentName: '', email: '', kidAge: '', position: 'Forward', size: '', story: ''
  });

  const filtered = useMemo(() => {
    return listings.filter(l => {
      if (filterCategory !== 'All' && l.category !== filterCategory) return false;
      if (filterFreeOnly && !l.isFree) return false;
      if (searchQuery && !`${l.title} ${l.category} ${l.neighbourhood}`.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [listings, filterCategory, filterFreeOnly, searchQuery]);

  const handlePostSubmit = () => {
    if (!postForm.title || !postForm.size || !postForm.neighbourhood) return;
    const newListing = {
      id: listings.length + 1,
      title: postForm.title,
      category: postForm.category,
      size: postForm.size,
      condition: postForm.condition,
      price: postForm.isFree ? 0 : Number(postForm.price) || 0,
      isFree: postForm.isFree,
      neighbourhood: postForm.neighbourhood,
      description: postForm.description,
      icon: postForm.category === 'Skates' ? '⛸' : postForm.category === 'Helmet' ? '🪖' : postForm.category === 'Gloves' ? '🧤' : postForm.category === 'Sticks' ? '🏒' : postForm.category === 'Pads' ? '🛡' : postForm.category === 'Goalie' ? '🥅' : postForm.category === 'Bundle' ? '📦' : '🎒'
    };
    setListings([newListing, ...listings]);
    setSubmittedPost(true);
    setTimeout(() => {
      setShowPostModal(false);
      setSubmittedPost(false);
      setPostForm({ title: '', category: 'Skates', size: '', condition: 'Good', price: '', neighbourhood: '', description: '', isFree: false });
    }, 1800);
  };

  const handleApplySubmit = () => {
    if (!applyForm.parentName || !applyForm.email) return;
    setSubmittedApply(true);
    setTimeout(() => {
      setShowApplyModal(false);
      setSubmittedApply(false);
      setApplyForm({ parentName: '', email: '', kidAge: '', position: 'Forward', size: '', story: '' });
    }, 1800);
  };

  return (
    <div className="min-h-screen" style={{ background: '#F1ECE0', fontFamily: "'Outfit', sans-serif", color: '#0A0A0A' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;700;800;900&family=Fraunces:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
        .display-font { font-family: 'Big Shoulders Display', sans-serif; letter-spacing: -0.02em; }
        .serif-font { font-family: 'Fraunces', serif; }
        .ticker {
          animation: scroll 40s linear infinite;
          white-space: nowrap;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -15px rgba(10,10,10,0.15); }
        .red-line { background: #C8102E; height: 2px; }
        .blue-line { background: #1B3A5C; height: 2px; }
        .grain {
          background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0);
          background-size: 20px 20px;
        }
        .hero-letter { display: inline-block; }
        .fade-up { animation: fadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) backwards; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        input:focus, select:focus, textarea:focus { outline: 2px solid #C8102E; outline-offset: 2px; }
      `}</style>

      {/* NAV */}
      <nav className="sticky top-0 z-40 backdrop-blur-md" style={{ background: 'rgba(241, 236, 224, 0.85)', borderBottom: '1px solid rgba(10,10,10,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#0A0A0A' }}>
              <span className="display-font text-xl font-black" style={{ color: '#F1ECE0' }}>P</span>
            </div>
            <div>
              <div className="display-font font-black text-lg leading-none">PASS IT ON</div>
              <div className="text-xs uppercase tracking-widest" style={{ color: '#8B8678' }}>Calgary · YYC</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#mission" className="hover:opacity-60 transition">The Mission</a>
            <a href="#browse" className="hover:opacity-60 transition">Browse Gear</a>
            <a href="#donate" className="hover:opacity-60 transition">Need Gear?</a>
          </div>
          <button onClick={() => setShowPostModal(true)} className="px-5 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 transition hover:scale-105" style={{ background: '#0A0A0A', color: '#F1ECE0' }}>
            <Plus size={16} /> Post Gear
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 relative">
          <div className="flex items-center gap-3 mb-8 fade-up">
            <div className="red-line w-12"></div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: '#C8102E' }}>EST. 2026 · CALGARY</span>
          </div>

          <h1 className="display-font font-black leading-[0.85] mb-8" style={{ fontSize: 'clamp(60px, 12vw, 180px)' }}>
            <span className="block fade-up" style={{ animationDelay: '0.1s' }}>HOCKEY</span>
            <span className="block fade-up" style={{ animationDelay: '0.25s' }}>IS FOR <span className="serif-font italic font-normal" style={{ color: '#C8102E' }}>every</span></span>
            <span className="block fade-up" style={{ animationDelay: '0.4s' }}>KID.</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mt-12 fade-up" style={{ animationDelay: '0.55s' }}>
            <p className="text-lg md:text-xl leading-relaxed max-w-xl" style={{ color: '#2A2A2A' }}>
              A Calgary-built marketplace for buying, selling, and passing forward used hockey gear — so the cost of a starter set never decides who gets to play.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-start md:items-end md:justify-end">
              <a href="#browse" className="px-7 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 transition hover:scale-105" style={{ background: '#C8102E', color: 'white' }}>
                Browse Gear <ArrowRight size={16} />
              </a>
              <button onClick={() => setShowApplyModal(true)} className="px-7 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 transition hover:scale-105 border-2" style={{ borderColor: '#0A0A0A', color: '#0A0A0A' }}>
                Apply for Free Gear
              </button>
            </div>
          </div>
        </div>

        {/* TICKER */}
        <div className="border-t-2 border-b-2 py-4 overflow-hidden mt-16" style={{ borderColor: '#0A0A0A', background: '#0A0A0A', color: '#F1ECE0' }}>
          <div className="ticker display-font font-bold text-2xl flex">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 pr-12">
                <span>47 PIECES PASSED FORWARD</span>
                <span style={{ color: '#C8102E' }}>✦</span>
                <span>12 CALGARY FAMILIES HELPED</span>
                <span style={{ color: '#C8102E' }}>✦</span>
                <span>3 RINKS PARTNERED</span>
                <span style={{ color: '#C8102E' }}>✦</span>
                <span>ZERO KIDS LEFT BEHIND</span>
                <span style={{ color: '#C8102E' }}>✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="blue-line w-8"></div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: '#1B3A5C' }}>01 · The Mission</span>
            </div>
            <h2 className="display-font font-black text-5xl md:text-6xl leading-none">WHY THIS<br/>EXISTS.</h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="serif-font text-2xl md:text-3xl leading-snug mb-8 italic" style={{ color: '#1B3A5C' }}>
              "I've watched teammates quit the sport I love — not because they didn't want to play, but because their families couldn't afford another season."
            </p>
            <div className="space-y-5 text-base leading-relaxed" style={{ color: '#2A2A2A' }}>
              <p>
                A full set of hockey gear for a 10-year-old in Calgary runs <strong>$600 to $1,200</strong>. Add ice time, registration, and travel — and you've priced out an entire generation of kids who might love the game.
              </p>
              <p>
                Meanwhile, garages across this city are stacked with last season's gear — outgrown skates, helmets, pads, sticks. Pass It On exists to close that loop. Buy. Sell. Donate. Receive. Calgary, taking care of Calgary.
              </p>
              <div className="pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#C8102E', color: 'white' }}>
                  <Heart size={16} fill="white" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Built by a Calgary hockey kid.</div>
                  <div className="text-xs" style={{ color: '#8B8678' }}>Player · Captain · Coach · Builder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-b" style={{ borderColor: 'rgba(10,10,10,0.15)', background: '#EAE3D2' }}>
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: '$1,200', l: 'Avg cost of a youth gear set in Calgary' },
            { n: '1 in 4', l: 'Calgary families say sport cost is a barrier' },
            { n: '70%', l: 'Of used gear ends up in storage, not in play' },
            { n: '∞', l: 'Kids who deserve a chance on the ice' },
          ].map((s, i) => (
            <div key={i} className="border-l-2 pl-5" style={{ borderColor: i === 1 || i === 3 ? '#C8102E' : '#0A0A0A' }}>
              <div className="display-font font-black text-4xl md:text-5xl leading-none mb-3">{s.n}</div>
              <div className="text-sm leading-snug" style={{ color: '#5A5752' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BROWSE */}
      <section id="browse" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="red-line w-8"></div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: '#C8102E' }}>02 · The Marketplace</span>
            </div>
            <h2 className="display-font font-black text-5xl md:text-6xl leading-none">BROWSE<br/>THE GEAR.</h2>
          </div>
          <div className="text-sm" style={{ color: '#5A5752' }}>
            <span className="display-font font-black text-2xl" style={{ color: '#0A0A0A' }}>{filtered.length}</span> listings live · Calgary
          </div>
        </div>

        {/* FILTERS */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#8B8678' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search skates, helmets, gloves, neighbourhoods…"
              className="w-full pl-12 pr-4 py-3.5 rounded-full text-sm font-medium border-2"
              style={{ background: 'transparent', borderColor: '#0A0A0A' }}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition"
                style={{
                  background: filterCategory === cat ? '#0A0A0A' : 'transparent',
                  color: filterCategory === cat ? '#F1ECE0' : '#0A0A0A',
                  border: `1.5px solid ${filterCategory === cat ? '#0A0A0A' : 'rgba(10,10,10,0.2)'}`
                }}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => setFilterFreeOnly(!filterFreeOnly)}
              className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1.5 ml-2"
              style={{
                background: filterFreeOnly ? '#C8102E' : 'transparent',
                color: filterFreeOnly ? 'white' : '#C8102E',
                border: `1.5px solid #C8102E`
              }}
            >
              <Heart size={12} fill={filterFreeOnly ? 'white' : 'none'} /> Free Only
            </button>
          </div>
        </div>

        {/* LISTINGS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(l => (
            <div key={l.id} className="card-hover rounded-2xl overflow-hidden border-2 flex flex-col" style={{ borderColor: l.isFree ? '#C8102E' : '#0A0A0A', background: l.isFree ? '#FFF5F1' : '#F8F4E9' }}>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{l.icon}</div>
                  {l.isFree ? (
                    <div className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1" style={{ background: '#C8102E', color: 'white' }}>
                      <Heart size={11} fill="white" /> FREE
                    </div>
                  ) : (
                    <div className="display-font font-black text-2xl">${l.price}</div>
                  )}
                </div>
                <h3 className="display-font font-bold text-xl leading-tight mb-2">{l.title}</h3>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs px-2 py-1 rounded font-semibold" style={{ background: 'rgba(10,10,10,0.08)' }}>{l.size}</span>
                  <span className="text-xs px-2 py-1 rounded font-semibold" style={{ background: 'rgba(10,10,10,0.08)' }}>{l.condition}</span>
                </div>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#5A5752' }}>{l.description}</p>
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'rgba(10,10,10,0.1)' }}>
                  <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#5A5752' }}>
                    <MapPin size={12} /> {l.neighbourhood}
                  </div>
                  <button className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1 hover:opacity-60 transition">
                    {l.isFree ? 'Request' : 'Message'} <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: '#8B8678' }}>
            <div className="display-font font-black text-3xl mb-2">NO GEAR FOUND.</div>
            <p className="text-sm">Try a different filter — or post the gear you have.</p>
          </div>
        )}
      </section>

      {/* DONATE / APPLY */}
      <section id="donate" className="relative overflow-hidden" style={{ background: '#0A0A0A', color: '#F1ECE0' }}>
        <div className="absolute inset-0 grain opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 py-24 relative">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="red-line w-8"></div>
                <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: '#C8102E' }}>03 · Free Gear Program</span>
              </div>
              <h2 className="display-font font-black text-6xl md:text-8xl leading-[0.85] mb-8">
                CAN'T AFFORD<br/>GEAR? <span className="serif-font italic font-normal" style={{ color: '#C8102E' }}>we got you.</span>
              </h2>
              <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: '#C8C2B3' }}>
                If the cost of hockey is keeping your kid off the ice, fill out a short application. We'll match you with donated gear from Calgary families. No fees. No questions about income. Just hockey.
              </p>
              <button onClick={() => setShowApplyModal(true)} className="px-8 py-4 rounded-full font-semibold text-base flex items-center gap-2 transition hover:scale-105" style={{ background: '#C8102E', color: 'white' }}>
                Apply for Free Gear <ArrowRight size={18} />
              </button>
            </div>
            <div className="md:col-span-4 md:col-start-9 space-y-4">
              {[
                { n: '01', t: 'Apply', d: 'Tell us who you are, what your kid needs, and what size.' },
                { n: '02', t: 'We Match', d: 'We pair your application with donated gear in our network.' },
                { n: '03', t: 'Pickup', d: 'Coordinate a pickup at a partner Calgary rink. Free.' },
              ].map(s => (
                <div key={s.n} className="border-l-2 pl-5 py-2" style={{ borderColor: '#C8102E' }}>
                  <div className="display-font font-black text-3xl leading-none mb-1" style={{ color: '#C8102E' }}>{s.n}</div>
                  <div className="font-bold text-base mb-1">{s.t}</div>
                  <div className="text-sm" style={{ color: '#C8C2B3' }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="rounded-3xl p-10 md:p-16 grid md:grid-cols-2 gap-10 items-center" style={{ background: '#EAE3D2', border: '2px solid #0A0A0A' }}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="blue-line w-8"></div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: '#1B3A5C' }}>04 · Got Gear?</span>
            </div>
            <h3 className="display-font font-black text-5xl md:text-6xl leading-none mb-4">PASS<br/>IT ON.</h3>
            <p className="text-base leading-relaxed" style={{ color: '#2A2A2A' }}>
              Outgrown skates in the basement? List them in 60 seconds — sell, trade, or donate to a family on the waiting list.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => setShowPostModal(true)} className="px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition hover:scale-105" style={{ background: '#0A0A0A', color: '#F1ECE0' }}>
              <Plus size={18} /> Post a Listing
            </button>
            <button onClick={() => { setShowPostModal(true); setPostForm({ ...postForm, isFree: true }); }} className="px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition hover:scale-105 border-2" style={{ borderColor: '#C8102E', color: '#C8102E' }}>
              <Heart size={18} /> Donate Gear
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2" style={{ borderColor: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="display-font font-black text-2xl">PASS IT ON · YYC</div>
            <div className="text-sm mt-1" style={{ color: '#5A5752' }}>Calgary, AB · Built by a hockey kid for hockey kids.</div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:opacity-60 transition flex items-center gap-1.5"><Mail size={14} /> hello@passiton.yyc</a>
            <span style={{ color: '#5A5752' }}>© 2026</span>
          </div>
        </div>
      </footer>

      {/* POST MODAL */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(10,10,10,0.7)' }} onClick={() => setShowPostModal(false)}>
          <div className="rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-8 relative" style={{ background: '#F1ECE0' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowPostModal(false)} className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center hover:opacity-70 transition" style={{ background: '#0A0A0A', color: '#F1ECE0' }}>
              <X size={16} />
            </button>

            {submittedPost ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: '#C8102E', color: 'white' }}>
                  <Check size={32} />
                </div>
                <h3 className="display-font font-black text-3xl mb-2">LISTING POSTED.</h3>
                <p className="text-sm" style={{ color: '#5A5752' }}>Thanks for passing it on.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <div className="red-line w-8"></div>
                  <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: '#C8102E' }}>Post Gear</span>
                </div>
                <h3 className="display-font font-black text-4xl mb-6 leading-none">LIST YOUR GEAR.</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold block mb-1.5">Title</label>
                    <input type="text" value={postForm.title} onChange={e => setPostForm({ ...postForm, title: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 text-sm" style={{ borderColor: '#0A0A0A', background: 'transparent' }} placeholder="e.g. Bauer Vapor X3 Skates" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold block mb-1.5">Category</label>
                      <select value={postForm.category} onChange={e => setPostForm({ ...postForm, category: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 text-sm" style={{ borderColor: '#0A0A0A', background: 'transparent' }}>
                        {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold block mb-1.5">Size</label>
                      <input type="text" value={postForm.size} onChange={e => setPostForm({ ...postForm, size: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 text-sm" style={{ borderColor: '#0A0A0A', background: 'transparent' }} placeholder="e.g. Youth 4" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold block mb-1.5">Condition</label>
                      <select value={postForm.condition} onChange={e => setPostForm({ ...postForm, condition: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 text-sm" style={{ borderColor: '#0A0A0A', background: 'transparent' }}>
                        <option>Like New</option><option>Good</option><option>Fair</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold block mb-1.5">Neighbourhood</label>
                      <input type="text" value={postForm.neighbourhood} onChange={e => setPostForm({ ...postForm, neighbourhood: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 text-sm" style={{ borderColor: '#0A0A0A', background: 'transparent' }} placeholder="e.g. Bridgeland" />
                    </div>
                  </div>

                  <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: postForm.isFree ? '#FFF5F1' : 'transparent', border: `1.5px solid ${postForm.isFree ? '#C8102E' : 'rgba(10,10,10,0.2)'}` }}>
                    <input type="checkbox" id="isFree" checked={postForm.isFree} onChange={e => setPostForm({ ...postForm, isFree: e.target.checked })} className="w-4 h-4" style={{ accentColor: '#C8102E' }} />
                    <label htmlFor="isFree" className="text-sm font-semibold flex-1 flex items-center gap-2 cursor-pointer">
                      <Heart size={14} fill={postForm.isFree ? '#C8102E' : 'none'} style={{ color: '#C8102E' }} />
                      Donate this for free
                    </label>
                  </div>

                  {!postForm.isFree && (
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold block mb-1.5">Price (CAD)</label>
                      <input type="number" value={postForm.price} onChange={e => setPostForm({ ...postForm, price: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 text-sm" style={{ borderColor: '#0A0A0A', background: 'transparent' }} placeholder="e.g. 80" />
                    </div>
                  )}

                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold block mb-1.5">Description</label>
                    <textarea value={postForm.description} onChange={e => setPostForm({ ...postForm, description: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl border-2 text-sm" style={{ borderColor: '#0A0A0A', background: 'transparent' }} placeholder="Condition notes, why you're selling..." />
                  </div>

                  <button onClick={handlePostSubmit} className="w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition hover:scale-[1.02]" style={{ background: '#0A0A0A', color: '#F1ECE0' }}>
                    Post Listing <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* APPLY MODAL */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(10,10,10,0.7)' }} onClick={() => setShowApplyModal(false)}>
          <div className="rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-8 relative" style={{ background: '#F1ECE0' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowApplyModal(false)} className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center hover:opacity-70 transition" style={{ background: '#0A0A0A', color: '#F1ECE0' }}>
              <X size={16} />
            </button>

            {submittedApply ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: '#C8102E', color: 'white' }}>
                  <Check size={32} />
                </div>
                <h3 className="display-font font-black text-3xl mb-2">APPLICATION IN.</h3>
                <p className="text-sm" style={{ color: '#5A5752' }}>We'll be in touch within 48 hours.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <div className="red-line w-8"></div>
                  <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: '#C8102E' }}>Free Gear Application</span>
                </div>
                <h3 className="display-font font-black text-4xl mb-3 leading-none">GET YOUR KID<br/>ON THE ICE.</h3>
                <p className="text-sm mb-6" style={{ color: '#5A5752' }}>No income verification. No fees. We just need a few details to match you with the right gear.</p>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold block mb-1.5">Parent / Guardian Name</label>
                    <input type="text" value={applyForm.parentName} onChange={e => setApplyForm({ ...applyForm, parentName: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 text-sm" style={{ borderColor: '#0A0A0A', background: 'transparent' }} />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold block mb-1.5">Email</label>
                    <input type="email" value={applyForm.email} onChange={e => setApplyForm({ ...applyForm, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 text-sm" style={{ borderColor: '#0A0A0A', background: 'transparent' }} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold block mb-1.5">Kid's Age</label>
                      <input type="text" value={applyForm.kidAge} onChange={e => setApplyForm({ ...applyForm, kidAge: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 text-sm" style={{ borderColor: '#0A0A0A', background: 'transparent' }} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold block mb-1.5">Position</label>
                      <select value={applyForm.position} onChange={e => setApplyForm({ ...applyForm, position: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 text-sm" style={{ borderColor: '#0A0A0A', background: 'transparent' }}>
                        <option>Forward</option><option>Defence</option><option>Goalie</option><option>Unsure</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold block mb-1.5">Size</label>
                      <input type="text" value={applyForm.size} onChange={e => setApplyForm({ ...applyForm, size: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 text-sm" style={{ borderColor: '#0A0A0A', background: 'transparent' }} placeholder="Youth M" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold block mb-1.5">Tell us a bit about your kid (optional)</label>
                    <textarea value={applyForm.story} onChange={e => setApplyForm({ ...applyForm, story: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl border-2 text-sm" style={{ borderColor: '#0A0A0A', background: 'transparent' }} placeholder="What do they love about hockey?" />
                  </div>

                  <button onClick={handleApplySubmit} className="w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition hover:scale-[1.02]" style={{ background: '#C8102E', color: 'white' }}>
                    Submit Application <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

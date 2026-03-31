import { useState, useEffect, useRef } from "react";

// ── Inline styles / Tailwind replacement via CSS-in-JS globals ──────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue:      #1565C0;
    --blue-mid:  #1976D2;
    --blue-lt:   #42A5F5;
    --sky:       #E3F2FD;
    --gold:      #F9A825;
    --white:     #FFFFFF;
    --gray:      #F5F7FA;
    --text:      #1A237E;
    --muted:     #546E7A;
    --radius:    14px;
    --shadow:    0 8px 32px rgba(21,101,192,.15);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Nunito', sans-serif;
    color: var(--text);
    background: var(--white);
    overflow-x: hidden;
  }

  h1,h2,h3 { font-family: 'Playfair Display', serif; }

  /* scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--sky); }
  ::-webkit-scrollbar-thumb { background: var(--blue-mid); border-radius: 4px; }

  /* fade-in animation */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(36px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes pulse {
    0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(249,168,37,.5); }
    50%      { transform: scale(1.05); box-shadow: 0 0 0 12px rgba(249,168,37,0); }
  }
  @keyframes bounce {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-6px); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: scale(.7); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes floatWA {
    0%,100% { transform: translateY(0) scale(1); box-shadow: 0 4px 28px rgba(37,211,102,.6); }
    50%      { transform: translateY(-6px) scale(1.06); box-shadow: 0 8px 36px rgba(37,211,102,.8); }
  }
  @keyframes waPulse {
    0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.7); }
    70%  { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
    100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
  }
  @keyframes waveLeft {
    0%,100% { d: path("M0,40 Q200,0 400,40 Q600,80 800,40 L800,100 L0,100 Z"); }
    50%      { d: path("M0,60 Q200,20 400,60 Q600,100 800,60 L800,100 L0,100 Z"); }
  }

  .fade-up   { animation: fadeUp .7s ease both; }
  .fade-in   { animation: fadeIn .6s ease both; }
  .pulse-btn { animation: pulse 2.2s infinite; }
  .bounce-btn{ animation: bounce 2s infinite; }

  .section-reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity .7s ease, transform .7s ease;
  }
  .section-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* NAVBAR */
  .navbar {
    position: fixed; top:0; left:0; right:0; z-index:1000;
    display:flex; align-items:center; justify-content:space-between;
    padding: 10px 32px;
    transition: background .3s, box-shadow .3s;
  }
  .navbar.scrolled {
    background: rgba(255,255,255,.97);
    box-shadow: 0 2px 18px rgba(21,101,192,.13);
    backdrop-filter: blur(8px);
  }
  .navbar.top { background: transparent; }
  .nav-logo { display:flex; align-items:center; gap:10px; }
  .nav-logo img { height:54px; width:54px; border-radius:50%; box-shadow:0 2px 10px rgba(21,101,192,.2); object-fit:cover; }
  .nav-logo span { font-family:'Playfair Display',serif; font-weight:900; font-size:1.2rem; color:var(--blue); }
  .nav-links { display:flex; gap:24px; list-style:none; }
  .nav-links a { text-decoration:none; font-weight:700; font-size:.92rem; color:var(--blue); transition:color .2s; }
  .nav-links a:hover { color:var(--gold); }
  .nav-cta {
    background: var(--blue); color:#fff; padding:9px 22px; border-radius:30px;
    font-weight:800; font-size:.9rem; cursor:pointer; border:none;
    transition: transform .2s, box-shadow .2s;
  }
  .nav-cta:hover { transform:scale(1.06); box-shadow: 0 4px 16px rgba(21,101,192,.35); }
  .hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; }
  .hamburger span { display:block; width:26px; height:3px; background:var(--blue); border-radius:2px; }

  /* HERO */
  .hero {
    min-height: 100vh;
    background: linear-gradient(135deg, #0D47A1 0%, #1565C0 40%, #1976D2 70%, #42A5F5 100%);
    display:flex; align-items:center; justify-content:center;
    position:relative; overflow:hidden; padding: 100px 32px 60px;
    text-align:center;
  }
  .hero::before {
    content:'';
    position:absolute; inset:0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .hero-content { position:relative; z-index:2; max-width:760px; }
  .hero-badge {
    display:inline-block; background:rgba(255,255,255,.15); color:#fff;
    padding:6px 20px; border-radius:30px; font-size:.85rem; font-weight:700;
    letter-spacing:.5px; margin-bottom:20px; border:1px solid rgba(255,255,255,.25);
  }
  .hero h1 {
    font-size: clamp(2.2rem, 6vw, 3.8rem);
    color:#fff; line-height:1.15; margin-bottom:18px;
  }
  .hero h1 span { color:var(--gold); }
  .hero p {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    color:rgba(255,255,255,.88); margin-bottom:36px; font-weight:600;
  }
  .hero-btns { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }
  .btn-primary {
    background:var(--gold); color:#1A237E; padding:14px 32px; border-radius:40px;
    font-weight:800; font-size:1rem; cursor:pointer; border:none;
    transition: transform .2s, box-shadow .2s;
    box-shadow: 0 4px 20px rgba(249,168,37,.5);
  }
  .btn-primary:hover { transform:translateY(-3px) scale(1.04); box-shadow:0 8px 28px rgba(249,168,37,.6); }
  .btn-outline {
    background:transparent; color:#fff; padding:14px 32px; border-radius:40px;
    font-weight:800; font-size:1rem; cursor:pointer;
    border:2px solid rgba(255,255,255,.7);
    transition: background .2s, color .2s;
  }
  .btn-outline:hover { background:#fff; color:var(--blue); }
  .hero-wave {
    position:absolute; bottom:0; left:0; right:0;
  }
  .hero-stats {
    display:flex; gap:32px; justify-content:center; flex-wrap:wrap; margin-top:48px;
  }
  .hero-stat {
    background:rgba(255,255,255,.13); border:1px solid rgba(255,255,255,.2);
    border-radius:16px; padding:16px 28px; text-align:center; color:#fff;
    backdrop-filter:blur(6px);
  }
  .hero-stat .num { font-family:'Playfair Display',serif; font-size:2rem; font-weight:900; color:var(--gold); }
  .hero-stat .lbl { font-size:.82rem; font-weight:700; opacity:.85; }

  /* SECTION COMMON */
  .section { padding:80px 24px; }
  .section-title {
    text-align:center; margin-bottom:48px;
  }
  .section-title h2 { font-size:clamp(1.8rem,4vw,2.6rem); color:var(--blue); margin-bottom:12px; }
  .section-title p { color:var(--muted); font-size:1.05rem; max-width:560px; margin:0 auto; }
  .pill {
    display:inline-block; background:var(--sky); color:var(--blue);
    padding:4px 16px; border-radius:20px; font-size:.8rem; font-weight:800;
    letter-spacing:.4px; margin-bottom:10px; text-transform:uppercase;
  }

  /* SERVICES */
  .services-grid {
    display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
    gap:24px; max-width:1100px; margin:0 auto;
  }
  .service-card {
    background:#fff; border-radius:var(--radius); padding:28px 22px;
    box-shadow:var(--shadow); text-align:center;
    transition: transform .3s, box-shadow .3s;
    border:1px solid var(--sky); cursor:default;
  }
  .service-card:hover {
    transform:translateY(-8px);
    box-shadow:0 16px 40px rgba(21,101,192,.18);
  }
  .service-icon {
    font-size:3rem; margin-bottom:14px; display:block;
    transition: transform .3s;
  }
  .service-card:hover .service-icon { transform: scale(1.18) rotate(-5deg); }
  .service-card h3 { font-size:1.15rem; color:var(--blue); margin-bottom:8px; }
  .service-card p  { font-size:.88rem; color:var(--muted); line-height:1.6; }
  .service-card .tag {
    display:inline-block; margin-top:12px; background:var(--sky);
    color:var(--blue-mid); font-size:.75rem; font-weight:800;
    padding:3px 12px; border-radius:12px;
  }

  /* WHY US */
  .whyus { background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%); }
  .whyus-grid {
    display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
    gap:20px; max-width:1100px; margin:0 auto;
  }
  .whyus-card {
    background:#fff; border-radius:var(--radius); padding:26px 20px; text-align:center;
    transition: transform .3s; box-shadow:var(--shadow);
  }
  .whyus-card:hover { transform:translateY(-6px); }
  .whyus-card .icon { font-size:2.6rem; margin-bottom:12px; }
  .whyus-card h3 { font-size:1rem; color:var(--blue); margin-bottom:6px; }
  .whyus-card p  { font-size:.83rem; color:var(--muted); }

  /* PROCESS */
  .process { background:#fff; }
  .steps {
    display:flex; gap:0; max-width:900px; margin:0 auto;
    position:relative; flex-wrap:wrap; justify-content:center;
  }
  .step {
    flex:1; min-width:160px; text-align:center; padding:0 12px;
    position:relative;
  }
  .step::after {
    content:'→'; position:absolute; right:-14px; top:28px;
    font-size:1.6rem; color:var(--blue-lt); font-weight:900;
  }
  .step:last-child::after { display:none; }
  .step-circle {
    width:64px; height:64px; border-radius:50%;
    background: linear-gradient(135deg,var(--blue),var(--blue-lt));
    color:#fff; font-family:'Playfair Display',serif;
    font-size:1.6rem; font-weight:900;
    display:flex; align-items:center; justify-content:center;
    margin:0 auto 14px; box-shadow:0 4px 16px rgba(21,101,192,.3);
    transition: transform .3s;
  }
  .step:hover .step-circle { transform:scale(1.15); }
  .step .step-icon { font-size:2rem; margin-bottom:8px; }
  .step h3 { font-size:1rem; color:var(--blue); margin-bottom:6px; }
  .step p  { font-size:.82rem; color:var(--muted); }

  /* GALLERY */
  .gallery { background:var(--gray); }
  .gallery-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
    gap:20px; max-width:1200px; margin:0 auto;
  }
  .gallery-item {
    border-radius:18px; overflow:hidden;
    aspect-ratio:4/3; position:relative;
    box-shadow:0 8px 32px rgba(21,101,192,.18);
    cursor:pointer; transition: transform .35s ease, box-shadow .35s ease;
  }
  .gallery-item:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 50px rgba(21,101,192,.3);
  }
  .gallery-bg {
    position:absolute; inset:0;
    background-size:200% 200%;
    animation: gradShift 4s ease infinite;
  }
  @keyframes gradShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .gallery-shine {
    position:absolute; inset:0;
    background: linear-gradient(135deg, rgba(255,255,255,.25) 0%, transparent 50%, rgba(255,255,255,.08) 100%);
    pointer-events:none;
  }
  .gallery-particles {
    position:absolute; inset:0;
    pointer-events:none; overflow:hidden;
  }
  .g-particle {
    position:absolute;
    font-size:1.4rem;
    opacity:.45;
    animation: floatParticle var(--dur, 3s) ease-in-out infinite;
    animation-delay: var(--delay, 0s);
  }
  @keyframes floatParticle {
    0%,100% { transform: translateY(0) rotate(0deg); opacity:.35; }
    50%      { transform: translateY(-18px) rotate(15deg); opacity:.65; }
  }
  .gallery-center {
    position:absolute; inset:0;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    text-align:center; padding:16px;
  }
  .gallery-main-icon {
    font-size:3.5rem;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,.3));
    animation: iconPulse 2.5s ease-in-out infinite;
    margin-bottom:10px;
  }
  @keyframes iconPulse {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.12); }
  }
  .gallery-item:hover .gallery-main-icon {
    animation: iconSpin 0.6s ease;
  }
  @keyframes iconSpin {
    0%   { transform: scale(1) rotate(0deg); }
    50%  { transform: scale(1.3) rotate(15deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  .gallery-label {
    color:#fff; font-weight:800; font-size:1rem;
    text-shadow: 0 2px 8px rgba(0,0,0,.4);
    letter-spacing:.3px; margin-bottom:4px;
  }
  .gallery-desc {
    color:rgba(255,255,255,.82); font-size:.78rem;
    font-weight:600; text-shadow:0 1px 4px rgba(0,0,0,.3);
  }
  .gallery-emoji {
    position:absolute; top:12px; right:14px;
    font-size:1.4rem; opacity:.8;
    animation: floatParticle 2s ease-in-out infinite;
  }
  .gallery-ripple {
    position:absolute; bottom:0; left:0; right:0; height:60px;
    background: linear-gradient(180deg, transparent, rgba(0,0,0,.25));
  }

  /* TESTIMONIALS */
  .testimonials { background: linear-gradient(135deg,#0D47A1,#1976D2); }
  .testimonials .section-title h2 { color:#fff; }
  .testimonials .section-title p  { color:rgba(255,255,255,.75); }
  .testimonials .pill { background:rgba(255,255,255,.15); color:#fff; }
  .testi-grid {
    display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
    gap:20px; max-width:1000px; margin:0 auto;
  }
  .testi-card {
    background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.18);
    border-radius:var(--radius); padding:26px 22px; color:#fff;
    transition: transform .3s; backdrop-filter:blur(6px);
  }
  .testi-card:hover { transform:translateY(-6px); background:rgba(255,255,255,.15); }
  .stars { color:var(--gold); font-size:1.1rem; margin-bottom:12px; letter-spacing:2px; }
  .testi-card p { font-size:.9rem; line-height:1.7; opacity:.92; margin-bottom:16px; font-style:italic; }
  .testi-author { display:flex; align-items:center; gap:12px; }
  .testi-avatar {
    width:42px; height:42px; border-radius:50%;
    background:linear-gradient(135deg,var(--gold),#F57F17);
    display:flex; align-items:center; justify-content:center;
    font-weight:900; font-size:1.1rem; color:#fff;
  }
  .testi-name { font-weight:800; font-size:.92rem; }
  .testi-loc  { font-size:.78rem; opacity:.7; }

  /* PRICING */
  .pricing { background:#fff; }
  .pricing-grid {
    display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
    gap:20px; max-width:900px; margin:0 auto;
  }
  .price-card {
    border-radius:var(--radius); padding:28px 22px; text-align:center;
    box-shadow:var(--shadow); border:2px solid var(--sky);
    transition: transform .3s, border-color .3s;
  }
  .price-card:hover { transform:translateY(-6px); border-color:var(--blue-lt); }
  .price-card.featured { background:linear-gradient(135deg,var(--blue),var(--blue-lt)); color:#fff; border-color:var(--blue); }
  .price-card .price-icon { font-size:2.8rem; margin-bottom:12px; }
  .price-card h3 { font-size:1.1rem; margin-bottom:10px; }
  .price-card .amount { font-family:'Playfair Display',serif; font-size:2rem; color:var(--gold); font-weight:900; }
  .price-card.featured .amount { color:#FFE082; }
  .price-card p { font-size:.83rem; color:var(--muted); margin-top:8px; }
  .price-card.featured p { color:rgba(255,255,255,.8); }

  /* SEO SECTION */
  .seo-section { background:var(--sky); }
  .seo-inner { max-width:860px; margin:0 auto; }
  .seo-inner h2 { font-size:1.9rem; color:var(--blue); margin-bottom:16px; }
  .seo-inner p  { color:var(--muted); line-height:1.85; margin-bottom:14px; font-size:.97rem; }
  .seo-inner strong { color:var(--blue); }
  .seo-keywords { display:flex; flex-wrap:wrap; gap:10px; margin-top:20px; }
  .kw-tag {
    background:var(--blue); color:#fff; padding:6px 16px; border-radius:20px;
    font-size:.8rem; font-weight:700;
  }

  /* CONTACT */
  .contact-section { background:#fff; }
  .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:40px; max-width:1000px; margin:0 auto; }
  .contact-info h3 { font-size:1.5rem; color:var(--blue); margin-bottom:20px; }
  .contact-row { display:flex; align-items:flex-start; gap:14px; margin-bottom:18px; }
  .contact-row .ci { font-size:1.6rem; }
  .contact-row .cd h4 { font-size:.95rem; font-weight:800; color:var(--blue); margin-bottom:3px; }
  .contact-row .cd p, .contact-row .cd a {
    font-size:.88rem; color:var(--muted); text-decoration:none; line-height:1.6;
  }
  .contact-row .cd a:hover { color:var(--blue); }
  .phone-btn {
    display:inline-flex; align-items:center; gap:8px;
    background:var(--blue); color:#fff; padding:10px 22px; border-radius:30px;
    font-weight:800; font-size:.9rem; cursor:pointer; border:none;
    margin:6px 6px 6px 0; transition:transform .2s;
    text-decoration:none;
  }
  .phone-btn:hover { transform:scale(1.05); background:var(--gold); color:#1A237E; }
  .wa-btn {
    background:#25D366; display:inline-flex; align-items:center; gap:8px;
    color:#fff; padding:10px 22px; border-radius:30px;
    font-weight:800; font-size:.9rem; cursor:pointer; border:none;
    margin:6px 6px 6px 0; text-decoration:none; transition:transform .2s;
  }
  .wa-btn:hover { transform:scale(1.05); }
  .contact-form { background:var(--gray); border-radius:var(--radius); padding:28px; box-shadow:var(--shadow); }
  .contact-form h3 { font-size:1.3rem; color:var(--blue); margin-bottom:20px; }
  .form-group { margin-bottom:16px; }
  .form-group label { display:block; font-size:.85rem; font-weight:700; color:var(--blue); margin-bottom:6px; }
  .form-group input, .form-group textarea, .form-group select {
    width:100%; padding:11px 14px; border:2px solid #BBDEFB; border-radius:10px;
    font-family:'Nunito',sans-serif; font-size:.9rem; outline:none;
    transition:border-color .2s;
  }
  .form-group input:focus, .form-group textarea:focus { border-color:var(--blue); }
  .form-group textarea { resize:vertical; min-height:90px; }
  .submit-btn {
    width:100%; background:linear-gradient(135deg,var(--blue),var(--blue-lt));
    color:#fff; padding:13px; border-radius:10px; border:none;
    font-family:'Nunito',sans-serif; font-size:1rem; font-weight:800; cursor:pointer;
    transition:transform .2s, box-shadow .2s;
  }
  .submit-btn:hover { transform:scale(1.02); box-shadow:0 4px 16px rgba(21,101,192,.4); }
  .map-container { border-radius:var(--radius); overflow:hidden; margin-top:24px; box-shadow:var(--shadow); }

  /* FLOATING BUTTONS */
  .float-wa {
    position:fixed; bottom:28px; right:24px; z-index:9999;
    width:62px; height:62px; border-radius:50%; background:#25D366;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 4px 28px rgba(37,211,102,.6);
    animation: floatWA 3s ease-in-out infinite;
    cursor:pointer; text-decoration:none;
    border:3px solid #fff;
  }
  .float-wa svg { width:30px; height:30px; fill:#fff; }
  .float-wa:hover { background:#1ebe57; transform:scale(1.1); }
  .float-wa-label {
    position:fixed; bottom:38px; right:94px; z-index:9999;
    background:#075E54; color:#fff; padding:6px 14px; border-radius:20px;
    font-size:.8rem; font-weight:700; white-space:nowrap;
    box-shadow:0 2px 10px rgba(0,0,0,.2); pointer-events:none;
    animation: fadeIn .3s ease;
  }
  .float-wa-label::after {
    content:''; position:absolute; right:-8px; top:50%; transform:translateY(-50%);
    border:6px solid transparent; border-left:8px solid #075E54;
  }
  .scroll-top {
    position:fixed; bottom:100px; right:24px; z-index:9999;
    width:44px; height:44px; border-radius:50%; background:var(--blue);
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 4px 14px rgba(21,101,192,.4); cursor:pointer; border:none;
    color:#fff; font-size:1.2rem; opacity:0; transition:opacity .3s;
  }
  .scroll-top.show { opacity:1; }

  /* FOOTER */
  .footer { background:linear-gradient(135deg,#0D2167,#1565C0); color:#fff; padding:60px 24px 28px; }
  .footer-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:36px; max-width:1100px; margin:0 auto 40px; }
  .footer h4 { font-size:1.05rem; margin-bottom:16px; color:var(--gold); }
  .footer ul { list-style:none; }
  .footer ul li { margin-bottom:10px; }
  .footer ul li a { color:rgba(255,255,255,.75); text-decoration:none; font-size:.88rem; transition:color .2s; }
  .footer ul li a:hover { color:var(--gold); }
  .footer-brand p { font-size:.88rem; opacity:.75; line-height:1.7; margin-top:10px; }
  .social-icons { display:flex; gap:12px; margin-top:16px; }
  .social-icons a {
    width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,.1);
    display:flex; align-items:center; justify-content:center; color:#fff;
    text-decoration:none; font-size:1rem; transition:background .2s;
  }
  .social-icons a:hover { background:var(--gold); color:#1A237E; }
  .footer-bottom { border-top:1px solid rgba(255,255,255,.12); padding-top:22px; text-align:center; font-size:.83rem; opacity:.65; max-width:1100px; margin:0 auto; }

  /* RESPONSIVE */
  @media (max-width:768px) {
    .nav-links { display:none; }
    .hamburger { display:flex; }
    .nav-links.open {
      display:flex; flex-direction:column; position:absolute;
      top:70px; left:0; right:0; background:#fff; padding:20px 32px;
      box-shadow:0 8px 24px rgba(21,101,192,.12);
    }
    .contact-grid { grid-template-columns:1fr; }
    .steps { flex-direction:column; align-items:center; }
    .step::after { content:'↓'; right:auto; top:auto; bottom:-18px; left:50%; transform:translateX(-50%); }
    .step { margin-bottom:28px; }
    .hero-stats { gap:16px; }
    .hero-stat { padding:12px 18px; }
  }
`;

// ── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon:"👔", title:"Suit & Blazer Cleaning", desc:"Expert dry cleaning for suits, blazers, and formal wear with perfect finish.", tag:"Most Popular" },
  { icon:"👗", title:"Lehenga & Bridal Wear", desc:"Gentle deep cleaning for heavy bridal lehengas and embroidered outfits.", tag:"Specialist" },
  { icon:"🥻", title:"Saree & Chunni", desc:"Careful handling of delicate silks, georgettes and embellished sarees.", tag:"Delicate Care" },
  { icon:"🧥", title:"Coat & Pant Cleaning", desc:"Steam press + dry cleaning to restore the shape and freshness of coats.", tag:"Quick Delivery" },
  { icon:"🧺", title:"All Fabric Washing", desc:"Cotton, synthetic, linen — all fabric types washed with premium detergent.", tag:"Regular Service" },
  { icon:"⛺", title:"Tent House Cloth Cleaning", desc:"Large canvas & tent fabric cleaning for event businesses & mandap owners.", tag:"Bulk Orders" },
  { icon:"🛏️", title:"Blanket & Razai", desc:"Thick blankets, quilts, and razais deep cleaned and dried with care.", tag:"Seasonal" },
  { icon:"🧣", title:"Shawl & Woollen Wear", desc:"Cashmere, pashmina, and woollen shawls handled with expert care.", tag:"Luxury" },
];

const WHY_US = [
  { icon:"🏆", title:"10+ Years Experience", desc:"Trusted by Pilani locals since over a decade" },
  { icon:"💰", title:"Affordable Pricing", desc:"Best rates in Pilani with no hidden charges" },
  { icon:"⚡", title:"Fast Delivery", desc:"Same-day & next-day delivery available" },
  { icon:"✨", title:"Quality Guaranteed", desc:"100% satisfaction or re-clean for free" },
  { icon:"🛡️", title:"Safe for All Fabrics", desc:"Gentle on delicate & embroidered fabrics" },
  { icon:"📍", title:"Local Trusted Name", desc:"BITS Pilani students & residents trust us" },
];

const STEPS = [
  { icon:"📦", title:"Pickup / Drop", desc:"Schedule a pickup or drop your clothes at our store in Pilani" },
  { icon:"🫧", title:"Deep Cleaning", desc:"Professional dry cleaning using premium solvents" },
  { icon:"✅", title:"Quality Check", desc:"Each piece inspected before packing" },
  { icon:"🚚", title:"Delivery", desc:"Fresh clothes returned to your doorstep" },
];

const GALLERY_ITEMS = [
  {
    label:"Professional Dry Cleaning",
    icon:"🧺", emoji:"✨",
    grad:"linear-gradient(135deg,#1565C0 0%,#42A5F5 50%,#1565C0 100%)",
    particles:["👕","👗","👔","🧥"],
    desc:"Expert care for all garments"
  },
  {
    label:"Suit & Blazer Care",
    icon:"👔", emoji:"🌟",
    grad:"linear-gradient(135deg,#0D47A1 0%,#1976D2 50%,#0D47A1 100%)",
    particles:["🪡","✂️","🧵","💼"],
    desc:"Pristine finish guaranteed"
  },
  {
    label:"Bridal Lehenga Care",
    icon:"👗", emoji:"💎",
    grad:"linear-gradient(135deg,#6A1B9A 0%,#CE93D8 50%,#6A1B9A 100%)",
    particles:["💐","✨","🌸","💍"],
    desc:"Gentle on embroidery & zari"
  },
  {
    label:"Laundry Process",
    icon:"🫧", emoji:"💧",
    grad:"linear-gradient(135deg,#00838F 0%,#4DD0E1 50%,#00838F 100%)",
    particles:["🧼","💦","🫧","🌊"],
    desc:"Deep clean, fresh results"
  },
  {
    label:"Ethnic Wear Cleaning",
    icon:"🥻", emoji:"🌺",
    grad:"linear-gradient(135deg,#B71C1C 0%,#EF9A9A 50%,#B71C1C 100%)",
    particles:["🌹","🎀","🌺","🪷"],
    desc:"Sarees, kurtas & more"
  },
  {
    label:"Quality Checked",
    icon:"✅", emoji:"🏆",
    grad:"linear-gradient(135deg,#1B5E20 0%,#66BB6A 50%,#1B5E20 100%)",
    particles:["⭐","🏅","✅","🎯"],
    desc:"100% satisfaction promise"
  },
  {
    label:"Steam Iron Pressing",
    icon:"♨️", emoji:"🌬️",
    grad:"linear-gradient(135deg,#E65100 0%,#FFCC02 50%,#E65100 100%)",
    particles:["♨️","💨","🔥","✨"],
    desc:"Crisp & wrinkle-free finish"
  },
  {
    label:"Blanket & Razai",
    icon:"🛏️", emoji:"🌙",
    grad:"linear-gradient(135deg,#37474F 0%,#90A4AE 50%,#37474F 100%)",
    particles:["🌙","⭐","❄️","🌨️"],
    desc:"Thick fabric deep wash"
  },
];

const TESTIMONIALS = [
  { name:"Rahul Sharma", loc:"BITS Pilani Student", text:"Babulal Dry Cleaners ne meri suit bilkul naye jaisi kar di! Bahut achha kaam karte hain ye log. Fast service aur affordable price.", rating:5 },
  { name:"Priya Agarwal", loc:"Pilani, Rajasthan", text:"Meri wedding lehenga pe trust kiya aur unhone ekdum behtareen clean karke diya. Highly recommended for bridal wear!", rating:5 },
  { name:"Suresh Mittal", loc:"Jhunjhunu", text:"Best dry cleaner in the area. I send all my office suits here. Professional staff and timely delivery every time.", rating:5 },
  { name:"Anjali Singh", loc:"Chirawa", text:"Blanket aur razai cleaning ke liye best place in Pilani. Ghar aakar pickup bhi karte hain. Bahut convenient!", rating:5 },
  { name:"Deepak Gupta", loc:"Pilani Town", text:"Quality care, no compromise — yahi inki tagline hai aur yahi inka kaam bhi hai. My family has been using their service for 5 years.", rating:5 },
];

const PRICES = [
  { icon:"👔", name:"Suit (2-piece)", price:"₹199", note:"Dry clean + press" },
  { icon:"👗", name:"Lehenga", price:"₹499", note:"Bridal care included", featured:true },
  { icon:"🥻", name:"Saree / Chunni", price:"₹149", note:"Delicate handling" },
  { icon:"🧥", name:"Coat", price:"₹159", note:"Full dry clean" },
  { icon:"🛏️", name:"Blanket / Razai", price:"₹299", note:"Deep wash + dry" },
  { icon:"⛺", name:"Tent Cloth (per kg)", price:"₹49", note:"Bulk available" },
];

// ── useIntersection hook ─────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ end, suffix="" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = end / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setVal(end); clearInterval(timer); }
          else setVal(Math.floor(start));
        }, 25);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref} className="num">{val}{suffix}</span>;
}

// ── LOGO (inline base64 placeholder since we can't load local file) ───────────
const LOGO_PLACEHOLDER = "data:image/jpeg;base64,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";

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name:"", phone:"", service:"", msg:"" });
  const [submitted, setSubmitted] = useState(false);
  const [showWALabel, setShowWALabel] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToTop = () => window.scrollTo({ top:0, behavior:"smooth" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name:"", phone:"", service:"", msg:"" });
  };

  // section refs
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(),
        r4 = useReveal(), r5 = useReveal(), r6 = useReveal(),
        r7 = useReveal(), r8 = useReveal();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* ── NAVBAR ── */}
      <nav className={`navbar ${scrolled ? "scrolled" : "top"}`}>
        <div className="nav-logo">
          <img src={LOGO_PLACEHOLDER} alt="Babulal Dry Cleaners Logo" />
          <span>Babulal Dry Cleaners</span>
        </div>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {["Services","Why Us","Process","Gallery","Pricing","Contact"].map(l => (
            <li key={l}><a href={`#${l.toLowerCase().replace(" ","-")}`} onClick={()=>setMenuOpen(false)}>{l}</a></li>
          ))}
        </ul>
        <a href="tel:8949957273" className="nav-cta" style={{textDecoration:"none"}}>📞 Call Now</a>
        <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-content fade-up">
          <div className="hero-badge">🏅 Pilani's Most Trusted Dry Cleaners</div>
          <h1>Best <span>Dry Cleaning</span><br/>Service in Pilani</h1>
          <p>Professional Cleaning for Clothes, Suits, Lehenga,<br/>Blankets, Tent Cloth & More — Since 10+ Years</p>
          <div className="hero-btns">
            <a href="#contact" className="btn-primary pulse-btn" style={{textDecoration:"none"}}>📋 Book Now</a>
            <a href="tel:8949957273" className="btn-outline" style={{textDecoration:"none"}}>📞 Call: 89499 57273</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><Counter end={5000} suffix="+"/><div className="lbl">Happy Clients</div></div>
            <div className="hero-stat"><Counter end={50000} suffix="+"/><div className="lbl">Orders Done</div></div>
            <div className="hero-stat"><Counter end={10} suffix="+ yrs"/><div className="lbl">Experience</div></div>
            <div className="hero-stat"><Counter end={100} suffix="%"/><div className="lbl">Satisfaction</div></div>
          </div>
        </div>
        <svg className="hero-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{display:"block",height:"80px"}}>
          <path d="M0,40 Q360,80 720,40 Q1080,0 1440,40 L1440,80 L0,80 Z" fill="#ffffff"/>
        </svg>
      </section>

      {/* ── SERVICES ── */}
      <section className="section" id="services">
        <div className="section-reveal" ref={r1}>
          <div className="section-title">
            <div className="pill">Our Services</div>
            <h2>Everything We Clean for You</h2>
            <p>From delicate bridal lehengas to heavy tent cloths — we handle it all with expert care</p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div className="service-card" key={i} style={{animationDelay:`${i*0.07}s`}}>
                <span className="service-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="tag">{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section whyus" id="why-us">
        <div className="section-reveal" ref={r2}>
          <div className="section-title">
            <div className="pill">Why Choose Us</div>
            <h2>Pilani's Most Trusted Name in Dry Cleaning</h2>
            <p>We combine experience, quality, and affordability to give you the best care</p>
          </div>
          <div className="whyus-grid">
            {WHY_US.map((w, i) => (
              <div className="whyus-card" key={i}>
                <div className="icon">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section process" id="process">
        <div className="section-reveal" ref={r3}>
          <div className="section-title">
            <div className="pill">How It Works</div>
            <h2>Simple 4-Step Process</h2>
            <p>Getting your clothes cleaned has never been this easy</p>
          </div>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div className="step" key={i}>
                <div className="step-circle">{i+1}</div>
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="section gallery" id="gallery">
        <div className="section-reveal" ref={r4}>
          <div className="section-title">
            <div className="pill">Our Work</div>
            <h2>Gallery — See the Difference</h2>
            <p>Real results from our professional cleaning process</p>
          </div>
          <div className="gallery-grid">
            {GALLERY_ITEMS.map((g, i) => (
              <div className="gallery-item" key={i}>
                {/* Animated gradient background */}
                <div className="gallery-bg" style={{background:g.grad}} />
                {/* Shine overlay */}
                <div className="gallery-shine" />
                {/* Floating particles */}
                <div className="gallery-particles">
                  {g.particles.map((p,j) => (
                    <span key={j} className="g-particle" style={{
                      left:`${15 + j*20}%`,
                      top:`${10 + (j%2)*50}%`,
                      '--dur': `${2.5+j*0.5}s`,
                      '--delay': `${j*0.4}s`,
                    }}>{p}</span>
                  ))}
                </div>
                {/* Center content */}
                <div className="gallery-center">
                  <div className="gallery-main-icon">{g.icon}</div>
                  <div className="gallery-label">{g.label}</div>
                  <div className="gallery-desc">{g.desc}</div>
                </div>
                {/* Top-right emoji */}
                <div className="gallery-emoji">{g.emoji}</div>
                {/* Bottom fade */}
                <div className="gallery-ripple" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials" id="testimonials">
        <div className="section-reveal" ref={r5}>
          <div className="section-title">
            <div className="pill">Customer Reviews</div>
            <h2>What Our Customers Say</h2>
            <p>Trusted by thousands across Pilani, Chirawa & Jhunjhunu</p>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="testi-card" key={i}>
                <div className="stars">{"★".repeat(t.rating)}</div>
                <p>"{t.text}"</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-loc">📍 {t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section pricing" id="pricing">
        <div className="section-reveal" ref={r6}>
          <div className="section-title">
            <div className="pill">Pricing</div>
            <h2>Transparent & Affordable Rates</h2>
            <p>No hidden charges — what you see is what you pay</p>
          </div>
          <div className="pricing-grid">
            {PRICES.map((p, i) => (
              <div className={`price-card ${p.featured ? "featured" : ""}`} key={i}>
                <div className="price-icon">{p.icon}</div>
                <h3>{p.name}</h3>
                <div className="amount">{p.price}</div>
                <p>{p.note}</p>
              </div>
            ))}
          </div>
          <p style={{textAlign:"center",marginTop:"24px",color:"var(--muted)",fontSize:".9rem"}}>
            * Prices may vary based on fabric type & condition. Contact us for bulk/special pricing.
          </p>
        </div>
      </section>

      {/* ── SEO SECTION ── */}
      <section className="section seo-section">
        <div className="section-reveal" ref={r7}>
          <div className="seo-inner">
            <div className="pill">About Us</div>
            <h2>Best Dry Cleaners in Pilani, Jhunjhunu & Chirawa</h2>
            <p>
              Welcome to <strong>Babulal Dry Cleaners</strong> — the most trusted name for <strong>dry cleaning services in Pilani</strong>, Rajasthan. Whether you are a student at BITS Pilani, a local resident, or a business owner in the Jhunjhunu district, we offer professional and affordable dry cleaning for all your fabric care needs.
            </p>
            <p>
              We specialize in <strong>suit cleaning in Pilani</strong>, bridal lehenga dry cleaning, saree washing, blanket & razai washing, and large-scale tent house cloth cleaning. Our <strong>laundry service in Jhunjhunu</strong> covers Chirawa, Malsisar, and all nearby areas with doorstep pickup and delivery options.
            </p>
            <p>
              At Babulal Dry Cleaners, we use industry-grade dry cleaning equipment and premium solvents that are safe for all fabric types — from delicate silks and embroidered bridal wear to heavy woollen coats and cotton kurtas. Our experienced team ensures every garment receives individual attention and is returned to you looking its absolute best.
            </p>
            <p>
              Looking for <strong>affordable laundry in Pilani</strong> near BITS campus? Students and faculty have trusted us for over a decade. We offer bulk cleaning packages and regular subscription plans for hostels, PGs, and offices. Our <strong>best dry cleaning in Chirawa</strong> and surrounding towns makes us the go-to service for the entire Jhunjhunu district.
            </p>
            <p>
              <strong>Quality Care, No Compromise</strong> — that's not just our tagline, it's our commitment to every customer. Book your dry cleaning service today by calling or WhatsApp messaging us, and experience the Babulal difference!
            </p>
            <div className="seo-keywords">
              {["Dry Cleaners in Pilani","Laundry Service Jhunjhunu","Best Dry Cleaning Chirawa","BITS Pilani Laundry","Lehenga Dry Cleaning","Suit Cleaning Pilani","Blanket Washing Pilani","Affordable Laundry Rajasthan"].map(k => (
                <span className="kw-tag" key={k}>{k}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section contact-section" id="contact">
        <div className="section-reveal" ref={r8}>
          <div className="section-title">
            <div className="pill">Contact Us</div>
            <h2>Book Your Dry Cleaning Service Today</h2>
            <p>Call, WhatsApp, or fill the form — we'll get back to you quickly!</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <div className="contact-row">
                <span className="ci">📞</span>
                <div className="cd">
                  <h4>Phone Numbers</h4>
                  <p><a href="tel:8949957273">89499 57273</a> | <a href="tel:7357069068">73570 69068</a></p>
                  <p><a href="tel:9829069068">98290 69068</a> | <a href="tel:9887131158">98871 31158</a></p>
                </div>
              </div>
              <div className="contact-row">
                <span className="ci">📧</span>
                <div className="cd">
                  <h4>Email</h4>
                  <a href="mailto:manishinpilani@gmail.com">manishinpilani@gmail.com</a>
                </div>
              </div>
              <div className="contact-row">
                <span className="ci">📍</span>
                <div className="cd">
                  <h4>Address</h4>
                  <p>Babulal Dry Cleaners, Pilani,<br/>Jhunjhunu District, Rajasthan — 333031</p>
                </div>
              </div>
              <div className="contact-row">
                <span className="ci">🕐</span>
                <div className="cd">
                  <h4>Working Hours</h4>
                  <p>Mon–Sat: 8:00 AM – 8:00 PM<br/>Sunday: 9:00 AM – 5:00 PM</p>
                </div>
              </div>
              <div style={{marginTop:"20px",display:"flex",flexWrap:"wrap",gap:"8px"}}>
                <a href="tel:8949957273" className="phone-btn">📞 Call Now</a>
                <a href="https://api.whatsapp.com/send?phone=918949957273&text=Hello%20Babulal%20Dry%20Cleaners%2C%20I%20want%20to%20book%20a%20dry%20cleaning%20service" target="_blank" rel="noopener noreferrer" className="wa-btn">
                  💬 WhatsApp
                </a>

              </div>
              <div className="map-container">
                <iframe
                  title="Babulal Dry Cleaners Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.123456789!2d75.6047!3d28.3645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPilani%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%" height="200" style={{border:0}} allowFullScreen loading="lazy"
                />
              </div>
            </div>

            <div className="contact-form">
              <h3>📋 Book a Service</h3>
              {submitted ? (
                <div style={{background:"#E8F5E9",border:"2px solid #4CAF50",borderRadius:"10px",padding:"20px",textAlign:"center",color:"#2E7D32"}}>
                  <div style={{fontSize:"2rem",marginBottom:"8px"}}>✅</div>
                  <strong>Booking Request Received!</strong><br/>
                  We'll contact you within 30 minutes.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input required placeholder="Aapka naam" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input required type="tel" placeholder="Mobile number" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label>Service Required</label>
                    <select value={formData.service} onChange={e=>setFormData({...formData,service:e.target.value})}>
                      <option value="">-- Select Service --</option>
                      {SERVICES.map(s=><option key={s.title} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message (Optional)</label>
                    <textarea placeholder="Koi special instructions ho to batayein..." value={formData.msg} onChange={e=>setFormData({...formData,msg:e.target.value})}/>
                  </div>
                  <button type="submit" className="submit-btn bounce-btn">🚀 Book Now — Free Pickup!</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={LOGO_PLACEHOLDER} alt="Logo" style={{height:"56px",width:"56px",borderRadius:"50%",marginBottom:"12px",objectFit:"cover"}}/>
            <h4>Babulal Dry Cleaners</h4>
            <p>Quality Care, No Compromise.<br/>Serving Pilani, Jhunjhunu & Chirawa<br/>since over a decade.</p>
            <div className="social-icons">
              <a href="https://api.whatsapp.com/send?phone=918949957273&text=Hello%20Babulal%20Dry%20Cleaners%2C%20I%20want%20to%20book%20a%20dry%20cleaning%20service" target="_blank" rel="noopener noreferrer" title="WhatsApp">💬</a>
              <a href="tel:8949957273" title="Call">📞</a>
              <a href="mailto:manishinpilani@gmail.com" title="Email">📧</a>
              <a href="#home" title="Top">⬆️</a>
            </div>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              {["Home","Services","Why Us","Process","Gallery","Pricing","Contact"].map(l=>(
                <li key={l}><a href={`#${l.toLowerCase().replace(" ","-")}`}>{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Our Services</h4>
            <ul>
              {SERVICES.slice(0,6).map(s=><li key={s.title}><a href="#services">{s.title}</a></li>)}
            </ul>
          </div>

          <div>
            <h4>Contact Info</h4>
            <ul>
              <li><a href="tel:8949957273">📞 89499 57273</a></li>
              <li><a href="tel:9829069068">📞 98290 69068</a></li>
              <li><a href="tel:7357069068">📞 73570 69068</a></li>
              <li><a href="tel:9887131158">📞 98871 31158</a></li>
              <li><a href="mailto:manishinpilani@gmail.com">📧 Email Us</a></li>
              <li style={{color:"rgba(255,255,255,.7)",fontSize:".85rem"}}>📍 Pilani, Jhunjhunu, Rajasthan</li>
              <li style={{color:"rgba(255,255,255,.7)",fontSize:".85rem"}}>🕐 Mon–Sun: 8AM – 8PM</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Babulal Dry Cleaners, Pilani. All rights reserved. &nbsp;|&nbsp; 
          <span>Quality Care, No Compromise 🧺</span> &nbsp;|&nbsp;
          <span>Made with ❤️ for Pilani</span>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      {showWALabel && <div className="float-wa-label">💬 Chat on WhatsApp</div>}
      <a 
        href="https://api.whatsapp.com/send?phone=918949957273&text=Hello%20Babulal%20Dry%20Cleaners%2C%20I%20want%20to%20book%20a%20dry%20cleaning%20service" 
        className="float-wa" 
        target="_blank" 
        rel="noopener noreferrer" 
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff" d="M16 0C7.163 0 0 7.163 0 16c0 2.833.737 5.489 2.027 7.8L0 32l8.424-2.007A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.773-1.854l-.486-.288-5.003 1.193 1.237-4.877-.317-.5A13.268 13.268 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.946c-.397-.199-2.353-1.161-2.718-1.293-.365-.133-.63-.199-.896.199-.265.397-.897 1.094-1.1 1.326-.199.199-.398.232-.795.033-.397-.199-1.677-.617-3.194-1.969-1.18-1.053-1.977-2.352-2.21-2.75-.232-.398-.025-.613.174-.811.178-.178.397-.465.596-.697.199-.232.265-.398.398-.663.133-.265.066-.497-.033-.696-.099-.199-.896-2.163-1.228-2.96-.322-.777-.651-.672-.896-.683l-.762-.013c-.265 0-.696.1-.1.06 1.394-.198 2.694.76 2.859 1.063.165.3 1.757 2.782 4.261 3.899.597.258 1.063.411 1.426.527.599.19 1.145.163 1.576.099.481-.072 1.48-.604 1.689-1.188.21-.584.21-1.085.147-1.188-.062-.103-.228-.165-.478-.264z"/>
        </svg>
      </a>

      {/* ── SCROLL TO TOP ── */}
      <button className={`scroll-top ${showTop ? "show" : ""}`} onClick={scrollToTop} title="Back to Top">▲</button>
    </>
  );
}

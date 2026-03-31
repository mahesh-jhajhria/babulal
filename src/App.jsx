import { useState, useEffect, useRef } from "react";
import "./App.css";

import logo from "./assets/logo.png";

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
    <div className="app-container">
      {/* ── NAVBAR ── */}
      <nav className={`navbar ${scrolled ? "scrolled" : "top"}`}>
        <div className="nav-logo">
          <img src={logo} alt="Babulal Dry Cleaners Logo" />
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
            <img src={logo} alt="Logo" style={{height:"56px",width:"56px",borderRadius:"50%",marginBottom:"12px",objectFit:"cover"}}/>
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
        onMouseEnter={() => setShowWALabel(true)}
        onMouseLeave={() => setShowWALabel(false)}
      >
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff" d="M16 0C7.163 0 0 7.163 0 16c0 2.833.737 5.489 2.027 7.8L0 32l8.424-2.007A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.773-1.854l-.486-.288-5.003 1.193 1.237-4.877-.317-.5A13.268 13.268 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.946c-.397-.199-2.353-1.161-2.718-1.293-.365-.133-.63-.199-.896.199-.265.397-.897 1.094-1.1 1.326-.199.199-.398.232-.795.033-.397-.199-1.677-.617-3.194-1.969-1.18-1.053-1.977-2.352-2.21-2.75-.232-.398-.025-.613.174-.811.178-.178.397-.465.596-.697.199-.232.265-.398.398-.663.133-.265.066-.497-.033-.696-.099-.199-.896-2.163-1.228-2.96-.322-.777-.651-.672-.896-.683l-.762-.013c-.265 0-.696.1-.1.06 1.394-.198 2.694.76 2.859 1.063.165.3 1.757 2.782 4.261 3.899.597.258 1.063.411 1.426.527.599.19 1.145.163 1.576.099.481-.072 1.48-.604 1.689-1.188.21-.584.21-1.085.147-1.188-.062-.103-.228-.165-.478-.264z"/>
        </svg>
      </a>

      {/* ── SCROLL TO TOP ── */}
      <button className={`scroll-top ${showTop ? "show" : ""}`} onClick={scrollToTop} title="Back to Top">▲</button>
    </div>
  );
}

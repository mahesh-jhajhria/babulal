import { useState, useEffect, useRef } from "react";
import "./App.css";

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
    <div className="app-container">
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

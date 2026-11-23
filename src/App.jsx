
import React, { useEffect, useState } from 'react';
import './index.css';

const services = [
  { n: '01', title: 'China sourcing', text: 'Find reliable suppliers, compare options and source products with confidence.', icon: '⌕' },
  { n: '02', title: 'Shipping & logistics', text: 'Move your cargo from China to India with a clear, dependable process.', icon: '↗' },
  { n: '03', title: 'Customs & delivery', text: 'Get help with customs clearance and delivery right to your doorstep.', icon: '⌂' },
];

const industries = [
  { title: 'Furniture & interiors', tag: '01 / INDUSTRY', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85' },
  { title: 'Electronics & tech', tag: '02 / INDUSTRY', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85' },
  { title: 'EV & automotive', tag: '03 / INDUSTRY', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=85' },
];

function GlobeArt() {
  return (
    <div className="globe-stage">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="globe">
        <div className="globe-grid" />
        <div className="land land-a" />
        <div className="land land-b" />
        <div className="land land-c" />
        <div className="globe-glow" />
      </div>
      <div className="route-line"><span /></div>
      <div className="pin pin-cn">CHINA <b>●</b></div>
      <div className="pin pin-in">INDIA <b>●</b></div>
      <div className="floating float-top">
        <span className="tiny-dot" /> Shipment in motion <strong>● Active</strong>
      </div>
      <div className="floating float-bottom">
        <span className="ship-icon">▰</span>
        <div>
          <small>YOUR CARGO</small>
          <strong>China → India</strong>
        </div>
      </div>
    </div>
  );
}

function App() {
    const [showTopButton, setShowTopButton] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
          setShowTopButton(window.scrollY > 400);
        };
      
        window.addEventListener('scroll', handleScroll);
        handleScroll();
      
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll('.site section');

    sections.forEach((section) => {
      section.classList.add('reveal');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="site">
      <header className="nav">
        <a className="logo" href="#home">
          <span className="logo-mark">I</span> import<span>now</span>
        </a>
        <nav>
          <a href="#services">Services</a>
          <a href="#how">How it works</a>
          <a href="#industries">Industries</a>
          <a href="#faq">FAQs</a>
        </nav>
        <a className="nav-cta" href="#contact">Get a quote <span>↗</span></a>
        <button className="menu" aria-label="menu">☰</button>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span /> YOUR CHINA–INDIA IMPORT PARTNER</div>
          <h1>Import from China.<br /><em>Without the guesswork.</em></h1>
          <p className="hero-desc">
            From finding the right supplier to delivering at your doorstep — we make importing from China to India simple, transparent and stress-free.
          </p>
          <div className="hero-actions">
            <a className="primary" href="#contact">Start importing <span>↗</span></a>
            <a className="text-link" href="#how">How it works <span>↓</span></a>
          </div>
          <div className="hero-note">
            <div className="avatar-stack"><span>IN</span><span>CN</span><span>✓</span></div>
            <p>Guidance at every step<br /><b>From supplier to your doorstep</b></p>
          </div>
        </div>
        <GlobeArt />
      </section>

      <section className="stats">
        <div><strong>50<span>+</span></strong><small>Trusted supplier network</small></div>
        <div><strong>83K<span>+</span></strong><small>Products sourced</small></div>
        <div><strong>1<span> to</span> 100</strong><small>Flexible shipment sizes</small></div>
        <div className="stat-note">A smarter way to import<br />from China to India.</div>
      </section>

      <section className="section services" id="services">
        <div className="section-head">
          <div>
            <div className="eyebrow">WHAT WE DO</div>
            <h2>Importing made<br /><em>straightforward.</em></h2>
          </div>
          <p>One partner for your entire importing journey. No confusion, no hidden surprises — just a process you can understand.</p>
        </div>
        <div className="service-grid">
          {services.map(s => (
            <article className="service-card" key={s.n}>
              <div className="service-top">
                <span>{s.n}</span>
                <div className="service-icon">{s.icon}</div>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a href="#contact">Explore service <span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="journey" id="how">
        <div className="journey-copy">
          <div className="eyebrow light">YOUR IMPORT JOURNEY</div>
          <h2>From China<br />to India. <em>Every step.</em></h2>
          <p>Know where your shipment is, what happens next, and who is helping you — from the first supplier conversation to final delivery.</p>
          <a className="light-button" href="#contact">Let’s plan your shipment ↗</a>
        </div>
        <div className="journey-steps">
          <div className="step active">
            <div className="step-circle">01</div>
            <div><small>STEP 01</small><h3>Source & confirm</h3><p>Supplier coordination, product details and order confirmation.</p></div>
          </div>
          <div className="step">
            <div className="step-circle">02</div>
            <div><small>STEP 02</small><h3>Pickup & prepare</h3><p>Cargo collection, packing and shipment preparation.</p></div>
          </div>
          <div className="step">
            <div className="step-circle">03</div>
            <div><small>STEP 03</small><h3>Ship to India</h3><p>International freight with shipment updates.</p></div>
          </div>
          <div className="step">
            <div className="step-circle">04</div>
            <div><small>STEP 04</small><h3>Clear & deliver</h3><p>Customs support and delivery to your destination.</p></div>
          </div>
        </div>
      </section>

      <section className="section industries" id="industries">
        <div className="section-head">
          <div>
            <div className="eyebrow">WHO WE HELP</div>
            <h2>Built for the things<br /><em>you want to import.</em></h2>
          </div>
          <p>Whether you're building a business or sourcing for a project, we help bring your ideas across borders.</p>
        </div>
        <div className="industry-grid">
          {industries.map(i => (
            <article className="industry-card" key={i.title}>
              <img src={i.image} alt={i.title} />
              <div className="industry-overlay">
                <small>{i.tag}</small>
                <h3>{i.title}</h3>
                <span>↗</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="trust">
        <div className="trust-graphic">
          <div className="trust-circle">
            <div className="trust-inner">
              <span>IMPORT</span>
              <strong>CN <b>↗</b> IN</strong>
              <small>YOUR PARTNER</small>
            </div>
          </div>
          <div className="trust-stamp">BUILT ON<br />TRANSPARENCY</div>
        </div>
        <div className="trust-copy">
          <div className="eyebrow">WHY IMPORTNOW</div>
          <h2>More than shipping.<br /><em>Peace of mind.</em></h2>
          <p>Importing can feel complicated. We bring the process, people and practical support together, so you can focus on growing your business.</p>
          <ul>
            <li><span>✓</span> Clear communication throughout</li>
            <li><span>✓</span> Supplier and shipment coordination</li>
            <li><span>✓</span> Practical import guidance</li>
            <li><span>✓</span> Support from origin to destination</li>
          </ul>
          <a className="primary" href="#contact">Talk to our team ↗</a>
        </div>
      </section>
      <section className="testimonials section" id="testimonials">
  <div className="section-head">
    <div>
      <div className="eyebrow">CUSTOMER EXPERIENCES</div>
      <h2>Real journeys.<br /><em>Real confidence.</em></h2>
    </div>
    <p>Discover how a simpler importing experience can help businesses move forward.</p>
  </div>

  <div className="testimonial-grid">
    <article className="testimonial-card">
      <div className="testimonial-stars">★★★★★</div>
      <p>"Having guidance throughout the importing process makes a big difference. Clear communication and support matter."</p>
      <div className="testimonial-person">
        <div className="testimonial-avatar">A</div>
        <div>
          <strong>Business Owner</strong>
          <small>India</small>
        </div>
      </div>
    </article>

    <article className="testimonial-card featured-testimonial">
      <div className="testimonial-stars">★★★★★</div>
      <p>"From sourcing to shipping, having everything coordinated in one place makes the process much easier to understand."</p>
      <div className="testimonial-person">
        <div className="testimonial-avatar">R</div>
        <div>
          <strong>Import Customer</strong>
          <small>India</small>
        </div>
      </div>
    </article>

    <article className="testimonial-card">
      <div className="testimonial-stars">★★★★★</div>
      <p>"A straightforward approach to importing helps us spend more time focusing on our business."</p>
      <div className="testimonial-person">
        <div className="testimonial-avatar">S</div>
        <div>
          <strong>Retail Business</strong>
          <small>India</small>
        </div>
      </div>
    </article>
  </div>
</section>

      <section className="faq section" id="faq">
        <div className="faq-intro">
          <div className="eyebrow">QUESTIONS, ANSWERED</div>
          <h2>Good questions.<br /><em>Clear answers.</em></h2>
          <p>New to importing? Start here.</p>
        </div>
        <div className="faq-list">
          <details>
            <summary>How do I import products from China to India? <span>+</span></summary>
            <p>Start by identifying your product and supplier. We can guide you through sourcing, shipping options, documentation and delivery planning.</p>
          </details>
          <details>
            <summary>Can I import small quantities? <span>+</span></summary>
            <p>Shipment options depend on your product, cargo volume and requirements. Contact us to discuss suitable options.</p>
          </details>
          <details>
            <summary>Do you help with customs clearance? <span>+</span></summary>
            <p>We coordinate the importing process and can help you understand the documentation and clearance requirements for your shipment.</p>
          </details>
          <details>
            <summary>How much does shipping from China cost? <span>+</span></summary>
            <p>Costs depend on cargo dimensions, weight, route, shipping method and product details. Request a quote for your shipment.</p>
          </details>
          <details>
            <summary>How long does delivery take? <span>+</span></summary>
            <p>Transit time varies based on shipping mode, origin, destination and customs processes.</p>
          </details>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-copy">
          <div className="eyebrow light">LET'S GET STARTED</div>
          <h2>Your next import<br />starts <em>here.</em></h2>
          <p>Tell us what you're looking to import. We'll help you figure out the next step.</p>
          <div className="contact-info"><span>✉</span> hello@importnow.in</div>
        </div>
        <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Thanks! This demo form is ready to be connected to a backend.'); }}>
          <div className="form-row">
            <label>Your name<input required placeholder="Full name" /></label>
            <label>Email address<input type="email" required placeholder="you@email.com" /></label>
          </div>
          <label>What are you looking to import?<input placeholder="Product or category" /></label>
          <label>Tell us a little more<textarea rows="3" placeholder="Quantity, product details, destination…" /></label>
          <button className="primary" type="submit">Request a quote ↗</button>
          <small>By submitting, you agree to be contacted about your enquiry.</small>
        </form>
      </section>

      <footer className="site-footer">
  <div className="footer-main">

    {/* Column 1 - Brand */}
    <div className="footer-brand">
      <a className="logo footer-logo" href="#home">
        <span className="logo-mark">I</span>
        import<span>now</span>
      </a>

      <p>
        Simplifying imports from China to India.
        Your trusted partner from supplier to doorstep.
      </p>

      <div className="footer-socials">
        <a href="#contact" aria-label="LinkedIn">in</a>
        <a href="#contact" aria-label="Instagram">◎</a>
        <a href="#contact" aria-label="Facebook">f</a>
      </div>
    </div>

    {/* Column 2 - Services */}
    <div className="footer-column">
      <h4>OUR SERVICES</h4>
      <a href="#services">China sourcing</a>
      <a href="#services">Shipping & logistics</a>
      <a href="#services">Customs clearance</a>
      <a href="#services">Doorstep delivery</a>
    </div>

    {/* Column 3 - Products */}
    <div className="footer-column">
      <h4>WHAT WE IMPORT</h4>
      <a href="#industries">Furniture & interiors</a>
      <a href="#industries">Electronics & tech</a>
      <a href="#industries">EV & automotive</a>
      <a href="#contact">Other products</a>
    </div>

    {/* Column 4 - Guides */}
    <div className="footer-column">
      <h4>IMPORT GUIDES</h4>
      <a href="#how">How importing works</a>
      <a href="#faq">Shipping FAQs</a>
      <a href="#faq">Customs information</a>
      <a href="#contact">Get import support</a>
    </div>

    {/* Column 5 - Contact */}
    <div className="footer-column footer-contact">
      <h4>GET IN TOUCH</h4>
      <a href="#contact">Request a quote</a>
      <a href="#contact">Contact our team</a>
      <a href="mailto:hello@importnow.in">hello@importnow.in</a>
      <a href="#contact">China → India</a>
    </div>

  </div>

  <div className="footer-bottom">
    <span>© 2026 ImportNow. All rights reserved.</span>
    <span>Import smarter. Grow further.</span>
  </div>
</footer>

      {/* Back to Top button */}

      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}

export default App;

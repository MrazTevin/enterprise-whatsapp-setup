"use client"

import { useEffect, useState, useCallback } from "react"

// Add this component before the main PitchDeck component
const SmartImage = ({
  src,
  fallback,
  alt,
  ...props
}: {
  src: string
  fallback: string
  alt: string
  [key: string]: any
}) => {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImageSrc(src)
      setIsLoading(false)
    }
    img.onerror = () => {
      setImageSrc(fallback)
      setIsLoading(false)
    }
    img.src = src
  }, [src, fallback])

  return (
    <img
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      {...props}
      style={{
        ...props.style,
        opacity: isLoading ? 0.5 : 1,
        transition: "opacity 0.3s ease",
      }}
    />
  )
}

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentFragment, setCurrentFragment] = useState(0)

  const slides = [
    { id: "title", fragments: 0 },
    { id: "why", fragments: 3 },
    { id: "benefits", fragments: 3 },
    { id: "advantages", fragments: 5 },
    { id: "support", fragments: 2 },
    { id: "comparison", fragments: 6 },
    { id: "selection", fragments: 4 },
    { id: "platform", fragments: 4 },
    { id: "usecases", fragments: 5 },
    { id: "architecture", fragments: 6 },
    { id: "messaging", fragments: 2 },
    { id: "automation", fragments: 3 },
    { id: "integrations", fragments: 5 },
    { id: "metrics", fragments: 4 },
    { id: "considerations", fragments: 4 },
    { id: "summary", fragments: 3 },
    { id: "cta", fragments: 3 },
  ]

  const nextSlide = useCallback(() => {
    const currentSlideData = slides[currentSlide]
    if (currentFragment < currentSlideData.fragments) {
      setCurrentFragment((prev) => prev + 1)
    } else if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1)
      setCurrentFragment(0)
    }
  }, [currentSlide, currentFragment, slides])

  const prevSlide = useCallback(() => {
    if (currentFragment > 0) {
      setCurrentFragment((prev) => prev - 1)
    } else if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
      setCurrentFragment(slides[currentSlide - 1].fragments)
    }
  }, [currentSlide, currentFragment, slides])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault()
          nextSlide()
          break
        case "ArrowLeft":
          e.preventDefault()
          prevSlide()
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [nextSlide, prevSlide])

  const isFragmentVisible = (fragmentIndex: number) => {
    return currentFragment >= fragmentIndex
  }

  return (
    <div className="presentation-container">
      {/* Navigation Controls */}
      <div className="nav-controls">
        <button className="nav-btn prev-btn" onClick={prevSlide} disabled={currentSlide === 0 && currentFragment === 0}>
          ‹
        </button>
        <button
          className="nav-btn next-btn"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1 && currentFragment >= slides[currentSlide].fragments}
        >
          ›
        </button>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${((currentSlide + currentFragment / (slides[currentSlide]?.fragments || 1)) / slides.length) * 100}%`,
          }}
        />
      </div>

      {/* Slide Indicator */}
      <div className="slide-indicator">
        {currentSlide + 1} / {slides.length}
      </div>

      <div className="slides-container">
        {/* Slide 1: Title Slide */}
        {currentSlide === 0 && (
          <section className="slide title-slide active">
            <div className="slide-content">
              <div className="title-content">
                <h1 className="main-title">WhatsApp Business</h1>
                <h2 className="subtitle">Engage. Support. Sell.</h2>
                <p className="tagline">Unlock the full potential of customer conversations</p>
                <div className="title-image">
                  <SmartImage
                    src="https://cdn-icons-png.flaticon.com/512/4494/4494494.png"
                    fallback="/placeholder.svg?height=200&width=200&text=WhatsApp+Logo"
                    alt="WhatsApp Business"
                    style={{ maxWidth: "200px", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Slide 2: Why WhatsApp Business? */}
        {currentSlide === 1 && (
          <section className="slide content-slide active">
            <div className="slide-content">
              <h2 className="slide-title">Why WhatsApp Business?</h2>
              <div className="benefits-grid">
                <div className={`benefit-item ${isFragmentVisible(1) ? "visible" : ""}`}>
                  <div className="benefit-icon">💬</div>
                  <p>Reach your audience where they already are</p>
                </div>
                <div className={`benefit-item ${isFragmentVisible(2) ? "visible" : ""}`}>
                  <div className="benefit-icon">⚡</div>
                  <p>Accelerate sales with personalized conversations</p>
                </div>
                <div className={`benefit-item ${isFragmentVisible(3) ? "visible" : ""}`}>
                  <div className="benefit-icon">🤝</div>
                  <p>Deliver seamless, end-to-end support</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Slide 3: Business Benefits */}
        {currentSlide === 2 && (
          <section className="slide content-slide active">
            <div className="slide-content">
              <h2 className="slide-title">Business Benefits</h2>
              <div className="text-center mb-8">
                <p className="intro-text">With WhatsApp Business, you can:</p>
              </div>
              <div className="benefits-list">
                <div className={`benefit-point ${isFragmentVisible(1) ? "visible" : ""}`}>
                  <span className="bullet">•</span>
                  <span>Build personalized buyer journeys</span>
                </div>
                <div className={`benefit-point ${isFragmentVisible(2) ? "visible" : ""}`}>
                  <span className="bullet">•</span>
                  <span>Strengthen customer loyalty</span>
                </div>
                <div className={`benefit-point ${isFragmentVisible(3) ? "visible" : ""}`}>
                  <span className="bullet">•</span>
                  <span>Convert chats into repeat sales</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Slide 4: Key Advantages */}
        {currentSlide === 3 && (
          <section className="slide content-slide active">
            <div className="slide-content">
              <h2 className="slide-title">Key Advantages</h2>
              <div className="advantages-grid">
                <div className={`advantage-item ${isFragmentVisible(1) ? "visible" : ""}`}>
                  <span className="checkmark">✅</span>
                  <span>Reach customers anywhere</span>
                </div>
                <div className={`advantage-item ${isFragmentVisible(2) ? "visible" : ""}`}>
                  <span className="checkmark">✅</span>
                  <span>Create memorable, interactive experiences</span>
                </div>
                <div className={`advantage-item ${isFragmentVisible(3) ? "visible" : ""}`}>
                  <span className="checkmark">✅</span>
                  <span>Use greetings, menus & flows to guide purchases</span>
                </div>
                <div className={`advantage-item ${isFragmentVisible(4) ? "visible" : ""}`}>
                  <span className="checkmark">✅</span>
                  <span>Send personalized promotions & updates</span>
                </div>
                <div className={`advantage-item ${isFragmentVisible(5) ? "visible" : ""}`}>
                  <span className="checkmark">✅</span>
                  <span>Enable friction-free shopping — all inside WhatsApp</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Slide 5: Exceptional Support Sells */}
        {currentSlide === 4 && (
          <section className="slide content-slide active">
            <div className="slide-content">
              <h2 className="slide-title">Exceptional Support Sells</h2>
              <div className={`stat-highlight ${isFragmentVisible(1) ? "visible" : ""}`}>
                <div className="stat-icon">💡</div>
                <div className="stat-number">73%</div>
                <div className="stat-text">of customers say good service is key to loyalty</div>
              </div>
              <div className={`support-message ${isFragmentVisible(2) ? "visible" : ""}`}>
                <div className="message-icon">✨</div>
                <p className="message-text">WhatsApp helps you deliver it — fast, personal, and always on</p>
              </div>
            </div>
          </section>
        )}

        {/* Slide 6: Two Powerful Tools */}
        {currentSlide === 5 && (
          <section className="slide content-slide active">
            <div className="slide-content">
              <h2 className="slide-title">Two Powerful Tools – Which One Fits?</h2>
              <div className="comparison-table">
                <div className="comparison-header">
                  <div className={`header-item ${isFragmentVisible(1) ? "visible" : ""}`}>
                    <h3>WhatsApp Business App</h3>
                  </div>
                  <div className={`header-item ${isFragmentVisible(2) ? "visible" : ""}`}>
                    <h3>WhatsApp Business Platform</h3>
                  </div>
                </div>
                <div className="comparison-rows">
                  <div className={`comparison-row ${isFragmentVisible(3) ? "visible" : ""}`}>
                    <div className="row-label">Target</div>
                    <div className="row-value">Small businesses</div>
                    <div className="row-value">Medium-Large enterprises</div>
                  </div>
                  <div className={`comparison-row ${isFragmentVisible(4) ? "visible" : ""}`}>
                    <div className="row-label">Operation</div>
                    <div className="row-value">Manual</div>
                    <div className="row-value">API, CRM, Bots</div>
                  </div>
                  <div className={`comparison-row ${isFragmentVisible(5) ? "visible" : ""}`}>
                    <div className="row-label">Cost</div>
                    <div className="row-value">Free</div>
                    <div className="row-value">Pay-per-message</div>
                  </div>
                  <div className={`comparison-row ${isFragmentVisible(6) ? "visible" : ""}`}>
                    <div className="row-label">Devices</div>
                    <div className="row-value">1 device</div>
                    <div className="row-value">Scalable</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Slide 7: Quick Selection Guide */}
        {currentSlide === 6 && (
          <section className="slide content-slide active">
            <div className="slide-content">
              <h2 className="slide-title">Quick Selection Guide</h2>
              <div className="selection-matrix">
                <div className={`matrix-row ${isFragmentVisible(1) ? "visible" : ""}`}>
                  <div className="scenario">Solo / Small Team</div>
                  <div className="recommendation app">✅ App</div>
                </div>
                <div className={`matrix-row ${isFragmentVisible(2) ? "visible" : ""}`}>
                  <div className="scenario">Growing Team</div>
                  <div className="recommendation platform">✅ Platform</div>
                </div>
                <div className={`matrix-row ${isFragmentVisible(3) ? "visible" : ""}`}>
                  <div className="scenario">High Volumes</div>
                  <div className="recommendation platform">✅ Platform</div>
                </div>
                <div className={`matrix-row ${isFragmentVisible(4) ? "visible" : ""}`}>
                  <div className="scenario">CRM & Automation</div>
                  <div className="recommendation platform">✅ Platform</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Slide 8: Platform Features */}
        {currentSlide === 7 && (
          <section className="slide content-slide active">
            <div className="slide-content">
              <h2 className="slide-title">Platform: What You Unlock</h2>
              <div className="features-grid">
                <div className={`feature-card ${isFragmentVisible(1) ? "visible" : ""}`}>
                  <div className="feature-icon">🔁</div>
                  <h3>Automated chat flows</h3>
                  <SmartImage
                    src="https://cdn-icons-png.flaticon.com/512/3095/3095583.png"
                    fallback="/placeholder.svg?height=150&width=200&text=Chat+Flow"
                    alt="Chat Flow"
                    style={{ width: "100%", height: "auto", borderRadius: "8px", opacity: 0.8 }}
                  />
                </div>
                <div className={`feature-card ${isFragmentVisible(2) ? "visible" : ""}`}>
                  <div className="feature-icon">📊</div>
                  <h3>CRM & analytics integration</h3>
                  <SmartImage
                    src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png"
                    fallback="/placeholder.svg?height=150&width=200&text=Analytics+Dashboard"
                    alt="Analytics"
                    style={{ width: "100%", height: "auto", borderRadius: "8px", opacity: 0.8 }}
                  />
                </div>
                <div className={`feature-card ${isFragmentVisible(3) ? "visible" : ""}`}>
                  <div className="feature-icon">🤖</div>
                  <h3>NLP-powered bots</h3>
                  <SmartImage
                    src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                    fallback="/placeholder.svg?height=150&width=200&text=AI+Bot"
                    alt="AI Bot"
                    style={{ width: "100%", height: "auto", borderRadius: "8px", opacity: 0.8 }}
                  />
                </div>
                <div className={`feature-card ${isFragmentVisible(4) ? "visible" : ""}`}>
                  <div className="feature-icon">📲</div>
                  <h3>Secure, scalable communication</h3>
                  <SmartImage
                    src="https://cdn-icons-png.flaticon.com/512/2092/2092063.png"
                    fallback="/placeholder.svg?height=150&width=200&text=Secure+Communication"
                    alt="Security"
                    style={{ width: "100%", height: "auto", borderRadius: "8px", opacity: 0.8 }}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Slide 9: Real-World Use Cases */}
        {currentSlide === 8 && (
          <section className="slide content-slide active">
            <div className="slide-content">
              <h2 className="slide-title">Real-World Use Cases</h2>
              <div className="use-cases-grid">
                <div className={`use-case ${isFragmentVisible(1) ? "visible" : ""}`}>
                  <SmartImage
                    src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
                    fallback="/placeholder.svg?height=80&width=80&text=📦"
                    alt="Order"
                    style={{ marginBottom: "1rem", opacity: 0.8, width: "80px", height: "80px" }}
                  />
                  <span>Order confirmations</span>
                </div>
                <div className={`use-case ${isFragmentVisible(2) ? "visible" : ""}`}>
                  <SmartImage
                    src="https://cdn-icons-png.flaticon.com/512/2965/2965879.png"
                    fallback="/placeholder.svg?height=80&width=80&text=🎯"
                    alt="Promotion"
                    style={{ marginBottom: "1rem", opacity: 0.8, width: "80px", height: "80px" }}
                  />
                  <span>Promotional alerts</span>
                </div>
                <div className={`use-case ${isFragmentVisible(3) ? "visible" : ""}`}>
                  <SmartImage
                    src="https://cdn-icons-png.flaticon.com/512/3081/3081926.png"
                    fallback="/placeholder.svg?height=80&width=80&text=🛒"
                    alt="Cart"
                    style={{ marginBottom: "1rem", opacity: 0.8, width: "80px", height: "80px" }}
                  />
                  <span>Abandoned cart recovery</span>
                </div>
                <div className={`use-case ${isFragmentVisible(4) ? "visible" : ""}`}>
                  <SmartImage
                    src="https://cdn-icons-png.flaticon.com/512/3652/3652191.png"
                    fallback="/placeholder.svg?height=80&width=80&text=📅"
                    alt="Calendar"
                    style={{ marginBottom: "1rem", opacity: 0.8, width: "80px", height: "80px" }}
                  />
                  <span>Appointment scheduling</span>
                </div>
                <div className={`use-case ${isFragmentVisible(5) ? "visible" : ""}`}>
                  <SmartImage
                    src="https://cdn-icons-png.flaticon.com/512/751/751463.png"
                    fallback="/placeholder.svg?height=80&width=80&text=🔍"
                    alt="Search"
                    style={{ marginBottom: "1rem", opacity: 0.8, width: "80px", height: "80px" }}
                  />
                  <span>Product discovery</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Slide 10: Platform Architecture */}
        {currentSlide === 9 && (
          <section className="slide content-slide active">
            <div className="slide-content">
              <h2 className="slide-title">Platform Architecture Overview</h2>
              <div className="architecture-diagram">
                <div className={`arch-component ${isFragmentVisible(1) ? "visible" : ""}`}>
                  <div className="component-box client">
                    <h3>Client App</h3>
                    <p>Web/mobile frontend</p>
                  </div>
                </div>
                <div className={`arch-arrow ${isFragmentVisible(2) ? "visible" : ""}`}>→</div>
                <div className={`arch-component ${isFragmentVisible(3) ? "visible" : ""}`}>
                  <div className="component-box api">
                    <h3>WhatsApp API Client</h3>
                    <p>Communicates via API</p>
                  </div>
                </div>
                <div className={`arch-arrow ${isFragmentVisible(4) ? "visible" : ""}`}>→</div>
                <div className={`arch-component ${isFragmentVisible(5) ? "visible" : ""}`}>
                  <div className="component-box bsp">
                    <h3>BSP</h3>
                    <p>Integration partner (e.g., Twilio)</p>
                  </div>
                </div>
                <div className={`arch-component ${isFragmentVisible(6) ? "visible" : ""}`}>
                  <div className="component-box webhook">
                    <h3>Webhook Endpoint</h3>
                    <p>Receives events</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Continue with remaining slides... */}
        {/* For brevity, I'll show the pattern for the remaining slides */}

        {/* Slide 11: Messaging Essentials */}
        {currentSlide === 10 && (
          <section className="slide content-slide active">
            <div className="slide-content">
              <h2 className="slide-title">Messaging Essentials</h2>
              <div className="messaging-types">
                <div className={`message-type ${isFragmentVisible(1) ? "visible" : ""}`}>
                  <div className="type-header">
                    <span className="checkmark">✅</span>
                    <h3>Template Messages (HSMs)</h3>
                  </div>
                  <ul className="type-features">
                    <li>Required to start conversations</li>
                    <li>Must be Meta-approved</li>
                    <li>Great for promotions, reminders, receipts</li>
                  </ul>
                </div>
                <div className={`message-type ${isFragmentVisible(2) ? "visible" : ""}`}>
                  <div className="type-header">
                    <span className="checkmark">✅</span>
                    <h3>Session Messages</h3>
                  </div>
                  <ul className="type-features">
                    <li>24-hour user-initiated window</li>
                    <li>Rich, freeform communication</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Slide 12: Chatbot Automation */}
        {currentSlide === 11 && (
          <section className="slide content-slide active">
            <div className="slide-content">
              <h2 className="slide-title">Chatbot Automation</h2>
              <div className="automation-features">
                <div className={`auto-feature ${isFragmentVisible(1) ? "visible" : ""}`}>
                  <span className="feature-icon">🤖</span>
                  <p>Use no-code tools (e.g., WATI, Zoko) or custom bots</p>
                </div>
                <div className={`auto-feature ${isFragmentVisible(2) ? "visible" : ""}`}>
                  <span className="feature-icon">🔀</span>
                  <p>Handle FAQs, routing, escalations</p>
                </div>
                <div className={`auto-feature ${isFragmentVisible(3) ? "visible" : ""}`}>
                  <span className="feature-icon">📞</span>
                  <p>Seamlessly escalate to human agents</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Slide 13: Powerful Integrations */}
        {currentSlide === 12 && (
          <section className="slide content-slide active">
            <div className="slide-content">
              <h2 className="slide-title">Powerful Integrations</h2>
              <div className="integrations-table">
                <div className={`integration-row ${isFragmentVisible(1) ? "visible" : ""}`}>
                  <div className="integration-type">CRM</div>
                  <div className="integration-examples">HubSpot, Salesforce</div>
                </div>
                <div className={`integration-row ${isFragmentVisible(2) ? "visible" : ""}`}>
                  <div className="integration-type">E-Commerce</div>
                  <div className="integration-examples">Shopify, WooCommerce</div>
                </div>
                <div className={`integration-row ${isFragmentVisible(3) ? "visible" : ""}`}>
                  <div className="integration-type">Marketing</div>
                  <div className="integration-examples">FB/IG → WhatsApp</div>
                </div>
                <div className={`integration-row ${isFragmentVisible(4) ? "visible" : ""}`}>
                  <div className="integration-type">Payments</div>
                  <div className="integration-examples">Mpesa, Stripe</div>
                </div>
                <div className={`integration-row ${isFragmentVisible(5) ? "visible" : ""}`}>
                  <div className="integration-type">Custom APIs</div>
                  <div className="integration-examples">Express.js, Django</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Slide 14: Key Metrics */}
        {currentSlide === 13 && (
          <section className="slide content-slide active">
            <div className="slide-content">
              <h2 className="slide-title">Key Metrics to Monitor</h2>
              <div className="metrics-grid">
                <div className={`metric-card ${isFragmentVisible(1) ? "visible" : ""}`}>
                  <h3>Read Rate</h3>
                  <p>Message visibility</p>
                  <div className="metric-icon">👁️</div>
                </div>
                <div className={`metric-card ${isFragmentVisible(2) ? "visible" : ""}`}>
                  <h3>Response Rate</h3>
                  <p>Engagement quality</p>
                  <div className="metric-icon">💬</div>
                </div>
                <div className={`metric-card ${isFragmentVisible(3) ? "visible" : ""}`}>
                  <h3>Message Quality</h3>
                  <p>Meta feedback score</p>
                  <div className="metric-icon">⭐</div>
                </div>
                <div className={`metric-card ${isFragmentVisible(4) ? "visible" : ""}`}>
                  <h3>Conversion Rate</h3>
                  <p>Sales or support success</p>
                  <div className="metric-icon">📈</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Slide 15: Considerations */}
        {currentSlide === 14 && (
          <section className="slide content-slide active">
            <div className="slide-content">
              <h2 className="slide-title">Considerations Before You Choose</h2>
              <div className="considerations-list">
                <div className={`consideration ${isFragmentVisible(1) ? "visible" : ""}`}>
                  <span className="consideration-icon">📈</span>
                  <div>
                    <strong>Message Volume</strong>
                    <p>Platform suits high-volume</p>
                  </div>
                </div>
                <div className={`consideration ${isFragmentVisible(2) ? "visible" : ""}`}>
                  <span className="consideration-icon">🔐</span>
                  <div>
                    <strong>Data Compliance</strong>
                    <p>Enterprise-grade security</p>
                  </div>
                </div>
                <div className={`consideration ${isFragmentVisible(3) ? "visible" : ""}`}>
                  <span className="consideration-icon">🎯</span>
                  <div>
                    <strong>Growth Plans</strong>
                    <p>Platform scales</p>
                  </div>
                </div>
                <div className={`consideration ${isFragmentVisible(4) ? "visible" : ""}`}>
                  <span className="consideration-icon">💰</span>
                  <div>
                    <strong>Costs</strong>
                    <p>App: Free | Platform: Pay-per-message + setup</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Slide 16: Summary */}
        {currentSlide === 15 && (
          <section className="slide content-slide active">
            <div className="slide-content">
              <h2 className="slide-title">WhatsApp Powers Business Growth</h2>
              <div className="summary-points">
                <div className={`summary-point ${isFragmentVisible(1) ? "visible" : ""}`}>
                  <div className="summary-icon">🚀</div>
                  <p>Sell smarter with automation</p>
                </div>
                <div className={`summary-point ${isFragmentVisible(2) ? "visible" : ""}`}>
                  <div className="summary-icon">💝</div>
                  <p>Support better with personalized experiences</p>
                </div>
                <div className={`summary-point ${isFragmentVisible(3) ? "visible" : ""}`}>
                  <div className="summary-icon">📊</div>
                  <p>Scale faster with integrations and analytics</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Add remaining slides following the same pattern... */}
        {/* I'll add a few more key slides */}

        {/* Slide 17: Call to Action */}
        {currentSlide === 16 && (
          <section className="slide cta-slide active">
            <div className="slide-content">
              <h2 className="slide-title text-white">Ready to Get Started?</h2>
              <div className="cta-content">
                <div className={`cta-item ${isFragmentVisible(1) ? "visible" : ""}`}>
                  <span className="cta-icon">📞</span>
                  <p>Let's discuss how we can implement WhatsApp Business for your team</p>
                </div>
                <div className={`cta-item ${isFragmentVisible(2) ? "visible" : ""}`}>
                  <span className="cta-icon">💡</span>
                  <p>Demo available on request</p>
                </div>
                <div className={`cta-button ${isFragmentVisible(3) ? "visible" : ""}`}>
                  <button className="contact-btn">Contact Us Today</button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

import React, { useState, useRef } from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaGlobe, FaChevronUp } from 'react-icons/fa';
import { MdUpload, MdInfo, MdScience, MdAccessibility, MdSecurity } from 'react-icons/md';

export default function Hero() {
  const navigate = useNavigate();
  const [showLearnMore, setShowLearnMore] = useState(false);
  const learnMoreRef = useRef(null);
  const heroRef = useRef(null);

  const handleUploadClick = () => {
    navigate('/upload');
  };

  const handleLearnMoreClick = () => {
    setShowLearnMore(!showLearnMore);
    
    // Use setTimeout to ensure state update happens before scrolling
    setTimeout(() => {
      if (!showLearnMore && learnMoreRef.current) {
        learnMoreRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else if (showLearnMore && heroRef.current) {
        heroRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 10);
  };

  return (
    <>
      {/* Hero Section with ref */}
      <section id="heropage" ref={heroRef}>
        <div className="hero">
          <div className="content_div">
            <h1>
              Precision <span className="green">Diagnosis</span> at your fingertips
            </h1>
            <h3>Bringing clinical diagnosis to your doorstep</h3>
            <p className="hero-description">
              With cutting-edge technology, we provide accurate and reliable
              diagnosis from the comfort of your home. Whether it's for regular
              health checkups or urgent diagnosis, we ensure you get the best care
              possible.
            </p>
            <div className="buttons">
              <button onClick={handleUploadClick}>
               Upload Image
              </button>
              <button className="learn-more" onClick={handleLearnMoreClick}>
                
                {showLearnMore ? 'Hide Details' : 'Learn More'}
              </button>
            </div>
          </div>
          <div className="image_div">
            <img src="./med.svg" alt="Medical diagnosis illustration" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Learn More Section with ref */}
      {showLearnMore && (
        <section className="learn-more-section" ref={learnMoreRef}>
          <div className="learn-more-container">
            <h2>
              <span className="green">Why Choose</span> Our Diagnostic Platform
            </h2>
            
            <div className="features-grid">
              <div className="feature-card">
                <MdScience className="feature-icon" size={48} />
                <h3>Advanced AI Technology</h3>
                <p>
                  Our proprietary algorithms are trained on thousands of medical images 
                  to provide the most accurate analysis possible, with 99.2% detection accuracy.
                </p>
              </div>
              
              <div className="feature-card">
                <MdAccessibility className="feature-icon" size={48} />
                <h3>Accessible Healthcare</h3>
                <p>
                  Get professional-grade diagnostics without visiting a clinic. 
                  Perfect for remote areas or busy schedules. Available 24/7.
                </p>
              </div>
              
              <div className="feature-card">
                <MdSecurity className="feature-icon" size={48} />
                <h3>Secure & Private</h3>
                <p>
                  Your medical data is encrypted and never shared without your consent. 
                  HIPAA-compliant data handling ensures complete privacy.
                </p>
              </div>
            </div>
            
            <div className="tech-specs">
              <h3>Technical Specifications</h3>
              <ul>
                <li>Supports JPG, PNG, and TIFF image formats</li>
                <li>Analysis completed in under 2 minutes</li>
                <li>99.2% accuracy for common blood cell types</li>
                <li>HIPAA-compliant data handling</li>
                <li>No installation required - works in any modern browser</li>
                <li>Detailed PDF reports with visual annotations</li>
              </ul>
            </div>
            
            <button 
              className="close-learn-more" 
              onClick={handleLearnMoreClick}
            >
              <FaChevronUp /> Collapse Section
            </button>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="how-it-works" id="about">
        <h2 className="how-it-works-heading">
          How It <span className="green">Works</span>
        </h2>
        <div className="steps-container">
          {[
            {
              number: 1,
              title: "Upload Your Image",
              description: "Upload a high-quality blood smear image (JPG, PNG). Well-lit, clear microscope images work best."
            },
            {
              number: 2,
              title: "Image Preprocessing",
              description: "We enhance and normalize your image automatically—no manual setup required."
            },
            {
              number: 3,
              title: "AI-Based Detection",
              description: "Our model detects and categorizes RBCs, WBCs, and platelets with precision."
            },
            {
              number: 4,
              title: "Detailed Results",
              description: "View annotated images, counts, abnormalities, and data visualizations—all in one place."
            }
          ].map((step) => (
            <div className="step" key={step.number}>
              <div className="step-header">
                <div className="step-number">{step.number}</div>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section" id="about-us">
        <div className="about-us-container">
          <div className="about-us-heading-wrapper">
            <h2 className="about-us-heading">
              About <span className="green">Us</span>
            </h2>
            <p className="about-us-subtext">
              Empowering the future of healthcare with smart technology.
            </p>
          </div>

          <div className="about-us-content">
            <div className="about-us-text">
              <h3 className="vision-heading">Our Vision</h3>
              <p className="vision-text">
                We aim to democratize access to intelligent diagnostic tools and redefine how people interact with medical technology—anytime, anywhere.
              </p>
            </div>

            <div className="about-us-text">
              <h3 className="vision-heading">Our Mission</h3>
              <p className="vision-text">
                To seamlessly integrate AI and healthcare to enhance accessibility, efficiency, and outcomes for everyone around the globe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="difference-section" id="difference">
        <div className="difference-container">
          <div className="difference-heading-wrapper">
            <h2 className="difference-heading">
              What Makes Us <span className="green">Different</span>
            </h2>
          </div>

          <div className="difference-items">
            {[
              {
                title: "AI-Powered Precision",
                description: "Advanced models trained on high-quality datasets."
              },
              {
                title: "Interactive Results",
                description: "Get annotated visuals and clear breakdowns of RBCs, WBCs, and platelets."
              },
              {
                title: "User-Friendly Design",
                description: "No steep learning curve — just clean, intuitive interaction."
              }
            ].map((item, index) => (
              <div className="difference-item" key={index}>
                <h3 className="difference-title">{item.title}</h3>
                <p className="difference-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <img 
              src="g_logo.png" 
              alt="DiagnoAI Logo" 
              className="footer-logo" 
              loading="lazy"
            />
            <div className="footer-links">
              <a href="#about-us">About Us</a>
              <a href="#difference">What Makes Us Different</a>
              <a href="#about">How It Works</a>
              <a href="mailto:contact@diagnoai.com">Contact</a>
            </div>
          </div>

          <div className="footer-socials">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a 
              href="https://linkedin.com/company/yourcompany" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://diagnoai.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Website"
            >
              <FaGlobe />
            </a>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} DiagnoAI. All rights reserved.</p>
            <p className="footer-legal">
              <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
import React, { useEffect, useRef } from 'react'
import { footerStyles } from '../assets/dummyStyles'
import {
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Mail,
  Heart
} from 'lucide-react'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  const footerRef = useRef(null)

  const socialIcons = [
    { icon: FaFacebookF, link: '#' },
    { icon: FaInstagram, link: '#' },
    { icon: FaTwitter, link: '#' }
  ]

  useEffect(() => {
    const elements = footerRef.current.querySelectorAll('.fade-up')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
            entry.target.style.transitionDelay = `${index * 0.1}s`
          }
        })
      },
      { threshold: 0.2 }
    )

    elements.forEach((el) => observer.observe(el))
  }, [])

  return (
    <footer ref={footerRef} className={footerStyles.footer}>
      <div className={footerStyles.topBorder}></div>

      {/* Background */}
      <div className={footerStyles.patternOverlay}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="watchPattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              {[50, 40, 30, 20, 10].map((r, i) => (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r={r}
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
              ))}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#watchPattern)" />
        </svg>
      </div>

      <div className={footerStyles.mainContainer}>
        {/* Newsletter */}
        <div className={`${footerStyles.newsletterSection} fade-up`}>
          <div className={footerStyles.newsletterContent}>
            <h3 className={footerStyles.newsletterTitle}>
              Timeless Elegance, Delivered
            </h3>
            <p className={footerStyles.newsletterText}>
              Subscribe to our newsletter for exclusive offers, new collection
              announcements, and styling tips.
            </p>
            <div className={footerStyles.formContainer}>
              <input
                type="email"
                placeholder="Enter your email here..."
                className={footerStyles.emailInput}
                aria-label="Email address"
              />
              <button
                type="button"
                className={footerStyles.subscribeButton}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className={footerStyles.mainGrid}>
          {/* Brand */}
          <div className={`${footerStyles.brandSection} fade-up`}>
            <div className={footerStyles.brandContainer}>
              <div className={footerStyles.brandIconContainer}>
                <div className={footerStyles.brandIconPing}></div>
                <Clock className={footerStyles.brandIcon} />
              </div>
              <span className={footerStyles.brandName}>ChronoElite</span>
            </div>

            <p className={footerStyles.brandDescription}>
              Crafting timeless pieces for the discerning. Where precision meets
              elegance in every detail.
            </p>

            <div className={footerStyles.socialIconsContainer}>
              {socialIcons.map(({ icon: Icon, link }, index) => (
                <a
                  href={link}
                  key={index}
                  onClick={(e) => e.preventDefault()}
                  className={`${footerStyles.socialIcon} socialIcon`}
                >
                  <Icon className={footerStyles.socialIconInner} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="fade-up">
            <h3 className={footerStyles.sectionHeading}>
              <ChevronRight className={footerStyles.sectionIcon} />
              Explore
            </h3>
            <ul className={footerStyles.linksList}>
              {[
                { label: 'Collections', href: '/watches' },
                { label: 'New Arrivals', href: '/watches' },
                { label: 'Best Sellers', href: '/watches' },
                { label: 'Limited Editions', href: '/watches' },
                { label: 'Our Story', href: '/watches' }
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={`${footerStyles.linkItem} linkItem`}>
                    <ChevronRight className={footerStyles.linkIcon} />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="fade-up">
            <h3 className={footerStyles.sectionHeading}>
              <ChevronRight className={footerStyles.sectionIcon} />
              Support
            </h3>
            <ul className={footerStyles.linksList}>
              {[
                'Contact Us',
                'Shipping & Returns',
                'Product Care',
                'Warranty',
                'FAQ'
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className={`${footerStyles.supportLink} linkItem`}
                  >
                    <ChevronRight className={footerStyles.linkIcon} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="fade-up">
            <h3 className={footerStyles.sectionHeading}>
              <ChevronRight className={footerStyles.sectionIcon} />
              Connect
            </h3>
            <ul className={footerStyles.contactList}>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <MapPin className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  123 Luxury Avenue, Geneva, Switzerland
                </span>
              </li>

              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Phone className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  +41 22 345 6789
                </span>
              </li>

              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Mail className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>
                  info@chronoelite.com
                </span>
              </li>
            </ul>
          </div>

          {/* Bottom */}
          <div className={`${footerStyles.bottomSection} fade-up`}>
            <p className={footerStyles.copyright}>
              &copy; {new Date().getFullYear()} ChronoElite. Crafted with{' '}
              <Heart className={footerStyles.heartIcon} /> in India
            </p>
          </div>
        </div>
      </div>

      {/* 🔥 Animations */}
      <style>
        {`
        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .socialIcon:hover {
          transform: translateY(-6px) scale(1.08);
          box-shadow: 0 10px 25px rgba(255, 215, 0, 0.25);
        }

        .linkItem {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .linkItem::after {
          content: "";
          position: absolute;
          left: -100%;
          bottom: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, gold, transparent);
          transition: 0.5s;
        }

        .linkItem:hover::after {
          left: 100%;
        }

        .linkItem:hover {
          transform: translateX(6px);
        }

        .subscribeButton {
          position: relative;
          overflow: hidden;
        }

        .subscribeButton::before {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255,255,255,0.4),
            transparent
          );
          transform: skewX(-20deg);
        }

        .subscribeButton:hover::before {
          left: 130%;
          transition: 0.7s;
        }

        .patternOverlay {
          animation: slowMove 20s linear infinite;
          opacity: 0.05;
        }

        @keyframes slowMove {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        .${footerStyles.brandIcon} {
          animation: floatIcon 4s ease-in-out infinite;
        }

        @keyframes floatIcon {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        `}
      </style>

      <style>{footerStyles.mediaQueries}</style>
    </footer>
  )
}

export default Footer
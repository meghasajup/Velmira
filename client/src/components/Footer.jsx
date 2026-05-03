import React from 'react'
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
  const socialIcons = [
    { icon: FaFacebookF, link: '#' },
    { icon: FaInstagram, link: '#' },
    { icon: FaTwitter, link: '#' }
  ]

  return (
    <footer className={footerStyles.footer}>
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
        <div className={footerStyles.newsletterSection}>
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
          <div className={footerStyles.brandSection}>
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
                  className={footerStyles.socialIcon}
                >
                  <Icon className={footerStyles.socialIconInner} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
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
                  <a href={item.href} className={footerStyles.linkItem}>
                    <ChevronRight className={footerStyles.linkIcon} />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
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
                    className={footerStyles.supportLink}
                  >
                    <ChevronRight className={footerStyles.linkIcon} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
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

          {/* Bottom line */}
          <div className={footerStyles.bottomSection}>
            <p className={footerStyles.copyright}>
              &copy; {new Date().getFullYear()} ChronoElite. Crafted with{" "}
              <Heart className={footerStyles.heartIcon} /> in India
            </p>
          </div>
        </div>
      </div>
      <style>{footerStyles.mediaQueries}</style>
    </footer>
  )
}

export default Footer
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Linkedin, Instagram } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.about', path: '/about' },
  { key: 'nav.services', path: '/services' },
  { key: 'nav.projects', path: '/projects' },
  { key: 'nav.contact', path: '/contact' },
];

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <footer className="bg-charcoal border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Logo height={64} variant="gold" />
            </div>
            <p className="text-white/60 text-sm font-inter leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="mt-4">
              <p className="text-gold/80 text-sm font-inter italic">
                {isArabic ? '"نبني المستقبل، نُجدِّد الحاضر"' : '"Building the Future, Restoring the Present"'}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-white font-semibold text-base mb-5 ${isArabic ? 'font-arabic' : 'font-inter'}`}>
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.path}
                    className={`text-white/60 hover:text-gold text-sm font-inter transition-colors duration-200 flex items-center gap-2 group ${isArabic ? 'flex-row-reverse' : ''}`}
                  >
                    <span className="w-4 h-px bg-gold/0 group-hover:bg-gold/80 transition-all duration-300" />
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`text-white font-semibold text-base mb-5 ${isArabic ? 'font-arabic' : 'font-inter'}`}>
              {t('footer.contactInfo')}
            </h4>
            <ul className="space-y-4">
              <li className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm font-inter">{t('company.address')}</span>
              </li>
              <li className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Phone size={16} className="text-gold flex-shrink-0" />
                <a href="tel:+971563780707" className="text-white/60 hover:text-gold text-sm font-inter transition-colors" dir="ltr">
                  +971 56 378 0707
                </a>
              </li>
              <li className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Mail size={16} className="text-gold flex-shrink-0" />
                <a href="mailto:info@albinaaalareeq.ae" className="text-white/60 hover:text-gold text-sm font-inter transition-colors">
                  {t('company.email')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className={`text-white font-semibold text-base mb-5 ${isArabic ? 'font-arabic' : 'font-inter'}`}>
              {t('footer.followUs')}
            </h4>
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://www.instagram.com/albina.alareeq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 flex items-center justify-center text-white/60 hover:text-pink-400 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/971563780707"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 flex items-center justify-center text-white/60 hover:text-green-400 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="tel:+971563780707"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-gold/50 hover:bg-gold/10 flex items-center justify-center text-white/60 hover:text-gold transition-all duration-200"
                aria-label="Call us"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63 19.79 19.79 0 01.07 2 2 2 0 012.06 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-white/40 text-sm font-inter ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic
              ? '© 2025 البناء العريق للمقاولات والصيانة العامة. جميع الحقوق محفوظة.'
              : '© 2025 Albina Alareeq Contracting & General Maintenance LLC. All rights reserved.'}
          </p>
          <button className="text-white/40 hover:text-gold text-sm font-inter transition-colors">
            {t('footer.privacyPolicy')}
          </button>
        </div>
      </div>
    </footer>
  );
}

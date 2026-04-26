import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Linkedin, Instagram, MessageCircle } from 'lucide-react';

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
            <div className="mb-4">
              <h3 className={`text-gold font-bold text-xl mb-1 ${isArabic ? 'font-arabic' : 'font-playfair'}`}>
                {isArabic ? 'البناء العريق' : 'Al Binaa Al Areeg'}
              </h3>
              <p className="text-white/50 text-xs font-inter">
                {isArabic ? 'للمقاولات والصيانة العامة' : 'Contracting & General Maintenance'}
              </p>
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
                <a href="tel:+971501234567" className="text-white/60 hover:text-gold text-sm font-inter transition-colors" dir="ltr">
                  {t('company.phone')}
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
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-gold/50 hover:bg-gold/10 flex items-center justify-center text-white/60 hover:text-gold transition-all duration-200"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-gold/50 hover:bg-gold/10 flex items-center justify-center text-white/60 hover:text-gold transition-all duration-200"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 flex items-center justify-center text-white/60 hover:text-green-400 transition-all duration-200"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-white/40 text-sm font-inter ${isArabic ? 'text-right' : 'text-left'}`}>
            {t('footer.copyright')}
          </p>
          <button className="text-white/40 hover:text-gold text-sm font-inter transition-colors">
            {t('footer.privacyPolicy')}
          </button>
        </div>
      </div>
    </footer>
  );
}

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.about', path: '/about' },
  { key: 'nav.services', path: '/services' },
  { key: 'nav.projects', path: '/projects' },
  { key: 'nav.contact', path: '/contact' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const toggleLanguage = () => {
    const newLang = isArabic ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-charcoal/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 group">
              <Logo height={48} variant="gold" className="transition-opacity group-hover:opacity-80" />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-inter font-medium transition-colors duration-200 group ${
                    isActive(link.path) ? 'text-gold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {t(link.key)}
                  {isActive(link.path) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 text-white/80 hover:text-gold border border-white/20 hover:border-gold/50 rounded-full text-sm font-inter transition-all duration-200"
              >
                <Globe size={14} />
                <span>{t('nav.toggleLang')}</span>
              </button>
              <Link
                to="/contact"
                className="px-5 py-2 bg-gold hover:bg-gold-light text-charcoal font-inter font-semibold text-sm rounded-full transition-all duration-200 shadow-md hover:shadow-gold/30"
              >
                {t('nav.getQuote')}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: isArabic ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isArabic ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed inset-0 z-40 bg-charcoal flex flex-col ${isArabic ? 'items-end' : 'items-start'} pt-24 px-8`}
          >
            <div className="w-full space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: isArabic ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-4 text-2xl font-inter font-medium border-b border-white/10 transition-colors ${
                      isActive(link.path) ? 'text-gold' : 'text-white/80 hover:text-gold'
                    } ${isArabic ? 'text-right font-arabic' : 'text-left'}`}
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-6 flex flex-col gap-3">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 text-white/70 hover:text-gold text-base font-inter"
                >
                  <Globe size={18} />
                  {t('nav.toggleLang')}
                </button>
                <Link
                  to="/contact"
                  className="mt-2 px-6 py-3 bg-gold text-charcoal font-inter font-semibold text-base rounded-full text-center"
                >
                  {t('nav.getQuote')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

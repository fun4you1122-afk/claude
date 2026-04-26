import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Wrench, Settings, Zap, Landmark, ClipboardList, CheckCircle, ChevronDown } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.section ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.section>
  );
}

const SERVICE_IMAGES = [
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&q=80',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
];

const SERVICE_KEYS = [
  'generalConstruction',
  'renovation',
  'maintenance',
  'mep',
  'civil',
  'projectManagement',
] as const;

const SERVICE_ICONS = [Building2, Wrench, Settings, Zap, Landmark, ClipboardList];

export default function Services() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const activeKey = SERVICE_KEYS[activeTab];
  const includedItems: string[] = t(`services.${activeKey}.included`, { returnObjects: true }) as string[];
  const stepItems: string[] = t(`services.${activeKey}.steps`, { returnObjects: true }) as string[];

  return (
    <div className="bg-charcoal min-h-screen">
      {/* Hero */}
      <div className="relative pt-32 pb-20 bg-charcoal-light border-b border-gold/10 overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-50" />
        <div className="container-custom text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`text-4xl md:text-6xl font-bold text-white mb-4 ${isAr ? 'font-arabic' : 'font-playfair'}`}
          >
            {t('services.pageTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-gold font-inter"
          >
            {t('services.pageSubtitle')}
          </motion.p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-charcoal border-b border-white/10">
        <div className="container-custom overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {SERVICE_KEYS.map((key, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-5 py-4 font-inter text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                    activeTab === i
                      ? 'border-gold text-gold'
                      : 'border-transparent text-white/60 hover:text-white hover:border-white/30'
                  }`}
                >
                  <Icon size={16} />
                  {t(`services.${key}.title`)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Service detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Hero image */}
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={SERVICE_IMAGES[activeTab]}
              alt={t(`services.${activeKey}.title`)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
            <div className="absolute bottom-8 left-0 right-0 container-custom">
              <h2 className={`text-3xl md:text-5xl font-bold text-white ${isAr ? 'font-arabic' : 'font-playfair'}`}>
                {t(`services.${activeKey}.title`)}
              </h2>
            </div>
          </div>

          <div className="section-padding">
            <div className="container-custom">
              {/* Description */}
              <Section>
                <motion.p variants={fadeUp} className="text-white/80 font-inter text-lg leading-relaxed max-w-3xl mb-16">
                  {t(`services.${activeKey}.fullDesc`)}
                </motion.p>

                <div className="grid md:grid-cols-2 gap-12">
                  {/* What's included */}
                  <motion.div variants={fadeUp}>
                    <h3 className={`text-xl font-bold text-gold mb-6 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
                      {isAr ? 'ما يشمله الخدمة' : "What's Included"}
                    </h3>
                    <ul className="space-y-3">
                      {Array.isArray(includedItems) && includedItems.map((item, i) => (
                        <li key={i} className={`flex items-start gap-3 text-white/80 font-inter ${isAr ? 'flex-row-reverse' : ''}`}>
                          <CheckCircle size={18} className="text-gold mt-0.5 flex-none" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Our process */}
                  <motion.div variants={fadeUp}>
                    <h3 className={`text-xl font-bold text-gold mb-6 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
                      {isAr ? 'عمليتنا' : 'Our Process'}
                    </h3>
                    <ol className="space-y-4">
                      {Array.isArray(stepItems) && stepItems.map((step, i) => (
                        <li key={i} className={`flex items-start gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                          <span className="flex-none w-7 h-7 bg-gold text-charcoal text-sm font-bold rounded-full flex items-center justify-center font-inter">
                            {i + 1}
                          </span>
                          <p className="text-white/80 font-inter mt-0.5">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                </div>
              </Section>

              {/* CTA */}
              <Section className="mt-16 pt-12 border-t border-white/10">
                <motion.div variants={fadeUp} className="text-center">
                  <p className={`text-2xl font-bold text-white mb-6 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
                    {t('services.ctaTitle')}
                  </p>
                  <Link
                    to="/contact"
                    className="inline-block px-10 py-4 bg-gold hover:bg-gold-light text-charcoal font-inter font-bold rounded-full transition-all duration-300 shadow-xl shadow-gold/20"
                  >
                    {t('services.ctaButton')}
                  </Link>
                </motion.div>
              </Section>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* All services accordion (mobile-friendly overview) */}
      <div className="bg-charcoal-light border-t border-white/10">
        <div className="container-custom py-16">
          <h2 className={`text-2xl font-bold text-white mb-8 text-center ${isAr ? 'font-arabic' : 'font-playfair'}`}>
            {isAr ? 'نظرة عامة على جميع الخدمات' : 'All Services Overview'}
          </h2>
          <div className="space-y-2 max-w-3xl mx-auto">
            {SERVICE_KEYS.map((key, i) => {
              const Icon = SERVICE_ICONS[i];
              const isOpen = openAccordion === i;
              const items: string[] = t(`services.${key}.included`, { returnObjects: true }) as string[];
              return (
                <div key={key} className="glass rounded-xl border border-white/10 overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : i)}
                    className={`w-full flex items-center justify-between p-5 text-left ${isAr ? 'flex-row-reverse text-right' : ''}`}
                  >
                    <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <Icon size={20} className="text-gold" />
                      <span className={`text-white font-semibold font-inter ${isAr ? 'font-arabic' : ''}`}>
                        {t(`services.${key}.title`)}
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-white/5">
                          <p className="text-white/70 font-inter text-sm mb-4 mt-4">{t(`services.${key}.shortDesc`)}</p>
                          <ul className="grid grid-cols-2 gap-2">
                            {Array.isArray(items) && items.slice(0, 4).map((item, j) => (
                              <li key={j} className={`flex items-center gap-2 text-white/60 font-inter text-xs ${isAr ? 'flex-row-reverse' : ''}`}>
                                <CheckCircle size={12} className="text-gold flex-none" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

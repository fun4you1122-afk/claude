import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView as useInViewObs } from 'react-intersection-observer';
import {
  Building2, Wrench, Settings, Zap, Landmark, ClipboardList,
  ChevronDown, Award, Clock, Users, BarChart3, Star, ArrowRight,
  ChevronLeft, ChevronRight,
} from 'lucide-react';

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: Building2, titleKey: 'services.generalConstruction.title', descKey: 'services.generalConstruction.shortDesc', fullKey: 'services.generalConstruction.fullDesc' },
  { icon: Wrench, titleKey: 'services.renovation.title', descKey: 'services.renovation.shortDesc', fullKey: 'services.renovation.fullDesc' },
  { icon: Settings, titleKey: 'services.maintenance.title', descKey: 'services.maintenance.shortDesc', fullKey: 'services.maintenance.fullDesc' },
  { icon: Zap, titleKey: 'services.mep.title', descKey: 'services.mep.shortDesc', fullKey: 'services.mep.fullDesc' },
  { icon: Landmark, titleKey: 'services.civil.title', descKey: 'services.civil.shortDesc', fullKey: 'services.civil.fullDesc' },
  { icon: ClipboardList, titleKey: 'services.projectManagement.title', descKey: 'services.projectManagement.shortDesc', fullKey: 'services.projectManagement.fullDesc' },
];

const PROJECTS = [
  { img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', name: 'Villa Renovation', location: 'Khalifa City, Abu Dhabi', cat: 'Renovation' },
  { img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80', name: 'Commercial Building', location: 'Musaffah Industrial Area', cat: 'Construction' },
  { img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', name: 'Office Fit-Out', location: 'Al Reem Island', cat: 'Renovation' },
  { img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80', name: 'MEP Upgrade', location: 'Mussafah', cat: 'MEP' },
  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', name: 'Road & Civil Works', location: 'Al Ain', cat: 'Civil Works' },
];

const TESTIMONIALS = [
  { quote: 'Al Binaa Al Areeg delivered our villa renovation on time and exceeded every expectation. Outstanding quality.', name: 'Khalid Al Mansoori', role: 'Property Owner, Abu Dhabi' },
  { quote: 'Professional team, excellent communication, and flawless MEP installation across our entire facility.', name: 'Sara Al Hamdan', role: 'Facilities Manager, Abu Dhabi Mall' },
  { quote: 'Their project management kept everything on track. One of the most reliable contractors we have worked with.', name: 'James Mitchell', role: 'CEO, Gulf Developments LLC' },
];

const STATS = [
  { value: 15, suffix: '+', key: 'home.statsYears' },
  { value: 500, suffix: '+', key: 'home.statsProjects' },
  { value: 200, suffix: '+', key: 'home.statsClients' },
  { value: 50, suffix: '+', key: 'home.statsTeam' },
];

const WHY = [
  { icon: Award, key: 'home.whyLicensed', descKey: 'home.whyLicensedDesc' },
  { icon: Clock, key: 'home.whyOnTime', descKey: 'home.whyOnTimeDesc' },
  { icon: Users, key: 'home.whyExpert', descKey: 'home.whyExpertDesc' },
  { icon: BarChart3, key: 'home.whyEndToEnd', descKey: 'home.whyEndToEndDesc' },
];

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.section
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const words = t('home.heroTitle').split(' ');

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal" />

      {/* Geometric particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-gold/10 rounded-full"
          style={{ width: 80 + i * 60, height: 80 + i * 60, top: `${15 + i * 10}%`, left: `${5 + i * 12}%` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      <div className={`relative z-10 text-center px-4 max-w-5xl mx-auto ${isAr ? 'font-arabic' : ''}`}>
        {/* Word-by-word reveal */}
        <div className={`flex flex-wrap justify-center gap-x-4 mb-3 ${isAr ? 'flex-row-reverse' : ''}`}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
              className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white ${isAr ? 'font-arabic' : 'font-playfair'}`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-xl md:text-2xl text-gold mb-2"
        >
          {t('home.heroSubtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="h-0.5 w-32 bg-gold mx-auto mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="text-lg md:text-xl text-white/80 mb-10 font-inter italic"
        >
          {t('home.heroTagline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/services"
            className="px-8 py-3 border-2 border-gold text-gold hover:bg-gold hover:text-charcoal font-inter font-semibold rounded-full transition-all duration-300"
          >
            {t('home.heroCta1')}
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 bg-gold text-charcoal hover:bg-gold-light font-inter font-semibold rounded-full transition-all duration-300 shadow-lg shadow-gold/20"
          >
            {t('home.heroCta2')}
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="text-gold" size={32} />
      </motion.div>
    </div>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const { t } = useTranslation();
  const { ref, inView } = useInViewObs({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="bg-gold py-12">
      <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map((s, i) => (
          <div key={i}>
            <div className="text-4xl md:text-5xl font-playfair font-bold text-charcoal">
              {inView ? <CountUp end={s.value} duration={2.5} suffix={s.suffix} /> : `0${s.suffix}`}
            </div>
            <div className="text-charcoal/80 font-inter text-sm mt-1">{t(s.key)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── About snippet ────────────────────────────────────────────────────────────
function AboutSnippet() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <Section className="section-padding bg-charcoal">
      <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
        <motion.div variants={fadeUp}>
          <div className="border-gold-left">
            <h2 className={`text-3xl md:text-4xl font-bold text-white mb-6 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
              {t('home.aboutTitle')}
            </h2>
          </div>
          <p className="text-white/70 font-inter leading-relaxed mb-8">{t('home.aboutText')}</p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold text-gold hover:bg-gold hover:text-charcoal rounded-full font-inter font-semibold transition-all duration-300"
          >
            {t('home.aboutCta')}
            <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
              alt="Construction"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -start-4 w-32 h-32 bg-gold rounded-2xl -z-10 opacity-30" />
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Services grid ────────────────────────────────────────────────────────────
function ServicesGrid() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <Section className="section-padding bg-charcoal-light">
      <div className="container-custom">
        <motion.div variants={fadeUp} className="text-center mb-14">
          <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
            {t('home.servicesTitle')}
          </h2>
          <p className="text-white/60 font-inter">{t('home.servicesSubtitle')}</p>
          <div className="h-0.5 w-16 bg-gold mx-auto mt-4" />
        </motion.div>

        <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(201,168,76,0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-gold/40 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon className="text-gold" size={24} />
                </div>
                <h3 className={`text-lg font-semibold text-white mb-2 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
                  {t(s.titleKey)}
                </h3>
                <p className="text-white/60 font-inter text-sm leading-relaxed group-hover:hidden transition-all">
                  {t(s.descKey)}
                </p>
                <p className="text-white/80 font-inter text-sm leading-relaxed hidden group-hover:block transition-all">
                  {t(s.fullKey)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp} className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-charcoal hover:bg-gold-light font-inter font-semibold rounded-full transition-all duration-300"
          >
            {t('home.heroCta1')} <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Projects showcase ────────────────────────────────────────────────────────
function ProjectsShowcase() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <Section className="section-padding bg-charcoal overflow-hidden">
      <div className="container-custom mb-10">
        <motion.div variants={fadeUp} className="flex items-end justify-between">
          <div>
            <h2 className={`text-3xl md:text-4xl font-bold text-white mb-2 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
              {t('home.projectsTitle')}
            </h2>
            <p className="text-white/60 font-inter">{t('home.projectsSubtitle')}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-charcoal flex items-center justify-center transition-all">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-charcoal flex items-center justify-center transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      <div ref={scrollRef} className="horizontal-scroll flex gap-6 px-4 md:px-8 pb-4">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="flex-none w-72 md:w-80 rounded-2xl overflow-hidden bg-charcoal-light border border-white/5 hover:border-gold/30 transition-all duration-300 group"
          >
            <div className="h-48 overflow-hidden">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <span className="text-xs text-gold font-inter font-semibold uppercase tracking-wider">{p.cat}</span>
              <h3 className="text-white font-playfair font-semibold mt-1">{p.name}</h3>
              <p className="text-white/50 text-sm font-inter mt-1">{p.location}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} className="text-center mt-10">
        <Link to="/projects" className="inline-flex items-center gap-2 text-gold border-b border-gold/40 hover:border-gold font-inter font-medium transition-all pb-0.5">
          {t('projects.filterAll')} {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </Link>
      </motion.div>
    </Section>
  );
}

// ─── Why choose us ────────────────────────────────────────────────────────────
function WhyChooseUs() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <Section className="section-padding bg-charcoal-medium geometric-pattern relative">
      <div className="container-custom">
        <motion.div variants={fadeUp} className="text-center mb-14">
          <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
            {t('home.whyTitle')}
          </h2>
          <p className="text-white/60 font-inter">{t('home.whySubtitle')}</p>
        </motion.div>

        <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY.map((w, i) => {
            const Icon = w.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201,168,76,0.2)' }}
                className="text-center glass rounded-2xl p-8 border border-gold/10"
              >
                <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-gold" size={26} />
                </div>
                <h3 className={`text-white font-semibold mb-2 ${isAr ? 'font-arabic' : 'font-inter'}`}>{t(w.key)}</h3>
                <p className="text-white/60 font-inter text-sm leading-relaxed">{t(w.descKey)}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <Section className="section-padding bg-charcoal">
      <div className="container-custom max-w-4xl">
        <motion.div variants={fadeUp} className="text-center mb-14">
          <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
            {t('home.testimonialsTitle')}
          </h2>
          <div className="h-0.5 w-16 bg-gold mx-auto" />
        </motion.div>

        <motion.div variants={fadeUp} className="relative overflow-hidden">
          {TESTIMONIALS.map((test, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ opacity: active === i ? 1 : 0, x: active === i ? 0 : 60 }}
              transition={{ duration: 0.5 }}
              className={`${active === i ? 'relative' : 'absolute top-0 left-0 right-0 pointer-events-none'}`}
            >
              {active === i && (
                <div className="glass rounded-2xl p-8 md:p-12 border border-gold/10 text-center">
                  <Star className="text-gold mx-auto mb-6" size={28} />
                  <p className="text-white/80 font-inter text-lg md:text-xl italic leading-relaxed mb-8">
                    "{test.quote}"
                  </p>
                  <div>
                    <p className="text-gold font-inter font-semibold">{test.name}</p>
                    <p className="text-white/50 font-inter text-sm">{test.role}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === active ? 'bg-gold w-6' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <Section className="py-20 bg-charcoal-light border-y border-gold/10">
      <div className="container-custom text-center">
        <motion.h2
          variants={fadeUp}
          className={`text-3xl md:text-5xl font-bold text-white mb-4 ${isAr ? 'font-arabic' : 'font-playfair'}`}
        >
          {t('home.ctaTitle')}
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/60 font-inter mb-8 text-lg">
          {t('home.ctaSubtitle')}
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link
            to="/contact"
            className="inline-block px-10 py-4 bg-gold hover:bg-gold-light text-charcoal font-inter font-bold text-lg rounded-full transition-all duration-300 shadow-xl shadow-gold/20"
          >
            {t('home.ctaButton')}
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Home page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutSnippet />
      <ServicesGrid />
      <ProjectsShowcase />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
    </>
  );
}

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Shield, Lightbulb, Handshake, Star, Award, Linkedin } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.section ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.section>
  );
}

const TIMELINE = [
  { year: '2009', event: 'Company Founded in Abu Dhabi', eventAr: 'تأسيس الشركة في أبوظبي' },
  { year: '2012', event: 'First Major Government Contract', eventAr: 'أول عقد حكومي كبير' },
  { year: '2015', event: 'Expanded to General Maintenance Division', eventAr: 'توسع إلى قسم الصيانة العامة' },
  { year: '2018', event: 'Reached 100+ Completed Projects', eventAr: 'إنجاز أكثر من 100 مشروع' },
  { year: '2022', event: 'ISO 9001:2015 Certification Achieved', eventAr: 'الحصول على شهادة ISO 9001:2015' },
  { year: '2025', event: '500+ Projects Milestone', eventAr: 'إنجاز 500+ مشروع' },
];

const VALUES = [
  { icon: Star, label: 'Quality', labelAr: 'الجودة', desc: 'Uncompromising standards in every project we undertake.', descAr: 'معايير لا تقبل المساومة في كل مشروع.' },
  { icon: Shield, label: 'Integrity', labelAr: 'النزاهة', desc: 'Transparent, honest relationships with all stakeholders.', descAr: 'علاقات شفافة وصادقة مع جميع أصحاب المصلحة.' },
  { icon: Award, label: 'Safety', labelAr: 'السلامة', desc: 'Zero-compromise on health and safety at every site.', descAr: 'صفر تسامح مع الصحة والسلامة في كل موقع.' },
  { icon: Lightbulb, label: 'Innovation', labelAr: 'الابتكار', desc: 'Embracing modern technology and construction methods.', descAr: 'تبني التكنولوجيا الحديثة وأساليب البناء.' },
  { icon: Handshake, label: 'Partnership', labelAr: 'الشراكة', desc: 'Building long-term relationships with every client.', descAr: 'بناء علاقات طويلة الأمد مع كل عميل.' },
];

const TEAM = [
  { name: 'Mohammed Al Rashidi', nameAr: 'محمد الراشدي', role: 'Chief Executive Officer', roleAr: 'الرئيس التنفيذي', bio: 'Over 20 years leading major contracting firms across the GCC.', bioAr: 'أكثر من 20 عامًا في قيادة شركات المقاولات الكبرى في دول الخليج.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { name: 'Ahmed Al Shamsi', nameAr: 'أحمد الشامسي', role: 'Project Director', roleAr: 'مدير المشاريع', bio: 'Expert in large-scale construction delivery with 15+ years experience.', bioAr: 'خبير في تنفيذ مشاريع البناء الكبرى بخبرة أكثر من 15 عامًا.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { name: 'Eng. Rania Hassan', nameAr: 'م. رانيا حسن', role: 'Chief Engineer', roleAr: 'المهندس الأول', bio: 'Structural specialist with expertise in MEP and civil engineering.', bioAr: 'متخصصة في الإنشاءات مع خبرة في ميكانيكا والكهرباء والهندسة المدنية.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'Saeed Al Mazrouei', nameAr: 'سعيد المزروعي', role: 'Maintenance Supervisor', roleAr: 'مشرف الصيانة', bio: 'Leading a team of 30+ technicians across Abu Dhabi properties.', bioAr: 'يقود فريقًا من أكثر من 30 فنيًا عبر عقارات أبوظبي.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
];

const CERTS = [
  { title: 'UAE Trade License', sub: 'Abu Dhabi Department of Economic Development', icon: '🏛️' },
  { title: 'Civil Works Contractor', sub: 'Contractor Classification — Grade A', icon: '🏗️' },
  { title: 'MEP License', sub: 'Abu Dhabi Municipality', icon: '⚡' },
  { title: 'ISO 9001:2015', sub: 'Quality Management System Certified', icon: '✅' },
];

// ─── Team Card (flip) ─────────────────────────────────────────────────────────
function TeamCard({ member, isAr }: { member: typeof TEAM[0]; isAr: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative h-72 cursor-pointer"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10" style={{ backfaceVisibility: 'hidden' }}>
          <img src={member.img} alt={member.name} className="w-full h-48 object-cover object-top" />
          <div className="bg-charcoal-light p-4">
            <h3 className={`text-white font-semibold ${isAr ? 'font-arabic text-right' : 'font-inter'}`}>
              {isAr ? member.nameAr : member.name}
            </h3>
            <p className="text-gold text-sm font-inter">{isAr ? member.roleAr : member.role}</p>
          </div>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-gold flex flex-col items-center justify-center p-6 text-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-charcoal font-inter font-medium leading-relaxed mb-4">
            {isAr ? member.bioAr : member.bio}
          </p>
          <div className="w-10 h-10 bg-charcoal rounded-full flex items-center justify-center">
            <Linkedin size={18} className="text-gold" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <div className="bg-charcoal min-h-screen">
      {/* Hero banner */}
      <div className="relative pt-32 pb-20 bg-charcoal-light border-b border-gold/10 overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-50" />
        <div className="container-custom text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`text-4xl md:text-6xl font-bold text-white mb-4 ${isAr ? 'font-arabic' : 'font-playfair'}`}
          >
            {t('about.pageTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-gold font-inter"
          >
            {t('about.pageSubtitle')}
          </motion.p>
        </div>
      </div>

      {/* Timeline */}
      <Section className="section-padding">
        <div className="container-custom max-w-3xl">
          <motion.h2 variants={fadeUp} className={`text-3xl font-bold text-white text-center mb-14 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
            {t('about.timelineTitle')}
          </motion.h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gold/20" />
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`flex items-center gap-6 mb-10 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="glass rounded-xl p-4 border border-gold/10 inline-block">
                    <p className="text-gold font-bold font-inter text-lg">{item.year}</p>
                    <p className="text-white/80 font-inter text-sm">{isAr ? item.eventAr : item.event}</p>
                  </div>
                </div>
                <div className="relative z-10 w-4 h-4 bg-gold rounded-full ring-4 ring-charcoal flex-none" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section className="section-padding bg-charcoal-light">
        <div className="container-custom grid md:grid-cols-2 gap-8">
          {[
            { icon: Target, titleKey: 'about.missionTitle', textKey: 'about.missionText' },
            { icon: Eye, titleKey: 'about.visionTitle', textKey: 'about.visionText' },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(201,168,76,0.2)' }}
                className="glass rounded-2xl p-8 border border-gold/10"
              >
                <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="text-gold" size={28} />
                </div>
                <h3 className={`text-2xl font-bold text-white mb-4 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
                  {t(card.titleKey)}
                </h3>
                <p className="text-white/70 font-inter leading-relaxed">{t(card.textKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Values */}
      <Section className="section-padding bg-charcoal geometric-pattern">
        <div className="container-custom">
          <motion.h2 variants={fadeUp} className={`text-3xl font-bold text-white text-center mb-14 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
            {t('about.valuesTitle')}
          </motion.h2>
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(201,168,76,0.3)' }}
                  className="glass rounded-2xl p-6 text-center border border-gold/10"
                >
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-gold" size={22} />
                  </div>
                  <h3 className={`text-white font-semibold mb-2 ${isAr ? 'font-arabic' : 'font-inter'}`}>
                    {isAr ? v.labelAr : v.label}
                  </h3>
                  <p className="text-white/60 font-inter text-xs leading-relaxed">{isAr ? v.descAr : v.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>

      {/* Team */}
      <Section className="section-padding bg-charcoal-light">
        <div className="container-custom">
          <motion.h2 variants={fadeUp} className={`text-3xl font-bold text-white text-center mb-14 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
            {t('about.teamTitle')}
          </motion.h2>
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <motion.div key={i} variants={fadeUp}>
                <TeamCard member={member} isAr={isAr} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Certifications */}
      <Section className="section-padding bg-charcoal">
        <div className="container-custom">
          <motion.h2 variants={fadeUp} className={`text-3xl font-bold text-white text-center mb-14 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
            {t('about.certsTitle')}
          </motion.h2>
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTS.map((cert, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(201,168,76,0.25)' }}
                className="glass rounded-2xl p-6 text-center border border-gold/20"
              >
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h3 className="text-gold font-inter font-bold mb-2">{cert.title}</h3>
                <p className="text-white/60 font-inter text-sm">{cert.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>
    </div>
  );
}

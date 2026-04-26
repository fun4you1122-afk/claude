import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { X, MapPin, Calendar, Tag } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.section ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.section>
  );
}

type Category = 'All' | 'Construction' | 'Renovation' | 'Maintenance' | 'Civil Works' | 'MEP';

interface Project {
  name: string;
  nameAr: string;
  location: string;
  category: Category;
  year: string;
  img: string;
  desc: string;
  descAr: string;
}

const PROJECTS: Project[] = [
  // ── MBZ City Projects ──
  {
    name: 'Villa Complex — Block 45', nameAr: 'مجمع فلل — قطعة 45',
    location: 'MBZ City, Abu Dhabi', category: 'Construction', year: '2024',
    img: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=800&q=80',
    desc: 'Construction of 6 luxury villas on a single plot in MBZ City including full structural, MEP, and external landscaping works. Delivered 3 weeks ahead of schedule.',
    descAr: 'إنشاء 6 فلل فاخرة على قطعة واحدة في مدينة محمد بن زايد تشمل الأعمال الإنشائية والميكانيكية والكهربائية وتنسيق المناظر الطبيعية الخارجية. تم تسليمها قبل 3 أسابيع من الموعد المحدد.',
  },
  {
    name: 'Villa Renovation — Sector 10', nameAr: 'تجديد فيلا — قطاع 10',
    location: 'MBZ City, Abu Dhabi', category: 'Renovation', year: '2024',
    img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    desc: 'Full interior and exterior renovation of a G+1 villa: kitchen, bathrooms, flooring, exterior cladding, and swimming pool upgrade.',
    descAr: 'تجديد داخلي وخارجي كامل لفيلا من طابقين: المطبخ والحمامات والأرضيات والكسوة الخارجية وترقية حمام السباحة.',
  },
  {
    name: 'MEP Fit-Out — Townhouse Development', nameAr: 'أعمال MEP — مشروع تاون هاوس',
    location: 'MBZ City, Abu Dhabi', category: 'MEP', year: '2024',
    img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    desc: 'Complete MEP installation for a 24-unit townhouse development: HVAC, electrical distribution, fire-fighting, and plumbing across all units.',
    descAr: 'تركيب أنظمة MEP الكاملة لمشروع تاون هاوس من 24 وحدة: تكييف الهواء والتوزيع الكهربائي ومكافحة الحريق والسباكة في جميع الوحدات.',
  },
  {
    name: 'Compound Perimeter & Civil Works', nameAr: 'أعمال سور المجمع والأعمال المدنية',
    location: 'MBZ City, Abu Dhabi', category: 'Civil Works', year: '2023',
    img: 'https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?w=800&q=80',
    desc: 'Perimeter wall construction, paving, drainage network, and utility installation for a 15-plot residential compound.',
    descAr: 'إنشاء سور المحيط والرصف وشبكة الصرف وتركيب المرافق لمجمع سكني من 15 قطعة.',
  },
  {
    name: 'Annual Maintenance — 12 Villas', nameAr: 'صيانة سنوية — 12 فيلا',
    location: 'MBZ City, Abu Dhabi', category: 'Maintenance', year: '2024',
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    desc: 'Ongoing annual maintenance contract covering 12 private villas: preventive maintenance, AC servicing, electrical checks, and emergency callouts.',
    descAr: 'عقد صيانة سنوي مستمر يغطي 12 فيلا خاصة: الصيانة الوقائية وخدمة التكييف والفحوصات الكهربائية وخدمات الطوارئ.',
  },

  // ── Riyadh City Projects ──
  {
    name: 'G+1 Villa Construction', nameAr: 'إنشاء فيلا أرضي + طابق',
    location: 'Riyadh City, Abu Dhabi', category: 'Construction', year: '2024',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    desc: 'Turnkey construction of a G+1 private villa in Riyadh City from foundation to handover, including all finishing and landscaping.',
    descAr: 'إنشاء فيلا خاصة أرضي وطابق في مدينة الرياض من الأساس حتى التسليم، شاملًا جميع أعمال التشطيب وتنسيق المناظر الطبيعية.',
  },
  {
    name: 'Office & Warehouse Fit-Out', nameAr: 'تشطيب مكتب ومستودع',
    location: 'Riyadh City, Abu Dhabi', category: 'Renovation', year: '2023',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    desc: 'Fit-out of a 1,800 sqm industrial unit: office partition, false ceiling, HVAC installation, flooring, and warehouse racking.',
    descAr: 'تشطيب وحدة صناعية بمساحة 1,800 متر مربع: قسم مكتبي وأسقف معلقة وتكييف هواء وأرضيات ورفوف المستودع.',
  },
  {
    name: 'Residential Building — 18 Apartments', nameAr: 'مبنى سكني — 18 شقة',
    location: 'Riyadh City, Abu Dhabi', category: 'Construction', year: '2023',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    desc: 'Construction of an 18-apartment G+4 residential building with basement parking, rooftop utilities, and full MEP fit-out.',
    descAr: 'إنشاء مبنى سكني من 18 شقة بارتفاع أرضي + 4 طوابق مع موقف سيارات تحت الأرض ومرافق السطح وتشطيب MEP كامل.',
  },
  {
    name: 'Electrical & Plumbing Upgrade', nameAr: 'ترقية الكهرباء والسباكة',
    location: 'Riyadh City, Abu Dhabi', category: 'MEP', year: '2023',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    desc: 'Full electrical rewiring, distribution panel replacement, plumbing upgrade and fire-alarm installation across a 10-unit apartment block.',
    descAr: 'إعادة التوصيل الكهربائي الكامل واستبدال لوحة التوزيع وترقية السباكة وتركيب إنذار الحريق في مبنى من 10 شقق.',
  },
  {
    name: 'Preventive Maintenance Contract', nameAr: 'عقد الصيانة الوقائية',
    location: 'Riyadh City, Abu Dhabi', category: 'Maintenance', year: '2024',
    img: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&q=80',
    desc: 'Multi-year preventive maintenance agreement for a residential compound of 30 villas — covering all building systems, landscaping, and 24/7 emergency response.',
    descAr: 'اتفاقية صيانة وقائية متعددة السنوات لمجمع سكني من 30 فيلا — تشمل جميع أنظمة المبنى وتنسيق الحدائق والاستجابة الطارئة على مدار الساعة.',
  },
];

const FILTERS: { label: string; labelAr: string; value: Category | 'All' }[] = [
  { label: 'All', labelAr: 'الكل', value: 'All' },
  { label: 'Construction', labelAr: 'البناء', value: 'Construction' },
  { label: 'Renovation', labelAr: 'التجديد', value: 'Renovation' },
  { label: 'Maintenance', labelAr: 'الصيانة', value: 'Maintenance' },
  { label: 'Civil Works', labelAr: 'الأعمال المدنية', value: 'Civil Works' },
  { label: 'MEP', labelAr: 'ميكانيكا وكهرباء', value: 'MEP' },
];

const CAT_COLORS: Record<string, string> = {
  Construction: 'bg-blue-900/50 text-blue-300',
  Renovation: 'bg-amber-900/50 text-amber-300',
  Maintenance: 'bg-green-900/50 text-green-300',
  'Civil Works': 'bg-purple-900/50 text-purple-300',
  MEP: 'bg-red-900/50 text-red-300',
};

export default function Projects() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

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
            {t('projects.pageTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-gold font-inter"
          >
            {t('projects.pageSubtitle')}
          </motion.p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="bg-charcoal-light border-b border-white/10 sticky top-16 md:top-20 z-20">
        <div className="container-custom overflow-x-auto">
          <div className="flex gap-2 py-4 min-w-max">
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value as Category | 'All')}
                className={`px-5 py-2 rounded-full font-inter text-sm font-medium transition-all ${
                  filter === f.value
                    ? 'bg-gold text-charcoal shadow-lg shadow-gold/20'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                {isAr ? f.labelAr : f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <Section className="section-padding">
        <div className="container-custom">
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filtered.map((project, i) => (
                <motion.div
                  key={project.name}
                  layout
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(201,168,76,0.25)' }}
                  onClick={() => setSelected(project)}
                  className="rounded-2xl overflow-hidden bg-charcoal-light border border-white/5 hover:border-gold/30 cursor-pointer group"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.img}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-gold font-inter text-sm font-medium">{t('projects.viewDetails')} →</span>
                    </div>
                    <span className={`absolute top-3 start-3 text-xs font-inter font-semibold px-3 py-1 rounded-full ${CAT_COLORS[project.category] ?? 'bg-white/10 text-white'}`}>
                      {project.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className={`text-white font-semibold mb-2 ${isAr ? 'font-arabic' : 'font-inter'}`}>
                      {isAr ? project.nameAr : project.name}
                    </h3>
                    <div className={`flex items-center gap-4 text-white/50 text-xs font-inter ${isAr ? 'flex-row-reverse' : ''}`}>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {project.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </Section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-charcoal-light rounded-2xl overflow-hidden max-w-2xl w-full border border-gold/20 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 end-4 w-9 h-9 bg-charcoal/80 rounded-full flex items-center justify-center text-white hover:bg-gold hover:text-charcoal transition-all"
                >
                  <X size={18} />
                </button>
                <span className={`absolute bottom-4 start-4 text-xs font-inter font-semibold px-3 py-1 rounded-full ${CAT_COLORS[selected.category] ?? 'bg-white/10 text-white'}`}>
                  {selected.category}
                </span>
              </div>
              <div className="p-6">
                <h2 className={`text-2xl font-bold text-white mb-2 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
                  {isAr ? selected.nameAr : selected.name}
                </h2>
                <div className={`flex flex-wrap gap-4 text-white/50 text-sm font-inter mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {selected.location}</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {selected.year}</span>
                  <span className="flex items-center gap-1"><Tag size={14} /> {selected.category}</span>
                </div>
                <p className="text-white/80 font-inter leading-relaxed">
                  {isAr ? selected.descAr : selected.desc}
                </p>
                <button
                  onClick={() => setSelected(null)}
                  className="mt-6 px-6 py-2 border border-gold/40 text-gold hover:bg-gold hover:text-charcoal rounded-full font-inter text-sm transition-all"
                >
                  {t('projects.close')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

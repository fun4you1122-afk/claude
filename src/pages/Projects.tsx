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
  {
    name: 'Luxury Villa Renovation', nameAr: 'تجديد فيلا فاخرة',
    location: 'Khalifa City, Abu Dhabi', category: 'Renovation', year: '2024',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    desc: 'Complete interior renovation of a 5-bedroom villa including kitchen remodel, bathroom upgrades, and full fit-out.',
    descAr: 'تجديد داخلي كامل لفيلا من 5 غرف نوم يشمل تجديد المطبخ والحمامات والتشطيب الكامل.',
  },
  {
    name: 'Commercial Tower Construction', nameAr: 'إنشاء برج تجاري',
    location: 'Musaffah Industrial Area', category: 'Construction', year: '2023',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    desc: 'Ground-up construction of a 12-storey commercial building with full MEP integration and basement parking.',
    descAr: 'بناء مبنى تجاري من 12 طابقًا من الصفر مع تكامل ميكانيكا وكهرباء وسباكة كامل وموقف سيارات بالقبو.',
  },
  {
    name: 'Corporate Office Fit-Out', nameAr: 'تشطيب مكتب شركة',
    location: 'Al Reem Island, Abu Dhabi', category: 'Renovation', year: '2024',
    img: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&q=80',
    desc: 'Full fit-out of 2,500 sqm corporate office space with open-plan workstations, executive suites, and conference rooms.',
    descAr: 'تشطيب كامل لمساحة مكتبية بمساحة 2,500 متر مربع تشمل محطات عمل مفتوحة وجناح تنفيذي وقاعات مؤتمرات.',
  },
  {
    name: 'MEP Infrastructure Upgrade', nameAr: 'ترقية البنية التحتية للميكانيكا والكهرباء',
    location: 'Mussafah, Abu Dhabi', category: 'MEP', year: '2023',
    img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80',
    desc: 'Complete MEP systems replacement across a 50,000 sqm industrial facility including HVAC, electrical and fire systems.',
    descAr: 'استبدال كامل لأنظمة الميكانيكا والكهرباء والسباكة في منشأة صناعية بمساحة 50,000 متر مربع.',
  },
  {
    name: 'Al Ain Road & Civil Works', nameAr: 'طرق وأعمال مدنية العين',
    location: 'Al Ain, UAE', category: 'Civil Works', year: '2022',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    desc: 'Construction of 8km dual carriageway with drainage, lighting, landscaping and underground utility works.',
    descAr: 'إنشاء طريق مزدوج بطول 8 كيلومترات مع الصرف والإضاءة وتنسيق المناظر الطبيعية وأعمال المرافق الأرضية.',
  },
  {
    name: 'Hotel Maintenance Contract', nameAr: 'عقد صيانة فندق',
    location: 'Corniche Road, Abu Dhabi', category: 'Maintenance', year: '2024',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    desc: 'Annual comprehensive maintenance contract for a 5-star hotel including all building systems and preventive programs.',
    descAr: 'عقد صيانة شامل سنوي لفندق خمس نجوم يشمل جميع أنظمة المبنى والبرامج الوقائية.',
  },
  {
    name: 'Residential Complex Construction', nameAr: 'إنشاء مجمع سكني',
    location: 'Mohammed Bin Zayed City', category: 'Construction', year: '2022',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    desc: 'Development of 48-unit residential complex with shared amenities, swimming pool, and underground parking.',
    descAr: 'تطوير مجمع سكني من 48 وحدة مع مرافق مشتركة وحمام سباحة وموقف سيارات تحت الأرض.',
  },
  {
    name: 'Retail Space Renovation', nameAr: 'تجديد مساحة تجارية',
    location: 'Abu Dhabi Mall', category: 'Renovation', year: '2023',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    desc: 'Complete renovation of 1,200 sqm retail flagship store with custom joinery, lighting design, and flooring.',
    descAr: 'تجديد كامل لمتجر رئيسي بمساحة 1,200 متر مربع مع نجارة مخصصة وتصميم إضاءة وأرضيات.',
  },
  {
    name: 'Electrical Substation Works', nameAr: 'أعمال المحطة الفرعية الكهربائية',
    location: 'ADNOC Campus, Abu Dhabi', category: 'MEP', year: '2023',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    desc: 'Installation and commissioning of high-voltage electrical substation including all associated civil works.',
    descAr: 'تركيب وتشغيل محطة كهربائية عالية الجهد تشمل جميع الأعمال المدنية المرتبطة بها.',
  },
  {
    name: 'Stormwater & Drainage System', nameAr: 'نظام مياه الأمطار والصرف',
    location: 'Khalifa Port Area', category: 'Civil Works', year: '2022',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
    desc: 'Design and construction of stormwater management and drainage network across 200,000 sqm industrial zone.',
    descAr: 'تصميم وإنشاء شبكة إدارة مياه الأمطار والصرف في منطقة صناعية بمساحة 200,000 متر مربع.',
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

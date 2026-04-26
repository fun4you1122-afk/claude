import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle, MessageSquare, Instagram } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.section ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.section>
  );
}

const SERVICES_OPTIONS = [
  'General Construction',
  'Renovation & Fit-Out',
  'General Maintenance',
  'MEP Works',
  'Civil Works & Infrastructure',
  'Project Management',
  'Other',
];

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const CONTACT_ITEMS = [
  { icon: MapPin, titleKey: 'contact.locationTitle', value: 'Abu Dhabi, United Arab Emirates', valueAr: 'أبوظبي، الإمارات العربية المتحدة' },
  { icon: Phone, titleKey: 'contact.phoneTitle', value: '+971 56 378 0707', valueAr: '+971 56 378 0707' },
  { icon: Mail, titleKey: 'contact.emailTitle', value: 'info@albinaaalareeq.ae', valueAr: 'info@albinaaalareeq.ae' },
  { icon: Clock, titleKey: 'contact.hoursTitle', value: 'Sun – Thu: 8:00 AM – 6:00 PM', valueAr: 'الأحد – الخميس: 8:00 ص – 6:00 م' },
];

export default function Contact() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [form, setForm] = useState<FormData>({ name: '', company: '', phone: '', email: '', service: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.service) e.service = 'Required';
    if (!form.message.trim()) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputClass = (field: keyof FormData) =>
    `w-full bg-charcoal border rounded-xl px-4 py-3 text-white font-inter text-sm placeholder-white/30 outline-none transition-all focus:border-gold ${
      errors[field] ? 'border-red-500' : 'border-white/10 hover:border-white/20'
    } ${isAr ? 'text-right' : 'text-left'}`;

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
            {t('contact.pageTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-gold font-inter"
          >
            {t('contact.pageSubtitle')}
          </motion.p>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-custom grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <Section className="lg:col-span-3">
            <motion.div variants={fadeUp} className="glass rounded-2xl p-8 border border-gold/10">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="text-gold" size={40} />
                  </motion.div>
                  <h3 className={`text-2xl font-bold text-white mb-3 ${isAr ? 'font-arabic' : 'font-playfair'}`}>
                    {t('contact.formSuccess')}
                  </h3>
                  <p className="text-white/60 font-inter">{t('contact.formSuccessSubtitle')}</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', company: '', phone: '', email: '', service: '', message: '' }); }}
                    className="mt-8 px-6 py-2 border border-gold/40 text-gold hover:bg-gold hover:text-charcoal rounded-full font-inter text-sm transition-all"
                  >
                    {isAr ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className={`block text-white/60 font-inter text-xs mb-1.5 ${isAr ? 'text-right' : ''}`}>
                        {t('contact.formName')} *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder={t('contact.formName')}
                        className={inputClass('name')}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className={`block text-white/60 font-inter text-xs mb-1.5 ${isAr ? 'text-right' : ''}`}>
                        {t('contact.formCompany')}
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        placeholder={t('contact.formCompany')}
                        className={inputClass('company')}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className={`block text-white/60 font-inter text-xs mb-1.5 ${isAr ? 'text-right' : ''}`}>
                        {t('contact.formPhone')} *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+971 56 378 0707"
                        className={inputClass('phone')}
                        dir="ltr"
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className={`block text-white/60 font-inter text-xs mb-1.5 ${isAr ? 'text-right' : ''}`}>
                        {t('contact.formEmail')} *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="email@company.com"
                        className={inputClass('email')}
                        dir="ltr"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className={`block text-white/60 font-inter text-xs mb-1.5 ${isAr ? 'text-right' : ''}`}>
                      {t('contact.formService')} *
                    </label>
                    <select
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      className={`${inputClass('service')} appearance-none`}
                    >
                      <option value="" disabled>{t('contact.formService')}</option>
                      {SERVICES_OPTIONS.map(s => (
                        <option key={s} value={s} className="bg-charcoal">{s}</option>
                      ))}
                    </select>
                    {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
                  </div>

                  <div className="mb-6">
                    <label className={`block text-white/60 font-inter text-xs mb-1.5 ${isAr ? 'text-right' : ''}`}>
                      {t('contact.formMessage')} *
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder={t('contact.formMessage')}
                      className={`${inputClass('message')} resize-none`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gold hover:bg-gold-light text-charcoal font-inter font-bold rounded-xl transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full"
                        />
                        {isAr ? 'جاري الإرسال...' : 'Sending...'}
                      </>
                    ) : t('contact.formSubmit')}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </Section>

          {/* Contact info */}
          <Section className="lg:col-span-2 space-y-6">
            {CONTACT_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`flex items-start gap-4 glass rounded-xl p-5 border border-white/5 ${isAr ? 'flex-row-reverse text-right' : ''}`}
                >
                  <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center flex-none">
                    <Icon className="text-gold" size={18} />
                  </div>
                  <div>
                    <p className="text-white/50 font-inter text-xs mb-1">{t(item.titleKey)}</p>
                    <p className="text-white font-inter text-sm">{isAr ? item.valueAr : item.value}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Instagram */}
            <motion.a
              variants={fadeUp}
              href="https://www.instagram.com/albina.alareeq"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 text-white rounded-xl p-5 font-inter font-semibold transition-all ${isAr ? 'flex-row-reverse justify-end' : ''}`}
            >
              <Instagram size={20} />
              @albina.alareeq
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              variants={fadeUp}
              href="https://wa.me/971563780707"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white rounded-xl p-5 font-inter font-semibold transition-all ${isAr ? 'flex-row-reverse justify-end' : ''}`}
            >
              <MessageSquare size={20} />
              {t('contact.whatsappBtn')}
            </motion.a>

            {/* Map */}
            <motion.div variants={fadeUp} className="rounded-xl overflow-hidden border border-white/10 h-52">
              <iframe
                title="Abu Dhabi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233836.37225208836!2d54.37194594082025!3d24.453884397318956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e440f0f170ab7%3A0x98c3eac529a9c1e3!2sAbu%20Dhabi!5e0!3m2!1sen!2sae!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </Section>
        </div>
      </div>
    </div>
  );
}

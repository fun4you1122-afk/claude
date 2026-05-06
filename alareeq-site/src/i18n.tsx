import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "en" | "ar";

export const translations = {
  en: {
    nav: {
      about: "About", services: "Services", projects: "Projects",
      contact: "Contact", whatsapp: "WhatsApp",
    },
    hero: {
      badge: "Abu Dhabi, UAE",
      h1: "Building", h2: "Excellence", h3: "Across The Emirates",
      arabicName: "البناء العريق للمقاولات والصيانة العامة",
      sub: "Premium contracting & general maintenance — delivering landmark projects across Abu Dhabi with precision, safety, and integrity.",
      cta1: "View Our Projects", cta2: "WhatsApp Us",
      pills: ["General Contracting", "Civil Works", "MEP Services", "Interior Fit-Out"],
      stats: [
        { label: "Active Projects", value: "2" },
        { label: "Projects Delivered", value: "50+" },
        { label: "Years of Excellence", value: "10+" },
      ],
      scroll: "Scroll",
    },
    about: {
      badge: "Who We Are",
      h1: "Crafting Landmarks", h2: "Across", h3: "the Emirates",
      p1: "A UAE-based construction and contracting company delivering high-quality infrastructure and building projects across Abu Dhabi and beyond. We combine modern engineering with deep regional expertise.",
      p2: "From foundations to finishing, our certified team handles every phase with precision, safety, and on-time delivery — building not just structures, but lasting relationships.",
      services: ["General Contracting","Civil Works","MEP Services","Interior Fit-Out","Project Management","Renovation & Maintenance"],
      pillars: [
        { title: "Safety First",      desc: "Zero-compromise on site safety standards across all projects" },
        { title: "On-Time Delivery",  desc: "Milestone-driven project management — always on schedule" },
        { title: "Quality Assured",   desc: "ISO-grade materials and methods, zero shortcuts" },
      ],
      cubeLabels: ["General Contracting", "MEP Services", "Civil Works", "Interior Fit-Out"],
    },
    whyUs: {
      badge: "Why Choose Us",
      h1: "The Albina Alareeq", h2: "Difference",
      sub: "What sets us apart is not just what we build — it's how we build it.",
      reasons: [
        { title: "Safety Culture",        desc: "Zero-compromise on site safety — every worker, every day, every project follows rigorous UAE safety standards." },
        { title: "On-Time Delivery",      desc: "Milestone-driven schedules with transparent reporting. We've never missed a committed deadline." },
        { title: "Certified Excellence",  desc: "ISO-grade materials, certified engineers, and quality-assurance checkpoints at every phase." },
        { title: "Full-Scope Capability", desc: "From civil foundations to MEP systems and interior finishes — one team, end to end." },
        { title: "Dedicated Teams",       desc: "Each project gets a dedicated site manager, engineer, and client liaison. No shared attention." },
        { title: "Proven Track Record",   desc: "50+ completed projects across Abu Dhabi with 100% client satisfaction — our results speak for us." },
      ],
    },
    services: {
      badge: "What We Do", h1: "Our", h2: "Services",
      sub: "Hover each card to explore the full scope of what we offer",
      items: [
        { num: "01", title: "General Contracting",     desc: "Complete construction from groundwork to handover — residential, commercial, and mixed-use projects built to the highest UAE standards.", tags: ["Residential", "Commercial"] },
        { num: "02", title: "Civil Works",             desc: "Structural concrete, deep foundations, earthworks and large-scale infrastructure for urban and industrial projects across Abu Dhabi.", tags: ["Structural", "Foundation"] },
        { num: "03", title: "MEP Services",            desc: "Mechanical, Electrical & Plumbing installations by certified engineers. From HVAC systems to full electrical infrastructure.", tags: ["Electrical", "HVAC", "Plumbing"] },
        { num: "04", title: "Interior Fit-Out",        desc: "Premium interior contracting and bespoke finishing works for luxury residences, offices, retail spaces, and hospitality venues.", tags: ["Luxury", "Bespoke"] },
        { num: "05", title: "Project Management",      desc: "End-to-end oversight of timelines, budgets, subcontractors, and quality assurance. We manage complexity so you don't have to.", tags: ["Planning", "QA/QC"] },
        { num: "06", title: "Renovation & Maintenance",desc: "Structural renovations, facade upgrades, and scheduled facility maintenance. We breathe new life into existing properties.", tags: ["Renovation", "Upkeep"] },
      ],
    },
    projects: {
      badge: "Active Projects", h1: "Work In", h2: "Progress",
      sub: "Currently delivering two landmark developments across Abu Dhabi",
      inProgress: "In Progress", progressLabel: "Project Progress",
      items: [
        {
          title: "Mohammed Bin Zayed City Development", location: "MBZ City, Abu Dhabi",
          desc: "A major construction undertaking in the heart of MBZ City — one of Abu Dhabi's fastest-growing residential and commercial districts. Delivering modern infrastructure with attention to community living.",
          tags: ["Residential", "Commercial", "Infrastructure"],
        },
        {
          title: "Riyadh City Urban Project", location: "Riyadh City, Abu Dhabi",
          desc: "An ambitious urban development in Riyadh City transforming the area with contemporary construction techniques, blending modern aesthetics with functional design principles.",
          tags: ["Urban", "Mixed-Use", "Civil Works"],
        },
      ],
    },
    gallery: {
      badge: "Our Work", h1: "Built With", h2: "Precision",
      sub: "A glimpse of the craftsmanship and scale we bring to every project. Click any image to explore.",
    },
    testimonials: {
      badge: "Client Voices", h1: "What Our", h2: "Clients Say",
      items: [
        { name: "Mohammed Al Hameli", role: "Real Estate Developer · Abu Dhabi", text: "Albina Alareeq delivered our MBZ City residential complex on time and above quality expectations. Their site management and attention to detail is unmatched in the market." },
        { name: "Sara Al Mansouri",   role: "Business Owner · Abu Dhabi",        text: "The fit-out team transformed our commercial space beautifully. Professional, clean, and zero disruption to our schedule. We'll be using them for all future projects." },
        { name: "Khalid Al Rashidi", role: "Facilities Manager · UAE",           text: "Their general maintenance contract has been a game-changer for our facilities. Fast response times, skilled technicians, and honest pricing. Highly recommended." },
      ],
    },
    stats: {
      badge: "By The Numbers", h1: "Our", h2: "Track Record",
      items: [
        { icon: "🏗️", label: "Projects Completed",   target: 50,  suffix: "+" },
        { icon: "👷", label: "Skilled Professionals", target: 120, suffix: "+" },
        { icon: "📍", label: "Active Projects",        target: 2,   suffix: "" },
        { icon: "🏅", label: "Years of Excellence",   target: 10,  suffix: "+" },
      ],
    },
    cta: {
      badge: "Start Your Project",
      h1: "Let's Build Something", h2: "Remarkable",
      sub: "Bring us your vision. We'll bring the expertise, the team, and the commitment to make it stand — built to last, built with pride.",
      btn1: "WhatsApp Us Now", btn2: "Send an Email",
    },
    faq: {
      badge: "FAQ", h1: "Common", h2: "Questions",
      items: [
        { q: "What types of projects does Albina Alareeq handle?",        a: "We handle residential, commercial, and mixed-use construction across Abu Dhabi — from civil works and structural builds to MEP installations, interior fit-outs, and ongoing general maintenance." },
        { q: "Are you currently accepting new projects?",                  a: "Yes. We are actively taking on new projects in Abu Dhabi and surrounding Emirates. Contact us via WhatsApp or email to discuss your requirements and timeline." },
        { q: "How do you ensure quality on-site?",                         a: "Every project is supervised by a dedicated site engineer with daily quality checkpoints. We use certified materials that meet UAE municipality standards and conduct third-party inspections at key milestones." },
        { q: "Do you provide maintenance services after project completion?",a: "Yes. General maintenance is a core service we offer — including preventive maintenance contracts, emergency repairs, and facility management support." },
        { q: "What is your typical project timeline?",                     a: "Timelines vary based on scope and complexity. After an initial consultation we provide a detailed milestone schedule. We are known for meeting — and often beating — agreed deadlines." },
        { q: "How can I get a quote?",                                      a: "Reach us on WhatsApp at +971 56 378 07 07 or email albina.alareeq@gmail.com with your project details. We respond within 24 hours with an initial assessment." },
      ],
    },
    contact: {
      badge: "Get In Touch", h1: "Start Your", h2: "Project", h3: "Today",
      sub: "Reach out — we respond within 24 hours",
      channels: [
        { label: "WhatsApp Chat Line", hint: "Tap to chat now →" },
        { label: "Email",              hint: "Reply within 24 hours →" },
        { label: "Instagram",          hint: "Follow our projects →" },
        { label: "Location",           hint: "Serving the entire UAE" },
      ],
      formTitle: "Send a Message",
      fields: [
        { label: "Full Name",  type: "text",  placeholder: "Your full name",    required: true },
        { label: "Email",      type: "email", placeholder: "your@email.com",    required: true },
        { label: "Phone",      type: "tel",   placeholder: "+971 XX XXX XXXX",  required: false },
      ],
      serviceLabel: "Service Needed", servicePlaceholder: "Select a service...",
      serviceOptions: ["General Contracting","Civil Works","MEP Services","Interior Fit-Out","Project Management","Renovation & Maintenance"],
      msgLabel: "Message", msgPlaceholder: "Tell us about your project...",
      send: "Send Message", sending: "Sending...",
      successTitle: "Message Sent!",
      successMsg: "Our team will contact you within 24 hours. For urgent matters, chat on",
      successLink: "WhatsApp",
      orMsg: "Or message directly on",
    },
    partners: { badge: "Trusted & Recognized By" },
    footer: {
      desc: "Building excellence across the UAE. Premium contracting, civil works, and general maintenance delivered with integrity.",
      servicesTitle: "Services",
      contactTitle: "Contact",
      copyright: "© 2025 البناء العريق للمقاولات والصيانة العامة — Albina Alareeq Contracting & General Maintenance",
      services: ["General Contracting","Civil Works","MEP Services","Interior Fit-Out","Project Management"],
    },
    waFab: "Chat on WhatsApp",
  },

  ar: {
    nav: {
      about: "من نحن", services: "خدماتنا", projects: "مشاريعنا",
      contact: "تواصل معنا", whatsapp: "واتساب",
    },
    hero: {
      badge: "أبوظبي، الإمارات",
      h1: "نبني", h2: "التميز", h3: "في جميع أنحاء الإمارات",
      arabicName: "البناء العريق للمقاولات والصيانة العامة",
      sub: "مقاولات متميزة وصيانة عامة شاملة — تسليم مشاريع بارزة في أبوظبي بدقة واحترافية ونزاهة.",
      cta1: "استعرض مشاريعنا", cta2: "تواصل عبر واتساب",
      pills: ["مقاولات عامة", "أعمال مدنية", "خدمات MEP", "تشطيبات داخلية"],
      stats: [
        { label: "مشاريع نشطة",      value: "٢" },
        { label: "مشاريع منجزة",      value: "+٥٠" },
        { label: "سنوات من التميز",    value: "+١٠" },
      ],
      scroll: "تمرير",
    },
    about: {
      badge: "من نحن",
      h1: "نصنع معالم", h2: "في", h3: "الإمارات",
      p1: "شركة إماراتية متخصصة في البناء والمقاولات، تقدم مشاريع بنية تحتية ومباني عالية الجودة في أبوظبي وما وراءها. نجمع بين الهندسة الحديثة والخبرة الإقليمية العميقة.",
      p2: "من الأساسات حتى التشطيبات، يتولى فريقنا المعتمد كل مرحلة بدقة وسلامة وتسليم في الموعد — نبني ليس فقط المنشآت، بل علاقات دائمة.",
      services: ["مقاولات عامة","أعمال مدنية","خدمات MEP","تشطيبات داخلية","إدارة المشاريع","تجديد وصيانة"],
      pillars: [
        { title: "السلامة أولاً",     desc: "معايير سلامة صارمة بلا تنازل في جميع المواقع" },
        { title: "التسليم في الموعد", desc: "جداول مدفوعة بالأهداف — دائماً في الوقت المحدد" },
        { title: "جودة معتمدة",       desc: "مواد وأساليب بمستوى ISO، لا اختصارات" },
      ],
      cubeLabels: ["مقاولات عامة", "خدمات MEP", "أعمال مدنية", "تشطيبات داخلية"],
    },
    whyUs: {
      badge: "لماذا نحن",
      h1: "الفرق الذي يصنعه", h2: "البناء العريق",
      sub: "ما يميزنا ليس فقط ما نبنيه — بل كيف نبنيه.",
      reasons: [
        { title: "ثقافة السلامة",       desc: "لا تنازل عن سلامة الموقع — كل عامل وكل يوم وكل مشروع وفق معايير السلامة الإماراتية الصارمة." },
        { title: "التسليم في الموعد",   desc: "جداول زمنية مدفوعة بالمراحل وتقارير شفافة. لم نتأخر عن موعد التزمنا به قط." },
        { title: "التميز المعتمد",      desc: "مواد بمستوى ISO، مهندسون معتمدون، ونقاط ضمان الجودة في كل مرحلة." },
        { title: "قدرات شاملة",         desc: "من الأساسات المدنية إلى أنظمة MEP والتشطيبات الداخلية — فريق واحد من البداية للنهاية." },
        { title: "فرق مخصصة",           desc: "كل مشروع يحصل على مدير موقع ومهندس ومنسق عميل مخصصين. لا تشتت في الاهتمام." },
        { title: "سجل حافل بالإنجازات", desc: "أكثر من 50 مشروعاً مكتملاً في أبوظبي برضا عملاء 100% — نتائجنا تتحدث عنا." },
      ],
    },
    services: {
      badge: "ما نقدمه", h1: "خدماتنا", h2: "",
      sub: "مرر على كل بطاقة لاستكشاف النطاق الكامل لما نقدمه",
      items: [
        { num: "٠١", title: "مقاولات عامة",    desc: "بناء متكامل من الحفر حتى التسليم — مشاريع سكنية وتجارية ومتعددة الاستخدام وفق أعلى المعايير الإماراتية.", tags: ["سكني", "تجاري"] },
        { num: "٠٢", title: "أعمال مدنية",     desc: "خرسانة إنشائية وأساسات عميقة وأعمال ترابية وبنية تحتية واسعة النطاق للمشاريع الحضرية والصناعية.", tags: ["إنشائي", "أساسات"] },
        { num: "٠٣", title: "خدمات MEP",       desc: "تركيبات ميكانيكية وكهربائية وصحية بواسطة مهندسين معتمدين — من أنظمة HVAC إلى البنية التحتية الكهربائية الكاملة.", tags: ["كهرباء", "HVAC", "سباكة"] },
        { num: "٠٤", title: "تشطيبات داخلية", desc: "مقاولات داخلية متميزة وأعمال تشطيب راقية للمساكن الفاخرة والمكاتب والمحلات وقطاع الضيافة.", tags: ["فاخر", "مخصص"] },
        { num: "٠٥", title: "إدارة المشاريع", desc: "إشراف شامل على الجداول والميزانيات والمقاولين الفرعيين وضمان الجودة. ندير التعقيد نيابةً عنك.", tags: ["تخطيط", "QA/QC"] },
        { num: "٠٦", title: "تجديد وصيانة",   desc: "تجديدات إنشائية وتحسينات واجهات وصيانة دورية للمرافق — نمنح العقارات القائمة روحاً جديدة.", tags: ["تجديد", "صيانة"] },
      ],
    },
    projects: {
      badge: "المشاريع النشطة", h1: "أعمال", h2: "جارية",
      sub: "ننفذ حالياً مشروعَين بارزَين في أبوظبي",
      inProgress: "قيد التنفيذ", progressLabel: "تقدم المشروع",
      items: [
        {
          title: "مشروع تطوير مدينة محمد بن زايد", location: "مدينة MBZ، أبوظبي",
          desc: "مشروع إنشائي كبير في قلب مدينة محمد بن زايد — أحد أسرع الأحياء السكنية والتجارية نمواً في أبوظبي. تسليم بنية تحتية حديثة مع الاهتمام بجودة الحياة المجتمعية.",
          tags: ["سكني", "تجاري", "بنية تحتية"],
        },
        {
          title: "مشروع مدينة الرياض الحضري", location: "مدينة الرياض، أبوظبي",
          desc: "مشروع تطوير حضري طموح في مدينة الرياض يحوّل المنطقة باستخدام أساليب بناء معاصرة، تجمع بين الجماليات العصرية ومبادئ التصميم الوظيفي.",
          tags: ["حضري", "متعدد الاستخدام", "أعمال مدنية"],
        },
      ],
    },
    gallery: {
      badge: "أعمالنا", h1: "مبني بـ", h2: "دقة",
      sub: "لمحة عن الحرفية والحجم الذي نضفيه على كل مشروع. انقر على أي صورة للاستكشاف.",
    },
    testimonials: {
      badge: "آراء العملاء", h1: "ما يقوله", h2: "عملاؤنا",
      items: [
        { name: "محمد الحاملي",  role: "مطور عقاري · أبوظبي", text: "سلّم البناء العريق مجمعنا السكني في مدينة محمد بن زايد في الموعد المحدد وبجودة فاقت التوقعات. إدارة موقعهم واهتمامهم بالتفاصيل لا مثيل لها في السوق." },
        { name: "سارة المنصوري", role: "صاحبة عمل · أبوظبي",  text: "فريق التشطيبات حوّل مساحتنا التجارية بشكل رائع. احترافية وأناقة ونظافة وبلا إرباك لجدولنا. سنتعاون معهم في جميع مشاريعنا المستقبلية." },
        { name: "خالد الراشدي", role: "مدير مرافق · الإمارات",  text: "عقد الصيانة العامة معهم كان نقلة نوعية لمرافقنا. أوقات استجابة سريعة وفنيون مهرة وأسعار شفافة. أنصح بهم بشدة." },
      ],
    },
    stats: {
      badge: "بالأرقام", h1: "سجلنا", h2: "الحافل",
      items: [
        { icon: "🏗️", label: "مشاريع منجزة",   target: 50,  suffix: "+" },
        { icon: "👷", label: "متخصص ماهر",       target: 120, suffix: "+" },
        { icon: "📍", label: "مشاريع نشطة",      target: 2,   suffix: "" },
        { icon: "🏅", label: "سنوات من التميز",  target: 10,  suffix: "+" },
      ],
    },
    cta: {
      badge: "ابدأ مشروعك",
      h1: "لنبني معاً شيئاً", h2: "استثنائياً",
      sub: "أحضر لنا رؤيتك. سنجلب الخبرة والفريق والالتزام لجعله واقعاً — مبني ليدوم، مبني بفخر.",
      btn1: "راسلنا عبر واتساب", btn2: "أرسل بريداً إلكترونياً",
    },
    faq: {
      badge: "الأسئلة الشائعة", h1: "أسئلة", h2: "متكررة",
      items: [
        { q: "ما أنواع المشاريع التي يتولاها البناء العريق؟",        a: "نتولى مشاريع سكنية وتجارية ومتعددة الاستخدام في أبوظبي — من الأعمال المدنية والإنشاءات الهيكلية إلى تركيبات MEP والتشطيبات الداخلية والصيانة العامة الدورية." },
        { q: "هل تقبلون مشاريع جديدة حالياً؟",                       a: "نعم. نرحب بالمشاريع الجديدة في أبوظبي والإمارات المجاورة. تواصل معنا عبر واتساب أو البريد الإلكتروني لمناقشة متطلباتك وجدولك الزمني." },
        { q: "كيف تضمنون الجودة في الموقع؟",                         a: "كل مشروع يشرف عليه مهندس موقع مخصص مع نقاط فحص يومية للجودة. نستخدم مواد معتمدة تستوفي معايير بلدية الإمارات ونجري فحوصات طرف ثالث عند المراحل الرئيسية." },
        { q: "هل تقدمون خدمات صيانة بعد اكتمال المشروع؟",            a: "نعم. الصيانة العامة خدمة أساسية نقدمها — تشمل عقود الصيانة الوقائية وإصلاح الأعطال الطارئة ودعم إدارة المرافق." },
        { q: "ما الجدول الزمني المعتاد للمشروع؟",                    a: "تتفاوت الجداول حسب النطاق والتعقيد. بعد الاستشارة الأولية نقدم جدولاً تفصيلياً بالمراحل. نحن معروفون بالالتزام بالمواعيد — بل وكثيراً ما ننجزها مبكراً." },
        { q: "كيف أحصل على عرض سعر؟",                                a: "تواصل معنا عبر واتساب على ‎+971 56 378 07 07 أو بالبريد الإلكتروني albina.alareeq@gmail.com مع تفاصيل مشروعك. نرد خلال 24 ساعة بتقييم أولي." },
      ],
    },
    contact: {
      badge: "تواصل معنا", h1: "ابدأ", h2: "مشروعك", h3: "اليوم",
      sub: "تواصل معنا — نرد خلال 24 ساعة",
      channels: [
        { label: "خط واتساب",           hint: "← اضغط للدردشة الآن" },
        { label: "البريد الإلكتروني",   hint: "← رد خلال 24 ساعة" },
        { label: "إنستغرام",            hint: "← تابع مشاريعنا" },
        { label: "الموقع",              hint: "نخدم الإمارات بأكملها" },
      ],
      formTitle: "أرسل رسالة",
      fields: [
        { label: "الاسم الكامل",        type: "text",  placeholder: "اسمك الكامل",          required: true },
        { label: "البريد الإلكتروني",   type: "email", placeholder: "your@email.com",        required: true },
        { label: "الهاتف",              type: "tel",   placeholder: "XXXX XXX XX 971+",      required: false },
      ],
      serviceLabel: "الخدمة المطلوبة", servicePlaceholder: "اختر خدمة...",
      serviceOptions: ["مقاولات عامة","أعمال مدنية","خدمات MEP","تشطيبات داخلية","إدارة المشاريع","تجديد وصيانة"],
      msgLabel: "الرسالة", msgPlaceholder: "أخبرنا عن مشروعك...",
      send: "إرسال الرسالة", sending: "جارٍ الإرسال...",
      successTitle: "تم إرسال رسالتك!",
      successMsg: "سيتواصل معك فريقنا خلال 24 ساعة. للأمور العاجلة، تواصل عبر",
      successLink: "واتساب",
      orMsg: "أو تواصل مباشرة عبر",
    },
    partners: { badge: "موثوق به ومعترف به من" },
    footer: {
      desc: "نبني التميز في جميع أنحاء الإمارات. مقاولات متميزة وأعمال مدنية وصيانة عامة شاملة بنزاهة.",
      servicesTitle: "الخدمات",
      contactTitle: "تواصل معنا",
      copyright: "© 2025 البناء العريق للمقاولات والصيانة العامة — Albina Alareeq Contracting & General Maintenance",
      services: ["مقاولات عامة","أعمال مدنية","خدمات MEP","تشطيبات داخلية","إدارة المشاريع"],
    },
    waFab: "الدردشة عبر واتساب",
  },
} as const;

export type Translations = typeof translations.en;

interface LangCtx {
  lang: Lang;
  t: Translations;
  toggle: () => void;
}

const LangContext = createContext<LangCtx>({
  lang: "en",
  t: translations.en,
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = () => setLang((l) => (l === "en" ? "ar" : "en"));
  return (
    <LangContext.Provider value={{ lang, t: translations[lang] as Translations, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { MapPin } from "lucide-react";
import { useRef } from "react";

interface Project {
  title: string; location: string; desc: string;
  progress: number; tags: string[]; color: string; image: string;
}

const projects: Project[] = [
  {
    title: "Mohammed Bin Zayed City Development",
    location: "MBZ City, Abu Dhabi",
    desc: "A major construction undertaking in the heart of MBZ City — one of Abu Dhabi's fastest-growing residential and commercial districts. Delivering modern infrastructure with attention to community living.",
    progress: 68,
    tags: ["Residential", "Commercial", "Infrastructure"],
    color: "from-[#0d1530] to-[#1a2540]",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Riyadh City Urban Project",
    location: "Riyadh City, Abu Dhabi",
    desc: "An ambitious urban development in Riyadh City transforming the area with contemporary construction techniques, blending modern aesthetics with functional design principles.",
    progress: 42,
    tags: ["Urban", "Mixed-Use", "Civil Works"],
    color: "from-[#100f20] to-[#1a1530]",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
  },
];

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: delay > 0 ? 80 : -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: delay * 0.1 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group overflow-hidden rounded-2xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.7)] backdrop-blur transition-shadow hover:shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
    >
      {/* Visual panel — real construction photo */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Status badge */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--background)/0.85)] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--primary))] backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
          In Progress
        </div>

        {/* Location */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-medium text-white/80 uppercase tracking-wider">
          <MapPin className="h-3.5 w-3.5" />
          {project.location}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-6">
        <h3 className="font-serif text-xl font-bold leading-snug">{project.title}</h3>
        <p className="text-sm leading-relaxed text-[hsl(var(--foreground)/0.55)]">{project.desc}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full border border-[hsl(var(--primary)/0.25)] bg-[hsl(var(--primary)/0.08)] px-3 py-1 text-xs text-[hsl(var(--primary))]">
              {t}
            </span>
          ))}
        </div>

        {/* Progress */}
        <div className="pt-2">
          <div className="mb-2 flex justify-between text-xs text-[hsl(var(--foreground)/0.5)]">
            <span>Project Progress</span>
            <motion.span
              className="font-bold text-[hsl(var(--primary))]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              {project.progress}%
            </motion.span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-[hsl(var(--border))]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#a07820] to-[#c9a84c]"
              initial={{ width: 0 }}
              whileInView={{ width: `${project.progress}%` }}
              transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-28 bg-[hsl(222,40%,6.5%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[hsl(43,56%,55%,0.03)] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-block rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] px-4 py-1.5 text-xs uppercase tracking-[3px] text-[hsl(var(--primary))]">
            Active Projects
          </div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            Work In <span className="gold-gradient">Progress</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[hsl(var(--foreground)/0.5)]">
            Currently delivering two landmark developments across Abu Dhabi
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((p, i) => <ProjectCard key={p.title} project={p} delay={i} />)}
        </div>
      </div>
    </section>
  );
}

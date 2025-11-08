"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, Download, Mail, Linkedin, ImageIcon, Shapes, Wrench, Sparkles, ArrowRight } from "lucide-react";

// ---- Utility components ----
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>
);

const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <div className="mb-8">
    {eyebrow && (
      <div className="mb-2 text-xs tracking-[0.18em] text-teal-300/80 uppercase">
        {eyebrow}
      </div>
    )}
    <h2 className="text-3xl md:text-4xl font-semibold text-zinc-50">{title}</h2>
    {subtitle && (
      <p className="mt-2 max-w-2xl text-zinc-400 leading-relaxed">{subtitle}</p>
    )}
  </div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-zinc-700/80 bg-zinc-900/60 px-2.5 py-1 text-xs text-zinc-300">
    {children}
  </span>
);

const Button = ({ variant = "primary", children, className = "", ...props }) => {
  const base = "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition shadow-sm";
  const variants = {
    primary: "bg-teal-500/90 hover:bg-teal-400 text-zinc-950 font-medium",
    ghost: "bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-200 border border-zinc-800",
    outline: "border border-zinc-700/70 text-zinc-200 hover:bg-zinc-800/40",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// ---- Data ----
const PROJECTS = [
  {
    title: "Batch Export Tool",
    desc: "Automated animation & mesh exports.",
    tags: ["Python", "Maya API"],
    metric: "60% faster export",
    icon: <Wrench className="size-4" />,
  },
  {
    title: "Texture Validator",
    desc: "Checks, fixes, and converts PBR maps.",
    tags: ["FastAPI", "Automation"],
    metric: "1000+ textures validated",
    icon: <Shapes className="size-4" />,
    link: "/texguard",
  },
  {
    title: "Prop Pipeline Utility Scripts",
    desc: "A set of lightweight automation tools (renaming, pivot alignment, UV checking, file structuring)",
    tags: ["Python", "MaxScript", "3DS Max"],
    metric: "Saved hours per asset batch",
    icon: <Wrench className="size-4" />,
  },
  {
    title: "LOD Generator",
    desc: "Houdini setup for modular assets. Pipelines for characters, weapons, and props.",
    tags: ["Houdini", "Tooling"],
    metric: "Efficient tri reduction",
    icon: <Sparkles className="size-4" />,
  },
];

const GALLERY = [
  { title: "Portrait Study", caption: "Lookdev", src: "", ratio: "aspect-[16/9]" },
  { title: "Prop – Tricycle", caption: "Stylized prop", src: "", ratio: "aspect-[16/9]" },
  { title: "Crate Modular", caption: "LOD0 vs LOD3 – 73%", src: "", ratio: "aspect-[16/9]" },
];

// ---- Cards ----
const ProjectCard = ({ item }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="group rounded-2xl border border-zinc-800/70 bg-zinc-900/40 p-5 backdrop-blur-sm shadow-sm"
  >
    <div className="mb-3 flex items-center gap-2 text-teal-300">
      {item.icon}
      <span className="text-sm tracking-wide">{item.metric}</span>
    </div>
    <h3 className="text-lg font-semibold text-zinc-50">{item.title}</h3>
    <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
    <div className="mt-3 flex flex-wrap gap-2">
      {item.tags.map((t) => (
        <Pill key={t}>{t}</Pill>
      ))}
    </div>
    {item.link && (
      <div className="mt-4 flex justify-end">
        <a href={item.link} target="_blank" rel="noreferrer">
          <Button variant="ghost" className="group-hover:-translate-y-0.5 transition">
            Learn more <ArrowRight className="size-4" />
          </Button>
        </a>
      </div>
    )}
  </motion.div>
);

const GalleryItem = ({ item }) => (
  <motion.div whileHover={{ scale: 1.01 }} className={`relative overflow-hidden rounded-2xl ${item.ratio} bg-zinc-800/50`}> 
    <div className="absolute inset-0 grid place-items-center text-zinc-500">
      <ImageIcon className="size-8" />
      <span className="sr-only">{item.title}</span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
      <div className="text-sm font-medium text-zinc-100">{item.title}</div>
      <div className="text-xs text-zinc-300/80">{item.caption}</div>
    </div>
  </motion.div>
);

const HighlightCard = ({ icon, title, children }) => (
  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
    <div className="mb-2 flex items-center gap-2 text-teal-300">
      {icon}
      <span className="text-sm uppercase tracking-wider">{title}</span>
    </div>
    <p className="text-sm text-zinc-300 leading-relaxed">{children}</p>
  </div>
);

export default function Portfolio() {
  const glowRef = useRef(null);
  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      if (glowRef.current) glowRef.current.style.transform = `translateY(${y * 0.15}px)`;
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0F12] text-zinc-200 antialiased selection:bg-teal-500/30">
      {/* Subtle gradient glow */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(600px 600px at 20% 10%, rgba(80,193,184,0.25), transparent 60%), radial-gradient(600px 600px at 80% 20%, rgba(229,139,109,0.18), transparent 60%)",
        }}
      />

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/70 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
        <Container className="flex h-16 items-center justify-between">
          <nav className="flex items-center gap-8 text-sm text-zinc-300">
            <a href="#home" className="hover:text-zinc-100">Home</a>
            <a href="#tools" className="hover:text-zinc-100">Tools</a>
            <a href="#gallery" className="hover:text-zinc-100">Gallery</a>
            <a href="#why" className="hover:text-zinc-100">Philosophy</a>
            <a href="#footer" className="hover:text-zinc-100">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="/Sinem_Cevik_Technical_Artist_CV.pdf" target="_blank" rel="noreferrer">
              <Button>
                <Download className="size-4" /> Download CV
              </Button>
            </a>
            <a href="https://github.com/sinemsden" target="_blank" rel="noreferrer">
              <Button variant="outline">
                <Github className="size-4" /> View GitHub
              </Button>
            </a>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <section id="home" className="relative py-16 md:py-24">
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="mb-4">
              <h1 className="text-5xl md:text-6xl font-bold text-zinc-50 mb-2">
                SİNEM ÇEVİK
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-teal-400 tracking-wide">
                TECHNICAL ARTIST
              </h2>
            </div>
            <div className="mt-8">
              <h3 className="text-3xl md:text-4xl font-semibold text-zinc-50 leading-tight mb-6">
                Hi Stranger!
              </h3>
              <p className="text-lg text-zinc-300 leading-relaxed max-w-xl">
                I build automation, validation, and optimization systems that let artists focus on creativity, not cleanup. With a background in Computer Science and experience across Maya, Houdini, and in-house engines, I design technical art solutions that scale — transforming slow pipelines into predictable, artist-friendly workflows.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Tooling', 'Automation', 'Shader & Material Systems', 'Cross-Discipline'].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="relative mx-auto">
            {/* Add a subtle glow effect behind the character */}
            <div 
              className="absolute inset-0 blur-3xl" 
              style={{
                background: "radial-gradient(circle at center, rgba(45, 212, 191, 0.15) 0%, transparent 70%)",
                transform: "translate(-25%, -25%) scale(1.5)",
              }}
            />
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative">
                <Image
                  src="/images/avatar.png"
                  alt="Sinem Çevik - Digital Avatar"
                  width={500}
                  height={600}
                  priority
                  className="w-auto h-auto max-h-[600px] select-none relative z-10"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(45, 212, 191, 0.2))' }}
                />
              </div>
              
              {/* Scattered sparks */}
              {[...Array(15)].map((_, i) => {
                const randomRight = 5 + Math.random() * 90;
                const randomBottom = 10 + Math.random() * 80;
                const randomDuration = 2 + Math.random() * 2;
                const randomDelay = Math.random() * 2;
                const randomDistance = -10 - Math.random() * 20;
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-teal-300"
                    style={{
                      right: `${randomRight}%`,
                      bottom: `${randomBottom}%`,
                      zIndex: 20
                    }}
                    animate={{
                      y: [0, randomDistance, 0],
                      x: [0, randomDistance/2, 0],
                      opacity: [0, 0.8, 0],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: randomDuration,
                      delay: randomDelay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div 
                      className="w-full h-full bg-teal-200"
                      style={{
                        filter: 'blur(1px)',
                        boxShadow: '0 0 8px rgba(45, 212, 191, 0.6)'
                      }}
                    />
                  </motion.div>
                );
              })}
              
              {/* Subtle background sparks */}
              {[...Array(8)].map((_, i) => {
                const randomRight = 10 + Math.random() * 80;
                const randomBottom = 15 + Math.random() * 70;
                const randomDuration = 3 + Math.random() * 2;
                const randomDelay = Math.random() * 2;
                
                return (
                  <motion.div
                    key={`bg-spark-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-teal-400/20"
                    style={{
                      right: `${randomRight}%`,
                      bottom: `${randomBottom}%`,
                      filter: 'blur(2px)',
                      zIndex: 5
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0, 0.3, 0],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: randomDuration,
                      delay: randomDelay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* TOOLS & PROJECTS */}
      <section id="tools" className="py-14 md:py-20">
        <Container>
          <SectionHeading eyebrow="SECTION" title="Tools" subtitle="Turning repetition into flow with automation and thoughtful UX." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} item={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-14 md:py-20 border-t border-zinc-800/70">
        <Container>
          <SectionHeading eyebrow="SHOWCASE" title="Art in Motion" subtitle="Selected looks, props, and optimization snapshots." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {GALLERY.map((g, i) => (
              <GalleryItem key={i} item={g} />
            ))}
          </div>
        </Container>
      </section>

      {/* WHY WORK WITH ME */}
      <section id="why" className="py-16 md:py-24 border-t border-zinc-800/70">
        <Container>
          <SectionHeading
            eyebrow="PHILOSOPHY"
            title="Engineer's Discipline, Artist's Intuition"
            subtitle={`Each algorithm I design begins as a spark — shaped by rigor until it glows with purpose. I work where structure learns emotion, where code refines itself into clarity and begins to feel.`}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">Dual Identity</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                My background in Computer Science allows me to approach creative challenges analytically, while my experience as a 3D and Technical Artist gives me the sensitivity to understand what artists need most: <span className="text-zinc-100">clarity, flow, and trust in their tools.</span>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">Professional Core</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li>I thrive in environments where <span className="text-zinc-100">collaboration, autonomy, and problem-solving</span> define the culture.</li>
                <li>I'm known for transforming complex workflows into intuitive systems — whether it's <span className="text-zinc-100">automating exports</span>, building <span className="text-zinc-100">texture validation tools</span>, or bridging communication between art and programming teams.</li>
                <li>I value <span className="text-zinc-100">directness, reliability, and craftsmanship</span> — traits that keep production smooth even as creative demands evolve.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">Balance & Curiosity</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                On a personal level, I bring balance and curiosity. My interests in philosophy, design, and motion help me see connections others miss. To me, technical art isn't just about efficiency — it's about <span className="text-zinc-100">enabling creativity at scale</span>, designing processes that empower others to create more freely.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <HighlightCard icon={<Wrench className="size-4" />} title="The Engineer‑Artist">
              A technical artist who anticipates problems before they appear.
            </HighlightCard>
            <HighlightCard icon={<Mail className="size-4" />} title="The Translator">
              A communicator who connects art, design, and programming effortlessly.
            </HighlightCard>
            <HighlightCard icon={<Shapes className="size-4" />} title="The System Designer">
              A creator who treats every pipeline like a living design system — precise, expressive, and scalable.
            </HighlightCard>
          </div>
          </Container>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="border-t border-zinc-800/70 py-10">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">© 2025 Sinem Çevik — Built with precision and curiosity.</p>
          <div className="flex items-center gap-4 text-sm">
            <a className="hover:text-zinc-100" href="https://www.linkedin.com/in/sinemcevik" target="_blank" rel="noreferrer"><Linkedin className="inline size-4 mr-1"/>LinkedIn</a>
            <a className="hover:text-zinc-100" href="https://github.com/sinemsden" target="_blank" rel="noreferrer"><Github className="inline size-4 mr-1"/>GitHub</a>
            <a className="hover:text-zinc-100" href="https://www.artstation.com/sinemcevik" target="_blank" rel="noreferrer"><ImageIcon className="inline size-4 mr-1"/>ArtStation</a>
            <a className="hover:text-zinc-100" href="mailto:sinemcevik1@gmail.com"><Mail className="inline size-4 mr-1"/>Email</a>
          </div>
        </Container>
      </footer>
    </div>
  );
}

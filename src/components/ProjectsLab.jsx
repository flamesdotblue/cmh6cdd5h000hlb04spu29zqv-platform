import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, CircuitBoard } from 'lucide-react';

function GlassCard({ children, className = '' }) {
  return (
    <div className={`relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.35)] ${className}`}>
      {children}
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, y: 20, rotateX: -8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 140, damping: 18 }} className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <GlassCard className="overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-4 md:p-6 border-b md:border-b-0 md:border-r border-white/10">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-violet-600/30 to-cyan-500/30">
                {/* Faux demo animation */}
                <motion.div initial={{ x: '-30%' }} animate={{ x: ['-30%', '30%', '-20%', '0%'] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }} className="absolute inset-6 rounded-lg border border-white/20 bg-white/10 backdrop-blur" />
                <motion.div initial={{ y: '40%' }} animate={{ y: ['40%', '-20%', '10%'] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', repeatType: 'reverse' }} className="absolute right-6 bottom-6 left-6 h-2 rounded bg-gradient-to-r from-cyan-400/60 to-violet-400/60" />
              </div>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                {project.stack.map((s) => (
                  <span key={s} className="px-2 py-1 rounded-md border border-white/10 bg-white/5 text-zinc-300">{s}</span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 text-sm">
                {project.github && (
                  <a href={project.github} target="_blank" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-white/20">
                    <Github size={16}/> GitHub
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-white/20">
                    <ExternalLink size={16}/> Live
                  </a>
                )}
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export default function ProjectsLab({ focusMode }) {
  const [active, setActive] = useState(null);
  const projects = [
    {
      id: 'sms',
      title: 'Student Management System',
      description: 'Java + SQL desktop app for managing students, courses, attendance, and grading with role-based access.',
      stack: ['Java', 'JDBC', 'SQL', 'Swing'],
      github: 'https://github.com/',
    },
    {
      id: 'tms',
      title: 'Tickets Management System',
      description: 'Java + SQL system that tracks issues, priorities, and workflow states with analytics dashboards.',
      stack: ['Java', 'JDBC', 'SQL', 'JavaFX'],
      github: 'https://github.com/',
    },
    {
      id: 'automation',
      title: 'Flutter + Arduino Automation App (Upcoming)',
      description: 'Control and monitor IoT devices in real-time using Flutter UI with Arduino sensors and Python services.',
      stack: ['Flutter', 'Arduino', 'BLE/MQTT', 'Python'],
      github: 'https://github.com/',
    }
  ];

  return (
    <section id="projects" className="relative px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {!focusMode && (
          <div className="mb-8 flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 text-white">
              <CircuitBoard size={16} />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-white">Projects + Hardware Lab</h2>
              <p className="text-sm text-zinc-400">Open windows to inspect systems — like an OS for Albari\'s work.</p>
            </div>
          </div>
        )}

        {/* Windowed project grid with non-traditional layout */}
        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((p, idx) => (
            <motion.button key={p.id} onClick={() => setActive(p)} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -6, rotateX: 2 }} transition={{ type: 'spring', stiffness: 180, damping: 16 }} className="text-left">
              <GlassCard className="p-4 group">
                <div className="relative h-36 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-500/10 to-violet-600/10 border border-white/10">
                  <motion.div className="absolute inset-0" initial={{ opacity: 0.3 }} whileHover={{ opacity: 0.6 }}>
                    <div className="absolute inset-0 bg-[radial-gradient(600px_120px_at_var(--mx,20%)_-20%,rgba(56,189,248,0.25),transparent),radial-gradient(500px_120px_at_var(--mx,70%)_120%,rgba(139,92,246,0.25),transparent)]" />
                  </motion.div>
                  <div className="absolute inset-3 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10" />
                  <div className="absolute bottom-2 left-2 text-[11px] text-zinc-300">{p.title}</div>
                </div>
                <p className="mt-3 text-sm text-zinc-300 line-clamp-2">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
                  {p.stack.slice(0, 3).map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-zinc-300">{s}</span>
                  ))}
                </div>
              </GlassCard>
            </motion.button>
          ))}
        </div>

        {/* Hardware lab strip */}
        <div className="mt-8 grid lg:grid-cols-3 gap-4">
          <GlassCard className="p-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="text-sm text-zinc-300">Flutter ↔ Device Telemetry</div>
              <div className="text-[10px] text-zinc-400">BLE · MQTT · Serial</div>
            </div>
            <div className="mt-3 grid sm:grid-cols-2 gap-4">
              {/* Realtime dashboard simulation */}
              <div className="rounded-lg border border-white/10 p-3 bg-white/5">
                <div className="text-xs text-zinc-400">Temperature</div>
                <div className="mt-2 h-24 relative">
                  <motion.div initial={{ width: '20%' }} animate={{ width: ['20%', '65%', '35%', '50%'] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} className="absolute bottom-0 left-0 h-24 bg-gradient-to-t from-cyan-500/50 to-cyan-400/20 rounded" />
                </div>
              </div>
              <div className="rounded-lg border border-white/10 p-3 bg-white/5">
                <div className="text-xs text-zinc-400">Humidity</div>
                <div className="mt-2 h-24 relative">
                  <motion.div initial={{ height: '20%' }} animate={{ height: ['20%', '75%', '45%', '60%'] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }} className="absolute bottom-0 right-0 w-10 bg-gradient-to-t from-violet-500/50 to-violet-400/20 rounded" />
                </div>
              </div>
            </div>
            <div className="mt-3 grid sm:grid-cols-3 gap-3 text-[11px] text-zinc-300">
              <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">Packet loss: 0.2%</span>
              <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">Latency: 42ms</span>
              <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">Uptime: 99.8%</span>
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="text-sm text-zinc-300">Control Panel</div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              {['Relay A','Relay B','Fan','LED Strip'].map((l, i) => (
                <button key={l} className="px-2 py-2 rounded-md bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition">{l}: {i % 2 ? 'ON' : 'OFF'}</button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

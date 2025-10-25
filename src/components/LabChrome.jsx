import { useEffect, useRef, useState } from 'react';
import { Rocket, Cpu, Bot, Settings } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function LabChrome({ focusMode, setFocusMode }) {
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const barOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onMove = (e) => {
      if (!cursorRef.current || !glowRef.current) return;
      const x = e.clientX;
      const y = e.clientY;
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      {/* Neon cursor */}
      <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
        <div ref={glowRef} className="absolute -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25),transparent_60%)]" />
        <div ref={cursorRef} className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_2px_rgba(34,211,238,0.8)]" />
      </div>

      {/* Top system bar */}
      {!focusMode && (
        <motion.header style={{ opacity: barOpacity }} className="fixed top-0 left-0 right-0 z-50">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 text-white">
                  <Rocket size={16} />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-zinc-100">Albari Yasir Wahid</p>
                  <p className="text-[11px] text-zinc-400">Flutter • AI • Hardware</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs text-zinc-300">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10"><Cpu size={14}/> AI/ML</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10"><Bot size={14}/> Sandbox</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10"><Settings size={14}/> Systems</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="hidden sm:inline text-zinc-400">Focus Mode</span>
                <button onClick={() => setFocusMode(!focusMode)} className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${focusMode ? 'bg-violet-600' : 'bg-white/10'}`}>
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${focusMode ? 'translate-x-6' : 'translate-x-1'}`}></span>
                </button>
              </div>
            </div>
          </div>
        </motion.header>
      )}

      {/* Ambient background gradient */}
      {mounted && (
        <div className="fixed inset-0 -z-10 opacity-[0.35]">
          <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-3xl bg-violet-600/30" />
          <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full blur-3xl bg-cyan-500/20" />
        </div>
      )}
    </>
  );
}

import { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function useTypeLines(lines, speed = 26, pause = 600) {
  const [output, setOutput] = useState([]);
  useEffect(() => {
    let cancelled = false;
    async function run() {
      const out = [];
      for (const line of lines) {
        let cur = '';
        for (let i = 0; i < line.length; i++) {
          if (cancelled) return;
          cur = line.slice(0, i + 1);
          out[out.length - 1] = cur;
          setOutput([...out]);
          await new Promise(r => setTimeout(r, speed));
        }
        await new Promise(r => setTimeout(r, pause));
        out.push('');
      }
    }
    setOutput(['']);
    run();
    return () => { cancelled = true; };
  }, [lines, speed, pause]);
  return output.filter(Boolean);
}

export default function HomeTerminal({ focusMode }) {
  const lines = useMemo(() => [
    '> Hello, I\'m Albari Yasir Wahid — building the bridge between Flutter, AI, and Hardware.',
    '> Mission: Craft smart systems that respond, not just react.'
  ], []);
  const typed = useTypeLines(lines);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.85]);

  return (
    <section id="home" className="relative min-h-[95vh] grid place-items-center px-4">
      <motion.div style={{ scale, opacity }} className="w-full max-w-5xl mx-auto">
        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_80px_rgba(0,0,0,0.35)] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-gradient-to-b from-white/10 to-transparent">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80"/>
              <span className="w-3 h-3 rounded-full bg-yellow-400/80"/>
              <span className="w-3 h-3 rounded-full bg-green-500/80"/>
            </div>
            <p className="ml-2 text-xs text-zinc-400">/home/albari/terminal</p>
            {!focusMode && <div className="ml-auto text-[10px] text-cyan-300">AI Lab Interface v0.1</div>}
          </div>
          <div className="p-5 sm:p-8 font-mono text-[13px] leading-6">
            {typed.map((l, i) => (
              <div key={i} className="text-zinc-200">
                <span className="text-cyan-300">$</span> <span>{l}</span>
              </div>
            ))}
            <div className="mt-6 text-zinc-400">
              <div>• Flutter + Dart • Python • Java • C/C++ • Arduino • AI/ML • Django</div>
              <div className="mt-2">• Building next-gen interfaces that talk to sensors, models, and people.</div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="px-2 py-1 rounded-md border border-cyan-500/30 text-cyan-300 bg-cyan-500/10">Realtime UI</span>
              <span className="px-2 py-1 rounded-md border border-violet-500/30 text-violet-300 bg-violet-500/10">Edge + Cloud</span>
              <span className="px-2 py-1 rounded-md border border-fuchsia-500/30 text-fuchsia-300 bg-fuchsia-500/10">Human-in-the-loop</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

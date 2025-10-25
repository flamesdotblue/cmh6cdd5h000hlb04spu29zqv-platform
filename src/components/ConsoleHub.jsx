import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Mail, Github } from 'lucide-react';

function Glass({ className = '', children }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.35)] ${className}`}>{children}</div>
  );
}

function AISandbox() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi, I am Albari\'s lab assistant. Ask me about AI + Flutter + Hardware.' }
  ]);
  const [input, setInput] = useState('');

  function replyTo(user) {
    const text = user.toLowerCase();
    if (text.includes('flutter')) return 'Flutter drives the UI; telemetry flows via BLE/MQTT and visualizes in real-time.';
    if (text.includes('arduino') || text.includes('hardware')) return 'Arduino streams sensor data; Python bridges serial to MQTT; safety watchdogs included.';
    if (text.includes('ai') || text.includes('ml')) return 'Models focus on small-on-device classifiers and cloud-backed inference for heavier tasks.';
    if (text.includes('germany') || text.includes('austria')) return 'Goal: pursue an MSc in Germany/Austria focusing on AI systems engineering and HCI.';
    return 'I can talk about Flutter, AI/ML, and hardware integrations. Try asking: "How do you connect Flutter to sensors?"';
  }

  function onSend() {
    if (!input.trim()) return;
    const next = [...messages, { role: 'user', text: input }];
    setMessages(next);
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', text: replyTo(input) }]);
    }, 400);
    setInput('');
  }

  return (
    <Glass className="p-4">
      <div className="flex items-center gap-2 text-sm text-zinc-300">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br from-cyan-500 to-violet-600 text-white"><Bot size={14}/></span>
        AI Sandbox
      </div>
      <div className="mt-3 h-52 overflow-auto space-y-2 pr-1">
        {messages.map((m, i) => (
          <div key={i} className={`text-sm ${m.role === 'bot' ? 'text-cyan-200' : 'text-zinc-200'}`}>• {m.text}</div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && onSend()} placeholder="Ask the lab assistant..." className="flex-1 px-3 py-2 rounded-md bg-white/5 border border-white/10 outline-none focus:border-cyan-400/50"/>
        <button onClick={onSend} className="px-3 py-2 rounded-md bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 hover:bg-cyan-500/30">Send</button>
      </div>
    </Glass>
  );
}

function AboutAndGoals() {
  const skills = useMemo(() => ['C','C++','Java','Flutter','Python','Arduino','AI','ML','Django'], []);
  return (
    <Glass className="p-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-zinc-300">About Me</div>
          <div className="mt-3 text-sm text-zinc-300">Visual timeline of skills</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <div key={s} className="px-2 py-1 rounded-md border border-white/10 bg-white/5 text-[11px] text-zinc-200" style={{ opacity: 0.6 + (i/skills.length)*0.4 }}>{s}</div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm text-zinc-300">Goals Panel</div>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            <li className="px-3 py-2 rounded-md bg-white/5 border border-white/10">Build → polish the Flutter + Arduino Automation app</li>
            <li className="px-3 py-2 rounded-md bg-white/5 border border-white/10">Earn → freelance/remote to fund studies</li>
            <li className="px-3 py-2 rounded-md bg-white/5 border border-white/10">Learn Abroad → MSc in Germany/Austria</li>
            <li className="px-3 py-2 rounded-md bg-white/5 border border-white/10">AI Innovation → human-centered, sensor-aware systems</li>
          </ul>
        </div>
      </div>
    </Glass>
  );
}

function ContactConsole() {
  const [history, setHistory] = useState([
    '> Type send_message("hello@albari.dev", "Let\'s collaborate")'
  ]);
  const [cmd, setCmd] = useState('');
  const ref = useRef(null);

  function parseAndSend(input) {
    const match = input.match(/^\s*send_message\(\s*\"([^\"]+)\"\s*,\s*\"([\s\S]*)\"\s*\)\s*$/);
    if (!match) {
      setHistory((h) => [...h, '$ ' + input, '✖ Unknown command. Try: send_message("hello@albari.dev", "message")']);
      return;
    }
    const [, email, body] = match;
    setHistory((h) => [...h, '$ ' + input, '✓ Opening mail client...']);
    const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Portfolio Contact')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <Glass className="p-4">
      <div className="text-sm text-zinc-300 flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br from-violet-600 to-cyan-500 text-white"><Mail size={14}/></span>
        Contact Console
      </div>
      <div ref={ref} className="mt-3 h-40 overflow-auto font-mono text-[12px] leading-6 bg-black/30 rounded-md p-3 border border-white/10">
        {history.map((line, i) => (
          <div key={i} className="text-zinc-200">{line}</div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={cmd} onChange={(e)=>setCmd(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter'){ parseAndSend(cmd); setCmd(''); } }} placeholder='send_message("hello@albari.dev", "Let\'s collaborate")' className="flex-1 px-3 py-2 rounded-md bg-white/5 border border-white/10 outline-none focus:border-violet-400/50 font-mono text-[12px]"/>
        <button onClick={()=>{ parseAndSend(cmd); setCmd(''); }} className="px-3 py-2 rounded-md bg-violet-500/20 text-violet-200 border border-violet-400/30 hover:bg-violet-500/30">Run</button>
      </div>
      <div className="mt-3 flex items-center gap-3 text-xs text-zinc-400">
        <a href="https://github.com/" target="_blank" className="inline-flex items-center gap-1 hover:text-zinc-200"><Github size={14}/> GitHub</a>
        <a href="mailto:hello@albari.dev" className="inline-flex items-center gap-1 hover:text-zinc-200"><Mail size={14}/> Email</a>
      </div>
    </Glass>
  );
}

export default function ConsoleHub({ focusMode }) {
  return (
    <section id="console" className="relative px-4 py-20">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <AISandbox />
          <AboutAndGoals />
        </div>
        <div className="lg:col-span-1">
          <ContactConsole />
        </div>
      </div>
    </section>
  );
}

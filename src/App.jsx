import { useState } from 'react';
import LabChrome from './components/LabChrome';
import HomeTerminal from './components/HomeTerminal';
import ProjectsLab from './components/ProjectsLab';
import ConsoleHub from './components/ConsoleHub';

function App() {
  const [focusMode, setFocusMode] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#0a0b0f] text-zinc-200 overflow-x-hidden selection:bg-violet-500/40 selection:text-white">
      <LabChrome focusMode={focusMode} setFocusMode={setFocusMode} />
      <main className={`transition-all duration-500 ${focusMode ? 'pt-4' : 'pt-16'}`}>
        <HomeTerminal focusMode={focusMode} />
        <ProjectsLab focusMode={focusMode} />
        <ConsoleHub focusMode={focusMode} />
      </main>
    </div>
  );
}

export default App;

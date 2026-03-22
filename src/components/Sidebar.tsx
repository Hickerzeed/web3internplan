import { Globe, Shield, Trophy, Gift, Sparkles, GraduationCap, ClipboardList } from 'lucide-react';
import { FlipWords } from './ui/flip-words';

interface SidebarProps {
  activePage?: string;
  setActivePage?: (page: string) => void;
}

const FLIP_WORDS = ["Impact", "Value", "Innovation", "Opportunities"];

export function Sidebar({ activePage = 'discover', setActivePage }: SidebarProps) {
  const navItems = [
    { id: 'discover', icon: Globe, label: 'Discover & Learn', action: () => setActivePage?.('discover') },
    { id: 'mytasks', icon: ClipboardList, label: 'My Tasks', action: () => setActivePage?.('mytasks') },
    { id: 'guilds', icon: Shield, label: 'Guilds', action: () => setActivePage?.('guilds') },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard', action: () => setActivePage?.('leaderboard') },
    { id: 'rewards', icon: Gift, label: 'Rewards', action: () => setActivePage?.('rewards') },
  ];

  return (
    <aside className="w-[240px] bg-transparent flex flex-col hidden md:flex shrink-0 transition-colors duration-300">
      <div className="p-6 pb-2">
        <button 
          onClick={() => setActivePage?.('discover')}
          className="hover:opacity-80 transition-opacity flex items-center relative"
          aria-label="Go to Discover & Learn"
        >
          {/* Soft white glow in dark mode to make the black logo visible */}
          <div className="absolute inset-0 bg-white/60 blur-md rounded-full hidden dark:block scale-125" />
          <img 
            src="/moledao-logo.png" 
            alt="Moledao Logo" 
            className="h-8 w-auto relative z-10"
          />
        </button>
      </div>

      <nav className="flex-1 px-3 pt-6 flex flex-col space-y-0.5 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                isActive 
                  ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-medium' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </div>
            </button>
          );
        })}

        <div className="mt-auto pt-8 pb-2 px-3">
          <div className="text-xs font-bold text-gray-900 dark:text-white mb-1">Grow with Moledao</div>
          <div className="text-[10px] text-gray-500 mb-3 flex items-center h-4">
            <span className="mr-1">Create Web3</span>
            <div className="relative inline-block">
              <FlipWords words={FLIP_WORDS} className="text-gray-900 dark:text-white font-semibold px-0" />
            </div>
          </div>
          
          <a href="#" className="flex items-center gap-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm font-medium">申请助教</span>
          </a>
          <button onClick={() => setActivePage?.('admin')} className="w-full flex items-center gap-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Intel (Admin)</span>
          </button>
        </div>
      </nav>

      <div className="p-6 pt-2 text-xs text-gray-400 dark:text-gray-500 flex gap-4">
        <a href="#" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Terms of Service</a>
      </div>
    </aside>
  );
}

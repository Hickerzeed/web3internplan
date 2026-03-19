import { Search, ChevronRight, ChevronLeft, Hexagon, Star, Sun, Moon, User, Shield, Trophy, LogOut, BarChart3 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface TopBarProps {
  isRightPanelOpen: boolean;
  setIsRightPanelOpen: (val: boolean) => void;
  scrollProgress: number;
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  setActivePage: (page: string) => void;
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
}

export function TopBar({ isRightPanelOpen, setIsRightPanelOpen, scrollProgress, isDark, setIsDark, setActivePage, isLoggedIn = false, onLoginClick }: TopBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-6 shrink-0 bg-transparent relative z-20 transition-colors duration-300">
      {/* Scroll Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 transition-all duration-150 ease-out z-50 shadow-[0_0_10px_rgba(74,222,128,0.5)]" 
        style={{ width: `${scrollProgress}%` }} 
      />

      <div className="flex-1 max-w-xs">
        <div className="relative group flex items-center">
          <div className="absolute left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 dark:text-gray-500 group-focus-within:text-gray-900 dark:group-focus-within:text-white transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-16 py-2 border border-gray-200 dark:border-white/5 rounded-full leading-5 bg-gray-50 dark:bg-[#101114] text-gray-900 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-[#101114] focus:border-gray-300 dark:focus:border-white/10 focus:ring-0 sm:text-sm transition-all"
            placeholder="Search"
          />
          <div className="absolute right-3 flex items-center pointer-events-none">
            <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-white/5 px-1.5 py-0.5 rounded">Press /</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        {isLoggedIn ? (
          <>
            {/* League Section */}
            <div 
              className="flex items-center gap-3 ml-2 cursor-pointer group"
              onClick={() => setActivePage('leagues')}
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">League</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white leading-none group-hover:text-[#ff7b5c] transition-colors">Bronze</span>
              </div>
              <Hexagon className="w-8 h-8 text-[#ff7b5c] fill-[#ff7b5c]/20 group-hover:scale-110 transition-transform" />
              <div className="w-px h-8 bg-gray-200 dark:bg-white/10 mx-1" />
            </div>

            <div className="relative cursor-pointer flex items-center gap-2" ref={menuRef}>
              <div className="relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center">
                  <img src="/level-frame.bd176f30.svg" alt="Level Frame" className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                  <span className="relative z-10 text-[10px] font-bold text-white leading-none">1</span>
                </div>
              </div>
              
              {isMenuOpen && (
                <div className="absolute right-0 top-12 w-56 bg-white dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-2xl p-2 shadow-2xl z-50">
                  {[
                    { icon: User, label: 'My Profile', action: () => setActivePage('profile') },
                    { icon: Shield, label: 'Guilds', action: () => setActivePage('guilds') },
                    { icon: BarChart3, label: 'Leaderboard', action: () => setActivePage('leaderboard') },
                    { icon: Trophy, label: 'Achievements' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        if (item.action) item.action();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                  <div className="h-px bg-gray-200 dark:bg-white/10 my-1 mx-2" />
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <button 
            onClick={onLoginClick}
            className="ml-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
          >
            Log in
          </button>
        )}

        <button 
          onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors ml-2"
        >
          {isRightPanelOpen ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}

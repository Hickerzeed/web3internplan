import { Flame, Hexagon, Gift, Calendar, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { CuberIcon } from './CuberIcon';

// Generate calendar data for March 2026 (Starts on Sunday, 31 days)
const calendarDays = Array.from({ length: 35 }).map((_, i) => {
  const date = i + 1;
  if (date > 31) return null;
  // Randomly mark some days as checked in
  const isCheckedIn = date < 17 && [1, 2, 4, 5, 8, 9, 11, 12, 14, 15, 16].includes(date);
  const isToday = date === 16;
  return { date, isCheckedIn, isToday };
});

export function RightPanel() {
  const [isGmLoading, setIsGmLoading] = useState(false);
  const [hasGmClicked, setHasGmClicked] = useState(false);

  const handleGmClick = () => {
    setIsGmLoading(true);
    setTimeout(() => {
      setIsGmLoading(false);
      setHasGmClicked(true);
    }, 2000);
  };

  return (
    <aside className="w-[345px] bg-transparent flex flex-col overflow-y-auto scrollbar-hide shrink-0 transition-colors duration-300">
      {/* 修改上面的 w-[360px] 可以调整右侧边栏的宽度 */}
      <div className="p-6 space-y-6">
        
        {/* Lootbox - Glassmorphism */}
        <section className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-3xl p-5 shadow-sm dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] ring-1 ring-white/20 dark:ring-white/5 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <Gift className="w-4 h-4 text-yellow-500" />
              Lootbox
            </h3>
            <button className="text-yellow-600 dark:text-yellow-500 text-xs font-semibold hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors bg-yellow-100 dark:bg-yellow-500/10 px-2.5 py-1 rounded-lg">Learn More</button>
          </div>
          <div className="bg-white/50 dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-2xl p-4 flex items-center justify-between transition-colors duration-300">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map(i => (
                <Hexagon key={i} className="w-7 h-7 text-gray-200 dark:text-white/10 fill-gray-100 dark:fill-white/5" />
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              0/5 <Gift className="w-5 h-5 text-yellow-500 dark:text-yellow-600" />
            </div>
          </div>
        </section>

        {/* Daily Activity Calendar - Glassmorphism */}
        <section className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-3xl p-5 shadow-sm dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] ring-1 ring-white/20 dark:ring-white/5 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#f5583d]" />
              Daily Activity
            </h3>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-white/5 px-2.5 py-1 rounded-lg">Mar 2026</span>
          </div>
          <div className="bg-white/50 dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-2xl p-4 transition-colors duration-300">
            <div className="grid grid-cols-7 gap-y-2 gap-x-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} className="text-[10px] text-gray-400 dark:text-gray-500 text-center font-medium mb-1">{d}</div>
              ))}
              {calendarDays.map((day, i) => (
                <div key={i} className="aspect-square flex items-center justify-center relative">
                  {day ? (
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all cursor-pointer ${
                      day.isToday ? 'ring-1 ring-[#f5583d] text-white bg-[#f5583d]' :
                      day.isCheckedIn ? 'bg-[#f5583d]/20 text-[#f5583d] font-bold' : 'text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}>
                      {day.date}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Streaks */}
        <section className="py-5 border-y border-gray-200 dark:border-white/10">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="text-xs text-gray-500 font-medium mb-1">GM Streak</div>
              <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                <Flame className="w-6 h-6 text-[#f5583d] dark:text-orange-500 fill-[#f5583d] dark:fill-orange-500" /> 1
              </div>
            </div>
            <div className="w-px bg-gray-200 dark:bg-white/10" />
            <div className="flex-1">
              <div className="text-xs text-gray-500 font-medium mb-1">Cuber Balance</div>
              <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                <CuberIcon size="xl" /> 0
              </div>
            </div>
          </div>
          {!hasGmClicked ? (
            <button 
              onClick={handleGmClick}
              disabled={isGmLoading}
              className={`w-full mt-4 bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white font-bold py-3 rounded-2xl transition-all duration-300 shadow-lg shadow-orange-500/20 flex items-center justify-center ${isGmLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isGmLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'GM'}
            </button>
          ) : (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">Your streak will break if you don't gm tomorrow.</p>
          )}
        </section>

        {/* Latest Activity */}
        <section className="px-2">
          <h3 className="font-bold text-sm mb-4 text-gray-900 dark:text-white">Latest Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={`https://picsum.photos/seed/user${i}/32/32`} className="w-8 h-8 rounded-full" alt="avatar" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white dark:bg-[#101114] rounded-full flex items-center justify-center transition-colors duration-300">
                      <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white">S</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Claimed Reward</div>
                    <div className="text-xs text-gray-500">{i === 1 ? '12 minutes' : i === 2 ? '47 minutes' : `${i-2} hours`} ago</div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/5 px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 text-gray-900 dark:text-white transition-colors duration-300">
                  <div className="w-3 h-3 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  </div>
                  &lt; $0.0001 ET
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}

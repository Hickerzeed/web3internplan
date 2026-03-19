import { useState } from 'react';
import { Flame, Hexagon, Box } from 'lucide-react';
import { XPIcon } from '../components/XPIcon';
import { CuberIcon } from '../components/CuberIcon';

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState('XP');
  const [timeFilter, setTimeFilter] = useState('All Time');

  // Generate 20 mock users
  const topUsers = Array.from({ length: 20 }, (_, i) => ({
    rank: i + 1,
    name: i === 0 ? '1stunna.eth' : i === 1 ? 'vikk1.eth' : i === 2 ? 'galcraft.eth' : `user${i + 1}.eth`,
    guild: 'Kings of Layer3',
    level: 130 - i,
    flame: 1200 - i * 10,
    xp: `${(1.7 - i * 0.05).toFixed(1)}M`,
    avatar: `bg-${['blue', 'purple', 'green', 'red', 'orange', 'yellow'][i % 6]}-900`,
  }));

  const currentUser = {
    rank: 4522787,
    name: '0xA1996a6a52717313d877d1cbF9c15EC4e32aa1bD',
    level: 1,
    flame: 2,
    xp: '265',
    avatar: 'bg-pink-500'
  };

  const top3 = [topUsers[1], topUsers[0], topUsers[2]]; // 2nd, 1st, 3rd for podium

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide pb-32 pt-8 relative h-full">
      <div className="max-w-5xl mx-auto px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Leaderboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Compete with friends to top the charts</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-16">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#101114] p-1.5 rounded-2xl w-fit border border-gray-200 dark:border-white/5">
            <button
              onClick={() => setActiveTab('XP')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'XP'
                  ? 'bg-white dark:bg-[#101114] text-gray-900 dark:text-white shadow-sm dark:shadow-none'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <XPIcon className="w-4 h-4 text-[6px]" />
              XP
            </button>
            <button
              onClick={() => setActiveTab('CUBES')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'CUBES'
                  ? 'bg-white dark:bg-[#101114] text-gray-900 dark:text-white shadow-sm dark:shadow-none'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <CuberIcon size="md" />
              CUBES
            </button>
          </div>

          <div className="flex items-center gap-2">
            {['All Time', 'Last 30 Days', 'Last 7 Days', 'Last 24 Hours'].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  timeFilter === filter
                    ? 'bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Podium Area */}
        <div className="relative w-full max-w-[800px] mx-auto mt-32 mb-[-100px] z-0 pointer-events-none">
          <div className="relative aspect-[782/319] w-full">
            {/* SVG Background with Fade Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src="/leaderboard.svg" 
                className="w-full h-full object-contain" 
                alt="Podium" 
                referrerPolicy="no-referrer"
                style={{ 
                  maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
                }}
              />
            </div>
            
            {/* 2nd Place - Centered over left block */}
            <div className="absolute left-[32%] bottom-[65%] flex flex-col items-center -translate-x-1/2 z-10 pointer-events-auto">
              <div className="group cursor-pointer flex flex-col items-center">
                <div className="relative mb-2 w-20 h-20 transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="absolute inset-0 bg-[#1e1f24] rounded-full translate-y-1.5" />
                  <div className={`absolute inset-0 rounded-full ${top3[0].avatar} z-10 overflow-hidden`}>
                    <img src={`https://picsum.photos/seed/${top3[0].name}/200`} className="w-full h-full object-cover" alt={top3[0].name} referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#1e1f24] rounded-full px-3 py-1 z-20 whitespace-nowrap shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-white">
                      <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                      {top3[0].flame}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-white">
                      <XPIcon className="w-3 h-3 text-[5px]" />
                      {top3[0].xp}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-3 transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-white">{top3[0].name}</div>
              </div>
            </div>

            {/* 1st Place - Centered over middle block */}
            <div className="absolute left-1/2 bottom-[85%] flex flex-col items-center -translate-x-1/2 z-20 pointer-events-auto">
              <div className="group cursor-pointer flex flex-col items-center">
                <div className="relative mb-2 w-28 h-28 transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="absolute inset-0 bg-[#1e1f24] rounded-full translate-y-2" />
                  <div className={`absolute inset-0 rounded-full ${top3[1].avatar} z-10 overflow-hidden`}>
                    <img src={`https://picsum.photos/seed/${top3[1].name}/200`} className="w-full h-full object-cover" alt={top3[1].name} referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#1e1f24] rounded-full px-3 py-1 z-20 whitespace-nowrap shadow-xl transition-transform duration-300 group-hover:scale-105">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-white">
                      <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                      {top3[1].flame}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-white">
                      <XPIcon className="w-3.5 h-3.5 text-[6px]" />
                      {top3[1].xp}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-bold text-gray-500 dark:text-gray-400 mt-3 transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-white">{top3[1].name}</div>
              </div>
            </div>

            {/* 3rd Place - Centered over right block */}
            <div className="absolute left-[70%] bottom-[60%] flex flex-col items-center -translate-x-1/2 z-10 pointer-events-auto">
              <div className="group cursor-pointer flex flex-col items-center">
                <div className="relative mb-2 w-20 h-20 transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="absolute inset-0 bg-[#1e1f24] rounded-full translate-y-1.5" />
                  <div className={`absolute inset-0 rounded-full ${top3[2].avatar} z-10 overflow-hidden`}>
                    <img src={`https://picsum.photos/seed/${top3[2].name}/200`} className="w-full h-full object-cover" alt={top3[2].name} referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#1e1f24] rounded-full px-3 py-1 z-20 whitespace-nowrap shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-white">
                      <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                      {top3[2].flame}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-white">
                      <XPIcon className="w-3 h-3 text-[5px]" />
                      {top3[2].xp}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-3 transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-white">{top3[2].name}</div>
              </div>
            </div>
          </div>
        </div>

        {/* List Header */}
        <div className="relative z-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 mt-8">Top Users of all-time</h2>
          {/* Divider Line */}
          <div className="w-full h-px bg-gray-200 dark:bg-white/10 mb-4" />
        </div>

        {/* List */}
        <div className="flex flex-col pb-24">
          {topUsers.map((user) => (
            <div 
              key={user.rank}
              className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group px-4 -mx-4 rounded-2xl"
            >
              <div className="flex items-center gap-6">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  user.rank === 1 ? 'bg-yellow-500 text-white' :
                  user.rank === 2 ? 'bg-gray-300 text-gray-800' :
                  user.rank === 3 ? 'bg-orange-400 text-white' :
                  'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                }`}>
                  {user.rank}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full ${user.avatar} overflow-hidden`}>
                      <img src={`https://picsum.photos/seed/${user.name}/100`} className="w-full h-full object-cover" alt={user.name} referrerPolicy="no-referrer" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center">
                      <img src="/level-frame.bd176f30.svg" alt="Level Frame" className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                      <span className="relative z-10 text-[10px] font-bold text-white leading-none">{user.level}</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-base">{user.name}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Hexagon className="w-3 h-3" />
                      {user.guild}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <span className="font-bold text-gray-900 dark:text-white">{user.flame}</span>
                </div>
                <div className="flex items-center gap-2 w-20 justify-end">
                  <XPIcon className="w-4 h-4 text-[6px]" />
                  <span className="font-bold text-gray-900 dark:text-white">{user.xp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Current User Ranking */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-5xl px-8 z-50">
        <div 
          className="bg-white dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between"
          style={{ marginLeft: '-70px', marginRight: '35px' }}
        >
          <div className="flex items-center gap-6">
            <div className="w-16 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Your Ranking</div>
              <div className="bg-gray-100 dark:bg-white/5 rounded-lg py-1 px-2 text-sm font-bold text-gray-900 dark:text-white">
                {currentUser.rank}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-10 h-10 rounded-full ${currentUser.avatar} bg-gradient-to-br from-pink-500 to-orange-400 overflow-hidden`}>
                  <img src={`https://picsum.photos/seed/${currentUser.name}/100`} className="w-full h-full object-cover" alt={currentUser.name} referrerPolicy="no-referrer" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center">
                  <img src="/level-frame.bd176f30.svg" alt="Level Frame" className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                  <span className="relative z-10 text-[10px] font-bold text-white leading-none">{currentUser.level}</span>
                </div>
              </div>
              <div className="font-bold text-gray-900 dark:text-white text-base truncate max-w-[200px] md:max-w-md">
                {currentUser.name}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span className="font-bold text-gray-900 dark:text-white">{currentUser.flame}</span>
            </div>
            <div className="flex items-center gap-2 w-20 justify-end">
              <XPIcon className="w-4 h-4 text-[6px]" />
              <span className="font-bold text-gray-900 dark:text-white">{currentUser.xp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

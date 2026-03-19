import { Hexagon, Star, Box } from 'lucide-react';
import { useState } from 'react';
import { CuberIcon } from '../components/CuberIcon';

export function Leagues() {
  const [activeTab, setActiveTab] = useState('Bronze');

  const tabs = [
    { name: 'Bronze', color: 'text-orange-500', fill: 'fill-orange-500/20', bg: 'bg-orange-500/10' },
    { name: 'Silver', color: 'text-gray-400', fill: 'fill-gray-400/20', bg: 'bg-gray-400/10' },
    { name: 'Gold', color: 'text-yellow-500', fill: 'fill-yellow-500/20', bg: 'bg-yellow-500/10' },
    { name: 'Platinum', color: 'text-purple-500', fill: 'fill-purple-500/20', bg: 'bg-purple-500/10' },
    { name: 'Diamond', color: 'text-cyan-400', fill: 'fill-cyan-400/20', bg: 'bg-cyan-400/10' },
  ];

  const topUsers = [
    { rank: 1, name: '0xA53277Fe13aA0A0dc1179B3C5662b77b98f1E515', points: 71, avatar: 'bg-green-800' },
    { rank: 2, name: '0x20DfeEd4bD0a027b31240a25Dd257E85A42bFFaf', points: 71, avatar: 'bg-purple-800' },
    { rank: 3, name: 'finnarz.eth', points: 71, avatar: 'bg-green-900' },
    { rank: 4, name: 'jonkingeth.eth', points: 71, avatar: 'bg-orange-600' },
  ];

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide pb-20 pt-8">
      <div className="max-w-5xl mx-auto px-8">
        
        {/* Header Card */}
        <div className="bg-white dark:bg-[#101114] rounded-2xl p-8 mb-8 relative overflow-hidden flex justify-between items-center border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none transition-colors">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Leagues</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Higher League status means more earning power.</p>
            <button className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white text-sm font-medium px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 transition-colors">
              <Star className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              More Liquid Rewards
            </button>
          </div>
          
          {/* Decorative Pillars (Simplified) */}
          <div className="hidden md:flex items-end gap-4 h-32 relative z-10">
            {[
              { color: 'text-orange-500', height: 'h-8' },
              { color: 'text-gray-400', height: 'h-12' },
              { color: 'text-yellow-500', height: 'h-16' },
              { color: 'text-purple-500', height: 'h-20' },
              { color: 'text-cyan-400', height: 'h-24' },
            ].map((pillar, i) => (
              <div key={i} className="flex flex-col items-center">
                <Hexagon className={`w-8 h-8 ${pillar.color} fill-current mb-2 drop-shadow-lg`} />
                <div className={`w-8 ${pillar.height} bg-gray-200 dark:bg-white/5 rounded-t-sm border-t border-gray-300 dark:border-white/10 transition-colors`} />
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab.name 
                  ? 'bg-white dark:bg-[#101114] text-gray-900 dark:text-white border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <Hexagon className={`w-5 h-5 ${tab.color} ${tab.fill}`} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Current League Card */}
        <div className="bg-gradient-to-r from-orange-50 to-white dark:from-[#2A1F1A] dark:to-[#101114] rounded-2xl p-8 mb-12 border border-orange-200 dark:border-orange-500/20 relative overflow-hidden shadow-sm dark:shadow-none transition-colors">
          <div className="absolute left-0 top-0 w-64 h-full bg-orange-500/10 filter blur-[60px]" />
          <div className="flex items-center gap-6 relative z-10">
            <Hexagon className="w-20 h-20 text-orange-500 fill-orange-500/20" />
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Your League</div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white">Bronze</div>
            </div>
          </div>
        </div>

        {/* Your Position */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Position</h2>
        <div className="bg-white dark:bg-[#101114] rounded-2xl p-6 mb-12 border border-gray-200 dark:border-white/5 flex items-center justify-between shadow-sm dark:shadow-none transition-colors">
          <div className="flex items-center gap-6">
            <span className="text-gray-500 font-medium w-4">0</span>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 overflow-hidden relative">
                <div className="absolute inset-0 opacity-50" style={{
                  backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
                  backgroundSize: '8px 8px',
                  backgroundPosition: '0 0, 4px 4px'
                }} />
              </div>
              <span className="font-bold text-gray-900 dark:text-white">0xA199...a1bD</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 flex-1 max-w-md mx-8">
            <span className="text-xs text-gray-500">Demotion</span>
            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full relative transition-colors">
              <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 dark:bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-colors" />
            </div>
            <span className="text-xs text-gray-500">Promotion</span>
          </div>

          <div className="flex items-center gap-2">
            <CuberIcon size="lg" />
            <span className="font-bold text-gray-900 dark:text-white">0</span>
          </div>
        </div>

        {/* Top Users */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Bronze Top Users</h2>
        <div className="bg-white dark:bg-[#101114] rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm dark:shadow-none transition-colors">
          {topUsers.map((user, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-6">
                <span className="text-gray-500 font-medium w-4">{user.rank}</span>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${user.avatar} overflow-hidden relative`}>
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
                      backgroundSize: '8px 8px',
                      backgroundPosition: '0 0, 4px 4px'
                    }} />
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{user.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CuberIcon size="lg" />
                <span className="font-bold text-gray-900 dark:text-white">{user.points}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

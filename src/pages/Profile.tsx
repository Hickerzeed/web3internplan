import { Hexagon, Trophy, Flame, Wallet, Edit2, Copy, ExternalLink, Box, Star, Twitter, Send, MessageSquare, Github } from 'lucide-react';
import { XPIcon } from '../components/XPIcon';
import { CuberIcon } from '../components/CuberIcon';

interface ProfileProps {
  setActivePage: (page: string) => void;
  socialVisibility?: Record<string, boolean>;
  personalName?: string;
}

export function Profile({ setActivePage, socialVisibility = {}, personalName = '0xA199...a1bD' }: ProfileProps) {
  const socialIcons: Record<string, any> = {
    twitter: Twitter,
    discord: MessageSquare,
    telegram: Send,
    github: Github,
    farcaster: Box
  };

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide pb-20">
      {/* Header Background */}
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gray-100 dark:bg-[#101114] transition-colors duration-300" />
        {/* Blurry colorful blobs */}
        <div className="absolute top-[-20%] left-[10%] w-[40%] h-[140%] bg-blue-500/20 dark:bg-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70" />
        <div className="absolute top-[-10%] right-[20%] w-[30%] h-[120%] bg-green-400/20 dark:bg-green-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70" />
      </div>

      <div className="max-w-5xl mx-auto px-8 relative -mt-20">
        {/* Profile Info Section */}
        <div className="flex justify-between items-end mb-8" style={{ paddingLeft: '16px', marginLeft: '-70px', marginRight: '35px' }}>
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-[#101114] bg-gradient-to-br from-pink-500 to-orange-400 overflow-hidden relative z-10 transition-colors duration-300">
              {/* Pixel art pattern simulation */}
              <div className="absolute inset-0 opacity-50" style={{
                backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 10px 10px'
              }} />
            </div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 flex items-center justify-center z-20">
              <img src="/level-frame.bd176f30.svg" alt="Level Frame" className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
              <span className="relative z-10 text-sm font-bold text-white leading-none">1</span>
            </div>
          </div>
          <button 
            onClick={() => setActivePage('edit-profile')}
            className="bg-gray-900/5 dark:bg-white/10 hover:bg-gray-900/10 dark:hover:bg-white/20 text-gray-900 dark:text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-2 backdrop-blur-md"
          >
            Edit Profile
          </button>
        </div>

        {/* Level Progress */}
        <div className="mb-6">
          <div className="h-2 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden mb-2 transition-colors duration-300">
            <div className="h-full bg-green-500 w-[55%] rounded-full" />
          </div>
          <div className="flex justify-end text-xs text-gray-500 dark:text-gray-400 font-medium">
            165 / 300 XP
          </div>
        </div>

        {/* User Details */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">{personalName}</h1>
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full px-3 py-1.5 transition-colors duration-300">
                <Hexagon className="w-4 h-4 text-orange-500 dark:text-orange-400 fill-orange-100 dark:fill-orange-400/20" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Bronze</span>
              </div>
              
              {/* Social Icons */}
              <div className="flex items-center gap-2">
                {Object.entries(socialVisibility).map(([key, isVisible]) => {
                  if (!isVisible) return null;
                  const Icon = socialIcons[key];
                  if (!Icon) return null;
                  return (
                    <div key={key} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
                      <Icon className="w-4 h-4" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-gray-500 font-medium">Joined Mar 2024</span>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full px-3 py-1.5 transition-colors duration-300">
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-sm transform rotate-45" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">0xA199...a1bD</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-16">
          {/* CUBEs Card */}
          <div className="bg-white dark:bg-[#101114] border border-gray-200 dark:border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-gray-300 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
            <div className="relative z-10">
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">CUBEs</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">2</div>
            </div>
            {/* Decorative Cubes */}
            <div className="absolute right-[-10%] bottom-[-20%] w-32 h-32 opacity-80 transform group-hover:scale-110 transition-transform duration-500">
              <CuberIcon size="3xl" className="absolute top-4 right-12 transform rotate-12 blur-[1px]" />
              <CuberIcon size="4xl" className="absolute top-12 right-4 transform -rotate-12" />
              <CuberIcon size="5xl" className="absolute bottom-4 right-8 transform rotate-45" />
            </div>
          </div>

          {/* Rewards Card */}
          <div className="bg-white dark:bg-[#101114] border border-gray-200 dark:border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-gray-300 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
            <div className="relative z-10">
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">Rewards</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">$0</div>
            </div>
            <Trophy className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 text-yellow-500 opacity-80 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]" />
          </div>

          {/* Streak Card */}
          <div className="bg-white dark:bg-[#101114] border border-gray-200 dark:border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-gray-300 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
            <div className="relative z-10">
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">Streak</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">2</div>
            </div>
            <Flame className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 text-orange-500 opacity-80 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]" />
          </div>

          {/* Points Card */}
          <div className="bg-white dark:bg-[#101114] border border-gray-200 dark:border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-gray-300 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
            <div className="relative z-10">
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">Points</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">12,450</div>
            </div>
            <Star className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 text-yellow-500 opacity-80 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]" />
          </div>
        </div>

        {/* Achievements Section */}
        <div className="flex flex-col items-center justify-center py-12 mb-12 border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
          <Trophy className="w-8 h-8 text-yellow-500 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">No achievements yet</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200 dark:border-white/5 mb-6 transition-colors duration-300">
          <button className="pb-4 text-sm font-bold text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white transition-colors">Activity</button>
          <button className="pb-4 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors">CUBEs</button>
          <button className="pb-4 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Activations</button>
          <button className="pb-4 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Favorites</button>
        </div>

        {/* Activity List */}
        <div className="space-y-3">
          {[
            { title: 'Superchain Evolution: Warpcast', xp: 100, time: '21mo ago', icon: 'bg-gray-900 dark:bg-black text-white' },
            { title: 'Aerodrome on Frame', xp: 100, time: '21mo ago', icon: 'bg-white border border-gray-200 dark:border-white/10 text-blue-500' },
            { title: 'Introduction to Optimism', xp: 100, time: '21mo ago', icon: 'bg-red-500 text-white' },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-[#101114] border border-gray-200 dark:border-white/5 rounded-2xl p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer shadow-sm dark:shadow-none">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${item.icon}`}>
                  {item.title.charAt(0)}
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-medium uppercase mb-1">Activation Completed</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white mb-1 transition-colors">{item.title}</div>
                  <div className="flex items-center gap-1 text-xs font-bold text-green-500 dark:text-green-400">
                    <XPIcon className="w-3 h-3 text-[5px]" />
                    {item.xp}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

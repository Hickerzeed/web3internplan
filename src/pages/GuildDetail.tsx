import { useState } from 'react';
import { Shield, Flame, Users, Box, Zap, ArrowLeft, Hexagon } from 'lucide-react';
import { CuberIcon } from '../components/CuberIcon';

interface GuildDetailProps {
  setActivePage: (page: string) => void;
}

export function GuildDetail({ setActivePage }: GuildDetailProps) {
  const [activeTab, setActiveTab] = useState('Members');
  const [timeFilter, setTimeFilter] = useState('All time');
  const [joinStatus, setJoinStatus] = useState<'none' | 'requested' | 'joined'>('none');

  const handleJoin = () => {
    setJoinStatus('requested');
  };

  const members = [
    { name: '10090.eth', role: 'Member', level: 112, avatar: 'bg-red-900', points: '36K', glory: '56K' },
    { name: 'nekonft92.eth', role: 'Member', level: 107, avatar: 'bg-blue-900', points: '23K', glory: '56K' },
    { name: 'cryptoking.eth', role: 'Member', level: 98, avatar: 'bg-green-900', points: '18K', glory: '42K' },
    { name: 'web3wizard.eth', role: 'Member', level: 85, avatar: 'bg-purple-900', points: '15K', glory: '38K' },
    { name: 'nftcollector.eth', role: 'Member', level: 72, avatar: 'bg-orange-900', points: '12K', glory: '31K' },
  ];
  
  const maxMembers = 50;

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide pb-20 pt-8">
      <div className="max-w-5xl mx-auto px-8">
        <button 
          onClick={() => setActivePage('guilds')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Guilds
        </button>

        {/* Top Card */}
        <div className="bg-white dark:bg-[#101114] rounded-2xl p-8 mb-8 border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Shield Icon */}
            <div className="relative flex items-center justify-center w-48 h-48 shrink-0">
              <Shield className="w-48 h-48 text-gray-200 dark:text-white/5 absolute" strokeWidth={1} />
              <Flame className="w-20 h-20 text-gray-400 dark:text-gray-300 relative z-10" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Guild</div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">The Questing Elite</h1>
              
              <p className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                This is the Elites club, a top-notch selection of the 3lluminati
              </p>
              
              <div className="text-gray-500 dark:text-gray-400 space-y-1 mb-8">
                <p>Criteria to join:</p>
                <p>- 10,000+ L3 staked</p>
                <p>- 3,000+ CUBEs</p>
                <p>- Active daily (completing all streaks)</p>
                <p>- Diamond League</p>
                <br />
                <p>DM the right person in Discord to join</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Stats */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-600 dark:text-purple-400">G</div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Glory</div>
                        <div className="font-bold text-gray-900 dark:text-white">2.1M</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 flex items-center gap-4">
                      <CuberIcon size="3xl" />
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">CUBEs</div>
                        <div className="font-bold text-gray-900 dark:text-white">0</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 flex items-center gap-4">
                      <Users className="w-8 h-8 text-cyan-500 dark:text-cyan-400 p-1.5 bg-cyan-100 dark:bg-cyan-500/20 rounded-full" />
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Members</div>
                        <div className="font-bold text-gray-900 dark:text-white">49</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">L3 Staked</div>
                        <div className="font-bold text-gray-900 dark:text-white">1154064</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Perks */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Perks</h3>
                  <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 flex items-center gap-4">
                    <div className="relative flex items-center justify-center w-10 h-10">
                      <Hexagon className="w-10 h-10 text-purple-500 fill-purple-500/20 absolute" />
                      <span className="text-xs font-bold text-purple-400 relative z-10">5%</span>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">+5% XP</span>
                  </div>
                </div>
              </div>

              {members.length >= maxMembers ? (
                <button disabled className="w-full py-4 rounded-xl font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/10 cursor-not-allowed">
                  公会人数已满 (Guild is full)
                </button>
              ) : joinStatus === 'requested' ? (
                <button disabled className="w-full py-4 rounded-xl font-bold text-white bg-gray-400 dark:bg-gray-600 cursor-not-allowed transition-colors">
                  Request Sent
                </button>
              ) : joinStatus === 'joined' ? (
                <button disabled className="w-full py-4 rounded-xl font-bold text-white bg-gray-400 dark:bg-gray-600 cursor-not-allowed transition-colors">
                  Joined
                </button>
              ) : (
                <button onClick={handleJoin} className="w-full py-4 rounded-xl font-bold text-white bg-blue-500 hover:bg-blue-600 transition-colors">
                  Join
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#101114] p-1.5 rounded-2xl w-fit border border-gray-200 dark:border-white/5">
            {['Members', 'Activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-colors ${
                  activeTab === tab
                    ? 'bg-white dark:bg-[#101114] text-gray-900 dark:text-white shadow-sm dark:shadow-none'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#101114] p-1.5 rounded-2xl w-fit border border-gray-200 dark:border-white/5">
            <span className="px-4 text-sm font-bold text-gray-900 dark:text-white">Period</span>
            <div className="h-4 w-px bg-gray-300 dark:bg-white/10 mx-1" />
            {['All time', '24h', '7d'].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  timeFilter === filter
                    ? 'bg-white dark:bg-[#101114] text-gray-900 dark:text-white shadow-sm dark:shadow-none'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Members List */}
        <div className="flex flex-col">
          {members.map((member, i) => (
            <div 
              key={i}
              className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group px-4 -mx-4 rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full ${member.avatar} overflow-hidden relative`}>
                    <div className="absolute inset-0 opacity-50" style={{
                      backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
                      backgroundSize: '4px 4px',
                      backgroundPosition: '0 0, 2px 2px'
                    }} />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 flex items-center justify-center">
                    <img src="/level-frame.bd176f30.svg" alt="Level Frame" className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                    <span className="relative z-10 text-[10px] font-bold text-white leading-none">{member.level}</span>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-base">{member.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{member.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{member.points}</span>
                </div>
                <div className="flex items-center gap-2 w-20 justify-end">
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-[10px] font-bold text-purple-600 dark:text-purple-400">
                    G
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{member.glory}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

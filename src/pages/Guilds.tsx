import { Shield, Users, UserPlus, Flame, Hexagon, Ghost, Cat, CloudRain, Globe } from 'lucide-react';
import { useState } from 'react';
import { GuildData } from '../types';
import { ShinyButton } from '../components/ui/shiny-button';

interface GuildsProps {
  setActivePage: (page: string) => void;
  myGuild: GuildData | null;
}

export function Guilds({ setActivePage, myGuild }: GuildsProps) {
  const [timeFilter, setTimeFilter] = useState('All time');

  const guilds = [
    { rank: 1, name: 'The Questing Elite', type: 'Invite only', points: '1.5M', members: 49, maxMembers: 50, icon: Flame, rankColor: 'bg-yellow-500 text-white' },
    { rank: 2, name: 'Kings of Layer3', type: 'Invite only', points: '1.5M', members: 48, maxMembers: 50, icon: Hexagon, rankColor: 'bg-gray-300 text-gray-800' },
    { rank: 3, name: '⚜ KRYPTOMISJA ⚜', type: 'Invite only', points: '1.3M', members: 49, maxMembers: 50, icon: CloudRain, rankColor: 'bg-orange-400 text-white' },
    { rank: 4, name: 'La Confrérie 🐱', type: 'Invite only', points: '1.1M', members: 50, maxMembers: 50, icon: Cat, rankColor: 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400' },
    { rank: 5, name: "L3 Fuck'in Gangsta", type: 'Invite only', points: '1.1M', members: 50, maxMembers: 50, icon: Ghost, rankColor: 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400' },
    { rank: 6, name: 'SecretoDefi Army', type: 'Invite only', points: '1.1M', members: 50, maxMembers: 50, icon: Flame, rankColor: 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400' },
    { rank: 7, name: '👹 FOMO.net', type: 'Invite only', points: '1.1M', members: 50, maxMembers: 50, icon: Ghost, rankColor: 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400' },
    { rank: 8, name: 'Big Stakers', type: 'Invite only', points: '1.1M', members: 50, maxMembers: 50, icon: Globe, rankColor: 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400' },
    { rank: 9, name: 'Degen Ducks', type: 'Invite only', points: '1.1M', members: 50, maxMembers: 50, icon: Flame, rankColor: 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400' },
    { rank: 10, name: '☼ LedgerLegends', type: 'Invite only', points: '1.1M', members: 50, maxMembers: 50, icon: Globe, rankColor: 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400' },
  ];

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide pb-20 pt-8">
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Guilds</h1>
            <p className="text-gray-500 dark:text-gray-400">Create or join a Guild, team up with friends, and earn rewards together!</p>
          </div>
          <div className="flex flex-col gap-3">
            {myGuild && (
              <ShinyButton 
                onClick={() => setActivePage('my-guild')}
                className="w-full"
              >
                My Guild
              </ShinyButton>
            )}
            <button 
              onClick={() => setActivePage('create-guild')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors whitespace-nowrap"
            >
              Create Guild
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 bg-gray-100 dark:bg-[#101114] p-1.5 rounded-2xl w-fit border border-gray-200 dark:border-white/5">
          <div className="px-4 py-2 bg-white dark:bg-[#101114] text-gray-900 dark:text-white rounded-xl font-semibold shadow-sm dark:shadow-none text-sm">
            Top Guilds
          </div>
          <div className="h-4 w-px bg-gray-300 dark:bg-white/10 mx-2" />
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

        {/* List Header */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Top Guilds</h2>

        {/* Guilds List */}
        <div className="flex flex-col">
          {guilds.map((guild) => (
            <button 
              key={guild.rank}
              onClick={() => setActivePage('guild-detail')}
              className="w-full flex items-center justify-between py-4 border-b border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group px-4 -mx-4 rounded-2xl cursor-pointer text-left"
            >
              <div className="flex items-center gap-6">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${guild.rankColor}`}>
                  {guild.rank}
                </div>
                
                <div className="relative flex items-center justify-center w-12 h-12">
                  <Shield className="w-12 h-12 text-gray-200 dark:text-white/10 absolute" strokeWidth={1} />
                  <guild.icon className="w-5 h-5 text-gray-500 dark:text-gray-400 relative z-10" />
                </div>

                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-base mb-1">{guild.name}</div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <UserPlus className="w-3.5 h-3.5" />
                    {guild.type}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-[10px] font-bold text-purple-600 dark:text-purple-400">
                    G
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{guild.points}</span>
                </div>
                
                <div className="flex items-center gap-2 w-24 justify-end">
                  <Users className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                  <span className="font-bold text-gray-900 dark:text-white text-sm">
                    {guild.members} <span className="text-gray-400 font-normal">/ {guild.maxMembers}</span>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

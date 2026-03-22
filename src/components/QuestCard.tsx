import React from 'react';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';
import { AvatarCircles } from './ui/avatar-circles';
import { CuberIcon } from './CuberIcon';
import { XPIcon } from './XPIcon';

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
];

interface QuestCardProps {
  quest: {
    title: string;
    protocol: string;
    logo: string;
    description?: string;
    duration?: string;
    status?: string;
    participants?: string;
    xp?: number;
    cubes?: number;
    difficulty?: string;
    category?: string;
    tags: string[];
    taskStatus?: string;
  };
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  const isBounty = quest.category === 'Bounty';

  const userStatus = quest.taskStatus || 'not-started';

  const getUserStatusConfig = (status: string) => {
    switch (status) {
      case 'in-progress': return { color: 'bg-blue-500 dark:bg-blue-400', text: 'In Progress' };
      case 'pending': return { color: 'bg-yellow-500 dark:bg-yellow-400', text: 'Pending Review' };
      case 'approved': return { color: 'bg-emerald-500 dark:bg-emerald-400', text: 'Approved' };
      case 'rejected': return { color: 'bg-red-500 dark:bg-red-400', text: 'Rejected' };
      case 'not-started':
      default: return { color: 'bg-gray-400 dark:bg-gray-500', text: 'Not Started' };
    }
  };

  const statusConfig = getUserStatusConfig(userStatus);

  const getQuestTimeDisplay = () => {
    if (quest.status === 'Upcoming') return 'Upcoming';
    if (quest.status === 'Ended') return 'Ended';
    return quest.duration || '7 Days Left';
  };

  return (
    <CardContainer containerClassName="w-full" className="w-full">
      <CardBody className={`group bg-white dark:bg-[#161719] border ${isBounty ? 'border-orange-500/30 dark:border-orange-500/30' : 'border-gray-100 dark:border-white/5'} rounded-[24px] overflow-hidden hover:border-transparent dark:hover:border-transparent transition-all duration-500 cursor-pointer flex flex-col w-full h-[180px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.15)] hover:-translate-y-1.5 relative`}>
        
        {/* Animated Border (Flowing Light) */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${isBounty ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <div className="absolute inset-[-50%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_50%,#f97316_100%)]" />
        </div>
        
        {/* Inner Mask */}
        <div className="absolute inset-[1.5px] bg-white dark:bg-[#161719] rounded-[22.5px] z-0 transition-colors duration-500" />

        {/* Diagonal Category Ribbon */}
        <div className="absolute top-0 right-0 w-[100px] h-[100px] overflow-hidden z-20 pointer-events-none rounded-tr-[22.5px]">
          <div className={`absolute top-[16px] -right-[34px] w-[120px] transform rotate-45 text-center text-[10px] font-bold py-1 shadow-sm uppercase tracking-wider ${
            quest.category === 'Bounty' ? 'bg-orange-500 text-white' :
            quest.category === 'Technical' ? 'bg-blue-500 text-white' :
            quest.category === 'Operational' ? 'bg-purple-500 text-white' :
            'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}>
            {quest.category || 'General'}
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col h-full p-5">
          {/* Top Row: Status & Duration */}
        <CardItem translateZ="20" className="w-full flex items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/10 border border-black/[0.04] dark:border-white/10 text-[11px] font-bold uppercase tracking-wider text-gray-800 dark:text-white/90 backdrop-blur-sm shrink-0">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusConfig.color}`} />
              <span className="truncate">{statusConfig.text}</span>
            </div>
            <div className="bg-gray-100/80 dark:bg-white/5 text-gray-500 dark:text-gray-400 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0">
              {getQuestTimeDisplay()}
            </div>
          </div>
        </CardItem>

        {/* Middle Row: Title */}
        <CardItem translateZ="30" className="w-full mb-auto">
          <h3 className="text-[18px] font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors">
            {quest.title}
          </h3>
        </CardItem>

        {/* Bottom Row: Avatars, Participants, Difficulty, Rewards */}
        <CardItem translateZ="20" className="w-full flex items-center justify-between mt-4">
          <div className="flex items-center gap-2.5">
            {/* Avatars */}
            <AvatarCircles numPeople={99} avatarUrls={avatars.slice(0, 3)} />
          </div>

          <div className="flex items-center gap-3">
            {/* Rewards */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <CuberIcon size="3xl" className="w-10 h-10" />
              </div>
              <div className="flex items-center gap-1">
                <XPIcon className="w-6 h-6 text-[9px]" />
                <span className="text-[13px] font-bold text-[#00D395]">{quest.xp ? (quest.xp >= 1000 ? `${(quest.xp/1000).toFixed(1)}K` : quest.xp) : '1.7M'}</span>
              </div>
            </div>
          </div>
        </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

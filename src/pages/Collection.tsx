import React, { useState } from 'react';
import { Share, ChevronLeft } from 'lucide-react';
import { QuestCard } from '../components/QuestCard';

// Dummy data for the collection
const collectionQuests = [
  {
    id: 1,
    title: "Abstract: Matcha",
    protocol: "Matcha Aggregator",
    logo: "https://picsum.photos/seed/matchalogo/40/40",
    description: "Trade on Matcha to find the best prices across multiple DEXs.",
    duration: "1 Week Left",
    status: "Active",
    difficulty: "Medium",
    participants: "1.2K",
    xp: 100,
    cubes: 1,
    tags: ["Points"]
  },
  {
    id: 2,
    title: "Abstract: Cryptoys",
    protocol: "Cryptoys",
    logo: "https://picsum.photos/seed/cryptoyslogo/40/40",
    description: "Collect digital toys and explore the Cryptoys universe.",
    duration: "Ongoing",
    status: "Active",
    difficulty: "Easy",
    participants: "986",
    xp: 150,
    cubes: 1,
    tags: ["E20"]
  },
  {
    id: 3,
    title: "Abstract: OpenSea",
    protocol: "OpenSea",
    logo: "https://picsum.photos/seed/opensealogo/40/40",
    description: "Buy or sell an NFT on the world's largest marketplace.",
    duration: "3 Days Left",
    status: "Active",
    difficulty: "Easy",
    participants: "1K",
    xp: 200,
    cubes: 1,
    tags: ["Pre-TGE"]
  },
  {
    id: 4,
    title: "Abstract: Aborean Finance",
    protocol: "Aborean Finance",
    logo: "https://picsum.photos/seed/aboreanlogo/40/40",
    description: "Lend and borrow assets on Aborean Finance to earn yields.",
    duration: "Ended",
    status: "Ended",
    difficulty: "Hard",
    participants: "804",
    xp: 100,
    cubes: 1,
    tags: ["Pre-TGE"]
  },
  {
    id: 5,
    title: "Abstract: Maze of Gains",
    protocol: "Onchain Heroes",
    logo: "https://picsum.photos/seed/mazelogo/40/40",
    description: "Navigate the maze and defeat enemies to earn rare loot.",
    duration: "Upcoming",
    status: "Upcoming",
    difficulty: "Medium",
    participants: "1.1K",
    xp: 150,
    cubes: 1,
    tags: ["Gaming"]
  },
  {
    id: 6,
    title: "Abstract: Relay",
    protocol: "Relay",
    logo: "https://picsum.photos/seed/relaylogo/40/40",
    description: "Bridge assets seamlessly across chains using Relay.",
    duration: "5 Days Left",
    status: "Active",
    difficulty: "Medium",
    participants: "1.3K",
    xp: 200,
    cubes: 1,
    tags: ["Pre-TGE"]
  },
  {
    id: 7,
    title: "Abstract: Myriad",
    protocol: "Myriad Protocol",
    logo: "https://picsum.photos/seed/myriadlogo/40/40",
    description: "Participate in decentralized governance on Myriad.",
    duration: "Ongoing",
    status: "Active",
    difficulty: "Hard",
    participants: "1.1K",
    xp: 100,
    cubes: 1,
    tags: ["Points"]
  },
  {
    id: 8,
    title: "Abstract: Onchain Heroes",
    protocol: "Onchain Heroes",
    logo: "https://picsum.photos/seed/onchainlogo/40/40",
    description: "Mint your hero and start your on-chain adventure.",
    duration: "2 Weeks Left",
    status: "Active",
    difficulty: "Easy",
    participants: "939",
    xp: 150,
    cubes: 1,
    tags: ["Gaming"]
  },
  {
    id: 9,
    title: "Abstract: Tollan Universe",
    protocol: "Tollan Universe",
    logo: "https://picsum.photos/seed/tollanlogo/40/40",
    description: "Explore the Tollan Universe and complete daily quests.",
    duration: "1 Month Left",
    status: "Active",
    difficulty: "Medium",
    participants: "914",
    xp: 200,
    cubes: 1,
    tags: ["Gaming"]
  }
];

interface CollectionProps {
  title: string;
  setActivePage: (page: string) => void;
  setSelectedQuest: (quest: any) => void;
}

export function Collection({ title, setActivePage, setSelectedQuest }: CollectionProps) {
  return (
    <div className="flex-1 flex flex-col px-6 md:px-12 lg:px-20 xl:px-32 py-10 max-w-[1300px] mx-auto w-full space-y-10 pb-24 relative z-10">
      
      {/* Back Button */}
      <button 
        onClick={() => setActivePage('discover')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-4"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back to Discover</span>
      </button>

      {/* Hero Banner */}
      <div className="relative w-full rounded-[32px] overflow-hidden bg-black/[0.02] dark:bg-white/5 backdrop-blur-sm border border-black/[0.04] dark:border-white/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-none flex items-center min-h-[180px]">
        <div className="relative z-20 p-8 md:p-10 flex flex-col md:flex-row md:items-start justify-between w-full">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{title || 'Abstract Ecosystem'}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-[14px] leading-relaxed max-w-lg">
              This is not an official Abstract collection and it is intended solely for educational and entertainment purposes.
            </p>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-900 dark:text-white text-sm font-medium transition-colors border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none shrink-0 mt-4 md:mt-0">
            <Share className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Activations Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {collectionQuests.length} Activations
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectionQuests.map((quest) => (
            <div key={quest.id} onClick={() => { setSelectedQuest(quest); setActivePage('task'); }}>
              <QuestCard quest={quest} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

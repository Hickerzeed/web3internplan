import React, { useState, useEffect, useRef } from 'react';
import { Home, Star, LayoutGrid, Globe, Target, Flame, ChevronLeft, ChevronRight, Clock, PlayCircle } from 'lucide-react';
import { QuestCard } from '../components/QuestCard';
import { GlowOverlay } from '../components/GlowOverlay';

const banners = [
  {
    id: 1,
    activation: "Activation",
    title: "Earn with Ample on Base",
    description: "A new way to amplify your money.",
    participants: "647",
    xp: 100,
    cubes: 1,
    bgFrom: "from-[#1a3a2a]",
    bgVia: "via-[#0f251d]",
    bgTo: "to-[#101114]",
    iconColor: "text-green-400",
    iconBg: "bg-[#1a4a3a]",
    iconBorder: "border-green-500/20",
    dotColor: "bg-green-400",
    glowColor: "shadow-[0_0_100px_rgba(74,222,128,0.2)]",
    glowColorHex: "#4ade80",
    platformIcon: "bg-[#00D395]", // Ample green
    platformSymbol: "A"
  },
  {
    id: 2,
    activation: "New Quest",
    title: "Explore the Zora Network",
    description: "Mint, collect, and enjoy pure internet culture.",
    participants: "12.4K",
    xp: 250,
    cubes: 2,
    bgFrom: "from-blue-900/40",
    bgVia: "via-blue-900/20",
    bgTo: "to-[#101114]",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-900/40",
    iconBorder: "border-blue-500/20",
    dotColor: "bg-blue-400",
    glowColor: "shadow-[0_0_100px_rgba(96,165,250,0.2)]",
    glowColorHex: "#60a5fa",
    platformIcon: "bg-[#0066FF]", // Zora blue
    platformSymbol: "Z"
  },
  {
    id: 3,
    activation: "Trending",
    title: "Provide Liquidity on Uniswap",
    description: "Earn fees by providing liquidity to top pools.",
    participants: "8.2K",
    xp: 150,
    cubes: 1,
    bgFrom: "from-pink-900/40",
    bgVia: "via-pink-900/20",
    bgTo: "to-[#101114]",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-900/40",
    iconBorder: "border-pink-500/20",
    dotColor: "bg-pink-400",
    glowColor: "shadow-[0_0_100px_rgba(244,114,182,0.2)]",
    glowColorHex: "#f472b6",
    platformIcon: "bg-[#FF007A]", // Uniswap pink
    platformSymbol: "U"
  },
  {
    id: 4,
    activation: "Special Event",
    title: "Moledao Web3 Bootcamp",
    description: "Join the ultimate Web3 learning experience.",
    participants: "1.5K",
    xp: 500,
    cubes: 3,
    bgFrom: "from-purple-900/40",
    bgVia: "via-purple-900/20",
    bgTo: "to-[#101114]",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-900/40",
    iconBorder: "border-purple-500/20",
    dotColor: "bg-purple-400",
    glowColor: "shadow-[0_0_100px_rgba(192,132,252,0.2)]",
    glowColorHex: "#c084fc",
    platformIcon: "bg-[#8A2BE2]", // Moledao purple
    platformSymbol: "M"
  }
];

const categories = [
  { icon: Home, label: 'All' },
  { label: 'General' },
  { label: 'Technical' },
  { label: 'Operational' },
  { label: 'Bounty' },
  { label: 'In Progress' },
  { label: 'Pending' },
];

const quests = [
  {
    id: 1,
    title: "Get Started",
    protocol: "Layer3",
    logo: "https://picsum.photos/seed/l3logo/40/40",
    description: "Learn the basics of Layer3 and set up your profile to start earning rewards.",
    duration: "Ongoing",
    status: "Active",
    difficulty: "Easy",
    participants: "29K",
    cubes: 1,
    tags: [] as string[]
  },
  {
    id: 2,
    title: "Swap on Uniswap",
    protocol: "Uniswap",
    logo: "https://picsum.photos/seed/unilogo/40/40",
    description: "Make your first swap on Uniswap to understand decentralized exchanges.",
    duration: "5 Days Left",
    status: "Active",
    difficulty: "Medium",
    participants: "12K",
    xp: 150,
    tags: ["DeFi", "Trending"]
  },
  {
    id: 3,
    title: "Mint your first NFT on Zora",
    protocol: "Zora",
    logo: "https://picsum.photos/seed/zoralogo/40/40",
    description: "Discover the Zora network and mint an exclusive NFT.",
    duration: "2 Weeks Left",
    status: "Active",
    difficulty: "Easy",
    participants: "8.5K",
    xp: 200,
    cubes: 1,
    tags: ["NFTs"]
  },
  {
    id: 4,
    title: "Provide Liquidity on Aave",
    protocol: "Aave",
    logo: "https://picsum.photos/seed/aavelogo/40/40",
    description: "Supply assets to Aave liquidity pools and earn interest.",
    duration: "Ended",
    status: "Ended",
    difficulty: "Hard",
    participants: "5.2K",
    xp: 300,
    cubes: 2,
    tags: ["DeFi"]
  },
  {
    id: 5,
    title: "Explore Base Ecosystem",
    protocol: "Base",
    logo: "https://picsum.photos/seed/baselogo/40/40",
    description: "Bridge to Base and interact with top dApps on the network.",
    duration: "1 Month Left",
    status: "Active",
    difficulty: "Medium",
    participants: "45K",
    xp: 500,
    cubes: 3,
    tags: ["Layer 2", "Trending"]
  },
  {
    id: 6,
    title: "Trade on Synthetix",
    protocol: "Synthetix",
    logo: "https://picsum.photos/seed/snxlogo/40/40",
    description: "Trade synthetic assets with zero slippage on Synthetix.",
    duration: "3 Days Left",
    status: "Active",
    difficulty: "Hard",
    participants: "3.1K",
    xp: 250,
    tags: ["DeFi"]
  },
  {
    id: 7,
    title: "Bridge to Optimism",
    protocol: "Optimism",
    logo: "https://picsum.photos/seed/oplogo/40/40",
    description: "Use the official bridge to transfer ETH to Optimism.",
    duration: "Ongoing",
    status: "Active",
    difficulty: "Easy",
    participants: "18K",
    xp: 100,
    cubes: 1,
    tags: ["Layer 2"]
  },
  {
    id: 8,
    title: "Play Pixels",
    protocol: "Pixels",
    logo: "https://picsum.photos/seed/pixelslogo/40/40",
    description: "Start your farming journey in the Pixels metaverse.",
    duration: "Upcoming",
    status: "Upcoming",
    difficulty: "Easy",
    participants: "102K",
    xp: 150,
    tags: ["Gaming"]
  }
];

interface DiscoverProps {
  setActivePage: (page: string) => void;
  setSelectedCollectionTitle: (title: string) => void;
  setSelectedQuest: (quest: any) => void;
}

export function Discover({ setActivePage, setSelectedCollectionTitle, setSelectedQuest }: DiscoverProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const progressRef = useRef(0);
  const lastTimeRef = useRef<number>(0);
  const DURATION = 5000;

  useEffect(() => {
    let animationFrameId: number;

    const updateProgress = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPaused) {
        progressRef.current += (deltaTime / DURATION) * 100;

        if (progressRef.current >= 100) {
          progressRef.current = 0;
          setCurrentIndex((prev) => (prev + 1) % banners.length);
        }
        setProgress(progressRef.current);
      }
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    progressRef.current = 0;
    setProgress(0);
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToSlide((currentIndex + 1) % banners.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToSlide((currentIndex - 1 + banners.length) % banners.length);
  };

  const currentBanner = banners[currentIndex];

  return (
    <div className="flex-1 flex flex-col w-full">
      <GlowOverlay color={currentBanner.glowColorHex} />
      {/* 修改这里的 max-w-[1100px] 可以控制整个页面内容的最大宽度 */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-10 max-w-[1300px] mx-auto w-full space-y-10 pb-24 relative z-10">
        {/* Hero Section */}
        <div className="relative w-full h-[420px] mb-12 group">
        <section 
          className="relative w-full h-full rounded-[32px] overflow-hidden cursor-pointer flex items-center transition-all duration-300 hover:-translate-y-1 bg-black/[0.02] dark:bg-white/5 backdrop-blur-sm border border-black/[0.04] dark:border-white/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] dark:shadow-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Right side visual wrapper */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-[50%] pointer-events-none select-none z-10">
            {/* Visual Stage */}
            <div className="relative w-full h-full flex items-end justify-end pr-0 md:pr-4 lg:pr-6">
              <div className="relative h-[90%] md:h-[95%] flex items-center justify-center group/stage">
                {/* Core Pedestal SVG */}
                <img 
                  src="/1.svg" 
                  alt="Pedestal Stage" 
                  className="w-auto h-full max-w-full object-contain"
                  style={{
                    maskImage: 'radial-gradient(130% 110% at 50% 0%, black 45%, rgba(0,0,0,0.4) 75%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(130% 110% at 50% 0%, black 45%, rgba(0,0,0,0.4) 75%, transparent 100%)'
                  }}
                  referrerPolicy="no-referrer"
                />
                
                {/* Token SVG (2.svg) - Positioned on top of the pedestal */}
                <div className="absolute top-[-5%] left-[50.5%] -translate-x-1/2 w-[80%] aspect-square flex items-center justify-center">
                  <img 
                    src="/2.svg"
                    alt="Token Frame"
                    className="w-full h-full object-contain z-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-20 p-12 w-full md:w-[60%] flex flex-col justify-center h-full">
            {/* Tag */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/10 border border-black/[0.04] dark:border-white/10 text-xs font-medium text-gray-800 dark:text-white/90 mb-6 backdrop-blur-sm w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mr-2" />
              {currentBanner.activation || 'Featured'}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
              {currentBanner.title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 dark:text-white/70 text-lg mb-8 leading-relaxed max-w-xl font-light">
              {currentBanner.description}
            </p>
            
            {/* Button */}
            <button className="relative inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-black/[0.03] dark:bg-white/10 border border-black/[0.06] dark:border-white/20 text-gray-900 dark:text-white font-medium transition-all duration-300 hover:bg-black/[0.06] dark:hover:bg-white/20 active:scale-[0.98] w-fit group/btn">
              <span className="flex items-center gap-2">
                Explore Now
                <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>
        </section>
        
        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 dark:bg-black/20 backdrop-blur-md border border-black/[0.05] dark:border-white/10 flex items-center justify-center text-gray-800 dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/50 dark:hover:bg-black/40 z-30 shadow-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 dark:bg-black/20 backdrop-blur-md border border-black/[0.05] dark:border-white/10 flex items-center justify-center text-gray-800 dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/50 dark:hover:bg-black/40 z-30 shadow-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Pagination dots with progress */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 items-center pointer-events-none">
          {banners.map((banner, index) => (
            <div 
              key={banner.id}
              onClick={(e) => { e.stopPropagation(); goToSlide(index); }}
              className={`h-1.5 rounded-full cursor-pointer pointer-events-auto overflow-hidden transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-black/20 dark:bg-white/40' 
                  : 'w-1.5 bg-black/20 dark:bg-white/10 hover:bg-black/40 dark:hover:bg-white/20'
              }`}
            >
              {index === currentIndex && (
                <div 
                  className="h-full bg-gray-900 dark:bg-white rounded-full"
                  style={{ width: `${progress}%` }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button 
            key={cat.label}
            onClick={() => setActiveCategory(cat.label)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm ${
              activeCategory === cat.label 
                ? 'bg-orange-500 text-white' 
                : 'bg-transparent text-gray-500 dark:text-gray-400 hover:text-white hover:bg-orange-500/80'
            }`}
          >
            {cat.icon && <cat.icon className="w-4 h-4" />}
            {cat.label}
          </button>
        ))}
      </section>

      {/* Quest Sections */}
      {['Get started', 'Week 1', 'Week 2', 'Week 3', 'Week 4'].map((sectionTitle, idx) => (
        <section key={sectionTitle}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{sectionTitle}</h2>
            <button 
              onClick={() => {
                setSelectedCollectionTitle(sectionTitle);
                setActivePage('collection');
              }}
              className="bg-white dark:bg-[#101114] hover:bg-gray-50 dark:hover:bg-[#101114] text-gray-900 dark:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors border border-gray-200 dark:border-white/5"
            >
              Show all
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quests.slice(idx, idx + 3).map((quest) => (
              <div key={quest.id} onClick={() => { setSelectedQuest(quest); setActivePage('task'); }}>
                <QuestCard quest={quest} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
    </div>
  );
}



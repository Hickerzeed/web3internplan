/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Discover } from './pages/Discover';
import { MyTasks } from './pages/MyTasks';
import { Profile } from './pages/Profile';
import { EditProfile } from './pages/EditProfile';
import { Leagues } from './pages/Leagues';
import { Guilds } from './pages/Guilds';
import { CreateGuild } from './pages/CreateGuild';
import { GuildDetail } from './pages/GuildDetail';
import { MyGuild } from './pages/MyGuild';
import { Leaderboard } from './pages/Leaderboard';
import { Collection } from './pages/Collection';
import { TaskPage } from './pages/TaskPage';
import { Rewards } from './pages/Rewards';
import { RightPanel } from './components/RightPanel';
import { AdminDashboard } from './pages/AdminDashboard';
import { GuildData, Task } from './types';
import SignupFormDemo from './components/ui/signup-form-demo';
import { X } from 'lucide-react';
import { AnimatedGridPattern } from './components/ui/animated-grid-pattern';
import { cn } from './lib/utils';

export default function App() {
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [activePage, setActivePage] = useState<string>('discover');
  const [previousPage, setPreviousPage] = useState<string>('discover');
  const [selectedCollectionTitle, setSelectedCollectionTitle] = useState<string>('');
  const [selectedQuest, setSelectedQuest] = useState<any>(null);

  const handlePageChange = (page: string) => {
    setPreviousPage(activePage);
    setActivePage(page);
  };
  const [personalName, setPersonalName] = useState<string>('0xA199...a1bD');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [socialVisibility, setSocialVisibility] = useState<Record<string, boolean>>({
    twitter: true,
    discord: false,
    telegram: false,
    github: false,
    farcaster: true
  });

  // Mock Current User
  const [currentUser] = useState({ id: 'u1', name: '0xA199...a1bD', role: 'master' as const });

  // Shared Banners State
  const [banners, setBanners] = useState([
    {
      id: 1,
      tag: "Activation",
      title: "Earn with Ample on Base",
      description: "A new way to amplify your money.",
      buttonText: "Explore Now",
      image: "/2.svg",
      bgFrom: "from-[#1a3a2a]",
      bgVia: "via-[#0f251d]",
      bgTo: "to-[#101114]",
      iconColor: "text-green-400",
      iconBg: "bg-[#1a4a3a]",
      iconBorder: "border-green-500/20",
      dotColor: "bg-green-400",
      glowColor: "shadow-[0_0_100px_rgba(74,222,128,0.2)]",
      glowColorHex: "#4ade80",
      platformIcon: "bg-[#00D395]",
      platformSymbol: "A",
      status: "Active"
    },
    {
      id: 2,
      tag: "New Quest",
      title: "Explore the Zora Network",
      description: "Mint, collect, and enjoy pure internet culture.",
      buttonText: "Start Quest",
      image: "/2.svg",
      bgFrom: "from-blue-900/40",
      bgVia: "via-blue-900/20",
      bgTo: "to-[#101114]",
      iconColor: "text-blue-400",
      iconBg: "bg-blue-900/40",
      iconBorder: "border-blue-500/20",
      dotColor: "bg-blue-400",
      glowColor: "shadow-[0_0_100px_rgba(96,165,250,0.2)]",
      glowColorHex: "#60a5fa",
      platformIcon: "bg-[#0066FF]",
      platformSymbol: "Z",
      status: "Draft"
    },
    {
      id: 3,
      tag: "Trending",
      title: "Provide Liquidity on Uniswap",
      description: "Earn fees by providing liquidity to top pools.",
      buttonText: "Provide Liquidity",
      image: "/2.svg",
      bgFrom: "from-pink-900/40",
      bgVia: "via-pink-900/20",
      bgTo: "to-[#101114]",
      iconColor: "text-pink-400",
      iconBg: "bg-pink-900/40",
      iconBorder: "border-pink-500/20",
      dotColor: "bg-pink-400",
      glowColor: "shadow-[0_0_100px_rgba(244,114,182,0.2)]",
      glowColorHex: "#f472b6",
      platformIcon: "bg-[#FF007A]",
      platformSymbol: "U",
      status: "Active"
    },
    {
      id: 4,
      tag: "Special Event",
      title: "Moledao Web3 Bootcamp",
      description: "Join the ultimate Web3 learning experience.",
      buttonText: "Join Bootcamp",
      image: "/2.svg",
      bgFrom: "from-purple-900/40",
      bgVia: "via-purple-900/20",
      bgTo: "to-[#101114]",
      iconColor: "text-purple-400",
      iconBg: "bg-purple-900/40",
      iconBorder: "border-purple-500/20",
      dotColor: "bg-purple-400",
      glowColor: "shadow-[0_0_100px_rgba(192,132,252,0.2)]",
      glowColorHex: "#c084fc",
      platformIcon: "bg-[#8A2BE2]",
      platformSymbol: "M",
      status: "Active"
    }
  ]);

  // Mock My Guild State
  const [myGuild, setMyGuild] = useState<GuildData | null>({
    id: 'g1',
    name: 'The Questing Elite',
    points: '1.5M',
    maxMembers: 50,
    members: [
      { id: 'u1', name: '10090.eth', role: 'master', avatar: 'https://picsum.photos/seed/u1/40/40', level: 112, cubes: '36K', xp: '57K' },
      { id: 'u2', name: 'dfhcfhdfhdfhfdgfdgfd.eth', role: 'member', avatar: 'https://picsum.photos/seed/u2/40/40', level: 108, cubes: '32K', xp: '46K' },
      { id: 'u3', name: 'Web3Dev', role: 'member', avatar: 'https://picsum.photos/seed/u3/40/40', level: 45, cubes: '12K', xp: '18K' },
    ],
    tasks: [
      { id: 't1', title: 'Abstract: Matcha', description: 'Complete your first swap on Matcha.', status: 'pending', proof: 'https://matcha.xyz/tx/123', studentId: 'u2', studentName: 'dfhcfhdfhdfhfdgfdgfd.eth' },
      { id: 't2', title: 'Abstract: Cryptoys', description: 'Mint your first Cryptoy.', status: 'in-progress', studentId: 'u3', studentName: 'Web3Dev' },
      { id: 't3', title: 'Zora: Mint a podcast', description: 'Mint any podcast episode on Zora Network.', status: 'pending', proof: 'https://zora.co/tx/456', studentId: 'u3', studentName: 'Web3Dev' },
      { id: 't4', title: 'Layer3: Daily Streak', description: 'Maintain a 7-day streak on Layer3.', status: 'pending', proof: 'https://layer3.xyz/tx/789', studentId: 'u2', studentName: 'dfhcfhdfhdfhfdgfdgfd.eth' },
      { id: 't5', title: 'Uniswap: Swap on Base', description: 'Swap at least $10 worth of tokens on Base network.', status: 'pending', proof: 'https://basescan.org/tx/abc', studentId: 'u3', studentName: 'Web3Dev' },
      { id: 't6', title: 'Farcaster: Cast with frame', description: 'Publish a cast containing an interactive frame.', status: 'pending', proof: 'https://warpcast.com/tx/def', studentId: 'u2', studentName: 'dfhcfhdfhdfhfdgfdgfd.eth' },
      { id: 't7', title: 'Optimism: Delegate OP', description: 'Delegate your OP tokens to a representative.', status: 'pending', proof: 'https://optimistic.etherscan.io/tx/111', studentId: 'u2', studentName: 'dfhcfhdfhdfhfdgfdgfd.eth' },
      { id: 't8', title: 'Arbitrum: Provide Liquidity', description: 'Provide liquidity to any pool on Arbitrum One.', status: 'pending', proof: 'https://arbiscan.io/tx/222', studentId: 'u2', studentName: 'dfhcfhdfhdfhfdgfdgfd.eth' },
      { id: 't9', title: 'Polygon: Mint NFT', description: 'Mint a free NFT on Polygon PoS.', status: 'pending', proof: 'https://polygonscan.com/tx/333', studentId: 'u2', studentName: 'dfhcfhdfhdfhfdgfdgfd.eth' },
      { id: 't10', title: 'Starknet: Deploy Contract', description: 'Deploy a simple smart contract on Starknet testnet.', status: 'pending', proof: 'https://testnet.starkscan.co/tx/444', studentId: 'u2', studentName: 'dfhcfhdfhdfhfdgfdgfd.eth' },
      { id: 't11', title: 'zkSync: Bridge Funds', description: 'Bridge ETH to zkSync Era mainnet.', status: 'pending', proof: 'https://explorer.zksync.io/tx/555', studentId: 'u2', studentName: 'dfhcfhdfhdfhfdgfdgfd.eth' },
      { id: 't12', title: 'Scroll: Swap tokens', description: 'Perform a swap on any DEX on Scroll.', status: 'pending', proof: 'https://scrollscan.com/tx/666', studentId: 'u2', studentName: 'dfhcfhdfhdfhfdgfdgfd.eth' },
      { id: 't13', title: 'Linea: Complete Quest', description: 'Complete a Linea Voyage quest.', status: 'pending', proof: 'https://lineascan.build/tx/777', studentId: 'u2', studentName: 'dfhcfhdfhdfhfdgfdgfd.eth' },
      { id: 't14', title: 'Base: Mint Onchain Summer', description: 'Mint an Onchain Summer NFT.', status: 'pending', proof: 'https://basescan.org/tx/888', studentId: 'u2', studentName: 'dfhcfhdfhdfhfdgfdgfd.eth' },
      { id: 't15', title: 'Zora: Create Collection', description: 'Create your own NFT collection on Zora.', status: 'pending', proof: 'https://zora.co/tx/999', studentId: 'u2', studentName: 'dfhcfhdfhdfhfdgfdgfd.eth' },
      { id: 't16', title: 'Farcaster: 100 Followers', description: 'Reach 100 followers on Farcaster.', status: 'pending', proof: 'https://warpcast.com/u2', studentId: 'u2', studentName: 'dfhcfhdfhdfhfdgfdgfd.eth' },
    ],
    activities: [
      { id: 'a1', memberId: 'u2', memberName: 'dfhcfhdfhdfhfdgfdgfd.eth', memberAvatar: 'https://picsum.photos/seed/u2/40/40', type: 'task_completed', description: 'Completed task "Abstract: Matcha"', timestamp: '2 hours ago' },
      { id: 'a2', memberId: 'u3', memberName: 'Web3Dev', memberAvatar: 'https://picsum.photos/seed/u3/40/40', type: 'checked_in', description: 'Checked in to the guild', timestamp: '5 hours ago' },
      { id: 'a3', memberId: 'u1', memberName: '10090.eth', memberAvatar: 'https://picsum.photos/seed/u1/40/40', type: 'task_completed', description: 'Completed task "Abstract: Cryptoys"', timestamp: '1 day ago' },
    ],
    joinRequests: [
      { id: 'r1', userId: 'u4', userName: 'newbie.eth', userAvatar: 'https://picsum.photos/seed/u4/40/40', userLevel: 12, timestamp: '10 mins ago', status: 'pending' },
      { id: 'r2', userId: 'u5', userName: 'pro_gamer', userAvatar: 'https://picsum.photos/seed/u5/40/40', userLevel: 89, timestamp: '1 hour ago', status: 'pending' },
    ]
  });

  const handleTaskSubmit = (taskId: string, proof: string) => {
    if (!myGuild) return;
    setMyGuild({
      ...myGuild,
      tasks: myGuild.tasks.map(t => t.id === taskId ? { ...t, status: 'pending', proof } : t)
    });
  };

  const handleTaskReview = (taskId: string, approved: boolean, reason?: string) => {
    if (!myGuild) return;
    setMyGuild({
      ...myGuild,
      tasks: myGuild.tasks.map(t => t.id === taskId ? { ...t, status: approved ? 'completed' : 'failed', failReason: reason } : t)
    });
  };

  const handleKickMember = (memberId: string) => {
    if (!myGuild) return;
    setMyGuild({
      ...myGuild,
      members: myGuild.members.filter(m => m.id !== memberId)
    });
  };

  const handleInviteMember = (name: string) => {
    if (!myGuild) return;
    const newMember = { id: `u${Date.now()}`, name, role: 'member' as const, avatar: `https://picsum.photos/seed/${name}/40/40`, level: 1, cubes: '0', xp: '0' };
    setMyGuild({
      ...myGuild,
      members: [...myGuild.members, newMember]
    });
  };

  const handleJoinRequest = (requestId: string, approved: boolean) => {
    if (!myGuild || !myGuild.joinRequests) return;
    
    const request = myGuild.joinRequests.find(r => r.id === requestId);
    if (!request) return;

    let newMembers = myGuild.members;
    if (approved && myGuild.members.length < myGuild.maxMembers) {
      newMembers = [
        ...myGuild.members,
        {
          id: request.userId,
          name: request.userName,
          role: 'member',
          avatar: request.userAvatar,
          level: request.userLevel,
          cubes: '0',
          xp: '0'
        }
      ];
    }

    setMyGuild({
      ...myGuild,
      members: newMembers,
      joinRequests: myGuild.joinRequests.map(r => 
        r.id === requestId ? { ...r, status: approved ? 'approved' : 'rejected' } : r
      )
    });
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="flex h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-gray-900 dark:text-white font-sans overflow-hidden transition-colors duration-300 relative">
      {/* Global Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top-left Orange Glow */}
        <div className="absolute -top-[100px] -left-[100px] w-[400px] h-[400px] rounded-full bg-orange-500/20 dark:bg-orange-500/10 blur-[100px] animate-pulse-slow" />

        {(activePage === 'discover' || activePage === 'mytasks') && (
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
            )}
          />
        )}
      </div>

      {/* Background layer for GlowOverlay that spans the ENTIRE screen */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div id="glow-portal-root" className="w-full h-full relative" />
      </div>

      <div className="relative z-10 flex h-full w-full">
        <Sidebar activePage={activePage} setActivePage={handlePageChange} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <TopBar 
            isRightPanelOpen={isRightPanelOpen} 
            setIsRightPanelOpen={setIsRightPanelOpen} 
            isDark={isDark}
            setIsDark={setIsDark}
            setActivePage={handlePageChange}
            isLoggedIn={isLoggedIn}
            onLoginClick={() => setShowLoginModal(true)}
          />
          <div className="flex-1 flex overflow-hidden relative z-10">
            <main id="main-scroll-container" className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide relative">
              <div className="relative z-10 min-h-full flex flex-col">
                {activePage === 'discover' && <Discover setActivePage={handlePageChange} setSelectedCollectionTitle={setSelectedCollectionTitle} setSelectedQuest={setSelectedQuest} banners={banners} />}
                {activePage === 'mytasks' && <MyTasks setActivePage={handlePageChange} setSelectedQuest={setSelectedQuest} />}
                {activePage === 'collection' && <Collection title={selectedCollectionTitle} setActivePage={handlePageChange} setSelectedQuest={setSelectedQuest} />}
                {activePage === 'task' && selectedQuest && <TaskPage quest={selectedQuest} onBack={() => setActivePage(previousPage)} />}
                {activePage === 'profile' && <Profile setActivePage={handlePageChange} socialVisibility={socialVisibility} personalName={personalName} />}
                {activePage === 'edit-profile' && <EditProfile socialVisibility={socialVisibility} setSocialVisibility={setSocialVisibility} personalName={personalName} setPersonalName={setPersonalName} />}
                {activePage === 'leagues' && <Leagues />}
                {activePage === 'guilds' && <Guilds setActivePage={handlePageChange} myGuild={myGuild} />}
                {activePage === 'create-guild' && <CreateGuild setActivePage={handlePageChange} />}
                {activePage === 'guild-detail' && <GuildDetail setActivePage={handlePageChange} />}
                {activePage === 'my-guild' && myGuild && <MyGuild setActivePage={handlePageChange} myGuild={myGuild} currentUser={currentUser} onKick={handleKickMember} onInvite={handleInviteMember} onReview={handleTaskReview} onSubmitTask={handleTaskSubmit} onReviewJoinRequest={handleJoinRequest} />}
                {activePage === 'leaderboard' && <Leaderboard />}
                {activePage === 'rewards' && <Rewards />}
                {activePage === 'admin' && <AdminDashboard setActivePage={handlePageChange} banners={banners} setBanners={setBanners} />}
              </div>
            </main>
            {isRightPanelOpen && <RightPanel isLoggedIn={isLoggedIn} />}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute -top-10 right-0 p-2 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <SignupFormDemo />
          </div>
        </div>
      )}
    </div>
  );
}




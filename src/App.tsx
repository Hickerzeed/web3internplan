/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, UIEvent, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Discover } from './pages/Discover';
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

export default function App() {
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [activePage, setActivePage] = useState<string>('discover');
  const [selectedCollectionTitle, setSelectedCollectionTitle] = useState<string>('');
  const [selectedQuest, setSelectedQuest] = useState<any>(null);
  const [personalName, setPersonalName] = useState<string>('0xA199...a1bD');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  // Mock My Guild State
  const [myGuild, setMyGuild] = useState<GuildData | null>({
    id: 'g1',
    name: 'The Questing Elite',
    points: '1.5M',
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

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const scrollTotal = target.scrollHeight - target.clientHeight;
    if (scrollTotal > 0) {
      setScrollProgress((target.scrollTop / scrollTotal) * 100);
    } else {
      setScrollProgress(0);
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-[#101114] text-gray-900 dark:text-white font-sans overflow-hidden transition-colors duration-300 relative">
      <div className="relative z-10 flex h-full w-full">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {/* Background layer for GlowOverlay that spans the ENTIRE right side (including behind TopBar) */}
          <div className="absolute inset-0 pointer-events-none z-0 flex">
            <div id="glow-portal-root" className="flex-1 relative" />
            {/* 这里的 w-[360px] 必须和 RightPanel.tsx 中的宽度保持一致 */}
            {isRightPanelOpen && <div className="w-[345px] shrink-0" />}
          </div>

          <TopBar 
            isRightPanelOpen={isRightPanelOpen} 
            setIsRightPanelOpen={setIsRightPanelOpen} 
            scrollProgress={scrollProgress}
            isDark={isDark}
            setIsDark={setIsDark}
            setActivePage={setActivePage}
            isLoggedIn={isLoggedIn}
            onLoginClick={() => setShowLoginModal(true)}
          />
          <div className="flex-1 flex overflow-hidden relative z-10">
            <main id="main-scroll-container" className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide relative" onScroll={handleScroll}>
              <div className="relative z-10 min-h-full flex flex-col">
                {activePage === 'discover' && <Discover setActivePage={setActivePage} setSelectedCollectionTitle={setSelectedCollectionTitle} setSelectedQuest={setSelectedQuest} />}
                {activePage === 'collection' && <Collection title={selectedCollectionTitle} setActivePage={setActivePage} setSelectedQuest={setSelectedQuest} />}
                {activePage === 'task' && selectedQuest && <TaskPage quest={selectedQuest} onBack={() => setActivePage('discover')} />}
                {activePage === 'profile' && <Profile setActivePage={setActivePage} socialVisibility={socialVisibility} personalName={personalName} />}
                {activePage === 'edit-profile' && <EditProfile socialVisibility={socialVisibility} setSocialVisibility={setSocialVisibility} personalName={personalName} setPersonalName={setPersonalName} />}
                {activePage === 'leagues' && <Leagues />}
                {activePage === 'guilds' && <Guilds setActivePage={setActivePage} myGuild={myGuild} />}
                {activePage === 'create-guild' && <CreateGuild setActivePage={setActivePage} />}
                {activePage === 'guild-detail' && <GuildDetail setActivePage={setActivePage} />}
                {activePage === 'my-guild' && myGuild && <MyGuild setActivePage={setActivePage} myGuild={myGuild} currentUser={currentUser} onKick={handleKickMember} onInvite={handleInviteMember} onReview={handleTaskReview} onSubmitTask={handleTaskSubmit} />}
                {activePage === 'leaderboard' && <Leaderboard />}
                {activePage === 'rewards' && <Rewards />}
                {activePage === 'admin' && <AdminDashboard setActivePage={setActivePage} />}
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




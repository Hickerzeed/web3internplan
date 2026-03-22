import React, { useState } from 'react';
import { Search, Filter, TrendingUp, CheckCircle2, Clock, AlertCircle, PlayCircle } from 'lucide-react';
import { QuestCard } from '../components/QuestCard';

// Mock data for the user's tasks
const mockTasks = [
  {
    id: 't1',
    title: 'Abstract: Matcha',
    protocol: 'Abstract',
    logo: 'https://picsum.photos/seed/matcha/40/40',
    description: 'Complete your first swap on Matcha.',
    duration: '2 Days Left',
    status: 'Active',
    category: 'Technical',
    tags: ['DeFi', 'Swap'],
    xp: 500,
    cubes: 10,
    taskStatus: 'in-progress' // in-progress, pending, approved, rejected
  },
  {
    id: 't2',
    title: 'Zora: Mint a podcast',
    protocol: 'Zora',
    logo: 'https://picsum.photos/seed/zora/40/40',
    description: 'Mint any podcast episode on Zora Network.',
    duration: 'Ended',
    status: 'Ended',
    category: 'General',
    tags: ['NFT', 'Mint'],
    xp: 300,
    cubes: 5,
    taskStatus: 'pending',
    submittedText: 'I minted the latest Bankless podcast episode on Zora. Here is the transaction hash: 0xabc...123'
  },
  {
    id: 't3',
    title: 'Layer3: Daily Streak',
    protocol: 'Layer3',
    logo: 'https://picsum.photos/seed/layer3/40/40',
    description: 'Maintain a 7-day streak on Layer3.',
    duration: 'Ended',
    status: 'Ended',
    category: 'Operational',
    tags: ['Social', 'Streak'],
    xp: 1000,
    cubes: 20,
    taskStatus: 'approved',
    submittedText: 'Completed my 7-day streak on Layer3. Profile link: layer3.xyz/u/0x123'
  },
  {
    id: 't4',
    title: 'Create a Dune Dashboard',
    protocol: 'Dune',
    logo: 'https://picsum.photos/seed/dune/40/40',
    description: 'Create a comprehensive Dune dashboard for a DeFi protocol.',
    duration: '5 Days Left',
    status: 'Active',
    category: 'Bounty',
    tags: ['Data', 'Analytics'],
    xp: 5000,
    cubes: 100,
    taskStatus: 'rejected',
    rejectReason: 'Dashboard lacks sufficient data points and visualizations.',
    submittedText: 'Here is my Dune dashboard for Uniswap on Base: dune.com/0x123/uniswap-base'
  },
  {
    id: 't5',
    title: 'Uniswap: Swap on Base',
    protocol: 'Uniswap',
    logo: 'https://picsum.photos/seed/uniswap/40/40',
    description: 'Swap at least $10 worth of tokens on Base network.',
    duration: '1 Day Left',
    status: 'Active',
    category: 'Technical',
    tags: ['DeFi', 'Base'],
    xp: 400,
    cubes: 8,
    taskStatus: 'in-progress'
  }
];

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'pending', label: 'Pending Review' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' }
];

interface MyTasksProps {
  setActivePage: (page: string) => void;
  setSelectedQuest: (quest: any) => void;
}

export function MyTasks({ setActivePage, setSelectedQuest }: MyTasksProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTaskClick = (task: any) => {
    setSelectedQuest(task);
    setActivePage('task');
  };

  const filteredTasks = mockTasks.filter(task => {
    const matchesTab = activeTab === 'all' || task.taskStatus === activeTab;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.protocol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress': return <PlayCircle className="w-4 h-4 text-blue-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'approved': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'rejected': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in-progress': return 'In Progress';
      case 'pending': return 'Pending Review';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  return (
    <div className="min-h-full w-full p-6 md:p-8 lg:p-10 max-w-[1600px] mx-auto bg-transparent">
      {/* Hero Banner */}
      <div className="relative w-full h-[240px] rounded-[32px] overflow-hidden mb-8 bg-black/[0.02] dark:bg-white/5 backdrop-blur-sm border border-black/[0.04] dark:border-white/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] dark:shadow-none transition-all duration-300 flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-10 mix-blend-overlay"></div>
        
        {/* Animated Glow Circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-[-20%] right-[10%] w-[350px] h-[350px] bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-[100px] animate-blob-slow" />
          <div className="absolute top-[10%] right-[-5%] w-[250px] h-[250px] bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-[70px] animate-blob-fast" />
        </div>
        
        <div className="relative z-10 p-10 flex-1 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/10 border border-black/[0.04] dark:border-white/10 text-xs font-medium text-gray-800 dark:text-white/90 mb-4 w-fit backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
            My Task Progress
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Track Your Learning Journey
          </h1>
          <p className="text-gray-600 dark:text-white/70 text-sm md:text-base max-w-xl flex items-center gap-2 font-light">
            <Clock className="w-4 h-4" /> Last updated: Just now
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 dark:border-white/10 mb-6 overflow-x-auto scrollbar-hide">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 px-1 text-sm font-semibold transition-colors relative whitespace-nowrap ${
              activeTab === tab.id 
                ? 'text-orange-500 dark:text-orange-400' 
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 dark:bg-orange-400 rounded-t-full shadow-[0_-2px_8px_rgba(249,115,22,0.5)]" />
            )}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-transparent dark:border-white/10 rounded-xl text-sm font-medium transition-colors shrink-0">
            <Filter className="w-4 h-4" />
            Show Filters
          </button>
          <div className="relative flex-1 sm:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-gray-500"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-transparent dark:border-white/10 rounded-xl text-sm font-medium transition-colors w-full sm:w-auto justify-center">
            <TrendingUp className="w-4 h-4" />
            Trending
          </button>
        </div>
      </div>

      {/* Task Grid */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <div key={task.id} className="relative group cursor-pointer" onClick={() => handleTaskClick(task)}>
              <QuestCard quest={task} />
              
              {/* Reject Reason Tooltip/Display */}
              {task.taskStatus === 'rejected' && task.rejectReason && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full w-[90%] bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40 shadow-xl backdrop-blur-md pointer-events-none">
                  <div className="font-bold mb-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Reason for rejection:
                  </div>
                  {task.rejectReason}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No tasks found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            We couldn't find any tasks matching your current filters. Try adjusting your search or selecting a different tab.
          </p>
        </div>
      )}
    </div>
  );
}

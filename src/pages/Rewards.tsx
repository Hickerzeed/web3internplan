import React from 'react';
import { Wallet, Box, Hexagon, Zap, Gift, CheckCircle2 } from 'lucide-react';
import { CuberIcon } from '../components/CuberIcon';
import { XPIcon } from '../components/XPIcon';

export function Rewards() {
  return (
    <div className="flex-1 flex flex-col w-full min-h-full bg-transparent text-gray-900 dark:text-white overflow-y-auto scrollbar-hide transition-colors duration-300">
      {/* Container */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-10 max-w-[1300px] mx-auto w-full space-y-10 pb-24 relative z-10">
        
        {/* Top Hero Section */}
        <div className="relative bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-3xl p-8 overflow-hidden flex flex-col md:flex-row justify-between min-h-[280px] shadow-sm">
          <div className="relative z-10 flex flex-col justify-between w-full">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Your earnings on Moledao</div>
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-8">1,250<span className="text-gray-400 dark:text-gray-500 text-3xl">.00 XP</span></div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 flex items-center gap-3 flex-1 min-w-[160px] max-w-[240px]">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-black/50 flex items-center justify-center shrink-0">
                  <div className="w-3 h-3 bg-blue-500 dark:bg-white rounded-sm rotate-45" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Tasks</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">850 XP</div>
                </div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3 flex-1 min-w-[160px] max-w-[240px]">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <Box className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Bounties</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">300 XP</div>
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-white/5 border border-orange-200 dark:border-white/10 rounded-2xl p-4 flex items-center gap-3 flex-1 min-w-[160px] max-w-[240px]">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-orange-600 dark:text-gray-400 font-medium">Campaigns</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">100 XP</div>
                </div>
              </div>
            </div>
          </div>
          {/* Illustration Placeholder */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:flex justify-end items-center pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-l from-emerald-500/5 dark:from-emerald-500/10 to-transparent" />
            <img src="/1.svg" alt="Illustration" className="h-[150%] object-contain translate-x-1/4 -translate-y-10 opacity-60 dark:opacity-80" style={{ filter: 'hue-rotate(120deg) brightness(0.9)' }} />
          </div>
        </div>

        {/* XP Rewards Section */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">XP Rewards</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-2">
                每完成一个任务，都可以获得XP
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium flex justify-between mb-2">
                <span>XP Reward Rate</span>
                <span className="text-gray-900 dark:text-white ml-8">0%</span>
              </div>
              <div className="flex gap-1.5">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-2.5 h-4 rounded-full bg-gray-200 dark:bg-white/10" />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Cards */}
            <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-48 shadow-sm">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-6">10%</div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <XPIcon className="w-4 h-4 text-[8px]" />
                Any amount + <Hexagon className="w-4 h-4 text-orange-400 fill-orange-400/20 shrink-0" />
              </div>
            </div>
            <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-48 shadow-sm">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-6">25%</div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <XPIcon className="w-4 h-4 text-[8px]" />
                ≥4,500 Locked
              </div>
              <div className="flex items-center w-full gap-2 mb-3">
                <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
                <div className="text-[10px] text-gray-400 dark:text-gray-600 font-bold">OR</div>
                <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <XPIcon className="w-4 h-4 text-[8px]" />
                ≥1,500 + <Hexagon className="w-4 h-4 text-gray-300 fill-gray-300/20 shrink-0" />
              </div>
            </div>
            <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-48 shadow-sm">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-6">50%</div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <XPIcon className="w-4 h-4 text-[8px]" />
                ≥9,000 Locked
              </div>
              <div className="flex items-center w-full gap-2 mb-3">
                <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
                <div className="text-[10px] text-gray-400 dark:text-gray-600 font-bold">OR</div>
                <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <XPIcon className="w-4 h-4 text-[8px]" />
                ≥3,000 + <Hexagon className="w-4 h-4 text-yellow-400 fill-yellow-400/20 shrink-0" />
              </div>
            </div>
            <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-48 shadow-sm">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-6">75%</div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <XPIcon className="w-4 h-4 text-[8px]" />
                ≥15,500 Locked
              </div>
              <div className="flex items-center w-full gap-2 mb-3">
                <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
                <div className="text-[10px] text-gray-400 dark:text-gray-600 font-bold">OR</div>
                <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <XPIcon className="w-4 h-4 text-[8px]" />
                ≥5,000 + <Hexagon className="w-4 h-4 text-purple-400 fill-purple-400/20 shrink-0" />
              </div>
            </div>
            <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-48 shadow-sm">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-6">100%</div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <XPIcon className="w-4 h-4 text-[8px]" />
                ≥22,500 Locked
              </div>
              <div className="flex items-center w-full gap-2 mb-3">
                <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
                <div className="text-[10px] text-gray-400 dark:text-gray-600 font-bold">OR</div>
                <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <XPIcon className="w-4 h-4 text-[8px]" />
                ≥7,500 + <Hexagon className="w-4 h-4 text-cyan-400 fill-cyan-400/20 shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Season Banner */}
        <div className="bg-gradient-to-r from-purple-100 via-white to-white dark:from-purple-900/40 dark:via-[#161719] dark:to-[#161719] border border-purple-200 dark:border-white/5 rounded-2xl p-5 flex items-center justify-between relative overflow-hidden shadow-sm">
          <div className="absolute left-0 bottom-0 w-32 h-16 bg-gradient-to-t from-purple-500/20 dark:from-purple-500/30 to-transparent blur-xl" />
          <div className="relative z-10">
            <div className="font-bold text-sm text-purple-900 dark:text-white mb-1">Season 1 进行中</div>
            <div className="text-xs text-purple-700 dark:text-gray-400">Season 1 is currently active. Complete tasks to earn rewards.</div>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-white/5 px-4 py-2 rounded-xl relative z-10 border border-purple-100 dark:border-white/10 shadow-sm">
            <CuberIcon size="md" className="w-5 h-5" />
            <span className="font-bold text-gray-900 dark:text-white">12</span>
          </div>
        </div>

        {/* League and Lootbox */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* League Card */}
          <div className="bg-gradient-to-br from-orange-50 to-white dark:from-orange-900/20 dark:to-[#161719] border border-orange-100 dark:border-white/5 rounded-3xl p-8 relative overflow-hidden min-h-[320px] flex flex-col justify-between shadow-sm">
            <div className="absolute left-0 top-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="flex justify-between items-start relative z-10">
              <Hexagon className="w-16 h-16 text-orange-500 dark:text-orange-400 fill-orange-500/20 dark:fill-orange-400/20 drop-shadow-[0_0_15px_rgba(249,115,22,0.2)] dark:drop-shadow-[0_0_15px_rgba(251,146,60,0.3)]" />
              <div className="flex items-center gap-3 bg-white dark:bg-white/5 border border-orange-100 dark:border-white/5 px-3 py-1.5 rounded-full shadow-sm">
                <div className="flex -space-x-2">
                  <img src="https://picsum.photos/seed/u1/24/24" className="w-6 h-6 rounded-full border border-white dark:border-[#161719]" alt="user" />
                  <img src="https://picsum.photos/seed/u2/24/24" className="w-6 h-6 rounded-full border border-white dark:border-[#161719]" alt="user" />
                </div>
                <div className="text-xs flex flex-col leading-tight">
                  <span className="font-bold text-gray-900 dark:text-white">8.6K</span>
                  <span className="text-gray-500 dark:text-gray-400 text-[10px]">Participants</span>
                </div>
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Your League</div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Bronze</div>
              
              <div className="text-sm font-bold text-gray-900 dark:text-white mb-1">Progress estimate</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">Positions are updated every hour</div>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span>Demotion</span>
                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full relative">
                  <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(255,255,255,0.8)] border border-gray-200 dark:border-transparent" />
                </div>
                <span>Promotion</span>
              </div>
            </div>
          </div>

          {/* Lootbox Inventory */}
          <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center min-h-[320px] shadow-sm">
            <div className="w-full flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lootbox Inventory</h2>
            </div>
            
            <div className="bg-gray-50 dark:bg-[#1e1f24] border border-gray-200 dark:border-white/5 rounded-2xl p-6 w-full max-w-sm shadow-sm dark:shadow-xl flex-1 flex flex-col justify-center">
              <div className="text-sm font-bold text-gray-900 dark:text-white text-left mb-5">Lootbox</div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <CuberIcon size="md" className="w-7 h-7" />
                  <CuberIcon size="md" className="w-7 h-7" />
                  <div className="w-7 h-7 bg-gray-200 dark:bg-white/5 rounded-md" />
                  <div className="w-7 h-7 bg-gray-200 dark:bg-white/5 rounded-md" />
                  <div className="w-7 h-7 bg-gray-200 dark:bg-white/5 rounded-md" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">2/5</span>
                  <Gift className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <button disabled className="w-full py-3.5 bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 rounded-xl font-bold cursor-not-allowed transition-all flex items-center justify-center gap-2">
                Collect 5 Cubers to Open
              </button>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Your reward inventory is empty</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Unlock a Lootbox every 5 CUBE mints</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

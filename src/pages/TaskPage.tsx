import React, { useState, useEffect } from 'react';
import { Heart, Trophy, ChevronLeft, ChevronRight, ExternalLink, Edit2, Check, Hexagon, Box, Star, Loader2, X, Upload, Clock, AlertCircle } from 'lucide-react';
import { XPIcon } from '../components/XPIcon';
import { CuberIcon } from '../components/CuberIcon';

interface TaskPageProps {
  quest: any;
  onBack: () => void;
}

type TaskStatus = 'idle' | 'pending' | 'approved' | 'claiming' | 'minting' | 'minted' | 'rejected';

export function TaskPage({ quest, onBack }: TaskPageProps) {
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(quest.taskStatus || 'idle');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitText, setSubmitText] = useState(quest.submittedText || '');
  const [submitFile, setSubmitFile] = useState<File | null>(null);
  const [xpCount, setXpCount] = useState(0);
  const [levelProgress, setLevelProgress] = useState(65); // Mock level progress

  // XP Animation effect
  useEffect(() => {
    if (taskStatus === 'claiming') {
      const targetXp = quest.xp || 100;
      let current = 0;
      const interval = setInterval(() => {
        current += Math.ceil(targetXp / 20);
        if (current >= targetXp) {
          current = targetXp;
          clearInterval(interval);
          // Simulate level up progress
          setTimeout(() => setLevelProgress(85), 500);
        }
        setXpCount(current);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [taskStatus, quest.xp]);

  const renderCenterContent = () => {
    switch (taskStatus) {
      case 'idle':
        return (
          <div className="flex flex-col items-center text-center max-w-lg z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-24 h-24 mb-8 relative">
              <div className="absolute inset-0 bg-black/5 dark:bg-black/40 rounded-3xl rotate-3 opacity-50 blur-xl" />
              <div className="relative w-full h-full bg-white dark:bg-[#1e1f24] rounded-3xl flex items-center justify-center shadow-xl dark:shadow-2xl border border-gray-100 dark:border-white/10">
                {quest.logo ? (
                  <img src={quest.logo} alt="Task" className="w-12 h-12 rounded-xl" />
                ) : (
                  <Box className="w-12 h-12 text-gray-900 dark:text-white" />
                )}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{quest.title || 'Complete the Task'}</h2>
            <p className="text-gray-500 dark:text-white/60 text-base mb-8">
              {quest.description || 'Follow the instructions to complete this task and earn rewards. Make sure to submit your proof of completion.'}
            </p>
            <button className="flex items-center gap-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200 dark:border-white/10 shadow-sm mb-4">
              Open Task Link
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        );
      case 'pending':
        return (
          <div className="flex flex-col items-center text-center max-w-lg z-10 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 mb-8 rounded-full bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center">
              <Clock className="w-12 h-12 text-yellow-600 dark:text-yellow-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Under Review</h2>
            <p className="text-gray-500 dark:text-white/60 text-base mb-6">
              Your submission is currently being reviewed by our Teaching Assistants.
            </p>
            <div className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-left mb-4">
              <div className="text-xs font-bold text-gray-400 uppercase mb-2">Your Submission</div>
              <div className="text-sm text-gray-700 dark:text-gray-300 italic">
                "{submitText || 'No description provided'}"
              </div>
            </div>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex flex-col items-center text-center max-w-lg z-10 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 mb-8 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Submission Rejected</h2>
            <div className="w-full p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-left mb-8">
              <div className="text-xs font-bold text-red-500 uppercase mb-2">Reason for Rejection</div>
              <div className="text-sm text-red-700 dark:text-red-400">
                {quest.rejectReason || 'Please review the task requirements and try again.'}
              </div>
            </div>
          </div>
        );
      case 'approved':
        return (
          <div className="flex flex-col items-center text-center max-w-lg z-10 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 mb-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <Check className="w-12 h-12 text-emerald-600 dark:text-emerald-500" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Congratulations!</h2>
            <p className="text-gray-500 dark:text-white/60 text-lg mb-8">
              Your hard work paid off! Your submission has been approved.
            </p>
          </div>
        );
      case 'claiming':
        return (
          <div className="flex flex-col items-center text-center max-w-lg z-10 animate-in fade-in zoom-in duration-500">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
              <Trophy className="w-32 h-32 text-blue-500 fill-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Level Up!</h2>
            
            <div className="flex items-center justify-center gap-12 mb-10">
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-[#00D395] mb-2 flex items-center gap-3">
                  <XPIcon className="w-10 h-10" />
                  <span>+{xpCount}</span>
                </div>
                <div className="text-gray-500 dark:text-white/60 font-medium uppercase tracking-wider text-sm">XP Earned</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 flex items-center justify-center mb-2">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200 dark:text-white/10"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * levelProgress) / 100}
                      className="text-blue-500 transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <span className="absolute text-2xl font-bold text-gray-900 dark:text-white">12</span>
                </div>
                <div className="text-gray-500 dark:text-white/60 font-medium uppercase tracking-wider text-sm">Current Level</div>
              </div>
            </div>
          </div>
        );
      case 'minting':
        return (
          <div className="flex flex-col items-center text-center max-w-lg z-10 animate-in fade-in zoom-in duration-500">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
              <CuberIcon size="5xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Mint Your Cuber</h2>
            <p className="text-gray-500 dark:text-white/60 text-base mb-8">
              You've earned a Cuber! Mint it now to add it to your collection.
            </p>
          </div>
        );
      case 'minted':
        return (
          <div className="flex flex-col items-center text-center max-w-lg z-10 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 mb-8 rounded-full bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center">
              <Check className="w-12 h-12 text-yellow-600 dark:text-yellow-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Cuber Minted!</h2>
            <p className="text-gray-500 dark:text-white/60 text-base mb-8">
              Successfully added to your wallet.
            </p>
          </div>
        );
    }
  };

  const renderBottomRightButton = () => {
    switch (taskStatus) {
      case 'idle':
        return (
          <button 
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-10 py-3 rounded-xl bg-[#007AFF] hover:bg-[#0066CC] text-white font-bold transition-all shadow-lg shadow-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Submit Task
          </button>
        );
      case 'pending':
        return (
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setTaskStatus('idle')}
              className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white font-medium transition-all"
            >
              Withdraw
            </button>
            <button 
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-8 py-3 rounded-xl bg-[#007AFF] hover:bg-[#0066CC] text-white font-bold transition-all shadow-lg shadow-blue-500/20"
            >
              Edit & Resubmit
            </button>
          </div>
        );
      case 'rejected':
        return (
          <button 
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-10 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-lg shadow-red-500/20"
          >
            Resubmit for Review
          </button>
        );
      case 'approved':
        return (
          <button 
            onClick={() => setTaskStatus('claiming')}
            className="px-10 py-3 rounded-xl bg-[#00D395] hover:bg-[#00b37e] text-white font-bold transition-all shadow-lg shadow-[#00D395]/20 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Claim Rewards
          </button>
        );
      case 'claiming':
        return (
          <button 
            onClick={() => setTaskStatus('minting')}
            className="px-10 py-3 rounded-xl bg-[#007AFF] hover:bg-[#0066CC] text-white font-bold transition-all shadow-lg shadow-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Continue
          </button>
        );
      case 'minting':
        return (
          <button 
            onClick={() => setTaskStatus('minted')}
            className="px-10 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-bold transition-all shadow-lg shadow-yellow-500/20 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Mint Cuber
          </button>
        );
      case 'minted':
        return (
          <button 
            onClick={onBack}
            className="px-10 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-white/90 font-bold transition-all shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Back to Quests
          </button>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-transparent transition-colors duration-300 overflow-hidden relative">
      <div className="flex-1 flex flex-col w-full p-6 max-w-[1200px] mx-auto justify-center">
        {/* Top Bar (Header) - 1191x60 */}
        <div className="w-full max-w-[1191px] h-[60px] flex items-center justify-between bg-gray-50/50 dark:bg-white/[0.02] backdrop-blur-md border border-gray-200 dark:border-white/5 rounded-2xl pl-6 pr-0 mb-[5px] shrink-0 mx-auto shadow-sm">
          {/* Left: Logo, Title Stack, Heart */}
          <div className="flex items-center gap-1.5">
            <button onClick={onBack} className="mr-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 bg-[#1e1f24] rounded-xl flex items-center justify-center overflow-hidden border border-white/10 shrink-0">
              {quest.logo ? (
                <img src={quest.logo} alt={quest.protocol} className="w-full h-full object-cover" />
              ) : (
                <Box className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex flex-col ml-1">
              <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 leading-none mb-1 normal-case">{quest.protocol || 'Get started'}</span>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-none">{quest.title}</h1>
                <Heart className="w-4 h-4 text-gray-300 dark:text-white/40 hover:text-red-500 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          
          {/* Right: Rewards Container */}
          <div className="flex items-center justify-end w-auto h-full relative pr-24 pl-6">
            {/* Left Divider */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-t from-transparent to-gray-200 dark:from-transparent dark:to-white/10" />
            
            {/* Rewards Content */}
            <div className="flex flex-col items-start justify-center z-10">
              <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1">Rewards</div>
              <div className="flex items-center gap-2">
                {/* Yellow Cube */}
                {quest.hasCuber && (
                  <div className="w-7 h-7 flex items-center justify-center">
                    <CuberIcon size="xl" />
                  </div>
                )}
                {/* Green XP Hexagon */}
                <div className="flex items-center gap-1.5 ml-1">
                  <XPIcon className="w-5 h-5 text-[8px]" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{quest.xp || 133}</span>
                </div>
                {/* Bounty Reward */}
                {quest.isBounty && quest.tokenReward && (
                  <div className="flex items-center gap-1.5 ml-2 px-2 py-0.5 bg-purple-100 dark:bg-purple-500/20 rounded-md">
                    <span className="text-sm font-bold text-purple-700 dark:text-purple-400">{quest.tokenReward}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Trophy Image */}
            <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0">
              <img src="/profile-stats-rewards-trophy.svg" alt="Trophy" className="w-32 h-32 object-contain drop-shadow-md" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full max-w-[1191px] flex-1 relative bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-[#1a3644] dark:via-[#131b24] dark:to-[#101114] rounded-3xl border border-gray-200 dark:border-white/5 overflow-hidden flex flex-col items-center justify-center p-12 min-h-[500px] shadow-xl dark:shadow-2xl transition-all duration-500 mx-auto">
          
          {renderCenterContent()}

          {/* Bottom Right: Action Button */}
          <div className="absolute bottom-8 right-8">
            {renderBottomRightButton()}
          </div>
        </div>

        {/* Bottom Area (Footer) */}
        <div className="w-full max-w-[1191px] h-[48px] flex items-center gap-2 mt-2 shrink-0 mx-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-bold text-gray-600 dark:text-white shadow-sm">
            <div className="flex items-end gap-[1.5px] h-2.5">
              <div className={`w-0.5 h-1 rounded-sm ${quest.difficulty === 'Beginner' || quest.difficulty === 'Intermediate' || quest.difficulty === 'Advanced' ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-white/20'}`} />
              <div className={`w-0.5 h-2 rounded-sm ${quest.difficulty === 'Intermediate' || quest.difficulty === 'Advanced' ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-white/20'}`} />
              <div className={`w-0.5 h-2.5 rounded-sm ${quest.difficulty === 'Advanced' ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-white/20'}`} />
            </div>
            {quest.difficulty || 'Beginner'}
          </div>
          {quest.estimatedTime && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-bold text-gray-600 dark:text-white shadow-sm">
              <Clock className="w-3.5 h-3.5" />
              {quest.estimatedTime}
            </div>
          )}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-bold text-gray-600 dark:text-white shadow-sm">
            <div className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />
            </div>
            Layer3
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {isSubmitModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1e1f24] p-6 rounded-3xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-white/10 transform animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Submit Task</h3>
              <button 
                onClick={() => setIsSubmitModalOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-500 dark:text-gray-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea 
                className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none h-32 transition-shadow"
                placeholder="Describe how you completed the task..."
                value={submitText}
                onChange={(e) => setSubmitText(e.target.value)}
              />
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Attachment (Optional)</label>
              <div className="relative">
                <input 
                  type="file" 
                  id="file-upload"
                  className="hidden"
                  onChange={(e) => setSubmitFile(e.target.files?.[0] || null)}
                />
                <label 
                  htmlFor="file-upload"
                  className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl border-2 border-dashed border-gray-300 dark:border-white/20 hover:border-blue-500 dark:hover:border-blue-500 text-gray-500 dark:text-gray-400 cursor-pointer transition-colors bg-gray-50 dark:bg-[#101114]"
                >
                  <Upload className="w-5 h-5" />
                  <span className="font-medium">{submitFile ? submitFile.name : 'Upload screenshot or file'}</span>
                </label>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setIsSubmitModalOpen(false);
                setTaskStatus('pending');
              }}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Confirm Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Shield, UserMinus, Check, X, UserPlus, Hexagon, Box, Users, Zap, Crown } from 'lucide-react';
import { GuildData, Task } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { CuberIcon } from '../components/CuberIcon';

interface MyGuildProps {
  setActivePage: (page: string) => void;
  myGuild: GuildData;
  currentUser: { id: string; name: string; role: 'master' | 'member' };
  onKick: (memberId: string) => void;
  onInvite: (name: string) => void;
  onReview: (taskId: string, approved: boolean, reason?: string) => void;
  onSubmitTask: (taskId: string, proof: string) => void;
  onReviewJoinRequest?: (requestId: string, approved: boolean) => void;
}

export function MyGuild({ setActivePage, myGuild, currentUser, onKick, onInvite, onReview, onSubmitTask, onReviewJoinRequest }: MyGuildProps) {
  const [activeTab, setActiveTab] = useState<'members' | 'tasks' | 'activity' | 'join_requests'>('members');
  const [inviteName, setInviteName] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [rejectingTaskId, setRejectingTaskId] = useState<string | null>(null);
  const [submittingTaskId, setSubmittingTaskId] = useState<string | null>(null);
  const [proofUrl, setProofUrl] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [memberToKick, setMemberToKick] = useState<string | null>(null);

  const [testRole, setTestRole] = useState<'master' | 'member'>(currentUser.role);

  const handleInvite = () => {
    if (inviteName.trim()) {
      onInvite(inviteName.trim());
      setInviteName('');
    }
  };

  const handleReject = (taskId: string) => {
    if (rejectReason.trim()) {
      onReview(taskId, false, rejectReason.trim());
      setRejectingTaskId(null);
      setRejectReason('');
    }
  };

  const handleSubmitProof = (taskId: string) => {
    if (proofUrl.trim()) {
      onSubmitTask(taskId, proofUrl.trim());
      setSubmittingTaskId(null);
      setProofUrl('');
    }
  };

  // Group tasks by member for master view
  const pendingTasksByMember = myGuild.tasks.reduce((acc, task) => {
    if (task.status === 'pending') {
      if (!acc[task.studentId]) acc[task.studentId] = [];
      acc[task.studentId].push(task);
    }
    return acc;
  }, {} as Record<string, Task[]>);

  const allPendingTasks = myGuild.tasks.filter(t => t.status === 'pending');
  const memberPendingTasks = selectedMemberId ? (pendingTasksByMember[selectedMemberId] || []) : [];
  const activeTaskIndex = Math.min(currentTaskIndex, Math.max(0, memberPendingTasks.length - 1));
  const currentTask = memberPendingTasks[activeTaskIndex];
  const currentStudent = currentTask ? myGuild.members.find(m => m.id === currentTask.studentId) : null;

  const nextTask = () => {
    setDirection(1);
    setCurrentTaskIndex(i => Math.min(i + 1, memberPendingTasks.length - 1));
  };
  const prevTask = () => {
    setDirection(-1);
    setCurrentTaskIndex(i => Math.max(i - 1, 0));
  };

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide pb-20 pt-8">
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setActivePage('guilds')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Guilds</span>
          </button>
          <button 
            onClick={() => setTestRole(r => r === 'master' ? 'member' : 'master')}
            className="px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white rounded-xl text-sm font-medium transition-colors"
          >
            Test as {testRole === 'master' ? 'Member' : 'Master'}
          </button>
        </div>

        {/* Header */}
        <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-[24px] p-8 mb-8 flex flex-col md:flex-row gap-8 shadow-sm dark:shadow-none">
          {/* Left Icon */}
          <div className="w-48 h-48 shrink-0 rounded-[32px] bg-gray-50 dark:bg-[#1a1b1e] flex items-center justify-center border border-gray-100 dark:border-white/5">
            <Shield className="w-24 h-24 text-gray-300 dark:text-gray-600" strokeWidth={1.5} />
          </div>
          
          {/* Right Content */}
          <div className="flex-1">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Guild</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{myGuild.name}</h1>
            <p className="text-gray-900 dark:text-white font-medium mb-4">
              This is the Elites club, a top-notch selection of the 3lluminati
            </p>
            
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 space-y-1">
              <p>Criteria to join:</p>
              <p>- 10,000+ L3 staked</p>
              <p>- 3,000+ CUBEs</p>
              <p>- Active daily (completing all streaks)</p>
              <p>- Diamond League</p>
              <p className="mt-4">DM the right person in Discord to join</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              {/* Stats */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-[#1a1b1e] rounded-2xl p-4 flex items-center gap-3 border border-gray-100 dark:border-transparent">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xs">G</div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Glory</div>
                      <div className="font-bold text-gray-900 dark:text-white">{myGuild.points}</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#1a1b1e] rounded-2xl p-4 flex items-center gap-3 border border-gray-100 dark:border-transparent">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                      <CuberIcon size="md" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">CUBEs</div>
                      <div className="font-bold text-gray-900 dark:text-white">0</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#1a1b1e] rounded-2xl p-4 flex items-center gap-3 border border-gray-100 dark:border-transparent">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Members</div>
                      <div className="font-bold text-gray-900 dark:text-white">{myGuild.members.length}</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#1a1b1e] rounded-2xl p-4 flex items-center gap-3 border border-gray-100 dark:border-transparent">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400">
                      <Zap className="w-4 h-4" />
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
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Perks</h3>
                <div className="bg-gray-50 dark:bg-[#1a1b1e] rounded-2xl p-4 flex items-center gap-4 h-[72px] border border-gray-100 dark:border-transparent">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm relative overflow-hidden">
                    <Hexagon className="w-8 h-8 absolute opacity-20" />
                    <span className="relative z-10">5%</span>
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white">+5% XP</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#101114] p-1.5 rounded-2xl w-fit border border-gray-200 dark:border-white/5">
            <button
              onClick={() => { setActiveTab('members'); setSelectedMemberId(null); }}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'members'
                  ? 'bg-white dark:bg-[#1a1b1e] text-gray-900 dark:text-white shadow-sm dark:shadow-none'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Members
            </button>
            {testRole === 'master' && (
              <>
                <button
                  onClick={() => { setActiveTab('tasks'); setSelectedMemberId(null); }}
                  className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'tasks'
                      ? 'bg-white dark:bg-[#1a1b1e] text-gray-900 dark:text-white shadow-sm dark:shadow-none'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Task Approvals
                </button>
                <button
                  onClick={() => { setActiveTab('join_requests'); setSelectedMemberId(null); }}
                  className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeTab === 'join_requests'
                      ? 'bg-white dark:bg-[#1a1b1e] text-gray-900 dark:text-white shadow-sm dark:shadow-none'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Join Requests
                  {myGuild.joinRequests && myGuild.joinRequests.filter(r => r.status === 'pending').length > 0 && (
                    <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {myGuild.joinRequests.filter(r => r.status === 'pending').length}
                    </span>
                  )}
                </button>
              </>
            )}
            <button
              onClick={() => { setActiveTab('activity'); setSelectedMemberId(null); }}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'activity'
                  ? 'bg-white dark:bg-[#1a1b1e] text-gray-900 dark:text-white shadow-sm dark:shadow-none'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Activity
            </button>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#101114] p-1.5 rounded-2xl w-fit border border-gray-200 dark:border-white/5">
            <div className="px-4 py-2 text-sm font-medium text-gray-500">Period</div>
            <div className="h-4 w-px bg-gray-300 dark:bg-white/10 mx-1" />
            {['All time', '24h', '7d'].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filter === 'All time'
                    ? 'bg-white dark:bg-[#1a1b1e] text-gray-900 dark:text-white shadow-sm dark:shadow-none'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            {testRole === 'master' && (
              <div className="flex gap-3 mb-6 max-w-md">
                <input 
                  type="text" 
                  placeholder="Enter username to invite..." 
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="flex-1 bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
                <button 
                  onClick={handleInvite}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Invite
                </button>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {myGuild.members.map(member => (
                <div key={member.id} className="relative flex items-center justify-between p-4 bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl group">
                  {testRole === 'master' && member.role !== 'master' && (
                    <button 
                      onClick={() => setMemberToKick(member.id)} 
                      className="absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-[#1a1b1e] border border-red-200 dark:border-red-500/20 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm z-10"
                      title="Kick member"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 flex items-center justify-center">
                        <img src="/level-frame.bd176f30.svg" alt="Level Frame" className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                        <span className="relative z-10 text-[10px] font-bold text-white leading-none">{member.level}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{member.name}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        {member.role === 'master' && <Crown className="w-4 h-4 text-yellow-500" />}
                        <span className={member.role === 'master' ? 'text-yellow-600 dark:text-yellow-500 font-medium' : ''}>
                          {member.role === 'master' ? 'Leader' : 'Member'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                        <CuberIcon size="sm" />
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">{member.cubes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400">G</span>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">{member.xp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {testRole === 'master' ? (
              allPendingTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">All Caught Up!</h3>
                  <p>There are no pending tasks to review.</p>
                </div>
              ) : selectedMemberId && memberPendingTasks.length > 0 ? (
                <div>
                  <button onClick={() => setSelectedMemberId(null)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6">
                    <ChevronLeft className="w-4 h-4" /> Back to members
                  </button>
                  <div className="flex items-center justify-center gap-6 py-8">
                    <button 
                      onClick={() => {
                        setDirection(-1);
                        prevTask();
                      }} 
                      disabled={activeTaskIndex === 0}
                      className="w-12 h-12 rounded-full bg-white dark:bg-[#1a1b1e] border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm shrink-0"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="w-full max-w-md relative" style={{ perspective: '1000px' }}>
                      {/* Invisible Measuring Card to maintain container height */}
                      <div className="opacity-0 pointer-events-none bg-white border rounded-[32px] p-8">
                        <div className="flex flex-col items-center mb-8 pb-6 border-b">
                          <div className="w-20 h-20 mb-4" />
                          <h3 className="text-xl mb-1">Name</h3>
                          <p className="text-sm">Sub</p>
                        </div>
                        <div className="mb-6">
                          <div className="mb-2">Task</div>
                          <h4 className="text-lg mb-2">{currentTask?.title}</h4>
                          <p className="p-4">{currentTask?.description}</p>
                        </div>
                        {currentTask?.proof && (
                          <div className="mb-8">
                            <div className="mb-2">Proof</div>
                            <div className="p-4">{currentTask.proof}</div>
                          </div>
                        )}
                        <div className="flex gap-4">
                          <div className="py-4">Button</div>
                        </div>
                      </div>

                      <AnimatePresence custom={direction}>
                        {memberPendingTasks.map((task, index) => {
                          const relativeIndex = index - activeTaskIndex;
                          if (relativeIndex < 0 || relativeIndex > 2) return null;
                          const isTop = relativeIndex === 0;

                          return (
                            <motion.div
                              key={task.id}
                              custom={direction}
                              layout
                              initial={(dir: number) => ({ 
                                opacity: 0, 
                                x: dir === 1 ? 50 : -100, 
                                scale: 0.9 
                              })}
                              animate={{
                                opacity: 1 - relativeIndex * 0.3,
                                x: relativeIndex * 24,
                                y: -relativeIndex * 12,
                                scale: 1 - relativeIndex * 0.05,
                                zIndex: 10 - relativeIndex,
                              }}
                              exit={(dir: number) => ({ 
                                opacity: 0, 
                                x: dir === 1 ? -100 : 50, 
                                scale: 0.9, 
                                transition: { duration: 0.2 } 
                              })}
                              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                              className={`absolute top-0 left-0 w-full bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-[32px] p-8 shadow-xl dark:shadow-2xl ${isTop ? '' : 'pointer-events-none'}`}
                              style={{ transformOrigin: 'center right' }}
                            >
                              {/* Student Info - Prominent */}
                              <div className="flex flex-col items-center mb-8 pb-6 border-b border-gray-100 dark:border-white/5">
                                <div className="relative mb-4">
                                  <img src={currentStudent?.avatar} alt={currentStudent?.name} className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-[#161719] shadow-md" />
                                  <div className="absolute -bottom-2 -right-2 w-8 h-8 flex items-center justify-center">
                                    <img src="/level-frame.bd176f30.svg" alt="Level Frame" className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                                    <span className="relative z-10 text-xs font-bold text-white leading-none">{currentStudent?.level}</span>
                                  </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{currentStudent?.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Submitted a task for review</p>
                              </div>

                              {/* Task Details */}
                              <div className="mb-6">
                                <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Task</div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{task.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-[#1a1b1e] p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                                  {task.description}
                                </p>
                              </div>

                              {/* Proof */}
                              {task.proof && (
                                <div className="mb-8">
                                  <div className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">Proof</div>
                                  <a href={task.proof} target="_blank" rel="noreferrer" className="block p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl border border-blue-100 dark:border-blue-500/20 text-sm text-blue-600 dark:text-blue-400 hover:underline break-all transition-colors">
                                    {task.proof}
                                  </a>
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex gap-4">
                                {rejectingTaskId === task.id ? (
                                  <div className="flex-1 flex flex-col gap-3">
                                    <input 
                                      type="text" 
                                      placeholder="Reason for rejection..." 
                                      value={rejectReason}
                                      onChange={(e) => setRejectReason(e.target.value)}
                                      className="w-full bg-gray-50 dark:bg-[#1a1b1e] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-red-500"
                                    />
                                    <div className="flex gap-2">
                                      <button onClick={() => handleReject(task.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl text-sm font-bold transition-colors">Confirm Reject</button>
                                      <button onClick={() => setRejectingTaskId(null)} className="flex-1 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-700 dark:text-white px-4 py-3 rounded-xl text-sm font-bold transition-colors">Cancel</button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <button onClick={() => setRejectingTaskId(task.id)} className="flex-1 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 px-4 py-4 rounded-2xl text-sm font-bold transition-colors">
                                      <X className="w-5 h-5" /> Reject
                                    </button>
                                    <button onClick={() => onReview(task.id, true)} className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-4 rounded-2xl text-sm font-bold transition-colors shadow-lg shadow-emerald-500/30">
                                      <Check className="w-5 h-5" /> Approve
                                    </button>
                                  </>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>

                    <button 
                      onClick={nextTask} 
                      disabled={activeTaskIndex === memberPendingTasks.length - 1}
                      className="w-12 h-12 rounded-full bg-white dark:bg-[#1a1b1e] border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm shrink-0"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-6">
                  {myGuild.members.map(member => {
                    const pendingCount = pendingTasksByMember[member.id]?.length || 0;
                    return (
                      <button 
                        key={member.id} 
                        onClick={() => {
                          if (pendingCount > 0) {
                            setSelectedMemberId(member.id);
                            setCurrentTaskIndex(0);
                          }
                        }}
                        className={`flex flex-col items-center gap-2 w-20 relative group ${pendingCount > 0 ? 'cursor-pointer' : 'cursor-default opacity-50'}`}
                      >
                        <div className="relative">
                          <img src={member.avatar} alt={member.name} className={`w-16 h-16 rounded-full object-cover border-2 ${pendingCount > 0 ? 'border-emerald-500' : 'border-transparent'} transition-colors`} />
                          {pendingCount > 0 && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm border-2 border-white dark:border-[#101114]">
                              {pendingCount}
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-medium text-gray-900 dark:text-white text-center w-full truncate">{member.name}</span>
                      </button>
                    );
                  })}
                </div>
              )
            ) : (
              // Member view: show their own tasks
              myGuild.tasks.filter(t => t.studentId === currentUser.id).length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">No tasks found.</div>
              ) : (
                myGuild.tasks.filter(t => t.studentId === currentUser.id).map(task => (
                  <div key={task.id} className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-[24px] p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{task.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === 'completed' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' :
                        task.status === 'failed' ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' :
                        task.status === 'pending' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400' :
                        'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                      }`}>
                        {task.status.toUpperCase()}
                      </div>
                    </div>

                    {task.proof && (
                      <div className="mb-4 p-3 bg-gray-50 dark:bg-[#1a1b1e] rounded-xl border border-gray-200 dark:border-white/5">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Submitted Proof:</div>
                        <a href={task.proof} target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:underline break-all">{task.proof}</a>
                      </div>
                    )}

                    {task.failReason && (
                      <div className="mb-4 p-3 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-200 dark:border-red-500/20">
                        <div className="text-xs text-red-500 dark:text-red-400 mb-1">Rejection Reason:</div>
                        <div className="text-sm text-red-600 dark:text-red-300">{task.failReason}</div>
                      </div>
                    )}

                    {(task.status === 'in-progress' || task.status === 'failed') && (
                      <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-white/5">
                        {submittingTaskId === task.id ? (
                          <div className="flex-1 flex gap-2">
                            <input 
                              type="text" 
                              placeholder="Enter proof URL..." 
                              value={proofUrl}
                              onChange={(e) => setProofUrl(e.target.value)}
                              className="flex-1 bg-white dark:bg-[#1a1b1e] border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                            />
                            <button onClick={() => handleSubmitProof(task.id)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">Submit</button>
                            <button onClick={() => setSubmittingTaskId(null)} className="bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-700 dark:text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setSubmittingTaskId(task.id)} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors">
                            Submit Proof
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )
            )}
          </div>
        )}

        {/* Join Requests Tab */}
        {activeTab === 'join_requests' && testRole === 'master' && (
          <div className="space-y-4">
            {!myGuild.joinRequests || myGuild.joinRequests.filter(r => r.status === 'pending').length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
                <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Pending Requests</h3>
                <p>There are no new join requests at the moment.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {myGuild.joinRequests.filter(r => r.status === 'pending').map(request => (
                  <div key={request.id} className="flex items-center justify-between p-6 bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={request.userAvatar} alt={request.userName} className="w-12 h-12 rounded-full object-cover" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 flex items-center justify-center">
                          <img src="/level-frame.bd176f30.svg" alt="Level Frame" className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                          <span className="relative z-10 text-[10px] font-bold text-white leading-none">{request.userLevel}</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white text-lg">{request.userName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Requested {request.timestamp}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onReviewJoinRequest && onReviewJoinRequest(request.id, false)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                      >
                        <X className="w-4 h-4" /> Reject
                      </button>
                      <button 
                        onClick={() => onReviewJoinRequest && onReviewJoinRequest(request.id, true)}
                        disabled={myGuild.maxMembers !== undefined && myGuild.members.length >= myGuild.maxMembers}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-emerald-500/20"
                      >
                        <Check className="w-4 h-4" /> Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            {myGuild.activities && myGuild.activities.length > 0 ? (
              myGuild.activities.map(activity => (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl">
                  <img src={activity.memberAvatar} alt={activity.memberName} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900 dark:text-white">{activity.memberName}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.type === 'task_completed' ? 'completed a task' : 'checked in'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-gray-300">{activity.description}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">{activity.timestamp}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">No recent activity.</div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {memberToKick && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMemberToKick(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-[#1a1b1e] rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-white/10"
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400 mb-4">
                  <UserMinus className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Kick Member</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Are you sure you want to kick <span className="font-bold text-gray-900 dark:text-white">{myGuild.members.find(m => m.id === memberToKick)?.name}</span> from the guild? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setMemberToKick(null)}
                    className="flex-1 px-4 py-2.5 rounded-xl font-medium bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onKick(memberToKick);
                      setMemberToKick(null);
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
                  >
                    Yes, Kick
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

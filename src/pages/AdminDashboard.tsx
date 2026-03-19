import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, LayoutTemplate, Target, Settings, Image as ImageIcon, ChevronLeft, Eye, Copy, Users, Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { TaskPage } from './TaskPage';

interface AdminDashboardProps {
  setActivePage: (page: string) => void;
}

export function AdminDashboard({ setActivePage }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('quests');
  const [questView, setQuestView] = useState<'list' | 'form' | 'preview'>('list');

  // Mock data for banners
  const [banners, setBanners] = useState([
    { id: 1, title: 'Earn with Ample on Base', description: 'A new way to amplify your money.', status: 'Active' },
    { id: 2, title: 'Explore the Zora Network', description: 'Mint, collect, and enjoy pure internet culture.', status: 'Draft' },
    { id: 3, title: 'Provide Liquidity on Uniswap', description: 'Earn fees by providing liquidity to top pools.', status: 'Active' }
  ]);

  // Mock data for quests
  const [quests, setQuests] = useState([
    { id: 1, title: 'Get Started with Web3', primaryCategory: '通用任务', secondaryCategory: 'Get Started', xp: 100, status: 'Online', isBounty: false },
    { id: 2, title: 'Deploy your first Smart Contract', primaryCategory: '技术任务', secondaryCategory: '第一周', xp: 300, status: 'Online', isBounty: true },
    { id: 3, title: 'Write a Twitter Thread', primaryCategory: '运营任务', secondaryCategory: '第二周', xp: 150, status: 'Offline', isBounty: false }
  ]);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    icon: '',
    iconFile: null as File | null,
    primaryCategory: '通用任务',
    secondaryCategory: 'Get Started',
    difficulty: 'Beginner',
    estimatedTime: '',
    prerequisites: '',
    isBounty: false,
    xpReward: 100,
    hasCuber: true,
    tokenReward: '',
    publishImmediately: true,
    publishTime: '',
    startTime: '',
    durationMode: 'permanent',
    durationValue: 1,
    endTime: '',
    participantLimit: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        iconFile: file,
        icon: url
      }));
    }
  };

  const handleSaveDraft = () => {
    setQuestView('list');
    // Add to quests logic here
  };

  const handlePublish = () => {
    setQuestView('list');
    // Add to quests logic here
  };

  if (questView === 'preview') {
    return (
      <div className="absolute inset-0 z-[100] flex flex-col bg-white dark:bg-[#101114] animate-in fade-in duration-300">
        {/* Preview Header */}
        <div className="h-14 bg-blue-600 text-white flex items-center justify-between px-6 shrink-0 shadow-md z-10">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            <span className="font-bold">Student Preview Mode</span>
            <span className="text-blue-200 text-sm ml-2 hidden sm:inline">| This is how students will see your task</span>
          </div>
          <button 
            onClick={() => setQuestView('form')}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Back to Editor
          </button>
        </div>
        {/* Task Page Container */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          <TaskPage 
            quest={{
              title: formData.title || 'Untitled Task',
              description: formData.subtitle || 'No description provided.',
              logo: formData.icon,
              protocol: formData.primaryCategory,
              xp: formData.xpReward,
              difficulty: formData.difficulty,
              estimatedTime: formData.estimatedTime,
              isBounty: formData.isBounty,
              tokenReward: formData.tokenReward,
              hasCuber: formData.hasCuber
            }} 
            onBack={() => setQuestView('form')} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide pb-20 pt-8">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Internal Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Configure platform content, quests, and settings.</p>
          </div>
        </div>
        
        {/* Tabs */}
        {questView === 'list' && (
          <div className="flex gap-6 mb-8 border-b border-gray-200 dark:border-white/10">
            <button 
              onClick={() => setActiveTab('quests')}
              className={`pb-4 font-medium transition-colors flex items-center gap-2 ${activeTab === 'quests' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <Target className="w-4 h-4" />
              Quests & Tasks
            </button>
            <button 
              onClick={() => setActiveTab('banners')}
              className={`pb-4 font-medium transition-colors flex items-center gap-2 ${activeTab === 'banners' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <LayoutTemplate className="w-4 h-4" />
              Hero Banners
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`pb-4 font-medium transition-colors flex items-center gap-2 ${activeTab === 'settings' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <Settings className="w-4 h-4" />
              General Settings
            </button>
          </div>
        )}

        {/* Content */}
        {activeTab === 'banners' && questView === 'list' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Hero Banners</h2>
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20">
                <Plus className="w-4 h-4" /> Add Banner
              </button>
            </div>
            <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/5">
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Banner Title</th>
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Description</th>
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map(banner => (
                    <tr key={banner.id} className="border-b border-gray-200 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{banner.title}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{banner.description}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${banner.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400'}`}>
                          {banner.status}
                        </span>
                      </td>
                      <td className="p-4 flex justify-end gap-2">
                        <button className="p-2 text-gray-500 hover:text-blue-500 bg-gray-50 dark:bg-white/5 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-500 hover:text-red-500 bg-gray-50 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'quests' && questView === 'list' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Quests & Tasks</h2>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white px-4 py-2 rounded-xl font-medium transition-colors">
                  <Copy className="w-4 h-4" /> Batch Create
                </button>
                <button 
                  onClick={() => setQuestView('form')}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20"
                >
                  <Plus className="w-4 h-4" /> Create Quest
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/5">
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Quest Title</th>
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Category</th>
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Type</th>
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quests.map(quest => (
                    <tr key={quest.id} className="border-b border-gray-200 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 text-sm font-bold text-gray-900 dark:text-white">
                        <div>{quest.title}</div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">+{quest.xp} XP</div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 w-fit">
                            {quest.primaryCategory}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{quest.secondaryCategory}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {quest.isBounty ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400">
                            Bounty
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400">
                            Standard
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${quest.status === 'Online' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400'}`}>
                          {quest.status === 'Online' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {quest.status}
                        </span>
                      </td>
                      <td className="p-4 flex justify-end gap-2">
                        <button className="p-2 text-gray-500 hover:text-blue-500 bg-gray-50 dark:bg-white/5 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="View Data"><Users className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-500 hover:text-blue-500 bg-gray-50 dark:bg-white/5 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="Duplicate"><Copy className="w-4 h-4" /></button>
                        <button onClick={() => setQuestView('form')} className="p-2 text-gray-500 hover:text-blue-500 bg-gray-50 dark:bg-white/5 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'quests' && questView === 'form' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setQuestView('list')} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Quest</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5 text-blue-500" /> Basic Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Quest Title</label>
                      <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Complete your first swap" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Subtitle / Description</label>
                      <textarea name="subtitle" value={formData.subtitle} onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none" placeholder="Detailed description of the task..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Cover / Icon</label>
                        <div className="flex items-center gap-3">
                          {formData.icon && (
                            <img src={formData.icon} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-gray-200 dark:border-white/10" />
                          )}
                          <label className="flex-1 flex items-center justify-center gap-2 bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 border-dashed rounded-xl px-4 py-3 text-gray-500 hover:text-blue-500 hover:border-blue-500 cursor-pointer transition-colors">
                            <ImageIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">Upload Image</span>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                        <select name="difficulty" value={formData.difficulty} onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Estimated Time</label>
                      <input type="text" name="estimatedTime" value={formData.estimatedTime} onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 30 mins" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Prerequisites (Task IDs)</label>
                      <input type="text" name="prerequisites" value={formData.prerequisites} onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. task_1, task_2" />
                      <p className="text-xs text-gray-500 mt-1">Users must complete these tasks before unlocking this one.</p>
                    </div>
                  </div>
                </div>

                {/* Rewards Configuration */}
                <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-500" /> Rewards Configuration
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">XP Amount</label>
                        <input type="number" name="xpReward" value={formData.xpReward} onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div className="flex items-center pt-8">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" name="hasCuber" checked={formData.hasCuber} onChange={handleInputChange} className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Mint Cuber on Completion</span>
                        </label>
                      </div>
                    </div>
                    {formData.isBounty && (
                      <div className="animate-in fade-in slide-in-from-top-2">
                        <label className="block text-sm font-bold text-purple-600 dark:text-purple-400 mb-2">Bounty Token Reward</label>
                        <input type="text" name="tokenReward" value={formData.tokenReward} onChange={handleInputChange} className="w-full bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g. 50 USDC" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Time & Lifecycle */}
                <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-500" /> Time & Lifecycle
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" name="publishImmediately" checked={formData.publishImmediately} onChange={handleInputChange} className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Publish Immediately</span>
                      </label>
                    </div>
                    
                    {!formData.publishImmediately && (
                      <div className="animate-in fade-in slide-in-from-top-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Publish Time</label>
                        <input type="datetime-local" name="publishTime" value={formData.publishTime} onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-white/10">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Start Time</label>
                        <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Duration</label>
                        <div className="flex gap-2">
                          {formData.durationMode !== 'permanent' && formData.durationMode !== 'custom' && (
                            <input type="number" name="durationValue" value={formData.durationValue} onChange={handleInputChange} className="w-20 bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-3 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" min="1" />
                          )}
                          <select name="durationMode" value={formData.durationMode} onChange={handleInputChange} className="flex-1 bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                            <option value="hours">Hours</option>
                            <option value="days">Days</option>
                            <option value="permanent">Permanent</option>
                            <option value="custom">Custom End Time</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {formData.durationMode === 'custom' && (
                      <div className="animate-in fade-in slide-in-from-top-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">End Time</label>
                        <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar Settings */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Classification</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Primary Category</label>
                      <select name="primaryCategory" value={formData.primaryCategory} onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                        <option value="通用任务">通用任务 (General)</option>
                        <option value="技术任务">技术任务 (Technical)</option>
                        <option value="运营任务">运营任务 (Operations)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Secondary Category</label>
                      <select name="secondaryCategory" value={formData.secondaryCategory} onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                        <option value="Get Started">Get Started</option>
                        <option value="第一周">第一周 (Week 1)</option>
                        <option value="第二周">第二周 (Week 2)</option>
                        <option value="第三周">第三周 (Week 3)</option>
                        <option value="第四周">第四周 (Week 4)</option>
                      </select>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-white/10">
                      <label className="flex items-center gap-3 cursor-pointer mt-4">
                        <input type="checkbox" name="isBounty" checked={formData.isBounty} onChange={handleInputChange} className="w-5 h-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500" />
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">Is Bounty Task</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Limits & Visibility</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Participant Limit (0 = unltd)</label>
                      <input type="number" name="participantLimit" value={formData.participantLimit} onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" min="0" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm sticky top-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Publish & Actions</h3>
                  <div className="space-y-3">
                    <button onClick={() => setQuestView('preview')} className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white px-4 py-3 rounded-xl font-bold transition-colors">
                      <Eye className="w-4 h-4" /> Student Preview
                    </button>
                    <button onClick={handleSaveDraft} className="w-full flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-4 py-3 rounded-xl font-bold transition-colors">
                      <Save className="w-4 h-4" /> Save Draft
                    </button>
                    <button onClick={handlePublish} className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98]">
                      <Target className="w-4 h-4" /> Publish Task
                    </button>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-xl flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-700 dark:text-yellow-400 leading-relaxed">
                      Please ensure all required fields and rewards are configured correctly before publishing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-2xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">General Settings</h2>
            <div className="space-y-6 max-w-xl">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Platform Name</label>
                <input type="text" defaultValue="Moledao Web3" className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Maintenance Mode</label>
                <select className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow appearance-none">
                  <option>Disabled</option>
                  <option>Enabled</option>
                </select>
              </div>
              <div className="pt-4">
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98]">
                  <Save className="w-5 h-5" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

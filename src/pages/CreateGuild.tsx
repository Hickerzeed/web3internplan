import { useState } from 'react';
import { Shield, Flame, Ghost, Cat, CloudRain, Globe, Hexagon, Zap, Crown, Target, ArrowLeft } from 'lucide-react';

interface CreateGuildProps {
  setActivePage: (page: string) => void;
}

export function CreateGuild({ setActivePage }: CreateGuildProps) {
  const [selectedLogo, setSelectedLogo] = useState<number>(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const logos = [Shield, Flame, Ghost, Cat, CloudRain, Globe, Hexagon, Zap, Crown, Target];

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide pb-20 pt-8">
      <div className="max-w-2xl mx-auto px-8">
        <button 
          onClick={() => setActivePage('guilds')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Guilds
        </button>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Create a Guild</h1>

        <div className="bg-white dark:bg-[#101114] rounded-2xl p-8 border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none">
          
          {/* Logo Selection */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
              Guild Logo <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-5 gap-4">
              {logos.map((Icon, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedLogo(index)}
                  className={`aspect-square rounded-xl flex items-center justify-center transition-all ${
                    selectedLogo === index
                      ? 'bg-blue-500 text-white shadow-md scale-105'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-8 h-8" />
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter guild name..."
              className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
              Description <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 180))}
                placeholder="Describe your guild..."
                rows={4}
                className="w-full bg-gray-50 dark:bg-[#101114] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              />
              <span className="absolute bottom-3 right-4 text-xs text-gray-400">
                {180 - description.length}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            disabled={!name.trim() || !description.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-white/10 disabled:text-gray-500 dark:disabled:text-gray-600 text-white font-bold py-4 rounded-xl transition-all"
            onClick={() => setActivePage('guilds')}
          >
            Create Guild
          </button>
        </div>
      </div>
    </div>
  );
}
